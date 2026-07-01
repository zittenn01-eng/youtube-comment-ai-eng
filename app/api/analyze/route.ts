import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY as string);

function extractVideoId(url: string) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : url; // If no match, assume it might already be an ID
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL을 입력해주세요.' }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId || videoId.length !== 11) {
      return NextResponse.json({ error: '유효하지 않은 유튜브 URL이거나 영상 ID입니다.' }, { status: 400 });
    }

    // 1. Fetch comments from YouTube API
    let comments = [];
    let nextPageToken = '';
    // Fetch only 1 page (max 100 comments) to ensure fast response times
    const ytUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`;
    const response = await fetch(ytUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || '유튜브 댓글을 불러오는 중 오류가 발생했습니다.');
    }

    if (data.items) {
      comments.push(...data.items.map((item: any) => ({
        text: item.snippet.topLevelComment.snippet.textDisplay,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
      })));
    }

    if (comments.length === 0) {
      return NextResponse.json({ error: '이 영상에는 댓글이 없습니다.' }, { status: 404 });
    }

    // 2. Analyze with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    const prompt = `
당신은 데이터 분석 전문가입니다. 제공된 유튜브 댓글 리스트를 분석해주세요.

댓글 목록:
${JSON.stringify(comments.map(c => ({ text: c.text, date: c.publishedAt.split('T')[0] })))}

작업:
1. 긍정, 부정, 중립 댓글의 총 개수를 세어주세요.
2. 날짜별 감정 개수(sentimentsOverTime)를 구해주세요.
3. 날짜별 총 댓글 수(commentsOverTime)를 구해주세요.
4. 댓글들의 평균 글자 수를 계산해주세요.
5. 가장 의미 있고 자주 등장하는 20개의 바이그램(연속된 두 단어) 단어 짝을 정확히 추출하여 빈도수(weight)와 함께 제공하세요. 추출되는 단어들은 반드시 "한글"로 표현해주세요 (예: 영어 단어가 있으면 한글로 번역하거나, 한국어 댓글 위주로 추출). 너무 흔한 조사나 무의미한 단어는 제외하세요.
6. 전체 댓글 반응을 바탕으로 한글로 3~4문장 분량의 '종합 분석 요약문(summary)'을 작성해주세요.

반드시 마크다운 코드 블록(\`\`\`json) 없이 순수한 JSON 객체만 출력해야 합니다.
JSON 구조는 다음을 엄격히 따르세요:
{
  "totalComments": number,
  "positive": number,
  "negative": number,
  "neutral": number,
  "sentimentsOverTime": [
    { "date": "YYYY-MM-DD", "positive": number, "negative": number, "neutral": number }
  ],
  "commentsOverTime": [
    { "date": "YYYY-MM-DD", "count": number }
  ],
  "averageLength": number,
  "bigrams": [
    { "source": "단어1", "target": "단어2", "weight": 빈도수 } // 무조건 20개를 꽉 채워주세요.
  ],
  "summary": "종합 분석 요약문 내용 (한글)"
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().replace(/^```json/, '').replace(/```$/, '').trim();
    
    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", responseText);
      return NextResponse.json({ error: 'AI 응답을 처리하는 데 실패했습니다. 다시 시도해주세요.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      analysis,
      rawCommentsCount: comments.length
    });

  } catch (error: any) {
    console.error('Analyze Error:', error);
    return NextResponse.json({ error: error.message || '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
