'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface NetworkGraphProps {
  data: Array<{ source: string; target: string; weight: number }>;
}

export function NetworkGraph({ data }: NetworkGraphProps) {
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Process bigrams into nodes and links
    const nodesMap = new Map<string, any>();
    const links: any[] = [];

    data.forEach(link => {
      if (!nodesMap.has(link.source)) nodesMap.set(link.source, { id: link.source, val: 1 });
      if (!nodesMap.has(link.target)) nodesMap.set(link.target, { id: link.target, val: 1 });
      
      // Increase node size based on connections
      nodesMap.get(link.source).val += link.weight * 0.5;
      nodesMap.get(link.target).val += link.weight * 0.5;

      links.push({
        source: link.source,
        target: link.target,
        value: link.weight
      });
    });

    setGraphData({
      nodes: Array.from(nodesMap.values()),
      links
    });
  }, [data]);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight || 400
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 400
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-[500px] flex flex-col" ref={containerRef}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">키워드 연관성(바이그램) 네트워크</h3>
      <div className="flex-1 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
        {graphData.nodes.length > 0 ? (
          <ForceGraph2D
            width={dimensions.width - 48} // Padding adjustments
            height={dimensions.height - 80}
            graphData={graphData}
            nodeLabel="id"
            nodeColor={() => '#8b5cf6'}
            linkColor={() => '#d8b4fe'}
            linkWidth={link => (link as any).value * 0.5}
            nodeRelSize={4}
            d3VelocityDecay={0.3}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
