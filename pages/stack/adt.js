import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ADT() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const maxSize = 5;

  const pushElement = () => {
    if (stack.length >= maxSize) {
      toast.error("Stack Overflow! Stack is full. Cannot push more elements.");
      return;
    }
    if (inputValue.trim() === "" || inputValue.length > 10) {
      toast.warning("Please enter a valid element (max 10 characters).");
      return;
    }
    setStack((prevStack) => [...prevStack, inputValue]); // Add element to the top
    setHistory((prevHistory) => [...prevHistory, `Pushed: ${inputValue}`]);
    setInputValue("");
    toast.success(`Element "${inputValue}" pushed to the stack.`);
  };

  const popElement = () => {
    if (stack.length === 0) {
      toast.error("Stack Underflow! Stack is empty. Cannot pop elements.");
      return;
    }
    const poppedElement = stack[stack.length - 1]; // Remove element from the top
    setStack((prevStack) => prevStack.slice(0, -1));
    setHistory((prevHistory) => [...prevHistory, `Popped: ${poppedElement}`]);
    toast.info(`Element "${poppedElement}" popped from the stack.`);
  };

  const peekElement = () => {
    if (stack.length === 0) {
      toast.error("Stack is empty. Top is -1.");
      return;
    }
    const topElement = stack[stack.length - 1];
    toast.info(`Top element is: ${topElement}`);
  };

  const clearStack = () => {
    if (stack.length === 0) {
      toast.warning("Stack is already empty.");
      return;
    }
    setStack([]);
    setHistory((prevHistory) => [...prevHistory, "Cleared stack"]);
    toast.success("Stack cleared successfully.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 animate-gradient-x"></div>

      {/* Toast Container for Pop-ups */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex flex-col md:flex-row gap-12 items-start z-10">
        {/* Stack Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-lg w-full md:w-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">What is a Stack?</h2>
          <p className="text-gray-700 mb-4">
            A <strong>Stack</strong> is a linear data structure that follows the
            <strong> Last In, First Out (LIFO)</strong> principle. The last
            element added to the stack is the first one to be removed.
          </p>
          <h3 className="text-2xl font-medium text-gray-800 mb-4">Stack Operations (ADT):</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Push</strong>: Add an element to the top of the stack.</li>
            <li><strong>Pop</strong>: Remove the top element from the stack.</li>
            <li><strong>Peek</strong>: View the top element without removing it.</li>
            <li><strong>isEmpty</strong>: Check if the stack has no elements.</li>
          </ul>
          <p className="text-gray-700">Stacks are widely used in applications like function calls, parsing expressions, and managing undo/redo operations in text editors.</p>
        </motion.div>

        {/* Stack Visualization */}
        <div className="flex flex-col items-center w-full md:w-auto">
          {/* Stack Container and Indices */}
          <div className="flex items-end gap-2">
            {/* Indices on the Left Side */}
            <div className="flex flex-col-reverse items-end justify-end h-[200px]">
              {Array.from({ length: maxSize }, (_, index) => (
                <div
                  key={index}
                  className="w-6 h-[40px] flex items-center justify-center text-white/80 text-sm font-medium"
                >
                  {index} {/* Index starts from 0 at the bottom of the container */}
                  <span className="ml-1">→</span> {/* Arrow pointing to the element */}
                </div>
              ))}
            </div>

            {/* Stack Container */}
            <div className="w-20 h-[200px] border-2 border-white/20 rounded-lg flex flex-col-reverse items-center p-2 relative overflow-hidden bg-white/10 backdrop-blur-md shadow-lg">
              <AnimatePresence>
                {stack.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-1 mb-1 rounded-lg shadow-md"
                    style={{ height: `${100 / maxSize}%` }} // Fixed height for each element
                  >
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Stack Status Message */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center"
          >
            <p className="text-white/80 mt-2 text-lg font-medium">
              Stack Size: {stack.length}/{maxSize}
            </p>
            <p className="text-white/80 mt-2 text-lg font-medium">
              {stack.length >= maxSize
                ? "Stack is full! No more elements can be added."
                : stack.length === 0
                ? "The stack is empty. Try pushing an element!"
                : `Top element index: ${stack.length - 1}`} {/* Display top element index */}
            </p>
          </motion.div>

          {/* Input Field and Buttons */}
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter an element"
              className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/10 text-white placeholder-white/50"
            />
            <div className="flex gap-4">
              <button
                onClick={pushElement}
                disabled={stack.length >= maxSize || inputValue.trim() === ""}
                className={`bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
                  stack.length >= maxSize || inputValue.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-blue-600 hover:to-purple-600"
                }`}
                title="Add an element to the top of the stack"
              >
                Push
              </button>
              <button
                onClick={popElement}
                className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transition duration-300"
                title="Remove the top element from the stack"
              >
                Pop
              </button>
              <button
                onClick={peekElement}
                className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-300"
                title="View the top element without removing it"
              >
                Peek
              </button>
              <button
                onClick={clearStack}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transition duration-300"
                title="Reset the stack to empty"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Operation History */}
          <div className="mt-4">
            <h3 className="text-xl font-medium text-white/80 mb-2">Operation History:</h3>
            <ul className="list-disc list-inside text-white/70">
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}