import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";



export default function ArrayStack() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [stack, setStack] = useState([]);
  const [top, setTop] = useState(-1);
  const [operationHistory, setOperationHistory] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [capacity] = useState(10); // Fixed capacity for array stack

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
      line: "#define MAX 10", 
      explanation: "Defines maximum capacity of the stack.",
      important: true 
    },
    { 
      line: "int stack[MAX];", 
      explanation: "Array declaration for stack implementation.",
      important: true 
    },
    { 
      line: "int top = -1;", 
      explanation: "Top pointer initialized to -1 (empty stack).",
      important: true 
    },
    { 
      line: "void push(int item) {", 
      explanation: "Function to add an element to the stack.",
      important: true 
    },
    { 
      line: "    if (top == MAX - 1) {", 
      explanation: "Check if stack is full (overflow condition).",
      important: true 
    },
    { 
      line: "        printf(\"Stack Overflow!\\n\");", 
      explanation: "Error message for stack overflow.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if stack is full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check block.",
      important: false 
    },
    { 
      line: "    top = top + 1;", 
      explanation: "Increment top pointer.",
      important: true 
    },
    { 
      line: "    stack[top] = item;", 
      explanation: "Store item at top position.",
      important: true 
    },
    { 
      line: "    printf(\"Pushed %d to stack\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of push function.",
      important: false 
    },
    { 
      line: "int pop() {", 
      explanation: "Function to remove and return top element.",
      important: true 
    },
    { 
      line: "    if (top == -1) {", 
      explanation: "Check if stack is empty (underflow condition).",
      important: true 
    },
    { 
      line: "        printf(\"Stack Underflow!\\n\");", 
      explanation: "Error message for stack underflow.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty stack.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check block.",
      important: false 
    },
    { 
      line: "    int item = stack[top];", 
      explanation: "Store top element to return.",
      important: true 
    },
    { 
      line: "    top = top - 1;", 
      explanation: "Decrement top pointer.",
      important: true 
    },
    { 
      line: "    printf(\"Popped %d from stack\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return the popped element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of pop function.",
      important: false 
    },
    { 
      line: "int peek() {", 
      explanation: "Function to view top element without removal.",
      important: true 
    },
    { 
      line: "    if (top == -1) {", 
      explanation: "Check if stack is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Stack is empty\\n\");", 
      explanation: "Message for empty stack.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty stack.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty stack check.",
      important: false 
    },
    { 
      line: "    return stack[top];", 
      explanation: "Return top element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of peek function.",
      important: false 
    },
    { 
      line: "int isEmpty() {", 
      explanation: "Function to check if stack is empty.",
      important: true 
    },
    { 
      line: "    return (top == -1);", 
      explanation: "Return true if stack is empty.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isEmpty function.",
      important: false 
    },
    { 
      line: "int isFull() {", 
      explanation: "Function to check if stack is full.",
      important: true 
    },
    { 
      line: "    return (top == MAX - 1);", 
      explanation: "Return true if stack is full.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isFull function.",
      important: false 
    },
    { 
      line: "void display() {", 
      explanation: "Function to display stack contents.",
      important: true 
    },
    { 
      line: "    if (isEmpty()) {", 
      explanation: "Check if stack is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Stack is empty\\n\");", 
      explanation: "Message for empty stack.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if stack is empty.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty check block.",
      important: false 
    },
    { 
      line: "    printf(\"Stack elements: \");", 
      explanation: "Print label for stack elements.",
      important: true 
    },
    { 
      line: "    for (int i = top; i >= 0; i--) {", 
      explanation: "Loop from top to bottom of stack.",
      important: true 
    },
    { 
      line: "        printf(\"%d \", stack[i]);", 
      explanation: "Print current element.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of for loop.",
      important: false 
    },
    { 
      line: "    printf(\"\\n\");", 
      explanation: "Print newline after elements.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of display function.",
      important: false 
    }
  ];

  // Stack operations
  const push = () => {
    if (top === capacity - 1) {
      setOperationHistory(prev => [...prev, "Stack Overflow!"]);
      return;
    }
    
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    const newTop = top + 1;
    setStack(prev => {
      const newStack = [...prev];
      newStack[newTop] = value;
      return newStack;
    });
    setTop(newTop);
    setOperationHistory(prev => [...prev, `Pushed ${value} to stack`]);
    setUserInput("");
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'push',
      value,
      stackState: [...stack, value],
      top: newTop
    }]);
  };

  const pop = () => {
    if (top === -1) {
      setOperationHistory(prev => [...prev, "Stack Underflow!"]);
      return;
    }
    
    const value = stack[top];
    const newTop = top - 1;
    setTop(newTop);
    setOperationHistory(prev => [...prev, `Popped ${value} from stack`]);
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'pop',
      value,
      stackState: stack.slice(0, top),
      top: newTop
    }]);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: "What is the time complexity of push/pop operations in array stack?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0,
      explanation: "Both operations are O(1) as they only access the top element."
    },
    {
      question: "What does the 'top' variable represent in array stack?",
      options: [
        "The capacity of the stack",
        "The index of the top element",
        "The number of elements in stack",
        "The value of the top element"
      ],
      answer: 1,
      explanation: "Top is the index of the topmost element (-1 when empty)."
    },
    {
      question: "What happens when you push to a full array stack?",
      options: [
        "It automatically expands",
        "It overwrites the bottom element",
        "It causes stack overflow",
        "It returns -1"
      ],
      answer: 2,
      explanation: "Attempting to push to a full stack results in overflow."
    },
    {
      question: "What is the main disadvantage of array stack vs linked list stack?",
      options: [
        "Slower operations",
        "Fixed capacity",
        "More memory usage",
        "Complex implementation"
      ],
      answer: 1,
      explanation: "Array stacks have fixed size while linked list stacks can grow dynamically."
    },
    {
      question: "How do you check if an array stack is empty?",
      options: [
        "top == 0",
        "top == -1",
        "top == MAX",
        "stack[0] == -1"
      ],
      answer: 1,
      explanation: "top is -1 when the stack is empty."
    },
    {
      question: "In array stack, where is the bottom element located?",
      options: [
        "stack[0]",
        "stack[top]",
        "stack[MAX-1]",
        "stack[top-1]"
      ],
      answer: 0,
      explanation: "The bottom element is always at index 0 in array implementation."
    },
    {
      question: "What is the space complexity of array stack with capacity MAX?",
      options: [
        "O(1)",
        "O(MAX)",
        "O(n)",
        "O(log MAX)"
      ],
      answer: 1,
      explanation: "Space complexity is O(MAX) as it allocates fixed space regardless of usage."
    },
    {
      question: "When popping from an array stack, what actually happens to the element?",
      options: [
        "It's physically removed from memory",
        "It's marked as deleted but remains",
        "The top pointer moves down",
        "The array is reindexed"
      ],
      answer: 2,
      explanation: "We just move the top pointer - the value remains until overwritten."
    },
    {
      question: "Which operation is NOT typically supported by array stack?",
      options: [
        "push()",
        "pop()",
        "peek()",
        "insertAt()"
      ],
      answer: 3,
      explanation: "Stacks only allow operations at one end (LIFO principle)."
    },
    {
      question: "What is the initial value of top in array stack implementation?",
      options: [
        "0",
        "-1",
        "NULL",
        "MAX"
      ],
      answer: 1,
      explanation: "Top is initialized to -1 indicating an empty stack."
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
      top: top,
      stack: [...stack],
      capacity: capacity,
      isFull: top === capacity - 1,
      isEmpty: top === -1,
      lastOperation: operationHistory[operationHistory.length - 1] || "None"
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
      <h1 className="text-3xl font-bold mb-4">Array Stack Visualization</h1>
      
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
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Speed:</span>
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
                          <th className="p-2 border">Value</th>
                          <th className="p-2 border">Stack State</th>
                          <th className="p-2 border">Top</th>
                        </tr>
                      </thead>
                      <tbody>
                        {executionSteps.map((step, index) => (
                          <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                          >
                            <td className="p-2 border text-center">{step.step}</td>
                            <td className="p-2 border text-center capitalize">{step.operation}</td>
                            <td className="p-2 border text-center">{step.value}</td>
                            <td className="p-2 border">[{step.stackState.join(', ')}]</td>
                            <td className="p-2 border text-center">{step.top}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Code View */
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3">Array Stack Implementation</h2>
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
                /* Stack Visualization View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full">
                  <h2 className="text-xl font-semibold mb-3">Stack Visualization</h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-full border-2 border-gray-600 rounded-lg bg-gray-700 flex flex-col items-center p-4">
                      <div className="w-full max-w-xs">
                        {/* Stack representation */}
                        <div className="mb-2 text-sm text-gray-400 text-center">
                          Top Pointer: {top >= 0 ? `→ stack[${top}]` : "Empty (top = -1)"}
                        </div>
                        
                        {/* Array visualization */}
                        <div className="border border-gray-600 rounded-lg overflow-hidden">
                          {Array.from({ length: capacity }).map((_, idx) => {
                            const isCurrent = idx === top;
                            const hasValue = idx < stack.length;
                            const isInStack = idx <= top;
                            
                            return (
                              <div 
                                key={idx} 
                                className={`flex items-center border-b border-gray-600 last:border-b-0 ${
                                  isCurrent ? 'bg-blue-600' : 
                                  isInStack ? 'bg-blue-800' : 'bg-gray-800'
                                }`}
                              >
                                <div className="w-16 p-2 border-r border-gray-600 text-right text-gray-400">
                                  stack[{idx}]:
                                </div>
                                <div className="p-2 flex-1 text-center font-mono">
                                  {hasValue ? stack[idx] : '∅'}
                                </div>
                                {isCurrent && (
                                  <div className="p-2 text-xs text-gray-300">
                                    ← top
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Stack operations */}
                        <div className="flex gap-3 mt-4">
                          <div className="flex-1">
                            <input
                              type="number"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              placeholder="Enter value to push"
                              className="w-full p-2 border rounded bg-gray-700 border-gray-600"
                            />
                          </div>
                          <button
                            onClick={push}
                            disabled={top === capacity - 1}
                            className={`px-4 py-2 rounded ${
                              top === capacity - 1 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'
                            } text-white`}
                          >
                            Push
                          </button>
                          <button
                            onClick={pop}
                            disabled={top === -1}
                            className={`px-4 py-2 rounded ${
                              top === -1 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                          >
                            Pop
                          </button>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-gray-800 rounded text-center">
                            Capacity: {capacity}
                          </div>
                          <div className="p-2 bg-gray-800 rounded text-center">
                            Current Size: {top + 1}
                          </div>
                          <div className={`p-2 rounded text-center ${
                            top === -1 ? 'bg-green-800' : 'bg-gray-800'
                          }`}>
                            {top === -1 ? 'Stack Empty' : 'Stack Not Empty'}
                          </div>
                          <div className={`p-2 rounded text-center ${
                            top === capacity - 1 ? 'bg-red-800' : 'bg-gray-800'
                          }`}>
                            {top === capacity - 1 ? 'Stack Full' : 'Stack Not Full'}
                          </div>
                        </div>
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
                      <h3 className="font-semibold mb-1">Stack Status</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-700 rounded">
                          <div>Top Pointer:</div>
                          <div className="font-bold">{top}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                          <div>Capacity:</div>
                          <div className="font-bold">{capacity}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                          <div>Is Empty:</div>
                          <div className="font-bold">{top === -1 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                          <div>Is Full:</div>
                          <div className="font-bold">{top === capacity - 1 ? 'Yes' : 'No'}</div>
                        </div>
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

          {/* Comparison Table */}
          <div className="p-4 rounded-lg shadow-lg w-full max-w-6xl mt-4 bg-gray-800">
            <h2 className="text-xl font-semibold mb-3">
              Stack Implementation Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 border">Feature</th>
                    <th className="p-2 border">Array Stack</th>
                    <th className="p-2 border">Linked List Stack</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Memory Usage</td>
                    <td className="p-2 border">Fixed size, may waste space</td>
                    <td className="p-2 border">Dynamic allocation, no waste</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border font-medium">Time Complexity</td>
                    <td className="p-2 border">O(1) operations</td>
                    <td className="p-2 border">O(1) operations</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Memory Management</td>
                    <td className="p-2 border">Static allocation</td>
                    <td className="p-2 border">Dynamic allocation/free</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border font-medium">Overflow</td>
                    <td className="p-2 border">Possible (fixed size)</td>
                    <td className="p-2 border">Only with memory exhaustion</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Implementation</td>
                    <td className="p-2 border">Simpler, uses array</td>
                    <td className="p-2 border">More complex, uses pointers</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border font-medium">Cache Performance</td>
                    <td className="p-2 border">Better (contiguous memory)</td>
                    <td className="p-2 border">Worse (scattered memory)</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border font-medium">Best Use Case</td>
                    <td className="p-2 border">When size is known and fixed</td>
                    <td className="p-2 border">When size is unpredictable</td>
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