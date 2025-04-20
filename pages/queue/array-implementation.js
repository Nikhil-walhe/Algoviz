import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArrayQueue() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [queue, setQueue] = useState(Array(5).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [operationHistory, setOperationHistory] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isCircular, setIsCircular] = useState(false);
  const [capacity] = useState(5);

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
      line: "#define MAX 5", 
      explanation: "Defines maximum capacity of the queue.",
      important: true 
    },
    { 
      line: "int queue[MAX];", 
      explanation: "Array declaration for queue implementation.",
      important: true 
    },
    { 
      line: "int front = -1, rear = -1;", 
      explanation: "Front and rear pointers initialized to -1 (empty queue).",
      important: true 
    },
    { 
      line: "void enqueue(int item) {", 
      explanation: "Function to add an element to the queue.",
      important: true 
    },
    { 
      line: isCircular ? "    if ((rear + 1) % MAX == front) {" : "    if (rear == MAX - 1) {", 
      explanation: isCircular ? "Check if queue is full (circular condition)." : "Check if queue is full (linear condition).",
      important: true 
    },
    { 
      line: "        printf(\"Queue Overflow!\\n\");", 
      explanation: "Error message for queue overflow.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if queue is full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check block.",
      important: false 
    },
    { 
      line: "    if (front == -1) front = 0;", 
      explanation: "Initialize front pointer for first element.",
      important: true 
    },
    { 
      line: isCircular ? "    rear = (rear + 1) % MAX;" : "    rear = rear + 1;", 
      explanation: isCircular ? "Circular increment of rear pointer." : "Linear increment of rear pointer.",
      important: true 
    },
    { 
      line: "    queue[rear] = item;", 
      explanation: "Store item at rear position.",
      important: true 
    },
    { 
      line: "    printf(\"Enqueued %d to queue\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of enqueue function.",
      important: false 
    },
    { 
      line: "int dequeue() {", 
      explanation: "Function to remove and return front element.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if queue is empty (underflow condition).",
      important: true 
    },
    { 
      line: "        printf(\"Queue Underflow!\\n\");", 
      explanation: "Error message for queue underflow.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty queue.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check block.",
      important: false 
    },
    { 
      line: "    int item = queue[front];", 
      explanation: "Store front element to return.",
      important: true 
    },
    { 
      line: isCircular ? "    if (front == rear) front = rear = -1;" : "    if (front == rear) front = rear = -1;", 
      explanation: "Reset pointers if last element is dequeued.",
      important: true 
    },
    { 
      line: isCircular ? "    else front = (front + 1) % MAX;" : "    else front = front + 1;", 
      explanation: isCircular ? "Circular increment of front pointer." : "Linear increment of front pointer.",
      important: true 
    },
    { 
      line: "    printf(\"Dequeued %d from queue\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return the dequeued element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of dequeue function.",
      important: false 
    },
    { 
      line: "int peek() {", 
      explanation: "Function to view front element without removal.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if queue is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Queue is empty\\n\");", 
      explanation: "Message for empty queue.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty queue.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty queue check.",
      important: false 
    },
    { 
      line: "    return queue[front];", 
      explanation: "Return front element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of peek function.",
      important: false 
    },
    { 
      line: "int isEmpty() {", 
      explanation: "Function to check if queue is empty.",
      important: true 
    },
    { 
      line: "    return (front == -1);", 
      explanation: "Return true if queue is empty.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isEmpty function.",
      important: false 
    },
    { 
      line: "int isFull() {", 
      explanation: "Function to check if queue is full.",
      important: true 
    },
    { 
      line: isCircular ? "    return ((rear + 1) % MAX == front);" : "    return (rear == MAX - 1);", 
      explanation: isCircular ? "Circular queue full condition." : "Linear queue full condition.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isFull function.",
      important: false 
    }
  ];

  // Queue operations
  const enqueue = () => {
    if (isCircular ? (rear + 1) % capacity === front : rear === capacity - 1) {
      setOperationHistory(prev => [...prev, "Queue Overflow!"]);
      return;
    }
    
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    let newFront = front;
    let newRear = rear;
    
    if (front === -1) {
      newFront = 0;
    }
    
    if (isCircular) {
      newRear = (rear + 1) % capacity;
    } else {
      newRear = rear + 1;
    }
    
    const newQueue = [...queue];
    newQueue[newRear] = value;
    
    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Enqueued ${value} to queue`]);
    setUserInput("");
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'enqueue',
      value,
      queueState: [...newQueue],
      front: newFront,
      rear: newRear
    }]);
  };

  const dequeue = () => {
    if (front === -1) {
      setOperationHistory(prev => [...prev, "Queue Underflow!"]);
      return;
    }
    
    const value = queue[front];
    let newFront = front;
    let newRear = rear;
    const newQueue = [...queue];
    newQueue[front] = null;
    
    if (front === rear) {
      newFront = -1;
      newRear = -1;
    } else {
      if (isCircular) {
        newFront = (front + 1) % capacity;
      } else {
        newFront = front + 1;
      }
    }
    
    setQueue(newQueue);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Dequeued ${value} from queue`]);
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'dequeue',
      value,
      queueState: [...newQueue],
      front: newFront,
      rear: newRear
    }]);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: "What is the time complexity of enqueue/dequeue operations in array queue?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0,
      explanation: "Both operations are O(1) as they only access the front/rear elements."
    },
    {
      question: "What do the 'front' and 'rear' variables represent in array queue?",
      options: [
        "The capacity of the queue",
        "The indices of the first and last elements",
        "The number of elements in queue",
        "The values of the first and last elements"
      ],
      answer: 1,
      explanation: "Front and rear are indices of the first and last elements (-1 when empty)."
    },
    {
      question: "What happens when you enqueue to a full array queue?",
      options: [
        "It automatically expands",
        "It overwrites the front element",
        "It causes queue overflow",
        "It returns -1"
      ],
      answer: 2,
      explanation: "Attempting to enqueue to a full queue results in overflow."
    },
    {
      question: "What is the main advantage of circular queue over linear queue?",
      options: [
        "Faster operations",
        "Better memory utilization",
        "Simpler implementation",
        "No size limit"
      ],
      answer: 1,
      explanation: "Circular queues reuse empty spaces at the front when possible."
    },
    {
      question: "How do you check if an array queue is empty?",
      options: [
        "front == 0",
        "front == -1",
        "rear == MAX",
        "queue[0] == -1"
      ],
      answer: 1,
      explanation: "front is -1 when the queue is empty."
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
      front: front,
      rear: rear,
      queue: [...queue],
      capacity: capacity,
      isFull: isCircular ? (rear + 1) % capacity === front : rear === capacity - 1,
      isEmpty: front === -1,
      lastOperation: operationHistory[operationHistory.length - 1] || "None",
      isCircular: isCircular
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

  // Update code when circular mode changes
  useEffect(() => {
    updateVariables(codeStep);
  }, [isCircular]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
        Array Queue Visualization
      </h1>
      
      {/* Control Bar */}
      <div className="flex gap-3 mb-4 w-full max-w-6xl justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            {showTable ? 'Show Code' : 'Show Execution'}
          </button>
          <button
            onClick={startQuiz}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
          >
            Take Quiz
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="border rounded px-2 py-1 bg-gray-700 text-sm hover:bg-gray-600 transition-colors"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
          <button
            onClick={() => setIsCircular(!isCircular)}
            className={`px-3 py-1 rounded text-sm ${isCircular ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
          >
            {isCircular ? 'Circular' : 'Linear'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showQuiz ? (
        <div className="w-full max-w-6xl p-4 rounded-lg shadow-lg bg-gray-800 border border-gray-700">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-green-400">{quizQuestion.question}</h3>
            <div className="space-y-2">
              {quizQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserAnswer(idx)}
                  className={`w-full text-left p-3 rounded-md border ${
                    userAnswer === idx
                      ? idx === quizQuestion.answer
                        ? 'bg-green-900 border-green-500 text-green-100'
                        : 'bg-red-900 border-red-500 text-red-100'
                      : 'hover:bg-gray-700 border-gray-600'
                  } transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
            {userAnswer !== null && (
              <div className={`p-3 rounded-md ${quizQuestion.answer === userAnswer ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                <p className="font-medium">
                  {quizQuestion.answer === userAnswer ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="mt-1 text-sm">{quizQuestion.explanation}</p>
                <button
                  onClick={nextQuizQuestion}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </div>
            )}
            <button
              onClick={() => setShowQuiz(false)}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Back to Visualization
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl">
            {/* Left Panel */}
            <div className="p-4 rounded-lg shadow-lg flex-1 bg-gray-800 border border-gray-700">
              {showTable ? (
                /* Execution Steps Table View */
                <div>
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Execution Steps</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="p-2 border border-gray-600">Step</th>
                          <th className="p-2 border border-gray-600">Operation</th>
                          <th className="p-2 border border-gray-600">Value</th>
                          <th className="p-2 border border-gray-600">Queue State</th>
                          <th className="p-2 border border-gray-600">Front</th>
                          <th className="p-2 border border-gray-600">Rear</th>
                        </tr>
                      </thead>
                      <tbody>
                        {executionSteps.map((step, index) => (
                          <tr 
                            key={index} 
                            className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                          >
                            <td className="p-2 border border-gray-600 text-center">{step.step}</td>
                            <td className="p-2 border border-gray-600 text-center capitalize">{step.operation}</td>
                            <td className="p-2 border border-gray-600 text-center">{step.value}</td>
                            <td className="p-2 border border-gray-600">[{step.queueState.map(v => v === null ? '∅' : v).join(', ')}]</td>
                            <td className="p-2 border border-gray-600 text-center">{step.front}</td>
                            <td className="p-2 border border-gray-600 text-center">{step.rear}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Code View */
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Array Queue Implementation</h2>
                  <pre className="p-3 rounded-lg overflow-x-auto max-h-96 bg-gray-700 text-sm border border-gray-600">
                    <code>
                      {codeData.map((item, index) => (
                        <div
                          key={index}
                          className={`${index === codeStep ? "bg-yellow-900 bg-opacity-70" : ""} 
                                    hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer py-1 px-2 flex`}
                          onClick={() => jumpToStep(index)}
                        >
                          <span className="mr-3 w-5 text-right text-gray-500">
                            {index + 1}
                          </span>
                          <span className={item.important ? "font-semibold text-green-300" : "text-gray-300"}>
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
                      className={`px-3 py-1 rounded-lg ${codeStep === 0 ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={togglePlay}
                      className={`px-3 py-1 rounded-lg ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
                    >
                      {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={codeStep === codeData.length - 1}
                      className={`px-3 py-1 rounded-lg ${codeStep === codeData.length - 1 ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
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
                /* Queue Visualization View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full border border-gray-700">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Queue Visualization</h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-full border-2 border-gray-600 rounded-lg bg-gray-700 flex flex-col items-center p-4">
                      <div className="w-full max-w-md">
                        {/* Queue representation */}
                        <div className="mb-4 flex justify-between">
                          <div className="text-sm text-green-400">
                            Front: {front >= 0 ? `queue[${front}]` : "Empty (front = -1)"}
                          </div>
                          <div className="text-sm text-blue-400">
                            Rear: {rear >= 0 ? `queue[${rear}]` : "Empty (rear = -1)"}
                          </div>
                        </div>
                        
                        {/* Array visualization */}
                        <div className="border border-gray-600 rounded-lg overflow-hidden">
                          {Array.from({ length: capacity }).map((_, idx) => {
                            const isFront = idx === front;
                            const isRear = idx === rear;
                            const hasValue = queue[idx] !== null;
                            const isActive = (front <= rear && idx >= front && idx <= rear) || 
                                            (front > rear && (idx >= front || idx <= rear));
                            
                            return (
                              <div 
                                key={idx} 
                                className={`flex items-center border-b border-gray-600 last:border-b-0 ${
                                  isFront && isRear ? 'bg-purple-900' :
                                  isFront ? 'bg-green-900' :
                                  isRear ? 'bg-blue-900' :
                                  isActive ? 'bg-gray-800' : 'bg-gray-700'
                                }`}
                              >
                                <div className="w-16 p-2 border-r border-gray-600 text-right text-gray-400">
                                  queue[{idx}]:
                                </div>
                                <div className="p-2 flex-1 text-center font-mono">
                                  {hasValue ? queue[idx] : '∅'}
                                </div>
                                {isFront && (
                                  <div className="p-2 text-xs text-green-400">
                                    ← front
                                  </div>
                                )}
                                {isRear && !isFront && (
                                  <div className="p-2 text-xs text-blue-400">
                                    ← rear
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Queue operations */}
                        <div className="flex gap-3 mt-4">
                          <div className="flex-1">
                            <input
                              type="number"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              placeholder="Enter value to enqueue"
                              className="w-full p-2 border rounded bg-gray-700 border-gray-600 hover:border-gray-500 focus:border-green-500 transition-colors"
                            />
                          </div>
                          <button
                            onClick={enqueue}
                            disabled={isCircular ? (rear + 1) % capacity === front : rear === capacity - 1}
                            className={`px-4 py-2 rounded ${
                              isCircular ? (rear + 1) % capacity === front : rear === capacity - 1
                                ? 'bg-gray-700 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'
                            } text-white transition-colors`}
                          >
                            Enqueue
                          </button>
                          <button
                            onClick={dequeue}
                            disabled={front === -1}
                            className={`px-4 py-2 rounded ${
                              front === -1 
                                ? 'bg-gray-700 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'
                            } text-white transition-colors`}
                          >
                            Dequeue
                          </button>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Capacity: {capacity}
                          </div>
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Current Size: {front === -1 ? 0 : isCircular ? 
                              (rear >= front ? rear - front + 1 : capacity - front + rear + 1) : 
                              rear - front + 1}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            front === -1 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                          }`}>
                            {front === -1 ? 'Queue Empty' : 'Queue Not Empty'}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            isCircular ? (rear + 1) % capacity === front : rear === capacity - 1
                              ? 'bg-red-900 border-red-600' 
                              : 'bg-gray-700 border-gray-600'
                          }`}>
                            {isCircular ? (rear + 1) % capacity === front : rear === capacity - 1
                              ? 'Queue Full' 
                              : 'Queue Not Full'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Explanation Box View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full border border-gray-700">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Code Explanation</h2>
                  <div className="p-3 rounded-lg mb-4 bg-gray-700 border border-gray-600">
                    <h3 className="font-semibold mb-1 text-blue-300">Current Line Explanation</h3>
                    <p className="text-gray-300">{codeData[codeStep]?.explanation || "No explanation needed for this line."}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      Line {codeStep + 1} of {codeData.length}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1 text-blue-300">Queue Status</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Front Pointer:</div>
                          <div className="font-bold text-green-400">{front}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Rear Pointer:</div>
                          <div className="font-bold text-blue-400">{rear}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Capacity:</div>
                          <div className="font-bold">{capacity}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Current Size:</div>
                          <div className="font-bold">
                            {front === -1 ? 0 : isCircular ? 
                              (rear >= front ? rear - front + 1 : capacity - front + rear + 1) : 
                              rear - front + 1}
                          </div>
                        </div>
                        <div className={`p-2 rounded border ${
                          front === -1 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Empty:</div>
                          <div className="font-bold">{front === -1 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded border ${
                          isCircular ? (rear + 1) % capacity === front : rear === capacity - 1
                            ? 'bg-red-900 border-red-600' 
                            : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Full:</div>
                          <div className="font-bold">
                            {isCircular ? (rear + 1) % capacity === front : rear === capacity - 1
                              ? 'Yes' 
                              : 'No'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1 text-blue-300">Last Operation</h3>
                      <div className="p-2 rounded bg-gray-700 border border-gray-600">
                        {variables.lastOperation || "None"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="p-4 rounded-lg shadow-lg w-full max-w-6xl mt-4 bg-gray-800 border border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-green-400">
              Queue Implementation Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 border border-gray-600">Feature</th>
                    <th className="p-2 border border-gray-600">Array Queue</th>
                    <th className="p-2 border border-gray-600">Linked List Queue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Memory Usage</td>
                    <td className="p-2 border border-gray-600">Fixed size, may waste space</td>
                    <td className="p-2 border border-gray-600">Dynamic allocation, no waste</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Time Complexity</td>
                    <td className="p-2 border border-gray-600">O(1) operations</td>
                    <td className="p-2 border border-gray-600">O(1) operations</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Memory Management</td>
                    <td className="p-2 border border-gray-600">Static allocation</td>
                    <td className="p-2 border border-gray-600">Dynamic allocation/free</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Overflow</td>
                    <td className="p-2 border border-gray-600">Possible (fixed size)</td>
                    <td className="p-2 border border-gray-600">Only with memory exhaustion</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Implementation</td>
                    <td className="p-2 border border-gray-600">Simpler, uses array</td>
                    <td className="p-2 border border-gray-600">More complex, uses pointers</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Cache Performance</td>
                    <td className="p-2 border border-gray-600">Better (contiguous memory)</td>
                    <td className="p-2 border border-gray-600">Worse (scattered memory)</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Best Use Case</td>
                    <td className="p-2 border border-gray-600">When size is known and fixed</td>
                    <td className="p-2 border border-gray-600">When size is unpredictable</td>
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