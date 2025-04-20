import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const BTreeVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Enter numbers to build your B-Tree');
  const [activeNodes, setActiveNodes] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [degree, setDegree] = useState(3);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });

  const config = {
    nodeWidth: 100,
    nodeHeight: 60,
    verticalSpacing: 100,
    horizontalSpacing: 40,
    animationDuration: 0.5,
    highlightGlowRadius: 8,
    padding: 40,
    nodePadding: 10,
    keyRadius: 12
  };

  class BTreeNode {
    constructor(leaf = true) {
      this.keys = [];
      this.children = [];
      this.leaf = leaf;
      this.x = 0;
      this.y = 0;
      this.id = Math.random().toString(36).substr(2, 9);
      this.width = 0; // Track subtree width
    }
  }

  class BTree {
    constructor(degree) {
      this.root = new BTreeNode(true);
      this.degree = degree;
      this.minKeys = Math.ceil(degree / 2) - 1;
      this.maxKeys = degree - 1;
    }

    insert(key) {
      const root = this.root;
      
      if (root.keys.length === this.maxKeys) {
        const newRoot = new BTreeNode(false);
        newRoot.children.push(this.root);
        this.splitChild(newRoot, 0);
        this.root = newRoot;
        this.insertNonFull(newRoot, key);
      } else {
        this.insertNonFull(root, key);
      }
    }

    insertNonFull(node, key) {
      let i = node.keys.length - 1;
      
      if (node.leaf) {
        // Insert key into leaf node
        while (i >= 0 && key < node.keys[i]) {
          i--;
        }
        node.keys.splice(i + 1, 0, key);
      } else {
        // Find the child to insert into
        while (i >= 0 && key < node.keys[i]) {
          i--;
        }
        i++;
        
        // Check if child is full
        if (node.children[i].keys.length === this.maxKeys) {
          this.splitChild(node, i);
          if (key > node.keys[i]) {
            i++;
          }
        }
        this.insertNonFull(node.children[i], key);
      }
    }

    splitChild(parent, childIndex) {
      const child = parent.children[childIndex];
      const newChild = new BTreeNode(child.leaf);
      const midIndex = Math.floor((child.keys.length - 1) / 2);
      const midKey = child.keys[midIndex];
      
      // Split keys
      newChild.keys = child.keys.splice(midIndex + 1);
      child.keys.pop(); // Remove the mid key that will move up
      
      // Split children if not leaf
      if (!child.leaf) {
        newChild.children = child.children.splice(midIndex + 1);
      }
      
      // Insert mid key into parent
      parent.keys.splice(childIndex, 0, midKey);
      parent.children.splice(childIndex + 1, 0, newChild);
    }
  }

  const deepCopyTree = (tree) => {
    if (!tree) return null;
    const newTree = new BTree(tree.degree);
    newTree.root = deepCopyNode(tree.root);
    return newTree;
  };

  const deepCopyNode = (node) => {
    if (!node) return null;
    
    const newNode = new BTreeNode(node.leaf);
    newNode.keys = [...node.keys];
    newNode.children = node.children.map(child => deepCopyNode(child));
    newNode.x = node.x;
    newNode.y = node.y;
    newNode.width = node.width;
    newNode.id = node.id;
    
    return newNode;
  };

  const calculateSubtreeWidth = (node) => {
    if (node.children.length === 0) {
      node.width = config.nodeWidth;
      return node.width;
    }
    
    let totalWidth = 0;
    node.children.forEach(child => {
      totalWidth += calculateSubtreeWidth(child);
    });
    
    // Add spacing between children
    totalWidth += Math.max(0, node.children.length - 1) * config.horizontalSpacing;
    
    node.width = Math.max(config.nodeWidth, totalWidth);
    return node.width;
  };

  const calculatePositions = (node, x, y, level) => {
    if (!node) return;

    node.x = x;
    node.y = y;

    if (node.children.length === 0) return;

    // Calculate positions for children
    let currentX = x - node.width / 2;
    node.children.forEach(child => {
      const childX = currentX + child.width / 2;
      const childY = y + config.verticalSpacing;
      calculatePositions(child, childX, childY, level + 1);
      currentX += child.width + config.horizontalSpacing;
    });
  };

  const calculateTreeBounds = (node) => {
    if (!node) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const bounds = {
      minX: node.x - config.nodeWidth / 2,
      maxX: node.x + config.nodeWidth / 2,
      minY: node.y - config.nodeHeight / 2,
      maxY: node.y + config.nodeHeight / 2
    };

    node.children.forEach(child => {
      const childBounds = calculateTreeBounds(child);
      bounds.minX = Math.min(bounds.minX, childBounds.minX);
      bounds.maxX = Math.max(bounds.maxX, childBounds.maxX);
      bounds.minY = Math.min(bounds.minY, childBounds.minY);
      bounds.maxY = Math.max(bounds.maxY, childBounds.maxY);
    });

    return bounds;
  };

  const fitTreeToView = () => {
    if (!tree?.root || !containerRef.current) return;

    // First calculate the width of each subtree
    calculateSubtreeWidth(tree.root);
    
    // Then calculate positions based on widths
    calculatePositions(
      tree.root,
      containerRef.current.clientWidth / 2,
      config.nodeHeight / 2 + config.padding,
      0
    );

    const bounds = calculateTreeBounds(tree.root);
    const treeWidth = bounds.maxX - bounds.minX;
    const treeHeight = bounds.maxY - bounds.minY;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const scaleX = (containerWidth - config.padding * 2) / (treeWidth || 1);
    const scaleY = (containerHeight - config.padding * 2) / (treeHeight || 1);
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
    setMessage(`Adding key ${num}...`);
    setActiveNodes([]);

    if (!tree) {
      const newTree = new BTree(degree);
      newTree.insert(num);
      setTree(newTree);
    } else {
      const newTree = deepCopyTree(tree);
      newTree.insert(num);
      setTree(newTree);
    }

    await controls.start({
      opacity: [0, 1, 0],
      transition: { duration: 2 / animationSpeed, times: [0, 0.2, 1] }
    });

    setMessage(`Added key ${num}`);
  };

  const renderTree = () => {
    if (!tree?.root || tree.root.keys.length === 0) return null;

    const renderNode = (node) => {
      const isActive = activeNodes.includes(node.id);
      const nodeFill = isActive ? "#fbbf24" : "#f59e0b";
      const nodeStroke = "#b45309";
      const connectionColor = "#f59e0b";

      return (
        <g key={node.id}>
          {node.children.map((child, i) => (
            <g key={`${node.id}-child-${i}`}>
              <motion.path
                d={`M ${node.x} ${node.y + config.nodeHeight / 2} 
                    L ${child.x} ${child.y - config.nodeHeight / 2}`}
                stroke={connectionColor}
                strokeWidth={2}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: config.animationDuration / animationSpeed }}
              />
              {renderNode(child)}
            </g>
          ))}

          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20,
              duration: config.animationDuration / animationSpeed
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveNodes([node.id])}
          >
            <rect
              x={node.x - config.nodeWidth / 2}
              y={node.y - config.nodeHeight / 2}
              width={config.nodeWidth}
              height={config.nodeHeight}
              rx="8"
              fill={nodeFill}
              stroke={nodeStroke}
              strokeWidth="2"
              filter={isActive ? "url(#glow)" : ""}
            />
            
            {node.keys.map((key, i) => {
              const keyX = node.x - config.nodeWidth / 2 + 
                         (i + 0.5) * (config.nodeWidth / node.keys.length);
              return (
                <g key={`${node.id}-key-${i}`}>
                  <circle
                    cx={keyX}
                    cy={node.y}
                    r={config.keyRadius}
                    fill="#1f2937"
                  />
                  <text
                    x={keyX}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontWeight="bold"
                    fontSize="12"
                  >
                    {key}
                  </text>
                </g>
              );
            })}
          </motion.g>
        </g>
      );
    };

    return (
      <g transform={`translate(${transform.translateX}, ${transform.translateY}) scale(${transform.scale})`}>
        {renderNode(tree.root)}
      </g>
    );
  };

  const clearTree = () => {
    setTree(null);
    setActiveNodes([]);
    setMessage('Tree cleared. Enter numbers to build a new B-Tree.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">B-Tree Visualizer</h1>
        <p className="text-yellow-200 mb-6">Degree: {degree} (Min keys: {Math.ceil(degree/2)-1}, Max keys: {degree-1})</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Controls */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-yellow-300 text-lg mb-4">Tree Controls</h3>
              
              <div className="mb-4">
                <label className="text-yellow-300 block mb-2">B-Tree Degree:</label>
                <select 
                  value={degree}
                  onChange={(e) => {
                    setDegree(parseInt(e.target.value));
                    clearTree();
                  }}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearTree}
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-3 rounded-lg w-full"
              >
                Clear Tree
              </motion.button>

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
                <label className="block text-yellow-300 mb-2">Key Value</label>
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
                    Insert Key
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

export default BTreeVisualizer;