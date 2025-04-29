import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function GraphApplications() {
  const [activeApp, setActiveApp] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);

  const applications = [
    {
      title: "Social Networks",
      description: "Graphs model relationships in social media where users are nodes and connections are edges. Friend recommendations use graph algorithms to find connections.",
      example: {
        nodes: ['You', 'Friend 1', 'Friend 2', 'Friend 3', 'Friend of Friend', 'Celebrity', 'Colleague'],
        edges: [
          { from: 'You', to: 'Friend 1' },
          { from: 'You', to: 'Friend 2' },
          { from: 'You', to: 'Friend 3' },
          { from: 'Friend 1', to: 'Friend of Friend' },
          { from: 'Friend 2', to: 'Celebrity' },
          { from: 'Friend 3', to: 'Colleague' },
        ],
        highlight: ['You', 'Friend of Friend'],
        suggestion: "You might know Friend of Friend through Friend 1"
      }
    },
    {
      title: "Transportation Networks",
      description: "Road maps are graphs where intersections are nodes and roads are edges. Navigation apps use Dijkstra's algorithm to find shortest paths.",
      example: {
        nodes: ['Home', 'A', 'B', 'C', 'Work', 'Mall', 'Park'],
        edges: [
          { from: 'Home', to: 'A', weight: 5 },
          { from: 'A', to: 'B', weight: 3 },
          { from: 'B', to: 'Work', weight: 7 },
          { from: 'A', to: 'C', weight: 2 },
          { from: 'C', to: 'Work', weight: 4 },
          { from: 'Home', to: 'Park', weight: 6 },
          { from: 'Park', to: 'Mall', weight: 3 },
          { from: 'Mall', to: 'Work', weight: 5 },
        ],
        highlight: ['Home', 'A', 'C', 'Work'],
        suggestion: "Shortest path from Home to Work: 11 minutes"
      }
    },
    {
      title: "Web Page Ranking",
      description: "The internet is a graph where pages are nodes and links are edges. Google's PageRank algorithm scores pages based on link importance.",
      example: {
        nodes: ['Homepage', 'About', 'Products', 'Blog', 'Contact', 'External 1', 'External 2'],
        edges: [
          { from: 'Homepage', to: 'About' },
          { from: 'Homepage', to: 'Products' },
          { from: 'Homepage', to: 'Blog' },
          { from: 'About', to: 'Contact' },
          { from: 'Products', to: 'Homepage' },
          { from: 'Blog', to: 'Homepage' },
          { from: 'Blog', to: 'External 1' },
          { from: 'External 2', to: 'Homepage' },
        ],
        highlight: ['Homepage'],
        suggestion: "Homepage has highest PageRank due to most incoming links"
      }
    },
    {
      title: "Dependency Management",
      description: "Software dependencies form directed graphs. Package managers use topological sort to determine installation order.",
      example: {
        nodes: ['App', 'React', 'Vue', 'Babel', 'Webpack', 'ESLint', 'TypeScript'],
        edges: [
          { from: 'App', to: 'React' },
          { from: 'App', to: 'Webpack' },
          { from: 'React', to: 'Babel' },
          { from: 'Vue', to: 'Babel' },
          { from: 'Webpack', to: 'Babel' },
          { from: 'Webpack', to: 'ESLint' },
          { from: 'ESLint', to: 'TypeScript' },
        ],
        highlight: ['Babel', 'ESLint', 'TypeScript'],
        suggestion: "Babel must be installed before React and Webpack"
      }
    }
  ];

  const currentApp = applications[activeApp];

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
          className="w-96 h-96 bg-green-900 opacity-20 rounded-full absolute top-0 left-0"
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-600 mb-6">
            Graph Applications
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Applications List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Real-World Applications</h2>
              
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${activeApp === index ? 'bg-gray-800 border-l-4 border-green-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setActiveApp(index)}
                  >
                    <h3 className={`text-lg font-medium ${activeApp === index ? 'text-green-400' : 'text-white'}`}>
                      {app.title}
                    </h3>
                    {activeApp === index && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-gray-300 text-sm"
                      >
                        {app.description}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {currentApp.example.suggestion && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-gray-800 rounded-lg border border-green-500 border-opacity-50"
                >
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-300 text-sm">{currentApp.example.suggestion}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Interactive Visualization */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-purple-400">Example: {currentApp.title}</h2>
              
              <div className="relative h-96 bg-gray-800 rounded-xl border border-gray-700 p-4">
                {/* Graph Visualization */}
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  {/* Edges */}
                  {currentApp.example.edges.map((edge, index) => (
                    <line
                      key={index}
                      x1={getNodeX(edge.from, currentApp.example.nodes)}
                      y1={getNodeY(edge.from, currentApp.example.nodes)}
                      x2={getNodeX(edge.to, currentApp.example.nodes)}
                      y2={getNodeY(edge.to, currentApp.example.nodes)}
                      stroke={
                        currentApp.example.highlight.includes(edge.from) && 
                        currentApp.example.highlight.includes(edge.to) ? 
                        "#a78bfa" : "#4b5563"
                      }
                      strokeWidth={
                        currentApp.example.highlight.includes(edge.from) && 
                        currentApp.example.highlight.includes(edge.to) ? 
                        3 : 2
                      }
                      markerEnd={activeApp !== 1 ? "url(#arrow)" : ""}
                    />
                  ))}
                  
                  {/* Nodes */}
                  {currentApp.example.nodes.map((node) => (
                    <g 
                      key={node}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <circle
                        cx={getNodeX(node, currentApp.example.nodes)}
                        cy={getNodeY(node, currentApp.example.nodes)}
                        r="15"
                        fill={
                          hoveredNode === node ? "#3b82f6" :
                          currentApp.example.highlight.includes(node) ? "#a78bfa" : 
                          "#4b5563"
                        }
                        stroke={hoveredNode === node ? "#93c5fd" : "none"}
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                      />
                      <text
                        x={getNodeX(node, currentApp.example.nodes)}
                        y={getNodeY(node, currentApp.example.nodes)}
                        fill="white"
                        fontSize="10"
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
                      <path d="M0,0 L0,6 L9,3 z" fill="#4b5563" />
                    </marker>
                  </defs>
                </svg>
              </div>
              
              {/* Application Details */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">How Graphs Are Used</h3>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {getApplicationDetails(currentApp.title).map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/graph/topological-sorting">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous: Topological Sorting
            </motion.button>
          </Link>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              Back to Home
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
  function getNodeX(node, nodes) {
    const index = nodes.indexOf(node);
    const columnCount = Math.ceil(Math.sqrt(nodes.length));
    const col = index % columnCount;
    return `${(col + 1) * (100 / (columnCount + 1))}%`;
  }

  function getNodeY(node, nodes) {
    const index = nodes.indexOf(node);
    const columnCount = Math.ceil(Math.sqrt(nodes.length));
    const row = Math.floor(index / columnCount);
    const rowCount = Math.ceil(nodes.length / columnCount);
    return `${(row + 1) * (100 / (rowCount + 1))}%`;
  }

  function getApplicationDetails(appTitle) {
    switch(appTitle) {
      case "Social Networks":
        return [
          "Friend recommendations using BFS/DFS",
          "Community detection with connected components",
          "Influence measurement using centrality algorithms",
          "Six degrees of separation research"
        ];
      case "Transportation Networks":
        return [
          "Shortest path finding with Dijkstra's algorithm",
          "Traffic flow optimization",
          "Public transportation routing",
          "Delivery logistics planning"
        ];
      case "Web Page Ranking":
        return [
          "PageRank algorithm for search results",
          "Web crawling and indexing",
          "Link analysis for SEO",
          "Detecting important community pages"
        ];
      case "Dependency Management":
        return [
          "Topological sorting for installation order",
          "Dependency resolution",
          "Conflict detection in versioning",
          "Impact analysis for updates"
        ];
      default:
        return [];
    }
  }
}