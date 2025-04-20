import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LinkedListStack() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [stack, setStack] = useState([]);
  const [operationHistory, setOperationHistory] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  // Refs
  const playInterval = useRef(null);

  // Generate random memory address
  const generateAddress = () => '0x' + Math.floor(Math.random() * 10000).toString(16).padStart(4, '0');

  // Complete C code with line-by-line explanations
  const codeData = [
    { 
      line: "#include <stdio.h>", 
      explanation: "Standard input/output library for functions like printf() and scanf().",
      important: true 
    },
    { 
      line: "#include <stdlib.h>", 
      explanation: "Standard library for memory allocation functions like malloc() and free().",
      important: true 
    },
    { 
      line: "// Define the structure for a node", 
      explanation: "Comment explaining the purpose of the following structure definition.",
      important: false 
    },
    { 
      line: "struct node {", 
      explanation: "Start of node structure definition for linked list implementation.",
      important: true 
    },
    { 
      line: "    int val;", 
      explanation: "Data field to store the value in each stack node.",
      important: true 
    },
    { 
      line: "    struct node* next;", 
      explanation: "Pointer to the next node in the linked list.",
      important: true 
    },
    { 
      line: "};", 
      explanation: "End of node structure definition.",
      important: false 
    },
    { 
      line: "// Define the head pointer (top of the stack)", 
      explanation: "Comment explaining the purpose of the head pointer.",
      important: false 
    },
    { 
      line: "struct node* head = NULL;", 
      explanation: "Global pointer to track the top of the stack, initialized to NULL.",
      important: true 
    },
    { 
      line: "// Function to push an element onto the stack", 
      explanation: "Comment explaining the purpose of the push function.",
      important: false 
    },
    { 
      line: "void push() {", 
      explanation: "Function to add an element to the top of the stack.",
      important: true 
    },
    { 
      line: "    int val;", 
      explanation: "Variable to store the value to be pushed.",
      important: true 
    },
    { 
      line: "    struct node* ptr = (struct node*)malloc(sizeof(struct node));", 
      explanation: "Allocate memory for a new node.",
      important: true 
    },
    { 
      line: "    if (ptr == NULL) {", 
      explanation: "Check if memory allocation failed.",
      important: true 
    },
    { 
      line: "        printf(\"Unable to push the element. Memory allocation failed.\\n\");", 
      explanation: "Error message if memory allocation fails.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if allocation fails.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of memory check block.",
      important: false 
    },
    { 
      line: "    printf(\"Enter the value to push: \");", 
      explanation: "Prompt user to input value to push.",
      important: true 
    },
    { 
      line: "    scanf(\"%d\", &val);", 
      explanation: "Read integer input from user.",
      important: true 
    },
    { 
      line: "    ptr->val = val;", 
      explanation: "Set the data field of the new node.",
      important: true 
    },
    { 
      line: "    ptr->next = head;", 
      explanation: "New node points to current head node.",
      important: true 
    },
    { 
      line: "    head = ptr;", 
      explanation: "Update head to point to the new node.",
      important: true 
    },
    { 
      line: "    printf(\"Item %d pushed to stack\\n\", val);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of push function.",
      important: false 
    },
    { 
      line: "// Function to pop an element from the stack", 
      explanation: "Comment explaining the purpose of the pop function.",
      important: false 
    },
    { 
      line: "void pop() {", 
      explanation: "Function to remove and return the top element.",
      important: true 
    },
    { 
      line: "    if (head == NULL) {", 
      explanation: "Check if stack is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Underflow: Stack is empty\\n\");", 
      explanation: "Error message for empty stack.",
      important: true 
    },
    { 
      line: "        return;", 
      explanation: "Exit function if stack is empty.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of empty stack check.",
      important: false 
    },
    { 
      line: "    struct node* ptr = head;", 
      explanation: "Temporary pointer to current head node.",
      important: true 
    },
    { 
      line: "    int item = head->val;", 
      explanation: "Save the data from the head node.",
      important: true 
    },
    { 
      line: "    head = head->next;", 
      explanation: "Move head pointer to next node.",
      important: true 
    },
    { 
      line: "    free(ptr);", 
      explanation: "Free memory of the old head node.",
      important: true 
    },
    { 
      line: "    printf(\"Item %d popped from stack\\n\", item);", 
      explanation: "Print confirmation message.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of pop function.",
      important: false 
    },
    { 
      line: "// Function to peek at the top element of the stack", 
      explanation: "Comment explaining the purpose of the peek function.",
      important: false 
    },
    { 
      line: "void peek() {", 
      explanation: "Function to view top element without removal.",
      important: true 
    },
    { 
      line: "    if (head == NULL) {", 
      explanation: "Check if stack is empty.",
      important: true 
    },
    { 
      line: "        printf(\"Stack is empty. No top element.\\n\");", 
      explanation: "Message for empty stack.",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "If stack is not empty.",
      important: false 
    },
    { 
      line: "        printf(\"Top element is: %d\\n\", head->val);", 
      explanation: "Print the top element value.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of if-else block.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of peek function.",
      important: false 
    },
    { 
      line: "// Function to display the stack elements", 
      explanation: "Comment explaining the purpose of the display function.",
      important: false 
    },
    { 
      line: "void display() {", 
      explanation: "Function to print all stack elements.",
      important: true 
    },
    { 
      line: "    if (head == NULL) {", 
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
      explanation: "End of empty stack check.",
      important: false 
    },
    { 
      line: "    struct node* temp = head;", 
      explanation: "Temporary pointer for traversal.",
      important: true 
    },
    { 
      line: "    printf(\"Stack elements: \");", 
      explanation: "Print label for stack elements.",
      important: true 
    },
    { 
      line: "    while (temp != NULL) {", 
      explanation: "Loop through all nodes in stack.",
      important: true 
    },
    { 
      line: "        printf(\"%d \", temp->val);", 
      explanation: "Print current node's value.",
      important: true 
    },
    { 
      line: "        temp = temp->next;", 
      explanation: "Move to next node.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of while loop.",
      important: false 
    },
    { 
      line: "    printf(\"\\n\");", 
      explanation: "Print newline after all elements.",
      important: false 
    },
    { 
      line: "}", 
      explanation: "End of display function.",
      important: false 
    },
    { 
      line: "// Function to check if the stack is empty", 
      explanation: "Comment explaining the purpose of the isEmpty function.",
      important: false 
    },
    { 
      line: "int isEmpty() {", 
      explanation: "Function to check if stack is empty.",
      important: true 
    },
    { 
      line: "    return (head == NULL);", 
      explanation: "Return true if head is NULL (stack empty).",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of isEmpty function.",
      important: false 
    },
    { 
      line: "// Function to return the size of the stack", 
      explanation: "Comment explaining the purpose of the size function.",
      important: false 
    },
    { 
      line: "int size() {", 
      explanation: "Function to count elements in stack.",
      important: true 
    },
    { 
      line: "    int count = 0;", 
      explanation: "Initialize counter variable.",
      important: true 
    },
    { 
      line: "    struct node* temp = head;", 
      explanation: "Temporary pointer for traversal.",
      important: true 
    },
    { 
      line: "    while (temp != NULL) {", 
      explanation: "Loop through all nodes in stack.",
      important: true 
    },
    { 
      line: "        count++;", 
      explanation: "Increment counter for each node.",
      important: true 
    },
    { 
      line: "        temp = temp->next;", 
      explanation: "Move to next node.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "End of while loop.",
      important: false 
    },
    { 
      line: "    return count;", 
      explanation: "Return total count of elements.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "End of size function.",
      important: false 
    },
    { 
      line: "// Main function to test the stack operations", 
      explanation: "Comment explaining the purpose of the main function.",
      important: false 
    },
    { 
      line: "int main() {", 
      explanation: "Entry point of the program.",
      important: true 
    },
    { 
      line: "    int choice;", 
      explanation: "Variable to store user's menu choice.",
      important: true 
    },
    { 
      line: "    while (1) {", 
      explanation: "Infinite loop for menu display.",
      important: true 
    },
    { 
      line: "        printf(\"\\nStack Operations Menu:\\n\");", 
      explanation: "Print menu header.",
      important: true 
    },
    { 
      line: "        printf(\"1. Push\\n\");", 
      explanation: "Print push option.",
      important: true 
    },
    { 
      line: "        printf(\"2. Pop\\n\");", 
      explanation: "Print pop option.",
      important: true 
    },
    { 
      line: "        printf(\"3. Peek\\n\");", 
      explanation: "Print peek option.",
      important: true 
    },
    { 
      line: "        printf(\"4. Display\\n\");", 
      explanation: "Print display option.",
      important: true 
    },
    { 
      line: "        printf(\"5. Check if Stack is Empty\\n\");", 
      explanation: "Print isEmpty option.",
      important: true 
    },
    { 
      line: "        printf(\"6. Get Stack Size\\n\");", 
      explanation: "Print size option.",
      important: true 
    },
    { 
      line: "        printf(\"7. Exit\\n\");", 
      explanation: "Print exit option.",
      important: true 
    },
    { 
      line: "        printf(\"Enter your choice: \");", 
      explanation: "Prompt for user input.",
      important: true 
    },
    { 
      line: "        scanf(\"%d\", &choice);", 
      explanation: "Read user's choice.",
      important: true 
    },
    { 
      line: "        switch (choice) {", 
      explanation: "Start of switch statement for menu options.",
      important: true 
    },
    { 
      line: "            case 1:", 
      explanation: "Case for push operation.",
      important: true 
    },
    { 
      line: "                push();", 
      explanation: "Call push function.",
      important: true 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 2:", 
      explanation: "Case for pop operation.",
      important: true 
    },
    { 
      line: "                pop();", 
      explanation: "Call pop function.",
      important: true 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 3:", 
      explanation: "Case for peek operation.",
      important: true 
    },
    { 
      line: "                peek();", 
      explanation: "Call peek function.",
      important: true 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 4:", 
      explanation: "Case for display operation.",
      important: true 
    },
    { 
      line: "                display();", 
      explanation: "Call display function.",
      important: true 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 5:", 
      explanation: "Case for isEmpty check.",
      important: true 
    },
    { 
      line: "                if (isEmpty()) {", 
      explanation: "Check if stack is empty.",
      important: true 
    },
    { 
      line: "                    printf(\"Stack is empty\\n\");", 
      explanation: "Print message if empty.",
      important: true 
    },
    { 
      line: "                } else {", 
      explanation: "If stack is not empty.",
      important: false 
    },
    { 
      line: "                    printf(\"Stack is not empty\\n\");", 
      explanation: "Print message if not empty.",
      important: true 
    },
    { 
      line: "                }", 
      explanation: "End of if-else block.",
      important: false 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 6:", 
      explanation: "Case for size operation.",
      important: true 
    },
    { 
      line: "                printf(\"Stack size: %d\\n\", size());", 
      explanation: "Print stack size.",
      important: true 
    },
    { 
      line: "                break;", 
      explanation: "Exit switch case.",
      important: false 
    },
    { 
      line: "            case 7:", 
      explanation: "Case for exit operation.",
      important: true 
    },
    { 
      line: "                printf(\"Exiting...\\n\");", 
      explanation: "Print exit message.",
      important: true 
    },
    { 
      line: "                exit(0);", 
      explanation: "Terminate program.",
      important: true 
    },
    { 
      line: "            default:", 
      explanation: "Default case for invalid input.",
      important: true 
    },
    { 
      line: "                printf(\"Invalid choice, please try again\\n\");", 
      explanation: "Print error message for invalid choice.",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "End of switch statement.",
      important: false 
    },
    { 
      line: "    }", 
      explanation: "End of while loop.",
      important: false 
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

  // Stack operations
  const push = () => {
    const value = userInput || Math.floor(Math.random() * 100) + 1;
    const newNode = {
      value,
      next: stack.length > 0 ? stack[0].address : null,
      address: generateAddress()
    };
    
    setStack(prev => [newNode, ...prev]);
    setOperationHistory(prev => [...prev, `Pushed ${value} at ${newNode.address}`]);
    setUserInput("");
    
    // Add to execution steps
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'push',
      value,
      stackState: [newNode, ...stack].map(n => n.value)
    }]);
  };

  const pop = () => {
    if (stack.length === 0) return;
    const popped = stack[0];
    setStack(prev => prev.slice(1));
    setOperationHistory(prev => [...prev, `Popped ${popped.value} from ${popped.address}`]);
    
    // Add to execution steps
    setExecutionSteps(prev => [...prev, {
      step: prev.length + 1,
      operation: 'pop',
      value: popped.value,
      stackState: stack.slice(1).map(n => n.value)
    }]);
  };

  // Enhanced quiz questions (15+ questions)
  const quizQuestions = [
    {
      question: "What is the time complexity of push/pop operations in linked list stack?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0,
      explanation: "Both operations are O(1) as they only modify the head pointer."
    },
    {
      question: "What happens if we don't free memory after pop?",
      options: [
        "Stack becomes read-only",
        "Memory leak occurs",
        "Automatic garbage collection fixes it",
        "Nothing, it's fine"
      ],
      answer: 1,
      explanation: "Not freeing memory leads to memory leaks in C."
    },
    {
      question: "Which pointer must we always maintain in linked list stack?",
      options: [
        "Head pointer",
        "Tail pointer",
        "Top pointer",
        "Current node pointer"
      ],
      answer: 2,
      explanation: "We maintain the top pointer to access the stack."
    },
    {
      question: "What is the main advantage of linked list stack over array implementation?",
      options: [
        "Constant time access to any element",
        "No fixed capacity limitation",
        "Better cache performance",
        "Simpler implementation"
      ],
      answer: 1,
      explanation: "Linked list stacks can grow dynamically as needed, unlike fixed-size arrays."
    },
    {
      question: "Which operation is NOT typically supported by stack?",
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
      question: "In the push operation, what does newNode->next = head do?",
      options: [
        "Makes the new node point to NULL",
        "Makes the new node point to the current head",
        "Makes the head node point to the new node",
        "Nothing, it's invalid syntax"
      ],
      answer: 1,
      explanation: "This sets the new node's next pointer to the current head node."
    },
    {
      question: "What happens if you call pop() on an empty stack in this implementation?",
      options: [
        "Program crashes",
        "Returns -1 and prints error",
        "Returns 0",
        "Returns NULL"
      ],
      answer: 1,
      explanation: "The implementation checks for empty stack and returns -1 with error message."
    },
    {
      question: "Which part of the node structure stores the actual data?",
      options: [
        "next pointer",
        "val field",
        "address field",
        "head pointer"
      ],
      answer: 1,
      explanation: "The val field stores the value, while next is for linking nodes."
    },
    {
      question: "What is the purpose of the head pointer in the implementation?",
      options: [
        "To track the bottom of the stack",
        "To track the current top element",
        "To count the number of elements",
        "To allocate new memory"
      ],
      answer: 1,
      explanation: "The head pointer always points to the most recently added node."
    },
    {
      question: "When pushing a new node, what is the correct order of operations?",
      options: [
        "Allocate memory → Set data → Update head → Set next",
        "Set data → Allocate memory → Set next → Update head",
        "Allocate memory → Set data → Set next → Update head",
        "Update head → Allocate memory → Set data → Set next"
      ],
      answer: 2,
      explanation: "Correct order: Allocate memory first, then set data, then set next to current head, then update head."
    },
    {
      question: "What does LIFO stand for in stack context?",
      options: [
        "Last Input First Output",
        "Last In First Out",
        "Linear Input Floating Output",
        "Linked Implementation First Operation"
      ],
      answer: 1,
      explanation: "LIFO = Last In First Out, the fundamental stack principle."
    },
    {
      question: "Which real-world analogy best represents a stack?",
      options: [
        "A line of people at ticket counter",
        "A pile of plates in a cafeteria",
        "A circle of friends holding hands",
        "A tree with many branches"
      ],
      answer: 1,
      explanation: "A pile of plates is a classic stack analogy - you take from the top."
    },
    {
      question: "What is the space complexity of a linked list stack with n elements?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      answer: 2,
      explanation: "Space complexity is O(n) as it grows linearly with elements."
    },
    {
      question: "Which scenario is NOT a good use case for stacks?",
      options: [
        "Undo functionality in text editors",
        "Function call management in programs",
        "Breadth-first search implementation",
        "Expression evaluation"
      ],
      answer: 2,
      explanation: "BFS uses queues, while the others are classic stack applications."
    },
    {
      question: "What does the peek() operation do?",
      options: [
        "Removes and returns the top element",
        "Returns the top element without removal",
        "Returns the bottom element",
        "Counts the stack elements"
      ],
      answer: 1,
      explanation: "peek() returns the top element without modifying the stack."
    },
    {
      question: "How does malloc() help in stack implementation?",
      options: [
        "It frees memory automatically",
        "It allocates memory for new nodes",
        "It checks for stack overflow",
        "It initializes node data"
      ],
      answer: 1,
      explanation: "malloc() dynamically allocates memory for new stack nodes."
    },
    {
      question: "What is the initial value of the head pointer?",
      options: [
        "0",
        "NULL",
        "Undefined",
        "-1"
      ],
      answer: 1,
      explanation: "Head is initialized to NULL indicating an empty stack."
    },
    {
      question: "Which operation would require O(n) time in this implementation?",
      options: [
        "push()",
        "pop()",
        "peek()",
        "Searching for an element"
      ],
      answer: 3,
      explanation: "Searching would require traversing the entire stack in worst case."
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
      head: stack.length > 0 ? stack[0].address : "NULL",
      stack: stack.map(node => ({
        value: node.value,
        address: node.address,
        next: node.next || "NULL"
      })),
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
      <h1 className="text-3xl font-bold mb-4">Linked List Stack Visualization</h1>
      
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Code View */
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-3">Linked List Stack Implementation</h2>
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
                    <div className="relative w-full h-64 border-2 border-gray-600 rounded-lg bg-gray-700 flex items-center justify-center">
                      {stack.length === 0 ? (
                        <p className="text-gray-400">Empty Stack</p>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="mb-2 text-sm text-gray-400">Head Pointer →</div>
                          <AnimatePresence>
                            {stack.map((node, idx) => (
                              <motion.div
                                key={node.address}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center mb-2"
                              >
                                <div className={`w-14 h-14 flex flex-col items-center justify-center rounded-lg shadow-md ${idx === 0 ? 'bg-blue-600' : 'bg-blue-400'} text-white`}>
                                  <span className="font-bold">{node.value}</span>
                                  <span className="text-xs mt-1">{node.address}</span>
                                </div>
                                <div className="mx-2 text-gray-400">→</div>
                                <div className="text-xs text-gray-300 p-2 bg-gray-600 rounded">
                                  Next: {node.next || "NULL"}
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                    
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
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Push
                      </button>
                      <button
                        onClick={pop}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Pop
                      </button>
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
                      <h3 className="font-semibold mb-1">Head Pointer</h3>
                      <div className="p-2 rounded bg-gray-700">
                        {variables.head || "NULL"}
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