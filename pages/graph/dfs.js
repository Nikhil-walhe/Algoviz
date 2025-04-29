import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DFS() {
  const [graph, setGraph] = useState({
    nodes: [
      { id: 0, x: 100, y: 100, visited: false },
      { id: 1, x: 300, y: 100, visited: false },
      { id: 2, x: 200, y: 200, visited: false },
      { id: 3, x: 400, y: 200, visited: false },
      { id: 4, x: 100, y: 300, visited: false },
      { id: 5, x: 300, y: 300, visited: false },
    ],
    edges: [
      { from: 0, to: 1, directed: false },
      { from: 0, to: 2, directed: false },
      { from: 1, to: 3, directed: false },
      { from: 2, to: 4, directed: false },
      { from: 2, to: 5, directed: false },
      { from: 3, to: 5, directed: false },
    ]
  });

  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [startNode, setStartNode] = useState(0);
  const [showPseudocode, setShowPseudocode] = useState(true);
  const canvasRef = useRef(null);

  // Draw the graph
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    ctx.strokeStyle = '#4B5563';
    ctx.lineWidth = 2;
    graph.edges.forEach(edge => {
      const fromNode = graph.nodes.find(n => n.id === edge.from);
      const toNode = graph.nodes.find(n => n.id === edge.to);
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
      
      // Draw arrowhead for directed edges
      if (edge.directed) {
        drawArrowhead(ctx, fromNode.x, fromNode.y, toNode.x, toNode.y);
      }
    });
    
    // Draw nodes
    graph.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = node.visited ? '#EC4899' : '#6B7280';
      ctx.fill();
      ctx.strokeStyle = '#111827';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw node label
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(node.id, node.x, node.y);
    });
    
    // Highlight traversal path
    if (traversalOrder.length > 0) {
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      
      for (let i = 0; i < traversalOrder.length - 1; i++) {
        const fromNode = graph.nodes.find(n => n.id === traversalOrder[i]);
        const toNode = graph.nodes.find(n => n.id === traversalOrder[i + 1]);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    }
  }, [graph, traversalOrder]);

  const drawArrowhead = (ctx, fromX, fromY, toX, toY) => {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  const dfs = async (start) => {
    setIsAnimating(true);
    const visited = new Set();
    const order = [];
    
    const dfsVisit = async (nodeId) => {
      visited.add(nodeId);
      order.push(nodeId);
      
      // Update visualization
      setGraph(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => 
          n.id === nodeId ? { ...n, visited: true } : n
        )
      }));
      setTraversalOrder([...order]);
      
      await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      
      // Get neighbors
      const neighbors = graph.edges
        .filter(edge => edge.from === nodeId)
        .map(edge => edge.to);
      
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          await dfsVisit(neighbor);
        }
      }
    };
    
    await dfsVisit(start);
    setIsAnimating(false);
  };

  const resetGraph = () => {
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => ({ ...n, visited: false }))
    }));
    setTraversalOrder([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/graph">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Graph Topics
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-3">
            Depth First Search (DFS)
          </h1>
          <p className="text-lg text-gray-300">
            A graph traversal algorithm that explores as far as possible along each branch before backtracking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">Interactive Visualization</h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dfs(startNode)}
                  disabled={isAnimating}
                  className={`px-4 py-2 rounded-lg ${isAnimating ? 'bg-gray-600' : 'bg-pink-600 hover:bg-pink-500'}`}
                >
                  {isAnimating ? 'Running...' : 'Start DFS'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGraph}
                  disabled={isAnimating}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
                >
                  Reset
                </motion.button>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="speed">Speed:</label>
                  <input
                    id="speed"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-24"
                  />
                  <span>{speed}x</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="startNode">Start Node:</label>
                  <select
                    id="startNode"
                    value={startNode}
                    onChange={(e) => setStartNode(parseInt(e.target.value))}
                    className="bg-gray-700 rounded px-2 py-1"
                  >
                    {graph.nodes.map(node => (
                      <option key={node.id} value={node.id}>{node.id}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="relative border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-full"
                />
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Traversal Order:</h3>
                <div className="flex flex-wrap gap-2">
                  {traversalOrder.length > 0 ? (
                    traversalOrder.map((nodeId, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center"
                      >
                        {nodeId}
                      </motion.div>
                    ))
                  ) : (
                    <span className="text-gray-400">Click "Start DFS" to begin</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-pink-400">DFS Pseudocode</h2>
                <button 
                  onClick={() => setShowPseudocode(!showPseudocode)}
                  className="text-gray-400 hover:text-white"
                >
                  {showPseudocode ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showPseudocode && (
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300">
{`function DFS(graph, start):
  stack = [start]
  visited = set()
  
  while stack is not empty:
    node = stack.pop()
    
    if node not in visited:
      visited.add(node)
      process(node)  # Visit the node
      
      for neighbor in graph[node]:
        if neighbor not in visited:
          stack.push(neighbor)
`}
                  </pre>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-300 mb-2">Recursive Implementation</h3>
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300">
{`function DFS(node, visited):
  visited.add(node)
  process(node)  # Visit the node
  
  for neighbor in graph[node]:
    if neighbor not in visited:
      DFS(neighbor, visited)
`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">DFS Characteristics</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Time Complexity:</strong> O(V + E) where V is vertices and E is edges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Space Complexity:</strong> O(V) for recursion stack (worst case)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Uses:</strong> Path finding, cycle detection, topological sorting, solving mazes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Memory:</strong> More memory efficient than BFS for deep graphs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}