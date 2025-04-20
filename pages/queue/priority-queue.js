import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PriorityQueue() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [queue, setQueue] = useState([]);
  const [operationHistory, setOperationHistory] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userPriority, setUserPriority] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [implementation, setImplementation] = useState("heap"); // "array" or "heap"
  const [capacity] = useState(10);

  // Refs
  const playInterval = useRef(null);

  // Complete C code with line-by-line explanations
  const heapCodeData = [
    { 
      line: "#include <stdio.h>", 
      explanation: "Standard input/output library for functions like printf().",
      important: true 
    },
    { 
      line: "#define MAX 10", 
      explanation: "Defines maximum capacity of the priority queue.",
      important: true 
    },
    { 
      line: "typedef struct {", 
      explanation: "Define a structure for queue elements.",
      important: true 
    },
    { 
      line: "    int value;", 
      explanation: "The actual value stored in the queue.",
      important: true 
    },
    { 
      line: "    int priority;", 
      explanation: "The priority of the value (lower numbers = higher priority).",
      important: true 
    },
    { 
      line: "} Element;", 
      explanation: "Type definition for queue elements.",
      important: true 
    },
    { 
      line: "Element heap[MAX];", 
      explanation: "Array implementation of the priority queue as a max-heap.",
      important: true 
    },
    { 
      line: "int size = 0;", 
      explanation: "Current number of elements in the priority queue.",
      important: true 
    },
    { 
      line: "void swap(Element *a, Element *b) {", 
      explanation: "Helper function to swap two elements.",
      important: true 
    },
    { 
      line: "    Element temp = *a;", 
      explanation: "Temporary storage during swap.",
      important: false 
    },
    { 
      line: "    *a = *b;", 
      explanation: "Assign b to a.",
      important: false 
    },
    { 
      line: "    *b = temp;", 
      explanation: "Assign temp to b.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of swap function.",
      important: false 
    },
    { 
      line: "void heapifyUp(int index) {", 
      explanation: "Maintain heap property when adding elements.",
      important: true 
    },
    { 
      line: "    int parent = (index - 1) / 2;", 
      explanation: "Calculate parent index.",
      important: true 
    },
    { 
      line: "    while (index > 0 && heap[index].priority > heap[parent].priority) {", 
      explanation: "While current element has higher priority than parent.",
      important: true 
    },
    { 
      line: "        swap(&heap[index], &heap[parent]);", 
      explanation: "Swap with parent.",
      important: true 
    },
    { 
      line: "        index = parent;", 
      explanation: "Move to parent position.",
      important: true 
    },
    { 
      line: "        parent = (index - 1) / 2;", 
      explanation: "Recalculate parent.",
      important: false 
    },
    { 
      line: "    }", 
      explanation: "End of while loop.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of heapifyUp function.",
      important: false 
    },
    { 
      line: "void heapifyDown(int index) {", 
      explanation: "Maintain heap property when removing elements.",
      important: true 
    },
    { 
      line: "    int left = 2 * index + 1;", 
      explanation: "Left child index.",
      important: true 
    },
    { 
      line: "    int right = 2 * index + 2;", 
      explanation: "Right child index.",
      important: true 
    },
    { 
      line: "    int largest = index;", 
      explanation: "Assume current is largest.",
      important: true 
    },
    { 
      line: "    if (left < size && heap[left].priority > heap[largest].priority) {", 
      explanation: "If left child has higher priority.",
      important: true 
    },
    { 
      line: "        largest = left;", 
      explanation: "Update largest.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of left child check.",
      important: false 
    },
    { 
      line: "    if (right < size && heap[right].priority > heap[largest].priority) {", 
      explanation: "If right child has higher priority.",
      important: true 
    },
    { 
      line: "        largest = right;", 
      explanation: "Update largest.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of right child check.",
      important: false 
    },
    { 
      line: "    if (largest != index) {", 
      explanation: "If we need to swap.",
      important: true 
    },
    { 
      line: "        swap(&heap[index], &heap[largest]);", 
      explanation: "Perform the swap.",
      important: true 
    },
    { 
      line: "        heapifyDown(largest);", 
      explanation: "Recursively heapify down.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of swap condition.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of heapifyDown function.",
      important: false 
    },
    { 
      line: "void enqueue(int value, int priority) {", 
      explanation: "Add element to priority queue.",
      important: true 
    },
    { 
      line: "    if (size == MAX) {", 
      explanation: "Check if queue is full.",
      important: true 
    },
    { 
      line: "        printf(\"Priority Queue Overflow!\\n\");", 
      explanation: "Error message for overflow.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit if full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check.",
      important: false 
    },
    { 
      line: "    heap[size].value = value;", 
      explanation: "Set value of new element.",
      important: true 
    },
    { 
      line: "    heap[size].priority = priority;", 
      explanation: "Set priority of new element.",
      important: true 
    },
    { 
      line: "    heapifyUp(size);", 
      explanation: "Maintain heap property.",
      important: true 
    },
    { 
      line: "    size++;", 
      explanation: "Increment size.",
      important: true 
    },
    { 
      line: "    printf(\"Enqueued %d with priority %d\\n\", value, priority);", 
      explanation: "Confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of enqueue function.",
      important: false 
    },
    { 
      line: "Element dequeue() {", 
      explanation: "Remove highest priority element.",
      important: true 
    },
    { 
      line: "    if (size == 0) {", 
      explanation: "Check if queue is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Priority Queue Underflow!\\n\");", 
      explanation: "Error message for underflow.",
      important: true 
    },
    { 
      line: "        Element empty = {-1, -1};", 
      explanation: "Return empty element for error.",
      important: true 
    },
    { 
      line: "        return empty;", 
      explanation: "Return error element.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check.",
      important: false 
    },
    { 
      line: "    Element item = heap[0];", 
      explanation: "Get highest priority element.",
      important: true 
    },
    { 
      line: "    heap[0] = heap[size - 1];", 
      explanation: "Move last element to root.",
      important: true 
    },
    { 
      line: "    size--;", 
      explanation: "Decrement size.",
      important: true 
    },
    { 
      line: "    heapifyDown(0);", 
      explanation: "Maintain heap property.",
      important: true 
    },
    { 
      line: "    printf(\"Dequeued %d with priority %d\\n\", item.value, item.priority);", 
      explanation: "Confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return dequeued element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of dequeue function.",
      important: false 
    },
    { 
      line: "Element peek() {", 
      explanation: "View highest priority element without removal.",
      important: true 
    },
    { 
      line: "    if (size == 0) {", 
      explanation: "Check if queue is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Priority Queue is empty\\n\");", 
      explanation: "Error message for empty queue.",
      important: true 
    },
    { 
      line: "        Element empty = {-1, -1};", 
      explanation: "Return empty element for error.",
      important: true 
    },
    { 
      line: "        return empty;", 
      explanation: "Return error element.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty check.",
      important: false 
    },
    { 
      line: "    return heap[0];", 
      explanation: "Return highest priority element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of peek function.",
      important: false 
    },
    { 
      line: "int isEmpty() {", 
      explanation: "Check if queue is empty.",
      important: true 
    },
    { 
      line: "    return size == 0;", 
      explanation: "Return true if empty.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isEmpty function.",
      important: false 
    },
    { 
      line: "int isFull() {", 
      explanation: "Check if queue is full.",
      important: true 
    },
    { 
      line: "    return size == MAX;", 
      explanation: "Return true if full.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isFull function.",
      important: false 
    }
  ];

  const arrayCodeData = [
    { 
      line: "#include <stdio.h>", 
      explanation: "Standard input/output library.",
      important: true 
    },
    { 
      line: "#define MAX 10", 
      explanation: "Maximum capacity of priority queue.",
      important: true 
    },
    { 
      line: "typedef struct {", 
      explanation: "Structure for queue elements.",
      important: true 
    },
    { 
      line: "    int value;", 
      explanation: "The stored value.",
      important: true 
    },
    { 
      line: "    int priority;", 
      explanation: "Priority of the value.",
      important: true 
    },
    { 
      line: "} Element;", 
      explanation: "Type definition.",
      important: true 
    },
    { 
      line: "Element queue[MAX];", 
      explanation: "Array implementation.",
      important: true 
    },
    { 
      line: "int size = 0;", 
      explanation: "Current size of queue.",
      important: true 
    },
    { 
      line: "void enqueue(int value, int priority) {", 
      explanation: "Add element to queue.",
      important: true 
    },
    { 
      line: "    if (size == MAX) {", 
      explanation: "Check if queue is full.",
      important: true 
    },
    { 
      line: "        printf(\"Priority Queue Overflow!\\n\");", 
      explanation: "Overflow error message.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit if full.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of overflow check.",
      important: false 
    },
    { 
      line: "    int i;", 
      explanation: "Loop variable.",
      important: false 
    },
    { 
      line: "    for (i = size - 1; i >= 0; i--) {", 
      explanation: "Find correct position.",
      important: true 
    },
    { 
      line: "        if (priority <= queue[i].priority) {", 
      explanation: "Compare priorities.",
      important: true 
    },
    { 
      line: "            break;", 
      explanation: "Found insertion point.",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "End of comparison.",
      important: false 
    },
    { 
      line: "        queue[i + 1] = queue[i];", 
      explanation: "Shift elements right.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of for loop.",
      important: false 
    },
    { 
      line: "    queue[i + 1].value = value;", 
      explanation: "Insert new element.",
      important: true 
    },
    { 
      line: "    queue[i + 1].priority = priority;", 
      explanation: "Set priority.",
      important: true 
    },
    { 
      line: "    size++;", 
      explanation: "Increment size.",
      important: true 
    },
    { 
      line: "    printf(\"Enqueued %d with priority %d\\n\", value, priority);", 
      explanation: "Confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of enqueue function.",
      important: false 
    },
    { 
      line: "Element dequeue() {", 
      explanation: "Remove highest priority element.",
      important: true 
    },
    { 
      line: "    if (size == 0) {", 
      explanation: "Check if queue is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Priority Queue Underflow!\\n\");", 
      explanation: "Underflow error message.",
      important: true 
    },
    { 
      line: "        Element empty = {-1, -1};", 
      explanation: "Error element.",
      important: true 
    },
    { 
      line: "        return empty;", 
      explanation: "Return error.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of underflow check.",
      important: false 
    },
    { 
      line: "    Element item = queue[0];", 
      explanation: "Get first element.",
      important: true 
    },
    { 
      line: "    for (int i = 1; i < size; i++) {", 
      explanation: "Shift elements left.",
      important: true 
    },
    { 
      line: "        queue[i - 1] = queue[i];", 
      explanation: "Perform shift.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of for loop.",
      important: false 
    },
    { 
      line: "    size--;", 
      explanation: "Decrement size.",
      important: true 
    },
    { 
      line: "    printf(\"Dequeued %d with priority %d\\n\", item.value, item.priority);", 
      explanation: "Confirmation message.",
      important: true 
    },
    { 
      line: "    return item;", 
      explanation: "Return dequeued element.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of dequeue function.",
      important: false 
    }
  ];

  const codeData = implementation === "heap" ? heapCodeData : arrayCodeData;

  // Queue operations
  const enqueue = () => {
    if (queue.length >= capacity) {
      setOperationHistory(prev => [...prev, "Priority Queue Overflow!"]);
      return;
    }
    
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    const priority = userPriority !== "" ? parseInt(userPriority) : Math.floor(Math.random() * 10) + 1;
    
    let newQueue;
    if (implementation === "heap") {
      // Heap implementation (max-heap)
      newQueue = [...queue, { value, priority }];
      // Heapify up
      let index = newQueue.length - 1;
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (newQueue[index].priority <= newQueue[parentIndex].priority) break;
        // Swap
        [newQueue[index], newQueue[parentIndex]] = [newQueue[parentIndex], newQueue[index]];
        index = parentIndex;
      }
    } else {
      // Array implementation (sorted insertion)
      newQueue = [...queue];
      let i;
      for (i = newQueue.length - 1; i >= 0; i--) {
        if (priority <= newQueue[i].priority) break;
      }
      newQueue.splice(i + 1, 0, { value, priority });
    }
    
    setQueue(newQueue);
    setOperationHistory(prev => [...prev, `Enqueued ${value} with priority ${priority}`]);
    setUserInput("");
    setUserPriority("");
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'enqueue',
      value,
      priority,
      queueState: [...newQueue],
      size: newQueue.length
    }]);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setOperationHistory(prev => [...prev, "Priority Queue Underflow!"]);
      return;
    }
    
    let newQueue;
    let item;
    
    if (implementation === "heap") {
      // Heap implementation
      item = queue[0];
      newQueue = [...queue];
      newQueue[0] = newQueue[newQueue.length - 1];
      newQueue.pop();
      
      // Heapify down
      let index = 0;
      while (true) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;
        
        if (left < newQueue.length && newQueue[left].priority > newQueue[largest].priority) {
          largest = left;
        }
        
        if (right < newQueue.length && newQueue[right].priority > newQueue[largest].priority) {
          largest = right;
        }
        
        if (largest === index) break;
        
        [newQueue[index], newQueue[largest]] = [newQueue[largest], newQueue[index]];
        index = largest;
      }
    } else {
      // Array implementation
      item = queue[0];
      newQueue = queue.slice(1);
    }
    
    setQueue(newQueue);
    setOperationHistory(prev => [...prev, `Dequeued ${item.value} with priority ${item.priority}`]);
    
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'dequeue',
      value: item.value,
      priority: item.priority,
      queueState: [...newQueue],
      size: newQueue.length
    }]);
  };

  // Quiz questions
  const quizQuestions = [
    {
      question: "What is the time complexity of enqueue in a heap-based priority queue?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 1,
      explanation: "Enqueue in a heap is O(log n) due to the heapify-up operation."
    },
    {
      question: "Which priority queue implementation is more efficient for large datasets?",
      options: [
        "Array-based (sorted insertion)",
        "Heap-based",
        "Both are equally efficient",
        "Depends on the programming language"
      ],
      answer: 1,
      explanation: "Heap-based is more efficient with O(log n) operations vs O(n) for array-based."
    },
    {
      question: "In a max-heap priority queue, where is the highest priority element located?",
      options: [
        "At the root of the heap",
        "At the end of the array",
        "In the middle of the heap",
        "Randomly placed"
      ],
      answer: 0,
      explanation: "In a max-heap, the highest priority element is always at the root (index 0)."
    },
    {
      question: "What is the main advantage of array-based priority queue implementation?",
      options: [
        "Faster enqueue operations",
        "Simpler implementation",
        "Better cache performance",
        "No size limit"
      ],
      answer: 1,
      explanation: "Array-based is simpler to implement but less efficient for large queues."
    },
    {
      question: "When would you use a priority queue?",
      options: [
        "When you need FIFO behavior",
        "When you need LIFO behavior",
        "When you need to process elements by priority",
        "When you need constant-time access to any element"
      ],
      answer: 2,
      explanation: "Priority queues are used when elements need to be processed by priority rather than insertion order."
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
      size: queue.length,
      queue: [...queue],
      capacity: capacity,
      isFull: queue.length >= capacity,
      isEmpty: queue.length === 0,
      lastOperation: operationHistory[operationHistory.length - 1] || "None",
      implementation: implementation
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

  // Update variables when queue changes
  useEffect(() => {
    updateVariables(codeStep);
  }, [queue, implementation]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
        Priority Queue Visualization
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
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
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
          <select
            value={implementation}
            onChange={(e) => setImplementation(e.target.value)}
            className="border rounded px-2 py-1 bg-gray-700 text-sm hover:bg-gray-600 transition-colors"
          >
            <option value="heap">Heap Implementation</option>
            <option value="array">Array Implementation</option>
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
                        ? 'bg-green-900 border-green-500 text-purple-100'
                        : 'bg-red-900 border-red-500 text-red-100'
                      : 'hover:bg-gray-700 border-gray-600'
                  } transition-colors`}
                >
                  {option}
                </button>
              ))}
            </div>
            {userAnswer !== null && (
              <div className={`p-3 rounded-md ${quizQuestion.answer === userAnswer ? 'bg-green-900 text-purple-100' : 'bg-red-900 text-red-100'}`}>
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
                          <th className="p-2 border border-gray-600">Priority</th>
                          <th className="p-2 border border-gray-600">Queue State</th>
                          <th className="p-2 border border-gray-600">Size</th>
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
                            <td className="p-2 border border-gray-600 text-center">{step.priority}</td>
                            <td className="p-2 border border-gray-600">
                              [{step.queueState.map(item => `${item.value}(${item.priority})`).join(', ')}]
                            </td>
                            <td className="p-2 border border-gray-600 text-center">{step.size}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Code View */
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">
                    {implementation === "heap" ? "Heap-Based" : "Array-Based"} Priority Queue Implementation
                  </h2>
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
                      className={`px-3 py-1 rounded-lg ${codeStep === 0 ? 'bg-gray-700' : 'bg-purple-600 hover:bg-purple-700'} text-white transition-colors`}
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
                /* Queue Visualization View */
                <div className="p-4 rounded-lg shadow-lg bg-gray-800 h-full border border-gray-700">
                  <h2 className="text-xl font-semibold mb-3 text-green-400">
                    {implementation === "heap" ? "Heap-Based" : "Array-Based"} Priority Queue Visualization
                  </h2>
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-full border-2 border-gray-600 rounded-lg bg-gray-700 flex flex-col items-center p-4">
                      <div className="w-full max-w-md">
                        {/* Queue representation */}
                        <div className="mb-4 flex justify-between">
                          <div className="text-sm text-green-400">
                            Current Size: {queue.length}
                          </div>
                          <div className="text-sm text-green-400">
                            Capacity: {capacity}
                          </div>
                        </div>
                        
                        {/* Heap visualization */}
                        {implementation === "heap" ? (
                          <div className="mb-6">
                            <div className="text-center mb-2 text-sm text-gray-400">
                              (Higher priority numbers = higher priority)
                            </div>
                            <div className="flex justify-center">
                              <div className="tree">
                                {queue.length > 0 && (
                                  <div className="flex flex-col items-center">
                                    {/* Render heap levels */}
                                    {(() => {
                                      const levels = [];
                                      let level = 0;
                                      let levelSize = 1;
                                      let i = 0;
                                      
                                      while (i < queue.length) {
                                        const levelNodes = [];
                                        const levelEnd = Math.min(i + levelSize, queue.length);
                                        
                                        for (let j = i; j < levelEnd; j++) {
                                          levelNodes.push(
                                            <div 
                                              key={j} 
                                              className={`m-1 p-2 rounded-lg border-2 ${
                                                j === 0 ? 'border-green-500 bg-green-900' : 'border-gray-500 bg-gray-800'
                                              } text-center w-16`}
                                            >
                                              <div className="font-bold">{queue[j].value}</div>
                                              <div className="text-xs">({queue[j].priority})</div>
                                            </div>
                                          );
                                        }
                                        
                                        levels.push(
                                          <div key={level} className="flex justify-center">
                                            {levelNodes}
                                          </div>
                                        );
                                        
                                        i += levelSize;
                                        levelSize *= 2;
                                        level++;
                                      }
                                      
                                      return levels;
                                    })()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Array visualization */
                          <div className="mb-6">
                            <div className="text-center mb-2 text-sm text-gray-400">
                              (Sorted by priority - higher numbers first)
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                              {queue.length > 0 ? (
                                queue.map((item, index) => (
                                  <div 
                                    key={index} 
                                    className={`p-2 rounded-lg border-2 ${
                                      index === 0 ? 'border-green-500 bg-green-900' : 'border-gray-500 bg-gray-800'
                                    } text-center w-16`}
                                  >
                                    <div className="font-bold">{item.value}</div>
                                    <div className="text-xs">({item.priority})</div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-gray-400 italic">Empty queue</div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Queue operations */}
                        <div className="flex flex-col gap-3 mt-4">
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
                            <div className="flex-1">
                              <input
                                type="number"
                                value={userPriority}
                                onChange={(e) => setUserPriority(e.target.value)}
                                placeholder="Enter priority"
                                className="w-full p-2 border rounded bg-gray-700 border-gray-600 hover:border-gray-500 focus:border-green-500 transition-colors"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={enqueue}
                              disabled={queue.length >= capacity}
                              className={`px-4 py-2 rounded flex-1 ${
                                queue.length >= capacity
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-green-600 hover:bg-green-700'
                              } text-white transition-colors`}
                            >
                              Enqueue
                            </button>
                            <button
                              onClick={dequeue}
                              disabled={queue.length === 0}
                              className={`px-4 py-2 rounded flex-1 ${
                                queue.length === 0 
                                  ? 'bg-gray-700 cursor-not-allowed' 
                                  : 'bg-red-600 hover:bg-red-700'
                              } text-white transition-colors`}
                            >
                              Dequeue
                            </button>
                          </div>
                        </div>
                        
                        {/* Status indicators */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Implementation: {implementation === "heap" ? "Heap" : "Array"}
                          </div>
                          <div className="p-2 bg-gray-700 rounded text-center border border-gray-600">
                            Next Operation: {queue.length > 0 ? 
                              `Dequeue ${queue[0].value} (prio: ${queue[0].priority})` : 
                              "Queue empty"}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            queue.length === 0 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                          }`}>
                            {queue.length === 0 ? 'Queue Empty' : 'Queue Not Empty'}
                          </div>
                          <div className={`p-2 rounded text-center border ${
                            queue.length >= capacity
                              ? 'bg-red-900 border-red-600' 
                              : 'bg-gray-700 border-gray-600'
                          }`}>
                            {queue.length >= capacity
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
                    <h3 className="font-semibold mb-1 text-green-300">Current Line Explanation</h3>
                    <p className="text-gray-300">{codeData[codeStep]?.explanation || "No explanation needed for this line."}</p>
                    <div className="mt-2 text-sm text-gray-400">
                      Line {codeStep + 1} of {codeData.length}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1 text-green-300">Queue Status</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Implementation:</div>
                          <div className="font-bold text-green-400">
                            {implementation === "heap" ? "Heap-Based" : "Array-Based"}
                          </div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Current Size:</div>
                          <div className="font-bold">{queue.length}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Capacity:</div>
                          <div className="font-bold">{capacity}</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded border border-gray-600">
                          <div className="text-gray-400">Next Element:</div>
                          <div className="font-bold">
                            {queue.length > 0 ? 
                              `${queue[0].value} (prio: ${queue[0].priority})` : 
                              "None"}
                          </div>
                        </div>
                        <div className={`p-2 rounded border ${
                          queue.length === 0 ? 'bg-green-900 border-green-600' : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Empty:</div>
                          <div className="font-bold">{queue.length === 0 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className={`p-2 rounded border ${
                          queue.length >= capacity
                            ? 'bg-red-900 border-red-600' 
                            : 'bg-gray-700 border-gray-600'
                        }`}>
                          <div className="text-gray-400">Is Full:</div>
                          <div className="font-bold">
                            {queue.length >= capacity
                              ? 'Yes' 
                              : 'No'}
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
              Priority Queue Implementation Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2 border border-gray-600">Feature</th>
                    <th className="p-2 border border-gray-600">Array-Based</th>
                    <th className="p-2 border border-gray-600">Heap-Based</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Enqueue Time</td>
                    <td className="p-2 border border-gray-600">O(n)</td>
                    <td className="p-2 border border-gray-600">O(log n)</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Dequeue Time</td>
                    <td className="p-2 border border-gray-600">O(n)</td>
                    <td className="p-2 border border-gray-600">O(log n)</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Peek Time</td>
                    <td className="p-2 border border-gray-600">O(1)</td>
                    <td className="p-2 border border-gray-600">O(1)</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Implementation</td>
                    <td className="p-2 border border-gray-600">Simpler</td>
                    <td className="p-2 border border-gray-600">More complex</td>
                  </tr>
                  <tr className="bg-gray-800">
                    <td className="p-2 border border-gray-600 font-medium">Best Use Case</td>
                    <td className="p-2 border border-gray-600">Small queues or infrequent operations</td>
                    <td className="p-2 border border-gray-600">Large queues or frequent operations</td>
                  </tr>
                  <tr className="bg-gray-700">
                    <td className="p-2 border border-gray-600 font-medium">Memory Usage</td>
                    <td className="p-2 border border-gray-600">Fixed size array</td>
                    <td className="p-2 border border-gray-600">Fixed size array (organized as heap)</td>
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