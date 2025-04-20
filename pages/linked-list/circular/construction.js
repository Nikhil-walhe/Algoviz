import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Construction() {
  // Code snippet for constructing a node in a circular linked list
  const codeLines = [
    "struct Node {",
    "  int data;",
    "  struct Node* next;",
    "};",
    "",
    "struct Node* createNode(int data) {",
    "  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));",
    "  newNode->data = data;",
    "  newNode->next = newNode; // Points to itself initially",
    "  return newNode;",
    "}",
  ];

  // Explanations for each line of the code snippet
  const explanations = [
    "Define a structure named `Node` to represent a node in the circular linked list.",
    "The `data` field stores the value of the node.",
    "The `next` field is a pointer to the next node in the list.",
    "End of the `Node` structure definition.",
    "",
    "Define a function named `createNode` to create a new node.",
    "Allocate memory for the new node using `malloc`.",
    "Set the `data` field of the new node to the provided value.",
    "Set the `next` pointer of the new node to point to itself (circular).",
    "Return the newly created node.",
    "End of the `createNode` function.",
  ];

  // State to track the current line in the code snippet
  const [currentLine, setCurrentLine] = useState(0);

  // State for the animation
  const [list, setList] = useState([]); // Initially empty list
  const [inputValue, setInputValue] = useState(''); // User input for new node

  // Navigation handlers
  const handleNext = () => {
    if (currentLine < codeLines.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
    }
  };

  // Insertion handler
  const handleInsert = () => {
    if (inputValue === '') return; // Do nothing if input is empty
    const newValue = parseInt(inputValue, 10); // Convert input to number
    setList([newValue]); // Add the new node to the list
    setInputValue(''); // Clear input field
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Circular Linked List - Node Construction
      </motion.h1>

      {/* Code Snippet and Explanation Section */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`${index === currentLine ? 'bg-yellow-100' : ''} p-1`}
                >
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>

        {/* Right Side: Explanation */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explanation</h2>
          <p className="text-gray-800">{explanations[currentLine]}</p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animation Section */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-4">Animation</h2>

        {/* Input Field */}
        <div className="flex justify-center mb-8">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className="bg-white p-2 rounded-lg shadow-lg text-gray-800"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInsert}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ml-4"
          >
            Create Node
          </motion.button>
        </div>

        {/* Linked List Animation */}
        <div className="flex items-center justify-center space-x-4">
          {/* Head Pointer */}
          <div className="flex flex-col items-center">
            <div className="text-white mb-2">Head</div>
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
          </div>

          {/* Nodes */}
          {list.map((node, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Node Box */}
              <div className="w-32 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                <div className="flex-1 border-r border-white p-2">Data: {node}</div>
                <div className="flex-1 p-2">Next</div>
              </div>

              {/* Circular Arrow */}
              {list.length > 0 && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mt-2">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}