import { motion } from 'framer-motion';

export default function Introduction() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-400 to-blue-500 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Cloud and Wind Effects */}
      <div className="absolute inset-0">
        {/* Realistic Cloud Shape */}
        <div className="absolute bg-white opacity-80 w-[600px] h-[300px] rounded-full top-10 shadow-md transform scale-100">
          <div className="absolute bg-white opacity-90 w-[400px] h-[200px] rounded-full -top-12 -left-16"></div>
          <div className="absolute bg-white opacity-90 w-[450px] h-[220px] rounded-full -top-6 right-12"></div>
          <div className="absolute bg-white opacity-90 w-[350px] h-[180px] rounded-full top-16 left-10"></div>
        </div>

        {/* Curved Wind Lines */}
        <div className="absolute w-64 h-1 bg-white opacity-50 rounded-full top-20 left-0 animate-[wind-move-curve_4s_linear_infinite]"></div>
        <div className="absolute w-48 h-1 bg-white opacity-50 rounded-full top-32 left-10 animate-[wind-move-curve_5s_linear_infinite]"></div>
        <div className="absolute w-56 h-1 bg-white opacity-50 rounded-full bottom-16 right-10 animate-[wind-move-curve_6s_linear_infinite]"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8 relative z-10"
      >
        Introduction to Stack
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl relative z-10"
      >
        <p className="text-gray-800">
          A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means the last element added to the stack will be the first one to be removed.
        </p>
        <p className="text-gray-800 mt-4">
          Common operations on a stack include:
          <ul className="list-disc list-inside mt-2">
            <li>Push: Add an element to the top of the stack.</li>
            <li>Pop: Remove the top element from the stack.</li>
            <li>Peek: View the top element without removing it.</li>
            <li>isEmpty: Check if the stack is empty.</li>
          </ul>
        </p>
      </motion.div>

      <style jsx>{`
        @keyframes wind-move-curve {
          0% {
            transform: translateX(-100%) translateY(10px);
          }
          50% {
            transform: translateX(0%) translateY(-10px);
          }
          100% {
            transform: translateX(100%) translateY(10px);
          }
        }
      `}</style>
    </div>
  );
}
