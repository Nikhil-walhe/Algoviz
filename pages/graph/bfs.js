import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BFS() {
  const [graph, setGraph] = useState({
    nodes: [
      { id: 0, x: 100, y: 100, visited: false, level: -1 },
      { id: 1, x: 300, y: 100, visited: false, level: -1 },
      { id: 2, x: 200, y: 200, visited: false, level: -1 },
      { id: 3, x: 400, y: 200, visited: false, level: -1 },
      { id: 4, x: 100, y: 300, visited: false, level: -1 },
      { id: 5, x: 300, y: 300, visited: false, level: -1 },
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
  const [currentFrontier, setCurrentFrontier] = useState([]);
  const canvasRef = useRef(null);

  // Color scheme for different levels
  const levelColors = [
    '#3B82F6', // Blue - Level 0
    '#10B981', // Green - Level 1
    '#F59E0B', // Yellow - Level 2
    '#EC4899', // Pink - Level 3
    '#8B5CF6', // Purple - Level 4
    '#EF4444', // Red - Level 5
  ];

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
      
      if (edge.directed) {
        drawArrowhead(ctx, fromNode.x, fromNode.y, toNode.x, toNode.y);
      }
    });
    
    // Draw nodes with level-based coloring
    graph.nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      
      // Color nodes based on their level
      if (node.visited) {
        const colorIndex = Math.min(node.level, levelColors.length - 1);
        ctx.fillStyle = levelColors[colorIndex];
      } else {
        ctx.fillStyle = '#6B7280'; // Unvisited - gray
      }
      
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
      
      // Draw level indicator if visited
      if (node.visited) {
        ctx.font = '10px Arial';
        ctx.fillText(`L${node.level}`, node.x, node.y + 30);
      }
    });
    
    // Highlight edges in current frontier
    if (currentFrontier.length > 0) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      
      currentFrontier.forEach(edge => {
        const fromNode = graph.nodes.find(n => n.id === edge.from);
        const toNode = graph.nodes.find(n => n.id === edge.to);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      });
    }
  }, [graph, currentFrontier]);

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

  const bfs = async (start) => {
    setIsAnimating(true);
    const visited = new Set();
    const queue = [{ node: start, level: 0 }];
    const order = [];
    
    // Initialize with start node
    visited.add(start);
    order.push(start);
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => 
        n.id === start ? { ...n, visited: true, level: 0 } : n
      )
    }));
    setTraversalOrder([...order]);
    await new Promise(resolve => setTimeout(resolve, 1000 / speed));
    
    while (queue.length > 0) {
      const levelSize = queue.length;
      const currentLevelEdges = [];
      
      // Process all nodes at current level
      for (let i = 0; i < levelSize; i++) {
        const { node: current, level } = queue.shift();
        
        // Get neighbors
        const neighbors = graph.edges
          .filter(edge => edge.from === current)
          .map(edge => {
            currentLevelEdges.push(edge);
            return edge.to;
          });
        
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            order.push(neighbor);
            queue.push({ node: neighbor, level: level + 1 });
            
            // Update visualization for this neighbor
            setGraph(prev => ({
              ...prev,
              nodes: prev.nodes.map(n => 
                n.id === neighbor ? { ...n, visited: true, level: level + 1 } : n
              )
            }));
            setTraversalOrder([...order]);
            
            // Highlight current frontier edges
            setCurrentFrontier(
              graph.edges.filter(e => 
                visited.has(e.from) && 
                !visited.has(e.to) && 
                currentLevelEdges.some(ce => ce.from === e.from && ce.to === e.to)
              )
            );
            
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
          }
        }
      }
      
      // Clear frontier after processing level
      setCurrentFrontier([]);
      await new Promise(resolve => setTimeout(resolve, 500 / speed));
    }
    
    setIsAnimating(false);
  };

  const resetGraph = () => {
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => ({ ...n, visited: false, level: -1 }))
    }));
    setTraversalOrder([]);
    setCurrentFrontier([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/graph">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 px-6 py-2 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-3">
            Breadth First Search (BFS)
          </h1>
          <p className="text-lg text-gray-300">
            Explores all neighbor nodes at the present depth before moving to nodes at the next depth level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Interactive Visualization</h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => bfs(startNode)}
                  disabled={isAnimating}
                  className={`px-4 py-2 rounded-lg ${isAnimating ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}`}
                >
                  {isAnimating ? 'Running...' : 'Start BFS'}
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
                <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-90 px-3 py-1 rounded text-sm">
                  {traversalOrder.length > 0 ? (
                    <span>Current Level: {graph.nodes.find(n => n.id === traversalOrder[traversalOrder.length - 1])?.level}</span>
                  ) : (
                    <span>Not started</span>
                  )}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Traversal Order:</h3>
                  <div className="flex flex-wrap gap-2">
                    {traversalOrder.length > 0 ? (
                      traversalOrder.map((nodeId, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: levelColors[
                              Math.min(graph.nodes.find(n => n.id === nodeId)?.level || 0, 
                              levelColors.length - 1)
                            ] 
                          }}
                        >
                          {nodeId}
                        </motion.div>
                      ))
                    ) : (
                      <span className="text-gray-400">Click "Start BFS" to begin</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Level Colors:</h3>
                  <div className="flex flex-wrap gap-2">
                    {levelColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm">Level {index}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-400">BFS Algorithm</h2>
                <button 
                  onClick={() => setShowPseudocode(!showPseudocode)}
                  className="text-gray-400 hover:text-white"
                >
                  {showPseudocode ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showPseudocode && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Standard BFS:</h3>
                    <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre className="text-gray-300">
{`function BFS(graph, start):
  queue = [start]
  visited = set([start])
  
  while queue:
    node = queue.pop(0)
    process(node)
    
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append(neighbor)
`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Level Tracking BFS:</h3>
                    <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre className="text-gray-300">
{`function BFSLevelOrder(graph, start):
  queue = [(start, 0)]  # (node, level)
  visited = set([start])
  
  while queue:
    node, level = queue.pop(0)
    process(node, level)
    
    for neighbor in graph[node]:
      if neighbor not in visited:
        visited.add(neighbor)
        queue.append((neighbor, level + 1))
`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">Key Features</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Level-by-level:</strong> Visits all nodes at current depth before moving deeper</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Shortest Path:</strong> Finds shortest path in unweighted graphs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Queue-based:</strong> Uses FIFO queue to manage nodes to visit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Applications:</strong> Social networks, web crawling, GPS navigation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}