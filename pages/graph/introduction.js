import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GraphIntroduction() {
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
          className="w-64 h-64 bg-pink-800 opacity-30 rounded-full absolute bottom-0 right-0"
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
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-6">
            Introduction to Graphs
          </h1>
          
          <div className="space-y-6 text-gray-300">
            <p>
              A graph is a non-linear data structure consisting of nodes (vertices) and edges that connect these nodes. 
              Graphs are used to represent networks like social connections, computer networks, or road maps.
            </p>
            
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-pink-500">
              <h3 className="text-xl font-semibold text-pink-400 mb-2">Key Characteristics:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Vertices (nodes) represent entities</li>
                <li>Edges represent relationships between entities</li>
                <li>Can be directed or undirected</li>
                <li>Can be weighted or unweighted</li>
                <li>Can be cyclic or acyclic</li>
              </ul>
            </div>
            
            <div className="flex justify-center my-8">
              <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
                <h3 className="text-center text-xl font-semibold text-pink-400 mb-4">Simple Graph Visualization</h3>
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center">A</div>
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center">B</div>
                  <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center">C</div>
                </div>
                <div className="flex justify-between px-4 mt-2">
                  <div className="h-1 w-16 bg-pink-400 mt-5"></div>
                  <div className="h-1 w-16 bg-pink-400 mt-5"></div>
                </div>
                <div className="text-center mt-4 text-sm text-gray-400">
                  A simple undirected graph with 3 nodes and 2 edges
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <div>
            {/* Previous button disabled since this is the first page */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
              disabled
            >
              Previous
            </motion.button>
          </div>
          
          <Link href="/graph/terminologies">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#9d174d" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-pink-700 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2"
            >
              Next: Graph Terminologies
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