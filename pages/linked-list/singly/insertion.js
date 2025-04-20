import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Insertion() {
  // Code snippets and explanations for Insertion at Beginning
  const codeLinesBeginning = [
    "void insertAtBeginning(struct Node** head, int data) {",
    "  struct Node* newNode = createNode(data);",
    "  newNode->next = *head;",
    "  *head = newNode;",
    "}",
  ];

  const explanationsBeginning = [
    "This function inserts a new node at the beginning of the linked list. It takes a pointer to the head of the list and the data for the new node as input.",
    "A new node is created using the `createNode` function, which allocates memory and initializes the node with the given data.",
    "The `next` pointer of the new node is set to the current head of the list.",
    "The head of the list is updated to point to the new node.",
    "This marks the end of the `insertAtBeginning` function.",
  ];

  // Code snippets and explanations for Insertion at End
  const codeLinesEnd = [
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
    "}",
  ];

  const explanationsEnd = [
    "This function inserts a new node at the end of the linked list. It takes a pointer to the head of the list and the data for the new node as input.",
    "A new node is created using the `createNode` function, which allocates memory and initializes the node with the given data.",
    "If the list is empty (head is NULL), the new node becomes the head of the list.",
    "If the list is not empty, we traverse to the last node.",
    "We start from the head and move to the next node until we reach the last node (where `next` is NULL).",
    "Once we reach the last node, we set its `next` pointer to the new node.",
    "This marks the end of the `insertAtEnd` function.",
  ];

  // Code snippets and explanations for Insertion in Between
  const codeLinesBetween = [
    "void insertAtPosition(struct Node** head, int data, int position) {",
    "  if (position < 0) {",
    "    printf('Invalid position!');",
    "    return;",
    "  }",
    "  struct Node* newNode = createNode(data);",
    "  if (position == 0) {",
    "    newNode->next = *head;",
    "    *head = newNode;",
    "    return;",
    "  }",
    "  struct Node* temp = *head;",
    "  for (int i = 0; i < position - 1; i++) {",
    "    if (temp == NULL) {",
    "      printf('Position out of range!');",
    "      return;",
    "    }",
    "    temp = temp->next;",
    "  }",
    "  newNode->next = temp->next;",
    "  temp->next = newNode;",
    "}",
  ];

  const explanationsBetween = [
    "This function inserts a new node at a specific position in the linked list. It takes a pointer to the head of the list, the data for the new node, and the position as input.",
    "Check if the position is less than 0. If it is, the position is invalid.",
    "Print an error message indicating that the position is invalid.",
    "Return from the function immediately since the position is invalid.",
    "Create a new node using the `createNode` function, which allocates memory and initializes the node with the given data.",
    "Check if the position is 0. If it is, the new node should be inserted at the beginning of the list.",
    "Set the `next` pointer of the new node to the current head of the list.",
    "Update the head of the list to point to the new node.",
    "Return from the function since the insertion is complete.",
    "If the position is not 0, start traversing the list from the head node.",
    "Use a `for` loop to traverse the list until the node just before the desired position is reached.",
    "Check if the current node (`temp`) is `NULL`. If it is, the position is out of range.",
    "Print an error message indicating that the position is out of range.",
    "Return from the function immediately since the position is out of range.",
    "Move to the next node in the list.",
    "Set the `next` pointer of the new node to the `next` pointer of the current node.",
    "Update the `next` pointer of the current node to point to the new node.",
    "This marks the end of the `insertAtPosition` function.",
  ];

  // State variables
  const [currentLineBeginning, setCurrentLineBeginning] = useState(0);
  const [currentLineEnd, setCurrentLineEnd] = useState(0);
  const [currentLineBetween, setCurrentLineBetween] = useState(0);
  const [list, setList] = useState([1, 2, 3]); // Initial linked list
  const [inputValue, setInputValue] = useState(''); // User input for new node
  const [position, setPosition] = useState(''); // User input for position
  const [insertionType, setInsertionType] = useState('beginning'); // Tracks where to insert

  // Navigation handlers
  const handleNextBeginning = () => {
    if (currentLineBeginning < codeLinesBeginning.length - 1) {
      setCurrentLineBeginning(currentLineBeginning + 1);
    }
  };

  const handlePreviousBeginning = () => {
    if (currentLineBeginning > 0) {
      setCurrentLineBeginning(currentLineBeginning - 1);
    }
  };

  const handleNextEnd = () => {
    if (currentLineEnd < codeLinesEnd.length - 1) {
      setCurrentLineEnd(currentLineEnd + 1);
    }
  };

  const handlePreviousEnd = () => {
    if (currentLineEnd > 0) {
      setCurrentLineEnd(currentLineEnd - 1);
    }
  };

  const handleNextBetween = () => {
    if (currentLineBetween < codeLinesBetween.length - 1) {
      setCurrentLineBetween(currentLineBetween + 1);
    }
  };

  const handlePreviousBetween = () => {
    if (currentLineBetween > 0) {
      setCurrentLineBetween(currentLineBetween - 1);
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Insertion of a Node
      </motion.h1>

      {/* Insertion at Beginning Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-white mb-8"
      >
        Insertion at Beginning
      </motion.h2>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeLinesBeginning.map((line, index) => (
                <div
                  key={index}
                  className={`${index === currentLineBeginning ? 'bg-yellow-100' : ''} p-1`}
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
          <p className="text-gray-800">{explanationsBeginning[currentLineBeginning]}</p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousBeginning}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextBeginning}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>

      {/* Insertion at End Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-white mb-8 mt-16"
      >
        Insertion at End
      </motion.h2>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeLinesEnd.map((line, index) => (
                <div
                  key={index}
                  className={`${index === currentLineEnd ? 'bg-yellow-100' : ''} p-1`}
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
          <p className="text-gray-800">{explanationsEnd[currentLineEnd]}</p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousEnd}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextEnd}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Next
            </motion.button>
          </div>
        </div>
      </div>

      {/* Insertion in Between Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold text-white mb-8 mt-16"
      >
        Insertion in Between
      </motion.h2>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeLinesBetween.map((line, index) => (
                <div
                  key={index}
                  className={`${index === currentLineBetween ? 'bg-yellow-100' : ''} p-1`}
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
          <p className="text-gray-800">{explanationsBetween[currentLineBetween]}</p>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousBetween}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextBetween}
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

        {/* Input Field and Insertion Type Selection */}
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

              {/* Arrow Between Nodes */}
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