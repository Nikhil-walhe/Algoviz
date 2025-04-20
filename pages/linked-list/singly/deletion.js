import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Deletion() {
  // State variables
  const [list, setList] = useState([1, 2, 3]); // Initial linked list
  const [position, setPosition] = useState(''); // User input for position
  const [deletionType, setDeletionType] = useState('beginning'); // Tracks where to delete
  const [currentLine, setCurrentLine] = useState(0); // Tracks the current line in the code snippet

  // Code snippets and explanations for Deletion at Beginning
  const codeLinesBeginning = [
    "void deleteAtBeginning(struct Node** head) {",
    "  if (*head == NULL) {",
    "    printf('List is already empty!');",
    "    return;",
    "  }",
    "  struct Node* temp = *head;",
    "  *head = (*head)->next;",
    "  free(temp);",
    "}",
  ];

  const explanationsBeginning = [
    "This function deletes the first node from the linked list. It takes a pointer to the head of the list as input.",
    "Check if the list is empty (head is NULL). If it is, print an error message.",
    "Print a message indicating that the list is already empty.",
    "Return from the function since there is nothing to delete.",
    "Store the current head node in a temporary variable (`temp`).",
    "Update the head of the list to point to the next node.",
    "Free the memory allocated for the deleted node.",
    "This marks the end of the `deleteAtBeginning` function.",
  ];

  // Code snippets and explanations for Deletion at End
  const codeLinesEnd = [
    "void deleteAtEnd(struct Node** head) {",
    "  if (*head == NULL) {",
    "    printf('List is already empty!');",
    "    return;",
    "  }",
    "  if ((*head)->next == NULL) {",
    "    free(*head);",
    "    *head = NULL;",
    "    return;",
    "  }",
    "  struct Node* temp = *head;",
    "  while (temp->next->next != NULL) {",
    "    temp = temp->next;",
    "  }",
    "  free(temp->next);",
    "  temp->next = NULL;",
    "}",
  ];

  const explanationsEnd = [
    "This function deletes the last node from the linked list. It takes a pointer to the head of the list as input.",
    "Check if the list is empty (head is NULL). If it is, print an error message.",
    "Print a message indicating that the list is already empty.",
    "Return from the function since there is nothing to delete.",
    "Check if the list has only one node. If it does, delete that node.",
    "Free the memory allocated for the single node.",
    "Set the head of the list to NULL since the list is now empty.",
    "Return from the function since the deletion is complete.",
    "If the list has more than one node, traverse to the second-to-last node.",
    "Use a `while` loop to move to the second-to-last node.",
    "Free the memory allocated for the last node.",
    "Set the `next` pointer of the second-to-last node to NULL.",
    "This marks the end of the `deleteAtEnd` function.",
  ];

  // Code snippets and explanations for Deletion at a Specific Position
  const codeLinesBetween = [
    "void deleteAtPosition(struct Node** head, int position) {",
    "  if (*head == NULL) {",
    "    printf('List is already empty!');",
    "    return;",
    "  }",
    "  if (position < 0) {",
    "    printf('Invalid position!');",
    "    return;",
    "  }",
    "  if (position == 0) {",
    "    struct Node* temp = *head;",
    "    *head = (*head)->next;",
    "    free(temp);",
    "    return;",
    "  }",
    "  struct Node* temp = *head;",
    "  for (int i = 0; i < position - 1; i++) {",
    "    if (temp == NULL || temp->next == NULL) {",
    "      printf('Position out of range!');",
    "      return;",
    "    }",
    "    temp = temp->next;",
    "  }",
    "  struct Node* nodeToDelete = temp->next;",
    "  temp->next = temp->next->next;",
    "  free(nodeToDelete);",
    "}",
  ];

  const explanationsBetween = [
    "This function deletes a node at a specific position in the linked list. It takes a pointer to the head of the list and the position as input.",
    "Check if the list is empty (head is NULL). If it is, print an error message.",
    "Print a message indicating that the list is already empty.",
    "Return from the function since there is nothing to delete.",
    "Check if the position is less than 0. If it is, print an error message.",
    "Print a message indicating that the position is invalid.",
    "Return from the function since the position is invalid.",
    "If the position is 0, delete the first node.",
    "Store the current head node in a temporary variable (`temp`).",
    "Update the head of the list to point to the next node.",
    "Free the memory allocated for the deleted node.",
    "Return from the function since the deletion is complete.",
    "If the position is not 0, traverse to the node just before the desired position.",
    "Use a `for` loop to move to the node just before the desired position.",
    "Check if the position is out of range. If it is, print an error message.",
    "Print a message indicating that the position is out of range.",
    "Return from the function since the position is out of range.",
    "Store the node to be deleted in a temporary variable (`nodeToDelete`).",
    "Update the `next` pointer of the current node to skip the node to be deleted.",
    "Free the memory allocated for the deleted node.",
    "This marks the end of the `deleteAtPosition` function.",
  ];

  // Get the current code snippet and explanation based on deletion type
  const codeSnippet =
    deletionType === 'beginning'
      ? codeLinesBeginning
      : deletionType === 'end'
      ? codeLinesEnd
      : codeLinesBetween;

  const explanation =
    deletionType === 'beginning'
      ? explanationsBeginning
      : deletionType === 'end'
      ? explanationsEnd
      : explanationsBetween;

  // Navigation handlers
  const handleNext = () => {
    if (currentLine < codeSnippet.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
    }
  };

  // Deletion handler
  const handleDelete = () => {
    if (list.length === 0) {
      alert('List is already empty!');
      return;
    }

    if (deletionType === 'beginning') {
      setList(list.slice(1)); // Delete the first node
    } else if (deletionType === 'end') {
      setList(list.slice(0, -1)); // Delete the last node
    } else if (deletionType === 'between') {
      const pos = parseInt(position, 10); // Convert position to number
      if (pos < 0 || pos >= list.length) {
        alert('Invalid position!'); // Handle invalid position
        return;
      }
      const newList = [...list];
      newList.splice(pos, 1); // Delete the node at the specified position
      setList(newList);
    }

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
        Deletion in Singly Linked List
      </motion.h1>

      {/* Deletion Type Selection */}
      <div className="flex justify-center mb-8 gap-4">
        <select
          value={deletionType}
          onChange={(e) => setDeletionType(e.target.value)}
          className="bg-white p-2 rounded-lg shadow-lg text-gray-800"
        >
          <option value="beginning">Delete at Beginning</option>
          <option value="end">Delete at End</option>
          <option value="between">Delete at Position</option>
        </select>
        {deletionType === 'between' && (
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
          onClick={handleDelete}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
        >
          Delete
        </motion.button>
      </div>

      {/* Code Snippet and Explanation Section */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-8">
        {/* Left Side: Code Snippet */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Snippet</h2>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {codeSnippet.map((line, index) => (
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
          <p className="text-gray-800">{explanation[currentLine]}</p>

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

      {/* Linked List Animation */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-4">Linked List</h2>
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