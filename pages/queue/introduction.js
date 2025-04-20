import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QueueIntroduction() {
  return (
    <div
      className="min-h-screen flex flex-col items-center p-8"
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #001a00 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated green background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-96 h-96 bg-green-900 opacity-10 rounded-full absolute top-0 left-0"
        />
        <motion.div
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="w-64 h-64 bg-green-800 opacity-15 rounded-full absolute bottom-0 right-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl relative z-10 flex flex-col min-h-screen"
      >
        <div className="flex-grow">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-3">
              Queue Introduction
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mb-6"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-12"
          >
            <div className="flex flex-col space-y-6 text-gray-300">
              <p>
                A <span className="text-green-400 font-semibold">Queue</span> is a linear data structure that follows the <span className="text-green-400 font-semibold">First-In-First-Out (FIFO)</span> principle. 
                This means the first element added to the queue will be the first one to be removed.
              </p>
              
              <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-green-600">
                <h3 className="text-lg font-semibold text-green-300 mb-2">Real-world Analogy</h3>
                <p>Imagine a line of people waiting for a bus. The person who arrives first boards first, and new arrivals join at the end.</p>
              </div>
              
              <h3 className="text-xl font-semibold text-green-300 mt-6">Key Operations</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold">Enqueue</span> - Adds an element to the <span className="text-green-400">rear</span> (end) of the queue
                </li>
                <li>
                  <span className="font-semibold">Dequeue</span> - Removes an element from the <span className="text-green-400">front</span> of the queue
                </li>
                <li>
                  <span className="font-semibold">Peek/Front</span> - Returns the front element without removing it
                </li>
                <li>
                  <span className="font-semibold">isEmpty</span> - Checks if the queue is empty
                </li>
              </ul>

              <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white font-bold">A</div>
                      <div className="w-10 h-10 bg-green-700 rounded flex items-center justify-center text-white font-bold">B</div>
                      <div className="w-10 h-10 bg-green-800 rounded flex items-center justify-center text-white font-bold">C</div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Front → Rear
                    </div>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-green-900 px-3 py-1 rounded-full text-xs text-green-300">
                    Queue Visualization
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-green-300 mt-10">Characteristics</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Linear data structure with sequential storage</li>
                <li>Two pointers track front and rear positions</li>
                <li>Insertion and deletion happen at opposite ends</li>
                <li>No random access to elements</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Back button at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-auto py-8"
        >
          <Link href="/queue">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#15803d" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Queue Topics
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}