import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Stack() {
  const stackTopics = [
    { name: 'Introduction', link: '/stack/introduction' },
    { name: 'ADT of Stack', link: '/stack/adt' },
    { name: 'Operations on Stack', link: '/stack/operations' },
    { name: 'Array Implementation', link: '/stack/array-implementation' },
    { name: 'Stack Using Linked List', link: '/stack/stack-list' },
    { name: 'Applications', link: '/stack/applications' },
    { name: 'Infix to Postfix Conversion', link: '/stack/infix-to-postfix' },
    { name: 'Recursion using Stack', link: '/stack/recursion' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8"
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #00001a 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blue animated background elements */}
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
          className="w-64 h-64 bg-blue-800 opacity-30 rounded-full absolute bottom-0 right-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative z-10"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 px-6 py-2 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-3">
            Stack Explorer
          </h1>
          <p className="text-xl text-gray-300">
            Visualize and master stack data structures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackTopics.map((topic, index) => (
            <Link key={index} href={topic.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-gray-900 bg-opacity-80 rounded-xl border border-gray-800 hover:border-blue-500 transition-all cursor-pointer p-6 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-4">
                      <span className="text-blue-400 font-bold">{index + 1}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-blue-100 group-hover:text-white transition-colors">
                      {topic.name}
                    </h2>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Explore {topic.name.toLowerCase()} with interactive visualizations
                  </p>
                  <div className="mt-4 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center transform group-hover:translate-x-2 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}