import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function GraphTerminologies() {
  const [activeTerm, setActiveTerm] = useState(null);

  const terminologies = [
    { 
      term: "Vertex (Node)", 
      definition: "A fundamental unit of which graphs are formed. Represents an entity.",
      color: "bg-pink-500",
      position: "top-20 left-1/4"
    },
    { 
      term: "Edge", 
      definition: "A connection between two vertices. Represents a relationship.",
      color: "bg-purple-500",
      position: "top-40 right-1/4"
    },
    { 
      term: "Directed Graph", 
      definition: "A graph where edges have direction (one-way relationships).",
      color: "bg-blue-500",
      position: "bottom-40 left-1/3"
    },
    { 
      term: "Undirected Graph", 
      definition: "A graph where edges have no direction (two-way relationships).",
      color: "bg-green-500",
      position: "bottom-20 right-1/3"
    },
    { 
      term: "Weighted Graph", 
      definition: "A graph where edges have numerical values (weights) associated with them.",
      color: "bg-yellow-500",
      position: "top-1/2 left-1/2"
    },
  ];

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
          className="w-96 h-96 bg-pink-900 opacity-20 rounded-full absolute top-0 left-0"
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Graph Terminologies
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Terminology List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">Key Terms</h2>
              <div className="space-y-3">
                {terminologies.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${activeTerm === index ? 'bg-gray-800 border-l-4 border-pink-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setActiveTerm(index)}
                  >
                    <h3 className={`text-lg font-medium ${activeTerm === index ? 'text-pink-400' : 'text-white'}`}>
                      {item.term}
                    </h3>
                    {activeTerm === index && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-gray-300"
                      >
                        {item.definition}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Visualization */}
            <div className="relative h-96 bg-gray-800 rounded-xl border border-gray-700 p-4">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4 text-center">Interactive Graph</h2>
              
              {/* Graph Visualization */}
              <div className="relative w-full h-full">
                {/* Sample Graph Visualization */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Nodes */}
                  <div className="relative">
                    <div 
                      className={`w-12 h-12 rounded-full ${activeTerm === 0 ? 'bg-pink-600 ring-4 ring-pink-300' : 'bg-pink-700'} flex items-center justify-center absolute -top-6 -left-6 cursor-pointer`}
                      onClick={() => setActiveTerm(0)}
                    >
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div 
                      className={`w-12 h-12 rounded-full ${activeTerm === 0 ? 'bg-pink-600 ring-4 ring-pink-300' : 'bg-pink-700'} flex items-center justify-center absolute -top-6 right-6 cursor-pointer`}
                      onClick={() => setActiveTerm(0)}
                    >
                      <span className="text-white font-bold">B</span>
                    </div>
                    <div 
                      className={`w-12 h-12 rounded-full ${activeTerm === 0 ? 'bg-pink-600 ring-4 ring-pink-300' : 'bg-pink-700'} flex items-center justify-center absolute bottom-6 left-6 cursor-pointer`}
                      onClick={() => setActiveTerm(0)}
                    >
                      <span className="text-white font-bold">C</span>
                    </div>
                    <div 
                      className={`w-12 h-12 rounded-full ${activeTerm === 0 ? 'bg-pink-600 ring-4 ring-pink-300' : 'bg-pink-700'} flex items-center justify-center absolute bottom-6 right-6 cursor-pointer`}
                      onClick={() => setActiveTerm(0)}
                    >
                      <span className="text-white font-bold">D</span>
                    </div>

                    {/* Edges */}
                    <svg width="200" height="200" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {/* Undirected edge */}
                      <line 
                        x1="50" y1="50" x2="150" y2="50" 
                        stroke={activeTerm === 1 || activeTerm === 3 ? "#a78bfa" : "#6b7280"} 
                        strokeWidth={activeTerm === 1 || activeTerm === 3 ? "4" : "2"} 
                        markerEnd={activeTerm === 3 ? "" : "url(#arrow)"}
                      />
                      {/* Directed edge */}
                      <line 
                        x1="150" y1="50" x2="150" y2="150" 
                        stroke={activeTerm === 1 || activeTerm === 2 ? "#93c5fd" : "#6b7280"} 
                        strokeWidth={activeTerm === 1 || activeTerm === 2 ? "4" : "2"} 
                        markerEnd="url(#arrow)"
                      />
                      {/* Weighted edge */}
                      <line 
                        x1="50" y1="150" x2="150" y2="150" 
                        stroke={activeTerm === 1 || activeTerm === 4 ? "#fcd34d" : "#6b7280"} 
                        strokeWidth={activeTerm === 1 || activeTerm === 4 ? "4" : "2"} 
                      />
                      <text 
                        x="100" y="170" 
                        fill={activeTerm === 4 ? "#fcd34d" : "#6b7280"} 
                        textAnchor="middle"
                        fontWeight={activeTerm === 4 ? "bold" : "normal"}
                      >
                        {activeTerm === 4 ? "Weight: 5" : "5"}
                      </text>
                      
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill={activeTerm === 2 ? "#93c5fd" : "#6b7280"} />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-80 p-2 rounded-lg text-xs">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-pink-600 mr-2 rounded-full"></div>
                    <span>Vertex/Node</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-0.5 bg-purple-500 mr-2"></div>
                    <span>Edge</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-0.5 bg-blue-500 mr-2"></div>
                    <span>Directed Edge</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-0.5 bg-yellow-500 mr-2"></div>
                    <span>Weighted Edge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/graph/introduction">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous: Introduction
            </motion.button>
          </Link>
          
          <Link href="/graph/dfs">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              Next: Depth First Search (DFS)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}