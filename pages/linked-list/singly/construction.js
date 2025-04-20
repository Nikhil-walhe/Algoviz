import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Construction() {
  const codeLines = [
    "struct Node {",
    "  int data;",
    "  struct Node* next;",
    "};",
    "",
    "struct Node* createNode(int data) {",
    "  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));",
    "  newNode->data = data;",
    "  newNode->next = NULL;",
    "  return newNode;",
    "}",
  ];

  const explanations = [
    "This defines a `Node` structure with two fields: `data` (to store the value) and `next` (to store the address of the next node).",
    "The `data` field stores the integer value of the node.",
    "The `next` field is a pointer to the next node in the list.",
    "This marks the end of the `Node` structure definition.",
    "",
    "This function creates a new node. It takes `data` as input and returns a pointer to the newly created node.",
    "Memory is allocated for the new node using `malloc`. The size of the memory block is equal to the size of the `Node` structure.",
    "The `data` field of the new node is set to the input value.",
    "The `next` field of the new node is set to `NULL`, indicating that it is the last node in the list.",
    "Finally, the function returns the pointer to the newly created node.",
    "This marks the end of the `createNode` function.",
  ];

  const [currentLine, setCurrentLine] = useState(0);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Construction of a Node
      </motion.h1>

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
        </div>
      </div>

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
  );
}