import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecursionStack() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [callStack, setCallStack] = useState([]);
  const [operationHistory, setOperationHistory] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState(5);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [output, setOutput] = useState([]);

  // Refs
  const playInterval = useRef(null);

  // Complete C code with line-by-line explanations
  const codeData = [
    { 
      line: "#include <stdio.h>", 
      explanation: "Standard input/output library for functions like printf().",
      important: true 
    },
    { 
      line: "// Recursive factorial function", 
      explanation: "Comment explaining the purpose of the following function.",
      important: false 
    },
    { 
      line: "int factorial(int n) {", 
      explanation: "Function definition for calculating factorial recursively.",
      important: true 
    },
    { 
      line: "    // Base case", 
      explanation: "Comment indicating the base case of recursion.",
      important: false 
    },
    { 
      line: "    if (n <= 1) {", 
      explanation: "Check if we've reached the base case (n = 0 or 1).",
      important: true 
    },
    { 
      line: "        return 1;", 
      explanation: "Return 1 for base case (0! = 1! = 1).",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of base case block.",
      important: false 
    },
    { 
      line: "    // Recursive case", 
      explanation: "Comment indicating the recursive case.",
      important: false 
    },
    { 
      line: "    else {", 
      explanation: "If we're not at the base case...",
      important: true 
    },
    { 
      line: "        return n * factorial(n - 1);", 
      explanation: "Recursive call to calculate factorial(n-1) and multiply by n.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of else block.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of factorial function.",
      important: false 
    },
    { 
      line: "// Main function", 
      explanation: "Comment explaining the purpose of the main function.",
      important: false 
    },
    { 
      line: "int main() {", 
      explanation: "Entry point of the program.",
      important: true 
    },
    { 
      line: "    int num = 5;", 
      explanation: "Variable to store the number whose factorial we want to calculate.",
      important: true 
    },
    { 
      line: "    printf(\"Factorial of %d is: \", num);", 
      explanation: "Print message before displaying the result.",
      important: true 
    },
    { 
      line: "    printf(\"%d\\n\", factorial(num));", 
      explanation: "Call factorial function and print the result.",
      important: true 
    },
    { 
      line: "    return 0;", 
      explanation: "Return success status.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of main function.",
      important: false 
    }
  ];

  // Recursive function simulation
  const factorial = (n, depth = 0) => {
    const callId = generateAddress();
    const callFrame = {
      id: callId,
      n,
      depth,
      status: 'called',
      returnValue: null
    };
    
    // Add to call stack
    setCallStack(prev => [...prev, callFrame]);
    setOperationHistory(prev => [...prev, `Called factorial(${n})`]);
    setOutput(prev => [...prev, `Entering factorial(${n})`]);
    
    // Base case
    if (n <= 1) {
      const updatedFrame = { ...callFrame, status: 'returning', returnValue: 1 };
      setCallStack(prev => prev.map(f => f.id === callId ? updatedFrame : f));
      setOperationHistory(prev => [...prev, `Base case reached for factorial(${n}), returning 1`]);
      setOutput(prev => [...prev, `Base case: factorial(${n}) = 1`]);
      return 1;
    }
    
    // Recursive case
    const recursiveResult = factorial(n - 1, depth + 1);
    const result = n * recursiveResult;
    
    const returningFrame = { ...callFrame, status: 'returning', returnValue: result };
    setCallStack(prev => prev.map(f => f.id === callId ? returningFrame : f));
    setOperationHistory(prev => [...prev, `Returning from factorial(${n}) with ${result}`]);
    setOutput(prev => [...prev, `Returning factorial(${n}) = ${result}`]);
    
    return result;
  };

  // Generate random ID for call frames
  const generateAddress = () => '0x' + Math.floor(Math.random() * 10000).toString(16).padStart(4, '0');

  // Start the recursion visualization
  const startRecursion = () => {
    setCallStack([]);
    setOperationHistory([]);
    setOutput([]);
    setVariables({});
    factorial(parseInt(userInput) || 5);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: "What is recursion in programming?",
      options: [
        "A function that calls other functions",
        "A function that calls itself",
        "A special type of loop",
        "A data structure for storing function calls"
      ],
      answer: 1,
      explanation: "Recursion is when a function calls itself to solve smaller instances of the same problem."
    },
    {
      question: "What is the most important part of a recursive function?",
      options: [
        "The initialization",
        "The base case",
        "The loop condition",
        "The return type"
      ],
      answer: 1,
      explanation: "The base case stops the recursion and prevents infinite calls."
    },
    {
      question: "What data structure is used to manage function calls in recursion?",
      options: [
        "Queue",
        "Array",
        "Stack",
        "Linked List"
      ],
      answer: 2,
      explanation: "The call stack keeps track of function calls in Last-In-First-Out (LIFO) order."
    },
    {
      question: "What is the time complexity of recursive factorial?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      answer: 2,
      explanation: "Factorial makes n recursive calls, resulting in O(n) time complexity."
    },
    {
      question: "What happens if a recursive function lacks a proper base case?",
      options: [
        "It runs faster",
        "It causes a stack overflow",
        "It returns incorrect results",
        "It compiles but doesn't run"
      ],
      answer: 1,
      explanation: "Without a base case, recursion continues until the call stack exceeds its limit."
    },
    {
      question: "Which problem is NOT typically solved with recursion?",
      options: [
        "Tree traversals",
        "Fibonacci sequence",
        "Factorial calculation",
        "Iterating through an array"
      ],
      answer: 3,
      explanation: "Simple array iteration is usually done with loops, not recursion."
    },
    {
      question: "What is tail recursion?",
      options: [
        "When the recursive call is the last operation in the function",
        "When there are multiple recursive calls",
        "When recursion happens in a loop",
        "When the base case is at the end of the function"
      ],
      answer: 0,
      explanation: "Tail recursion allows compilers to optimize memory usage."
    },
    {
      question: "What is the space complexity of recursive factorial?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      answer: 2,
      explanation: "Each recursive call adds a stack frame, resulting in O(n) space usage."
    },
    {
      question: "Which real-world analogy best represents recursion?",
      options: [
        "A line of people waiting",
        "A set of Russian nesting dolls",
        "A deck of playing cards",
        "A bookshelf"
      ],
      answer: 1,
      explanation: "Nesting dolls represent smaller instances of the same problem."
    },
    {
      question: "What is the base case in the factorial function?",
      options: [
        "n == 0",
        "n <= 1",
        "n == 1",
        "n > 1"
      ],
      answer: 1,
      explanation: "The base case is when n is 0 or 1, returning 1."
    }
  ];

  // Start quiz
  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizQuestion(quizQuestions[0]);
    setUserAnswer(null);
    setShowQuiz(true);
  };

  // Next quiz question
  const nextQuizQuestion = () => {
    const nextIndex = currentQuizIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuizIndex(nextIndex);
      setQuizQuestion(quizQuestions[nextIndex]);
      setUserAnswer(null);
    } else {
      setShowQuiz(false);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (codeStep < codeData.length - 1) {
      setCodeStep(codeStep + 1);
      updateVariables(codeStep + 1);
    } else if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (codeStep > 0) {
      setCodeStep(codeStep - 1);
      updateVariables(codeStep - 1);
    }
    if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    }
  };

  const jumpToStep = (index) => {
    setCodeStep(index);
    updateVariables(index);
    if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const delay = Math.max(1000 / playbackSpeed, 200);
      playInterval.current = setInterval(nextStep, delay);
    }
  };

  // Update variable visualization
  const updateVariables = (step) => {
    const currentLine = codeData[step]?.line || "";
    let vars = {
      callStack: callStack.map(frame => ({
        function: `factorial(${frame.n})`,
        status: frame.status,
        returnValue: frame.returnValue
      })),
      lastOperation: operationHistory[operationHistory.length - 1] || "None",
      output: output.join('\n')
    };

    setVariables(vars);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
      }
    };
  }, []);

  // Update interval when playback speed changes
  useEffect(() => {
    if (isPlaying) {
      clearInterval(playInterval.current);
      const delay = Math.max(1000 / playbackSpeed, 200);
      playInterval.current = setInterval(nextStep, delay);
    }
  }, [playbackSpeed]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Recursion Call Stack Visualization</h1>
      
      {/* Control Bar */}
      <div className="flex gap-3 mb-4 w-full max-w-6xl justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            {showTable ? 'Show Code' : 'Show Execution'}
          </button>
          <button
            onClick={startQuiz}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
          >
            Take Quiz
          </button>
          <button
            onClick={startRecursion}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Run Recursion
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Input:</span>
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-16 p-1 border rounded bg-gray-700 border-gray-600 text-sm"
            min="0"
            max="10"
          />
          <span className="text-sm ml-2">Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="border rounded px-2 py-1 bg-gray-700 text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      {showQuiz ? (
        <div className="w-full max-w-6xl p-4 rounded-lg shadow-lg bg-gray-800">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{quizQuestion.question}</h3>
            <div className="space-y-2">
              {quizQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserAnswer(idx)}
                  className={`w-full text-left p-3 rounded-md border ${
                    userAnswer === idx
                      ? idx === quizQuestion.answer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : 'bg-red-100 border-red-500 text-red-800'
                      : 'hover:bg-gray-700 border-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {userAnswer !== null && (
              <div className={`p-3 rounded-md ${quizQuestion.answer === userAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="font-medium">
                  {quizQuestion.answer === userAnswer ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="mt-1">{quizQuestion.explanation}</p>
                <button
                  onClick={nextQuizQuestion}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </div>
            )}
            <button
              onClick={() => setShowQuiz(false)}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
              Back to Visualization
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl">
            {/* Left Panel */}
            <div className="p-4 rounded-lg shadow-lg flex-1 bg-gray-800">
              {showTable ? (
                /* Execution Steps Table View */
                <div>
                  <h2 className="text-xl font-semibold mb-3">Execution Steps</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="p-2 border">Step</th>
                          <th className="p-2 border">Operation</th>
                          <th className="p-2 border">Call Stack</th>
                          <th className="p-2 border">Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {operationHistory.map((op, index) => (
                          <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                          >
                            <td className="p-2 border text-center">{index + 1}</td>
                            <td className="p-2 border">{op}</td>
                            <td className="p-2 border">
                              {callStack.slice(0, index + 1).map(f => `factorial(${f.n})`).join(' → ')}
                            </td>
                            <td className="p-2 border">{output[index] || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Code View */
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3">Recursive Factorial Implementation</h2>
                  <pre className="p-3 rounded-lg overflow-x-auto max-h-96 bg-gray-700 text-sm">
                    <code>
                      {codeData.map((item, index) => (
                        <div
                          key={index}
                          className={`${index === codeStep ? "bg-yellow-700" : ""} 
                                    hover:bg-opacity-50 cursor-pointer py-1 px-2 flex`}
                          onClick={() => jumpToStep(index)}
                        >
                          <span className="mr-3 w-5 text-right text-gray-500">
                            {index + 1}
                          </span>
                          <span className={item.important ? "font-semibold" : ""}>
                            {item.line}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={prevStep}
                      disabled={codeStep === 0}
                      className={`px-3 py-1 rounded-lg ${codeStep === 0 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={togglePlay}
                      className={`px-3 py-1 rounded-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                    >
                      {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={codeStep === codeData.length - 1}
                      className={`px-3 py-1 rounded-lg ${codeStep === codeData.length - 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="flex-1">
              {showTable ? (
                /* Call Stack Visualization View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full">
                  <h2 className="text-xl font-semibold mb-3">Call Stack Visualization</h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-full h-64 border-2 border-gray-600 rounded-lg bg-gray-700 flex flex-col items-center justify-start p-4 overflow-y-auto">
                      {callStack.length === 0 ? (
                        <p className="text-gray-400">Call stack is empty</p>
                      ) : (
                        <div className="w-full space-y-2">
                          <div className="text-sm text-gray-400 mb-2">Current Call Stack (Top → Bottom):</div>
                          <AnimatePresence>
                            {[...callStack].reverse().map((frame, idx) => (
                              <motion.div
                                key={frame.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`p-3 rounded-lg shadow-md ${
                                  frame.status === 'called' ? 'bg-blue-600' : 'bg-green-600'
                                } text-white`}
                              >
                                <div className="font-bold">factorial({frame.n})</div>
                                <div className="text-xs mt-1">
                                  Status: {frame.status === 'called' ? 'Processing' : 'Returning'}
                                </div>
                                {frame.returnValue !== null && (
                                  <div className="text-xs mt-1">
                                    Returns: {frame.returnValue}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                    
                    <div className="w-full mt-4">
                      <h3 className="font-semibold mb-2">Program Output:</h3>
                      <div className="p-3 bg-gray-700 rounded-lg h-32 overflow-y-auto">
                        {output.map((line, idx) => (
                          <div key={idx} className="text-sm font-mono">{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Explanation Box View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full">
                  <h2 className="text-xl font-semibold mb-3">Code Explanation</h2>
                  <div className="p-3 rounded-lg mb-4 bg-gray-700">
                    <h3 className="font-semibold mb-1">Current Line Explanation</h3>
                    <p>{codeData[codeStep]?.explanation || "No explanation needed for this line."}</p>
                    <div className="mt-2 text-sm opacity-75">
                      Line {codeStep + 1} of {codeData.length}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1">Recursion Concepts</h3>
                      <div className="p-3 rounded bg-gray-700 text-sm space-y-2">
                        <p><strong>Base Case:</strong> The condition that stops the recursion (n ≤ 1).</p>
                        <p><strong>Recursive Case:</strong> The part that calls the function with a smaller input (n * factorial(n-1)).</p>
                        <p><strong>Call Stack:</strong> Where function calls are stored in LIFO order.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Last Operation</h3>
                      <div className="p-2 rounded bg-gray-700">
                        {variables.lastOperation || "None"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recursion vs Iteration Table */}
          <div className="p-4 rounded-lg shadow-lg w-full max-w-6xl mt-4 bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">
              Recursion vs Iteration Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 border">Feature</th>
                    <th className="p-2 border">Recursion</th>
                    <th className="p-2 border">Iteration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Code Readability</td>
                    <td className="p-2 border">Often more elegant for problems with recursive nature</td>
                    <td className="p-2 border">Can be more straightforward for simple loops</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border font-medium">Memory Usage</td>
                    <td className="p-2 border">Uses call stack (potential stack overflow)</td>
                    <td className="p-2 border">Generally constant space</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Performance</td>
                    <td className="p-2 border">Function call overhead</td>
                    <td className="p-2 border">Generally faster</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border font-medium">Best Use Cases</td>
                    <td className="p-2 border">Tree/graph traversals, divide & conquer</td>
                    <td className="p-2 border">Simple loops, linear processing</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Implementation</td>
                    <td className="p-2 border">Requires base case and recursive case</td>
                    <td className="p-2 border">Uses loop conditions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}