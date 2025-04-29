import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function TopologicalSorting() {
  const [step, setStep] = useState(0);
  const [sortedNodes, setSortedNodes] = useState([]);
  const [activeNode, setActiveNode] = useState(null);

  // Sample DAG (Directed Acyclic Graph) for topological sort
  const graph = {
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    edges: [
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'E' },
      { from: 'D', to: 'F' },
      { from: 'E', to: 'F' },
    ],
    inDegree: { 'A': 0, 'B': 0, 'C': 2, 'D': 1, 'E': 1, 'F': 2 }
  };

  const resetVisualization = () => {
    setStep(0);
    setSortedNodes([]);
    setActiveNode(null);
  };

  const performNextStep = () => {
    if (step === 0) {
      // Find nodes with zero in-degree (no incoming edges)
      const zeroInDegreeNodes = graph.nodes.filter(node => graph.inDegree[node] === 0);
      setActiveNode(zeroInDegreeNodes[0]);
      setStep(1);
    } else if (step === 1) {
      // Add to sorted list and remove from graph
      setSortedNodes([...sortedNodes, activeNode]);
      
      // Update in-degrees of neighbors (simulate edge removal)
      const neighbors = graph.edges
        .filter(edge => edge.from === activeNode)
        .map(edge => edge.to);
      
      neighbors.forEach(node => {
        graph.inDegree[node]--;
      });
      
      setActiveNode(null);
      setStep(0);
    }
  };

  const isSorted = sortedNodes.length === graph.nodes.length;

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8"
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #1a001a 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-96 h-96 bg-blue-900 opacity-20 rounded-full absolute top-0 left-0"
        />
        <motion.div
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="w-64 h-64 bg-purple-800 opacity-30 rounded-full absolute bottom-0 right-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative z-10"
      >
        {/* Navigation Back Button */}
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

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 bg-gray-900 bg-opacity-80 rounded-xl p-8 border border-gray-800"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
            Topological Sorting
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Explanation */}
            <div className="space-y-6 text-gray-300">
              <p>
                Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) 
                where for every directed edge u → v, vertex u comes before v in the ordering.
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Algorithm Steps:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Identify nodes with no incoming edges (in-degree = 0)</li>
                  <li>Add one of these nodes to the sorted list</li>
                  <li>Remove the node and its outgoing edges from the graph</li>
                  <li>Repeat until all nodes are sorted</li>
                </ol>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Applications:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Task scheduling</li>
                  <li>Course prerequisites</li>
                  <li>Build system dependencies</li>
                  <li>Event processing</li>
                </ul>
              </div>
            </div>

            {/* Interactive Visualization */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-blue-400">Interactive Visualization</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetVisualization}
                  className="px-4 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm"
                >
                  Reset
                </motion.button>
              </div>
              
              <div className="relative h-64 bg-gray-800 rounded-xl border border-gray-700 p-4">
                {/* Graph Visualization */}
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  {/* Edges */}
                  {graph.edges.map((edge, index) => (
                    <line
                      key={index}
                      x1={getNodeX(edge.from)}
                      y1={getNodeY(edge.from)}
                      x2={getNodeX(edge.to)}
                      y2={getNodeY(edge.to)}
                      stroke={sortedNodes.includes(edge.from) ? "#4f46e5" : "#6b7280"}
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  ))}
                  
                  {/* Nodes */}
                  {graph.nodes.map((node, index) => (
                    <g key={node} onClick={() => setActiveNode(node)}>
                      <circle
                        cx={getNodeX(node)}
                        cy={getNodeY(node)}
                        r="15"
                        fill={
                          activeNode === node ? "#3b82f6" :
                          sortedNodes.includes(node) ? "#6366f1" : 
                          graph.inDegree[node] === 0 ? "#10b981" : "#6b7280"
                        }
                        stroke={activeNode === node ? "#93c5fd" : "none"}
                        strokeWidth="2"
                        className="cursor-pointer"
                      />
                      <text
                        x={getNodeX(node)}
                        y={getNodeY(node)}
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {node}
                      </text>
                    </g>
                  ))}
                  
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
                    </marker>
                  </defs>
                </svg>
              </div>
              
              {/* Sorting Steps */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-purple-400">Sorting Progress</h3>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={performNextStep}
                    disabled={isSorted}
                    className={`px-4 py-2 rounded-lg text-white text-sm ${isSorted ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600'}`}
                  >
                    {step === 0 ? 'Find Next Node' : 'Add to Sorted List'}
                  </motion.button>
                </div>
                
                {sortedNodes.length > 0 ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Sorted order:</span>
                    <div className="flex space-x-2">
                      {sortedNodes.map((node, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold"
                        >
                          {node}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Click "Find Next Node" to start topological sort</p>
                )}
                
                {isSorted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-green-400 font-medium"
                  >
                    Topological sort completed!
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/graph/bfs">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous: BFS
            </motion.button>
          </Link>
          
          <Link href="/graph/applications">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              Next: Graph Applications
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );

  // Helper functions for node positioning
  function getNodeX(node) {
    const positions = {
      'A': '20%', 'B': '40%', 'C': '60%', 
      'D': '30%', 'E': '70%', 'F': '50%'
    };
    return positions[node];
  }

  function getNodeY(node) {
    const positions = {
      'A': '30%', 'B': '30%', 'C': '50%', 
      'D': '70%', 'E': '70%', 'F': '90%'
    };
    return positions[node];
  }
}