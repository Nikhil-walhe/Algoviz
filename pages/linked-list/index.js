import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LinkedList() {
  const linkedListTypes = [
    { name: 'Singly Linked List', link: '/linked-list/singly' },
    { name: 'Doubly Linked List', link: '/linked-list/doubly' },
    { name: 'Circular Linked List', link: '/linked-list/circular' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-950">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-12 tracking-tight"
      >
        Linked List Visualizer
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {linkedListTypes.map((type, index) => (
          <Link key={index} href={type.link} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: "backOut"
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="h-56 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden relative group-hover:border-purple-900 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-900/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 opacity-80" />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                  {type.name}
                </h2>
                <p className="mt-2 text-sm text-gray-400 group-hover:text-purple-200 transition-colors">
                  Visualize implementation
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        ))}
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-gray-500 text-sm"
      >
        Select a linked list type to visualize
      </motion.p>
    </div>
  );
}