import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

export default function Operations() {
  const [stack, setStack] = useState([]);
  const controls = useAnimation();

  const pushElement = async () => {
    if (stack.length >= 5) return; // Max stack size
    await controls.start({ y: [0, -20, 0], opacity: [0, 1] });
    setStack([...stack, `Element ${stack.length + 1}`]);
  };

  const popElement = async () => {
    if (stack.length === 0) return; // Stack is empty
    await controls.start({ y: [0, 20, 0], opacity: [1, 0] });
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Operations on Stack
      </motion.h1>

      {/* Stack Visualization */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-48 h-64 bg-gray-700 rounded-lg p-4 flex flex-col-reverse justify-end items-center border-2 border-gray-600">
          {stack.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-10 bg-blue-500 flex items-center justify-center text-white font-semibold rounded-lg mb-2 shadow-lg"
            >
              {element}
            </motion.div>
          ))}
        </div>
        <div className="text-gray-300 mt-2">Stack Visualization</div>
      </div>

      {/* Push and Pop Buttons */}
      <div className="flex space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={pushElement}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Push
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={popElement}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Pop
        </motion.button>
      </div>

      {/* Subtopic: Initialization of Stack */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Initialization of Stack</h2>
        <p className="text-gray-800 mb-4">
          Before using a stack, we need to initialize it. This involves defining the maximum size of the stack and setting the top pointer to <code>-1</code> to indicate that the stack is empty.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-gray-800">
            {`
            #define MAX 100
            int stack[MAX];
            int top = -1;
            `}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Check if Stack is Empty */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Check if Stack is Empty</h2>
        <p className="text-gray-800 mb-4">
          To check if the stack is empty, we verify if the top pointer is <code>-1</code>. If it is, the stack is empty.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-gray-800">
            {`
            int isEmpty() {
              return top == -1;
            }
            `}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Check if Stack is Full */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Check if Stack is Full</h2>
        <p className="text-gray-800 mb-4">
          To check if the stack is full, we verify if the top pointer is equal to <code>MAX - 1</code>. If it is, the stack is full.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-gray-800">
            {`
            int isFull() {
              return top == MAX - 1;
            }
            `}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Push Operation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Push Operation</h2>
        <p className="text-gray-800 mb-4">
          The <code>push</code> operation adds an element to the top of the stack. If the stack is full, it displays a "Stack Overflow" message.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-gray-800">
            {`
            void push(int value) {
              if (isFull()) {
                printf("Stack Overflow\\n");
                return;
              }
              stack[++top] = value;
            }
            `}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Pop Operation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Pop Operation</h2>
        <p className="text-gray-800 mb-4">
          The <code>pop</code> operation removes the top element from the stack. If the stack is empty, it displays a "Stack Underflow" message.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          <code className="text-sm text-gray-800">
            {`
            int pop() {
              if (isEmpty()) {
                printf("Stack Underflow\\n");
                return -1;
              }
              return stack[top--];
            }
            `}
          </code>
        </pre>
      </motion.div>
    </div>
  );
}    