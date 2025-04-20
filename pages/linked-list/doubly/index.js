import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DoublyLinkedList() {
  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      rotate: -5
    },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.1,
      boxShadow: "0 0 20px 10px rgba(192, 132, 252, 0.5)",
      background: [
        "linear-gradient(45deg, #8b5cf6, #ec4899)",
        "linear-gradient(135deg, #ec4899, #3b82f6)",
        "linear-gradient(225deg, #3b82f6, #10b981)",
        "linear-gradient(315deg, #10b981, #8b5cf6)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttons = [
    { name: "Construction", link: "/linked-list/doubly/construction" },
    { name: "Insertion", link: "/linked-list/doubly/insertion" },
    { name: "Deletion", link: "/linked-list/doubly/deletion" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Main title with animation */}
      <motion.h1
        initial={{ opacity: 0, y: -100, scale: 1.5 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          textShadow: [
            "0 0 10px rgba(139, 92, 246, 0.5)",
            "0 0 20px rgba(236, 72, 153, 0.5)",
            "0 0 30px rgba(59, 130, 246, 0.5)",
            "0 0 10px rgba(139, 92, 246, 0.5)"
          ]
        }}
        transition={{
          y: { type: "spring", stiffness: 100 },
          textShadow: {
            duration: 5,
            repeat: Infinity
          }
        }}
        className="text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400"
      >
        DOUBLY LINKED LIST
      </motion.h1>

      <div className="flex flex-col gap-8 relative z-10">
        {buttons.map((button, i) => (
          <Link key={i} href={button.link} passHref>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={i}
              className="px-12 py-6 rounded-full text-2xl font-bold text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(45deg, #8b5cf6, #ec4899)"
              }}
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                {button.name}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{
                  opacity: 0.2,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.button>
          </Link>
        ))}
      </div>

      {/* Floating nodes animation */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-purple-400"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}