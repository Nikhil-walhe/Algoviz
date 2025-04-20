import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Insertion() {
  // State for the linked list and animation
  const [list, setList] = useState([2, 3, 4]); // Initial linked list
  const [inputValue, setInputValue] = useState(''); // User input for new node
  const [position, setPosition] = useState(''); // User input for position
  const [insertionType, setInsertionType] = useState('beginning'); // Tracks where to insert

  // Code snippets for insertion operations
  const codeSnippets = {
    beginning: [
      "void insertAtBeginning(struct Node** head, int data) {",
      "  struct Node* newNode = createNode(data);",
      "  if (*head == NULL) {",
      "    *head = newNode;",
      "    return;",
      "  }",
      "  newNode->next = *head;",
      "  (*head)->prev = newNode;",
      "  *head = newNode;",
      "}",
    ],
    end: [
      "void insertAtEnd(struct Node** head, int data) {",
      "  struct Node* newNode = createNode(data);",
      "  if (*head == NULL) {",
      "    *head = newNode;",
      "    return;",
      "  }",
      "  struct Node* temp = *head;",
      "  while (temp->next != NULL) {",
      "    temp = temp->next;",
      "  }",
      "  temp->next = newNode;",
      "  newNode->prev = temp;",
      "}",
    ],
    between: [
      "void insertAtPosition(struct Node** head, int data, int position) {",
      "  if (position < 0) {",
      "    printf('Invalid position!');",
      "    return;",
      "  }",
      "  if (position == 0) {",
      "    insertAtBeginning(head, data);",
      "    return;",
      "  }",
      "  struct Node* newNode = createNode(data);",
      "  struct Node* temp = *head;",
      "  for (int i = 0; i < position - 1; i++) {",
      "    if (temp == NULL) {",
      "      printf('Position out of range!');",
      "      return;",
      "    }",
      "    temp = temp->next;",
      "  }",
      "  newNode->next = temp->next;",
      "  if (temp->next != NULL) {",
      "    temp->next->prev = newNode;",
      "  }",
      "  temp->next = newNode;",
      "  newNode->prev = temp;",
      "}",
    ],
  };

  // Explanations for each insertion type
  const explanations = {
    beginning: [
      "This function inserts a new node at the beginning of the doubly linked list. It takes a pointer to the head of the list and the data for the new node as input.",
      "Create a new node using the `createNode` function, which allocates memory and initializes the node with the given data.",
      "Check if the list is empty (head is NULL). If it is, make the new node the head of the list.",
      "Set the head of the list to point to the new node.",
      "Return from the function since the insertion is complete.",
      "If the list is not empty, set the `next` pointer of the new node to the current head of the list.",
      "Set the `prev` pointer of the current head to point to the new node.",
      "Update the head of the list to point to the new node.",
      "This marks the end of the `insertAtBeginning` function.",
    ],
    end: [
      "This function inserts a new node at the end of the doubly linked list. It takes a pointer to the head of the list and the data for the new node as input.",
      "Create a new node using the `createNode` function, which allocates memory and initializes the node with the given data.",
      "Check if the list is empty (head is NULL). If it is, make the new node the head of the list.",
      "Set the head of the list to point to the new node.",
      "Return from the function since the insertion is complete.",
      "If the list is not empty, traverse to the last node.",
      "Use a `while` loop to move to the last node (where `next` is NULL).",
      "Set the `next` pointer of the last node to the new node.",
      "Set the `prev` pointer of the new node to the last node.",
      "This marks the end of the `insertAtEnd` function.",
    ],
    between: [
      "This function inserts a new node at a specific position in the doubly linked list. It takes a pointer to the head of the list, the data for the new node, and the position as input.",
      "Check if the position is less than 0. If it is, print an error message.",
      "Print a message indicating that the position is invalid.",
      "Return from the function since the position is invalid.",
      "If the position is 0, insert the new node at the beginning of the list.",
      "Create a new node using the `createNode` function, which allocates memory and initializes the node with the given data.",
      "Traverse to the node just before the desired position.",
      "Use a `for` loop to move to the node just before the desired position.",
      "Check if the position is out of range. If it is, print an error message.",
      "Print a message indicating that the position is out of range.",
      "Return from the function since the position is out of range.",
      "Set the `next` pointer of the new node to the `next` pointer of the current node.",
      "If the next node exists, set its `prev` pointer to the new node.",
      "Set the `next` pointer of the current node to the new node.",
      "Set the `prev` pointer of the new node to the current node.",
      "This marks the end of the `insertAtPosition` function.",
    ],
  };

  // State to track the current line in the code snippet
  const [currentLine, setCurrentLine] = useState(0);

  // Navigation handlers
  const handleNext = () => {
    if (currentLine < codeSnippets[insertionType].length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
    }
  };

  // Insertion handler
  const handleInsert = () => {
    if (inputValue === '') return; // Do nothing if input is empty
    const newValue = parseInt(inputValue, 10); // Convert input to number

    if (insertionType === 'beginning') {
      setList([newValue, ...list]); // Insert at the beginning
    } else if (insertionType === 'end') {
      setList([...list, newValue]); // Insert at the end
    } else if (insertionType === 'between') {
      const pos = parseInt(position, 10); // Convert position to number
      if (pos < 0 || pos > list.length) {
        alert('Invalid position!'); // Handle invalid position
        return;
      }
      const newList = [...list];
      newList.splice(pos, 0, newValue); // Insert at the specified position
      setList(newList);
    }

    setInputValue(''); // Clear input field
    setPosition(''); // Clear position field
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Doubly Linked List - Insertion
      </motion.h1>

      {/* Insertion Type Selection */}
      <div className="flex justify-center mb-8 gap-4">
        <select
          value={insertionType}
          onChange={(e) => setInsertionType(e.target.value)}
          className="bg-white p-2 rounded-lg shadow-lg text-gray-800"
        >
          <option value="beginning">Insert at Beginning</option>
          <option value="end">Insert at End</option>
          <option value="between">Insert in Between</option>
        </select>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          className="bg-white p-2 rounded-lg shadow-lg text-gray-800"
        />
        {insertionType === 'between' && (
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            className="bg-white p-2 rounded-lg shadow-lg text-gray-800"
          />
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInsert}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
        >
          Insert
        </motion.button>
      </div>

      {/* Code Snippet and Explanation Section */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeSnippets[insertionType].map((line, index) => (
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
          <p className="text-gray-800">{explanations[insertionType][currentLine]}</p>

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

      {/* Animation Section */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-4">Animation</h2>

        {/* Linked List Animation */}
        <div className="flex items-center justify-center space-x-4">
          {/* Head Pointer */}
          <div className="flex flex-col items-center">
            <div className="text-white mb-2">Head</div>
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
          </div>

          {/* Nodes */}
          {list.map((node, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Node Box */}
              <div className="w-32 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                <div className="flex-1 border-r border-white p-2">Data: {node}</div>
                <div className="flex-1 p-2">Next</div>
              </div>

              {/* Arrows Between Nodes */}
              {index < list.length - 1 && (
                <div className="w-8 h-1 bg-white mt-2 relative">
                  <div className="absolute right-0 top-0 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
                </div>
              )}

              {/* NULL for Last Node */}
              {index === list.length - 1 && (
                <div className="text-white mt-2">NULL</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}