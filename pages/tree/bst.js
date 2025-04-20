import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const BSTVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [traversalResult, setTraversalResult] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [message, setMessage] = useState('Enter numbers to build your Binary Search Tree');
  const [insertionPath, setInsertionPath] = useState([]);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });

  const config = {
    nodeRadius: 24,
    verticalSpacing: 80,
    horizontalSpacing: 120,
    animationDuration: 0.5,
    pathStrokeWidth: 2,
    highlightGlowRadius: 8,
    padding: 40
  };

  class BSTNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = 0;
      this.y = 0;
      this.id = Math.random().toString(36).substr(2, 9);
      this.height = 1; // Added for consistency with AVL layout
    }
  }

  const calculateTreeBounds = (node) => {
    if (!node) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const left = calculateTreeBounds(node.left);
    const right = calculateTreeBounds(node.right);

    return {
      minX: Math.min(node.x - config.nodeRadius, left.minX, right.minX),
      maxX: Math.max(node.x + config.nodeRadius, left.maxX, right.maxX),
      minY: Math.min(node.y - config.nodeRadius, left.minY, right.minY),
      maxY: Math.max(node.y + config.nodeRadius, left.maxY, right.maxY)
    };
  };

  const calculatePositions = (node, x, y, level) => {
    if (!node) return;

    const horizontalSpacing = config.horizontalSpacing / Math.pow(1.2, level);
    node.x = x;
    node.y = y;

    if (node.left) {
      calculatePositions(node.left, x - horizontalSpacing, y + config.verticalSpacing, level + 1);
    }
    if (node.right) {
      calculatePositions(node.right, x + horizontalSpacing, y + config.verticalSpacing, level + 1);
    }
  };

  const fitTreeToView = () => {
    if (!tree || !containerRef.current) return;

    calculatePositions(tree, 0, config.nodeRadius + config.padding, 0);

    const bounds = calculateTreeBounds(tree);
    const treeWidth = bounds.maxX - bounds.minX;
    const treeHeight = bounds.maxY - bounds.minY;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const scaleX = (containerWidth - config.padding * 2) / treeWidth;
    const scaleY = (containerHeight - config.padding * 2) / treeHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    const translateX = (containerWidth - treeWidth * scale) / 2 - bounds.minX * scale;
    const translateY = (containerHeight - treeHeight * scale) / 2 - bounds.minY * scale;

    setTransform({
      scale,
      translateX,
      translateY
    });
  };

  useEffect(() => {
    fitTreeToView();
  }, [tree]);

  useEffect(() => {
    const handleResize = () => {
      fitTreeToView();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tree]);

  const insert = async (value) => {
    if (!value.trim()) {
      setMessage('Please enter a valid number');
      return;
    }

    const num = parseInt(value);
    if (isNaN(num)) {
      setMessage('Please enter a valid number');
      return;
    }

    setInputValue('');
    setMessage(`Adding node with value ${num}...`);
    setInsertionPath([]);

    const insertHelper = (node, value, parent = null, direction = null) => {
      if (!node) {
        const newNode = new BSTNode(value);
        setInsertionPath(prev => [...prev, { node: newNode, parent, direction }]);
        return newNode;
      }

      setInsertionPath(prev => [...prev, { node, parent, direction }]);

      if (value < node.value) {
        node.left = insertHelper(node.left, value, node, 'left');
      } else if (value > node.value) {
        node.right = insertHelper(node.right, value, node, 'right');
      } else {
        return node; // Duplicates not allowed
      }

      return node;
    };

    const newTree = tree ? JSON.parse(JSON.stringify(tree)) : null;
    const updatedTree = insertHelper(newTree, num);
    setTree(updatedTree);
    
    await controls.start({
      opacity: [0, 1, 0],
      transition: { duration: 2 / animationSpeed, times: [0, 0.2, 1] }
    });
    
    setInsertionPath([]);
    setMessage(`Added node with value ${num}`);
  };

  const renderTree = () => {
    if (!tree) return null;

    const renderNode = (node) => {
      if (!node) return null;

      const nodeFill = activeNode?.id === node.id ? "#fbbf24" : "#f59e0b";
      const nodeStroke = "#b45309";
      const connectionColor = "#f59e0b";

      return (
        <g key={node.id}>
          {node.left && (
            <motion.path
              d={`M ${node.x} ${node.y + config.nodeRadius} 
                  Q ${(node.x + node.left.x) / 2} ${node.y + config.verticalSpacing / 2}
                  ${node.left.x} ${node.left.y - config.nodeRadius}`}
              stroke={connectionColor}
              strokeWidth={config.pathStrokeWidth}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: config.animationDuration / animationSpeed }}
            />
          )}
          {node.right && (
            <motion.path
              d={`M ${node.x} ${node.y + config.nodeRadius} 
                  Q ${(node.x + node.right.x) / 2} ${node.y + config.verticalSpacing / 2}
                  ${node.right.x} ${node.right.y - config.nodeRadius}`}
              stroke={connectionColor}
              strokeWidth={config.pathStrokeWidth}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: config.animationDuration / animationSpeed }}
            />
          )}

          {renderNode(node.left)}
          {renderNode(node.right)}

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20,
              duration: config.animationDuration / animationSpeed
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveNode(node)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={config.nodeRadius}
              fill={nodeFill}
              stroke={nodeStroke}
              strokeWidth="2"
              filter={activeNode?.id === node.id ? "url(#glow)" : ""}
            />
            <text
              x={node.x}
              y={node.y + 6}
              textAnchor="middle"
              fill="#1f2937"
              fontWeight="bold"
              fontSize="14"
            >
              {node.value}
            </text>
          </motion.g>
        </g>
      );
    };

    return (
      <g transform={`translate(${transform.translateX}, ${transform.translateY}) scale(${transform.scale})`}>
        {renderNode(tree)}
      </g>
    );
  };

  const traverse = async (type) => {
    if (!tree) {
      setMessage('Tree is empty. Add some nodes first.');
      return;
    }

    setMessage(`Performing ${type} traversal...`);
    setTraversalResult([]);
    setActiveNode(null);

    const result = [];
    const traverseNode = async (node) => {
      if (!node) return;

      if (type === 'preorder') {
        result.push(node.value);
        setTraversalResult([...result]);
        setActiveNode(node);
        await new Promise(resolve => setTimeout(resolve, 500 / animationSpeed));
      }

      await traverseNode(node.left);

      if (type === 'inorder') {
        result.push(node.value);
        setTraversalResult([...result]);
        setActiveNode(node);
        await new Promise(resolve => setTimeout(resolve, 500 / animationSpeed));
      }

      await traverseNode(node.right);

      if (type === 'postorder') {
        result.push(node.value);
        setTraversalResult([...result]);
        setActiveNode(node);
        await new Promise(resolve => setTimeout(resolve, 500 / animationSpeed));
      }
    };

    await traverseNode(tree);
    setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} traversal complete: ${result.join(', ')}`);
    setActiveNode(null);
  };

  const clearTree = () => {
    setTree(null);
    setTraversalResult([]);
    setActiveNode(null);
    setMessage('Tree cleared. Enter numbers to build a new BST.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Binary Search Tree Visualizer</h1>
            <p className="text-yellow-200">Standard binary search tree without balancing</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Controls and Traversals */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-yellow-300 text-lg mb-4">Tree Traversals</h3>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => traverse('inorder')}
                  className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg text-left"
                >
                  Inorder Traversal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => traverse('preorder')}
                  className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg text-left"
                >
                  Preorder Traversal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => traverse('postorder')}
                  className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg text-left"
                >
                  Postorder Traversal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearTree}
                  className="bg-red-700 hover:bg-red-600 text-white px-4 py-3 rounded-lg"
                >
                  Clear Tree
                </motion.button>
              </div>

              <div className="mt-6">
                <label className="text-yellow-300 block mb-2">Animation Speed:</label>
                <select 
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full"
                >
                  <option value={0.5}>Slow</option>
                  <option value={1}>Normal</option>
                  <option value={2}>Fast</option>
                  <option value={4}>Very Fast</option>
                </select>
              </div>
            </div>

            {traversalResult.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-yellow-300 text-lg mb-2">Traversal Result</h3>
                <div className="flex flex-wrap gap-2">
                  {traversalResult.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-900 text-green-100 px-3 py-1 rounded-full text-sm"
                    >
                      {value}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {insertionPath.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-yellow-300 text-lg mb-2">Insertion Path</h3>
                <div className="flex flex-wrap gap-2">
                  {insertionPath.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm"
                    >
                      {step.node.value}{step.direction ? ` (${step.direction})` : ''}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Visualizer */}
          <div className="w-full lg:w-3/4">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-full">
              <div 
                ref={containerRef}
                className="relative overflow-hidden"
                style={{ height: '600px' }}
              >
                <svg 
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                >
                  <defs>
                    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation={config.highlightGlowRadius} result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {renderTree()}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Input and Status */}
        <div className="mt-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 / animationSpeed }}
                className="text-yellow-300 text-lg mb-4"
              >
                {message}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-wrap gap-6 items-end">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-yellow-300 mb-2">Node Value</label>
                <div className="flex">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && insert(inputValue)}
                    className="bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-1"
                    placeholder="Enter a number"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => insert(inputValue)}
                    className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-r-lg"
                  >
                    Add Node
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BSTVisualizer;