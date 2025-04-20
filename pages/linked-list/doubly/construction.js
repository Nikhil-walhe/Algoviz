import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Construction() {
  // Code snippet for constructing a node in a doubly linked list
  const codeLines = [
    "struct Node {",
    "  int data;",
    "  struct Node* next;",
    "  struct Node* prev;",
    "};",
    "",
    "struct Node* createNode(int data) {",
    "  struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));",
    "  newNode->data = data;",
    "  newNode->next = NULL;",
    "  newNode->prev = NULL;",
    "  return newNode;",
    "}",
  ];

  // Explanations for each line of the code snippet
  const explanations = [
    "Define a structure named `Node` to represent a node in the doubly linked list.",
    "The `data` field stores the value of the node.",
    "The `next` field is a pointer to the next node in the list.",
    "The `prev` field is a pointer to the previous node in the list.",
    "End of the `Node` structure definition.",
    "",
    "Define a function named `createNode` to create a new node.",
    "Allocate memory for the new node using `malloc`.",
    "Set the `data` field of the new node to the provided value.",
    "Initialize the `next` pointer to `NULL` (no next node initially).",
    "Initialize the `prev` pointer to `NULL` (no previous node initially).",
    "Return the newly created node.",
    "End of the `createNode` function.",
  ];

  // State to track the current line in the code snippet
  const [currentLine, setCurrentLine] = useState(0);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Doubly Linked List - Node Construction
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

      {/* Back Button */}
      <div className="mt-8">
        <Link href="/linked-list/doubly">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          >
            Back to Doubly Linked List
          </motion.button>
        </Link>
      </div>
    </div>
  );
}