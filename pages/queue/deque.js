import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DoubleEndedQueue() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [deque, setDeque] = useState(Array(5).fill(null));
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
      explanation: "Defines maximum capacity of the deque.",
      important: true 
    },
    { 
      line: "int deque[MAX];", 
      explanation: "Array declaration for deque implementation.",
      important: true 
    },
    { 
      line: "int front = -1, rear = -1;", 
      explanation: "Front and rear pointers initialized to -1 (empty deque).",
      important: true 
    },
    { 
      line: "void insertFront(int item) {", 
      explanation: "Function to add an element at the front.",
      important: true 
    },
    { 
      line: "    if ((front == 0 && rear == MAX-1) || (front == rear + 1)) {", 
      explanation: "Check if deque is full.",
      important: true 
    },
    { 
      line: "        printf(\"Deque Overflow!\\n\");", 
      explanation: "Error message for deque overflow.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if deque is full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check block.",
      important: false 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "If deque is empty.",
      important: true 
    },
    { 
      line: "        front = rear = 0;", 
      explanation: "Initialize both pointers.",
      important: true 
    },
    { 
      line: "    } else if (front == 0) {", 
      explanation: "If front is at first position.",
      important: true 
    },
    { 
      line: "        front = MAX - 1;", 
      explanation: "Move front to end (circular behavior).",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Normal case.",
      important: false 
    },
    { 
      line: "        front = front - 1;", 
      explanation: "Move front backward.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of front position cases.",
      important: false 
    },
    { 
      line: "    deque[front] = item;", 
      explanation: "Store item at front position.",
      important: true 
    },
    { 
      line: "    printf(\"Inserted %d at front\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of insertFront function.",
      important: false 
    },
    { 
      line: "void insertRear(int item) {", 
      explanation: "Function to add an element at the rear.",
      important: true 
    },
    { 
      line: "    if ((front == 0 && rear == MAX-1) || (front == rear + 1)) {", 
      explanation: "Check if deque is full.",
      important: true 
    },
    { 
      line: "        printf(\"Deque Overflow!\\n\");", 
      explanation: "Error message for deque overflow.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if deque is full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check block.",
      important: false 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "If deque is empty.",
      important: true 
    },
    { 
      line: "        front = rear = 0;", 
      explanation: "Initialize both pointers.",
      important: true 
    },
    { 
      line: "    } else if (rear == MAX - 1) {", 
      explanation: "If rear is at last position.",
      important: true 
    },
    { 
      line: "        rear = 0;", 
      explanation: "Move rear to start (circular behavior).",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Normal case.",
      important: false 
    },
    { 
      line: "        rear = rear + 1;", 
      explanation: "Move rear forward.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of rear position cases.",
      important: false 
    },
    { 
      line: "    deque[rear] = item;", 
      explanation: "Store item at rear position.",
      important: true 
    },
    { 
      line: "    printf(\"Inserted %d at rear\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of insertRear function.",
      important: false 
    },
    { 
      line: "int deleteFront() {", 
      explanation: "Function to remove and return front element.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if deque is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Deque Underflow!\\n\");", 
      explanation: "Error message for deque underflow.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty deque.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check block.",
      important: false 
    },
    { 
      line: "    int item = deque[front];", 
      explanation: "Store front element to return.",
      important: true 
    },
    { 
      line: "    if (front == rear) {", 
      explanation: "If only one element in deque.",
      important: true 
    },
    { 
      line: "        front = rear = -1;", 
      explanation: "Reset pointers.",
      important: true 
    },
    { 
      line: "    } else if (front == MAX - 1) {", 
      explanation: "If front is at end.",
      important: true 
    },
    { 
      line: "        front = 0;", 
      explanation: "Move front to start (circular behavior).",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Normal case.",
      important: false 
    },
    { 
      line: "        front = front + 1;", 
      explanation: "Move front forward.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of front position cases.",
      important: false 
    },
    { 
      line: "    printf(\"Deleted %d from front\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return the deleted element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of deleteFront function.",
      important: false 
    },
    { 
      line: "int deleteRear() {", 
      explanation: "Function to remove and return rear element.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if deque is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Deque Underflow!\\n\");", 
      explanation: "Error message for deque underflow.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty deque.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check block.",
      important: false 
    },
    { 
      line: "    int item = deque[rear];", 
      explanation: "Store rear element to return.",
      important: true 
    },
    { 
      line: "    if (front == rear) {", 
      explanation: "If only one element in deque.",
      important: true 
    },
    { 
      line: "        front = rear = -1;", 
      explanation: "Reset pointers.",
      important: true 
    },
    { 
      line: "    } else if (rear == 0) {", 
      explanation: "If rear is at start.",
      important: true 
    },
    { 
      line: "        rear = MAX - 1;", 
      explanation: "Move rear to end (circular behavior).",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Normal case.",
      important: false 
    },
    { 
      line: "        rear = rear - 1;", 
      explanation: "Move rear backward.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of rear position cases.",
      important: false 
    },
    { 
      line: "    printf(\"Deleted %d from rear\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return the deleted element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of deleteRear function.",
      important: false 
    },
    { 
      line: "int peekFront() {", 
      explanation: "Function to view front element without removal.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if deque is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Deque is empty\\n\");", 
      explanation: "Message for empty deque.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty deque.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty deque check.",
      important: false 
    },
    { 
      line: "    return deque[front];", 
      explanation: "Return front element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of peekFront function.",
      important: false 
    },
    { 
      line: "int peekRear() {", 
      explanation: "Function to view rear element without removal.",
      important: true 
    },
    { 
      line: "    if (front == -1) {", 
      explanation: "Check if deque is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Deque is empty\\n\");", 
      explanation: "Message for empty deque.",
      important: true 
    },
    { 
      line: "        return -1;", 
      explanation: "Return error value for empty deque.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty deque check.",
      important: false 
    },
    { 
      line: "    return deque[rear];", 
      explanation: "Return rear element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of peekRear function.",
      important: false 
    },
    { 
      line: "int isEmpty() {", 
      explanation: "Function to check if deque is empty.",
      important: true 
    },
    { 
      line: "    return (front == -1);", 
      explanation: "Return true if deque is empty.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isEmpty function.",
      important: false 
    },
    { 
      line: "int isFull() {", 
      explanation: "Function to check if deque is full.",
      important: true 
    },
    { 
      line: "    return ((front == 0 && rear == MAX-1) || (front == rear + 1));", 
      explanation: "Return true if deque is full.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isFull function.",
      important: false 
    }
  ];

  // Deque operations
  const insertFront = () => {
    if ((front === 0 && rear === capacity - 1) || (front === rear + 1)) {
      setOperationHistory(prev => [...prev, "Deque Overflow!"]);
      return;
    }
    
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    let newFront = front;
    let newRear = rear;
    
    if (front === -1) {
      newFront = newRear = 0;
    } else if (front === 0) {
      newFront = capacity - 1;
    } else {
      newFront = front - 1;
    }
    
    const newDeque = [...deque];
    newDeque[newFront] = value;
    
    setDeque(newDeque);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Inserted ${value} at front`]);
    setUserInput("");
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'insertFront',
      value,
      dequeState: [...newDeque],
      front: newFront,
      rear: newRear
    }]);
  };

  const insertRear = () => {
    if ((front === 0 && rear === capacity - 1) || (front === rear + 1)) {
      setOperationHistory(prev => [...prev, "Deque Overflow!"]);
      return;
    }
    
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    let newFront = front;
    let newRear = rear;
    
    if (front === -1) {
      newFront = newRear = 0;
    } else if (rear === capacity - 1) {
      newRear = 0;
    } else {
      newRear = rear + 1;
    }
    
    const newDeque = [...deque];
    newDeque[newRear] = value;
    
    setDeque(newDeque);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Inserted ${value} at rear`]);
    setUserInput("");
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'insertRear',
      value,
      dequeState: [...newDeque],
      front: newFront,
      rear: newRear
    }]);
  };

  const deleteFront = () => {
    if (front === -1) {
      setOperationHistory(prev => [...prev, "Deque Underflow!"]);
      return;
    }
    
    const value = deque[front];
    let newFront = front;
    let newRear = rear;
    const newDeque = [...deque];
    newDeque[front] = null;
    
    if (front === rear) {
      newFront = newRear = -1;
    } else if (front === capacity - 1) {
      newFront = 0;
    } else {
      newFront = front + 1;
    }
    
    setDeque(newDeque);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Deleted ${value} from front`]);
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'deleteFront',
      value,
      dequeState: [...newDeque],
      front: newFront,
      rear: newRear
    }]);
  };

  const deleteRear = () => {
    if (front === -1) {
      setOperationHistory(prev => [...prev, "Deque Underflow!"]);
      return;
    }
    
    const value = deque[rear];
    let newFront = front;
    let newRear = rear;
    const newDeque = [...deque];
    newDeque[rear] = null;
    
    if (front === rear) {
      newFront = newRear = -1;
    } else if (rear === 0) {
      newRear = capacity - 1;
    } else {
      newRear = rear - 1;
    }
    
    setDeque(newDeque);
    setFront(newFront);
    setRear(newRear);
    setOperationHistory(prev => [...prev, `Deleted ${value} from rear`]);
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'deleteRear',
      value,
      dequeState: [...newDeque],
      front: newFront,
      rear: newRear
    }]);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: "What is the main advantage of a deque over a regular queue?",
      options: [
        "Faster enqueue operations",
        "Ability to add/remove from both ends",
        "Better memory utilization",
        "Automatic sorting of elements"
      ],
      answer: 1,
      explanation: "Deque allows insertion and deletion at both ends, making it more versatile."
    },
    {
      question: "What is the time complexity of insertion/deletion operations in a deque?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0,
      explanation: "All deque operations are O(1) when implemented with a circular buffer."
    },
    {
      question: "How do you check if a deque is full in circular implementation?",
      options: [
        "front == 0 && rear == MAX-1",
        "front == rear + 1",
        "Either A or B",
        "front == rear"
      ],
      answer: 2,
      explanation: "A deque is full when either front is at 0 and rear at MAX-1, or front is one position behind rear."
    },
    {
      question: "Which operation is NOT supported by a deque?",
      options: [
        "push_front (insert at front)",
        "push_back (insert at rear)",
        "pop_middle (remove from middle)",
        "pop_back (remove from rear)"
      ],
      answer: 2,
      explanation: "Standard deque doesn't support direct removal from the middle."
    },
    {
      question: "What happens when you try to delete from an empty deque?",
      options: [
        "It returns a default value",
        "It causes deque underflow",
        "It automatically resizes",
        "It returns null"
      ],
      answer: 1,
      explanation: "Attempting to delete from an empty deque results in underflow."
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
      deque: [...deque],
      capacity: capacity,
      isFull: (front === 0 && rear === capacity - 1) || (front === rear + 1),
      isEmpty: front === -1,
      lastOperation: operationHistory[operationHistory.length - 1] || "None",
      frontValue: front !== -1 ? deque[front] : null,
      rearValue: rear !== -1 ? deque[rear] : null
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

  // Update variables when deque changes
  useEffect(() => {
    updateVariables(codeStep);
  }, [deque, front, rear]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
        Double-Ended Queue (Deque) Visualization
      </h1>
      
      {/* Control Bar */}
      <div className="flex gap-3 mb-4 w-full max-w-6xl justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
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
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
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
                          <th className="p-2 border border-gray-600">Deque State</th>
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
                            <td className="p-2 border border-gray-600">[{step.dequeState.map(v => v === null ? '∅' : v).join(', ')}]</td>
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
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Deque Implementation</h2>
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
                      className={`px-3 py-1 rounded-lg ${codeStep === 0 ? 'bg-gray-700' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
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
                      className={`px-3 py-1 rounded-lg ${codeStep === codeData.length - 1 ? 'bg-gray-700' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
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
                /* Deque Visualization View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full border border-gray-700">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">Deque Visualization</h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-full border-2 border-gray-600 rounded-lg bg-gray-700 flex flex-col items-center p-4">
                      <div className="w-full max-w-md">
                        {/* Deque representation */}
                        <div className="mb-4 flex justify-between">
                          <div className="text-sm text-green-400">
                            Front: {front >= 0 ? `deque[${front}]` : "Empty (front = -1)"}
                          </div>
                          <div className="text-sm text-green-400">
                            Rear: {rear >= 0 ? `deque[${rear}]` : "Empty (rear = -1)"}
                          </div>
                        </div>
                        
                        {/* Array visualization */}
                        <div className="border border-gray-600 rounded-lg overflow-hidden mb-4">
                          {Array.from({ length: capacity }).map((_, idx) => {
                            const isFront = idx === front;
                            const isRear = idx === rear;
                            const hasValue = deque[idx] !== null;
                            const isActive = (front <= rear && idx >= front && idx <= rear) || 
                                            (front > rear && (idx >= front || idx <= rear));
                            
                            return (
                              <div 
                                key={idx} 
                                className={`flex items-center border-b border-gray-600 last:border-b-0 ${
                                  isFront && isRear ? 'bg-purple-900' :
                                  isFront ? 'bg-green-900' :
                                  isRear ? 'bg-green-900' :
                                  isActive ? 'bg-gray-800' : 'bg-gray-700'
                                }`}
                              >
                                <div className="w-16 p-2 border-r border-gray-600 text-right text-gray-400">
                                  deque[{idx}]:
                                </div>
                                <div className="p-2 flex-1 text-center font-mono">
                                  {hasValue ? deque[idx] : '∅'}
                                </div>
                                {isFront && (
                                  <div className="p-2 text-xs text-green-400">
                                    ← front
                                  </div>
                                )}
                                {isRear && !isFront && (
                                  <div className="p-2 text-xs text-green-400">
                                    ← rear
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Deque operations */}
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <input
                                type="number"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter value"
                                className="w-full p-2 border rounded bg-gray-700 border-gray-600 hover:border-gray-500 focus:border-green-500 transition-colors"
                              />
                            </div>
                            <button
                              onClick={insertFront}
                              disabled={(front === 0 && rear === capacity - 1) || (front === rear + 1)}
                              className={`px-4 py-2 rounded ${
                                (front === 0 && rear === capacity - 1) || (front === rear + 1)
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } text-white transition-colors`}
                            >
                              Insert Front
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={deleteFront}
                              disabled={front === -1}
                              className={`px-4 py-2 rounded flex-1 ${
                                front === -1 
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-red-600 hover:bg-red-700'
                              } text-white transition-colors`}
                            >
                              Delete Front
                            </button>
                            <button
                              onClick={deleteRear}
                              disabled={front === -1}
                              className={`px-4 py-2 rounded flex-1 ${
                                front === -1 
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-red-600 hover:bg-red-700'
                              } text-white transition-colors`}
                            >
                              Delete Rear
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={insertRear}
                              disabled={(front === 0 && rear === capacity - 1) || (front === rear + 1)}
                              className={`px-4 py-2 rounded ${
                                (front === 0 && rear === capacity - 1) || (front === rear + 1)
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } text-white transition-colors`}
                            >
                              Insert Rear
                            </button>
                            <div className="flex-1">
                              {/* Empty div for layout */}
                            </div>
                          </div>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Capacity: {capacity}
                          </div>
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Current Size: {front === -1 ? 0 : 
                              (rear >= front ? rear - front + 1 : capacity - front + rear + 1)}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            front === -1 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                          }`}>
                            {front === -1 ? 'Deque Empty' : 'Deque Not Empty'}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            (front === 0 && rear === capacity - 1) || (front === rear + 1)
                              ? 'bg-red-900 border-red-600' 
                              : 'bg-gray-700 border-gray-600'
                          }`}>
                            {(front === 0 && rear === capacity - 1) || (front === rear + 1)
                              ? 'Deque Full' 
                              : 'Deque Not Full'}
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
                    <h3 className="font-semibold mb-1 text-green-300">Current Line Explanation</h3>
                    <p className="text-gray-300">{codeData[codeStep]?.explanation || "No explanation needed for this line."}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      Line {codeStep + 1} of {codeData.length}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1 text-green-300">Deque Status</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Front Pointer:</div>
                          <div className="font-bold text-green-400">{front}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Rear Pointer:</div>
                          <div className="font-bold text-green-400">{rear}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Capacity:</div>
                          <div className="font-bold">{capacity}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Current Size:</div>
                          <div className="font-bold">
                            {front === -1 ? 0 : 
                              (rear >= front ? rear - front + 1 : capacity - front + rear + 1)}
                          </div>
                        </div>
                        <div className={`p-2 rounded border ${
                          front === -1 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Empty:</div>
                          <div className="font-bold">{front === -1 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded border ${
                          (front === 0 && rear === capacity - 1) || (front === rear + 1)
                            ? 'bg-red-900 border-red-600' 
                            : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Full:</div>
                          <div className="font-bold">
                            {(front === 0 && rear === capacity - 1) || (front === rear + 1)
                              ? 'Yes' 
                              : 'No'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1 text-green-300">Element Values</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Front Element:</div>
                          <div className="font-bold">
                            {front !== -1 ? deque[front] : "None"}
                          </div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Rear Element:</div>
                          <div className="font-bold">
                            {rear !== -1 ? deque[rear] : "None"}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1 text-green-300">Last Operation</h3>
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
              Queue Type Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 border border-gray-600">Feature</th>
                    <th className="p-2 border border-gray-600">Regular Queue</th>
                    <th className="p-2 border border-gray-600">Circular Queue</th>
                    <th className="p-2 border border-gray-600">Deque</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Insertion Front</td>
                    <td className="p-2 border border-gray-600">No</td>
                    <td className="p-2 border border-gray-600">No</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Insertion Rear</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Deletion Front</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Deletion Rear</td>
                    <td className="p-2 border border-gray-600">No</td>
                    <td className="p-2 border border-gray-600">No</td>
                    <td className="p-2 border border-gray-600">Yes</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Memory Usage</td>
                    <td className="p-2 border border-gray-600">Fixed, may waste space</td>
                    <td className="p-2 border border-gray-600">Fixed, better utilization</td>
                    <td className="p-2 border border-gray-600">Fixed, circular behavior</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Time Complexity</td>
                    <td className="p-2 border border-gray-600">O(1) operations</td>
                    <td className="p-2 border border-gray-600">O(1) operations</td>
                    <td className="p-2 border border-gray-600">O(1) operations</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Use Cases</td>
                    <td className="p-2 border border-gray-600">Simple FIFO</td>
                    <td className="p-2 border border-gray-600">FIFO with better memory use</td>
                    <td className="p-2 border border-gray-600">Flexible front/rear operations</td>
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