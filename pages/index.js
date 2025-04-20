import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function AlgoViz() {
  const dataStructures = [
    { 
      name: 'Linked List', 
      description: 'Linear data structure where elements are linked using pointers.',
      icon: '🔗',
      link: '/linked-list',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Tree', 
      description: 'Hierarchical structure with nodes and edges, perfect for representing hierarchical data.',
      icon: '🌲',
      link: '/tree',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      name: 'Stack', 
      description: 'LIFO (Last In First Out) data structure for managing ordered elements.',
      icon: '📚',
      link: '/stack',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Graph', 
      description: 'Non-linear structure showing relationships between objects.',
      icon: '🕸',
      link: '/graph',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      name: 'Queue', 
      description: 'FIFO (First In First Out) data structure for sequential processing.',
      icon: '📯',
      link: '/queue',
      color: 'from-emerald-500 to-teal-500'
    },
  ];

  const features = [
    {
      title: "Interactive Animations",
      description: "Watch algorithms come to life with smooth, step-by-step visualizations.",
      icon: "👁️"
    },
    {
      title: "Code Integration",
      description: "See the actual implementation alongside the visualization!",
      icon: "💻"
    },
    {
      title: "Performance Metrics",
      description: "Analyze time and space complexity in real-time.",
      icon: "⏱️"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        {/* Header/Nav */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            AlgoViz
          </motion.div>
          
          <Link href="/get-started" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400"
          >
            Visualize Data Structure in Action
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto"
          >
            Experience data structures and algorithms through interactive visualizations. Perfect for learning, teaching, and mastering computer science concepts.
          </motion.p>
        </motion.div>

        {/* Data Structures Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {dataStructures.map((ds, index) => (
            <Link href={ds.link} key={index} passHref>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + index * 0.1, 
                  duration: 0.5
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer border border-white/10 hover:border-transparent hover:shadow-${ds.color.split(' ')[1]}/20 transition-all group`}
              >
                <div className={`text-5xl mb-4 bg-gradient-to-r ${ds.color} bg-clip-text text-transparent`}>
                  {ds.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{ds.name}</h3>
                <p className="text-purple-100 text-sm">{ds.description}</p>
                <div className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-sm font-medium group-hover:opacity-100 opacity-0 transition-opacity">
                  Visualize now →
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-12"
        />

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-3xl font-bold text-white mb-4 inline-block"
            >
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">AlgoViz</span>?
            </motion.h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Powerful features that make learning algorithms intuitive and engaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <div className="text-5xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-purple-100 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="w-full py-8 border-t border-purple-800/50 mt-12"
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-purple-300 mb-4 md:mb-0 text-sm">
              © {new Date().getFullYear()} AlgoViz. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}