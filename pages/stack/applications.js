import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ParenthesesChecker() {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState([]);

  const checkParentheses = () => {
    const stack = [];
    const tempSteps = [];
    let balanced = true;
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (char === '(') {
        stack.push(char);
        tempSteps.push({ step: i + 1, char, action: 'Push', stack: [...stack] });
      } else if (char === ')') {
        if (stack.length === 0) {
          balanced = false;
          tempSteps.push({ step: i + 1, char, action: 'Unmatched Closing', stack: [...stack] });
          // Don't break here - continue to show all errors
        } else {
          stack.pop();
          tempSteps.push({ step: i + 1, char, action: 'Pop', stack: [...stack] });
        }
      }
    }
    
    if (stack.length !== 0) {
      balanced = false;
      tempSteps.push({ 
        step: input.length, 
        char: 'Remaining', 
        action: `${stack.length} Unmatched Opening`, 
        stack: [...stack] 
      });
    }
    
    tempSteps.push({ 
      step: 'Final', 
      char: '-', 
      action: balanced ? 'Balanced' : 'Not Balanced', 
      stack: [] 
    });
    setSteps(tempSteps);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Stack-Based Parentheses Checker</h1>
      <p className="text-center max-w-xl mb-6">
        This tool checks whether a given string of parentheses is balanced using a stack. 
        Each opening parenthesis '(' is pushed onto the stack, and each closing parenthesis ')'
        pops the top of the stack. If the stack is empty at the end, the string is balanced.
      </p>
      
      <div className="bg-gray-800 p-4 rounded-lg max-w-xl text-left mb-6">
        <h2 className="text-xl font-semibold mb-2">Understanding Stack Applications</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Used in function call management (Recursion).</li>
          <li>Expression evaluation (Infix to Postfix conversion).</li>
          <li>Backtracking problems (Maze solving, Undo operations).</li>
          <li>Managing browser history and text editor undo/redo.</li>
        </ul>
      </div>
      
      <input
        type="text"
        placeholder="Enter parentheses string (e.g., '((()))')"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 rounded text-black mb-4 w-64"
      />
      <button
        onClick={checkParentheses}
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 mb-6"
      >
        Check Balance
      </button>

      {steps.length > 0 && (
        <div className="mt-6 overflow-x-auto w-full max-w-2xl">
          <table className="table-auto border-collapse border border-gray-500 w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-500 px-4 py-2">Step</th>
                <th className="border border-gray-500 px-4 py-2">Character</th>
                <th className="border border-gray-500 px-4 py-2">Action</th>
                <th className="border border-gray-500 px-4 py-2">Stack Content</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <motion.tr 
                  key={index} 
                  className={`bg-gray-800 ${step.action.includes('Unmatched') ? 'text-red-400' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="border border-gray-500 px-4 py-2">{step.step}</td>
                  <td className="border border-gray-500 px-4 py-2">{step.char}</td>
                  <td className="border border-gray-500 px-4 py-2">{step.action}</td>
                  <td className="border border-gray-500 px-4 py-2">[{step.stack.join(', ')}]</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}