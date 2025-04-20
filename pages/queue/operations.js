import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

export default function QueueOperations() {
  const [queue, setQueue] = useState([]);
  const controls = useAnimation();
  const MAX_SIZE = 5;

  const enqueueElement = async () => {
    if (queue.length >= MAX_SIZE) return;
    await controls.start({ 
      x: [100, 0], 
      opacity: [0, 1],
      transition: { duration: 0.5 }
    });
    setQueue([...queue, `Item ${queue.length + 1}`]);
  };

  const dequeueElement = async () => {
    if (queue.length === 0) return;
    await controls.start({ 
      x: [0, -100], 
      opacity: [1, 0],
      transition: { duration: 0.5 }
    });
    setQueue(queue.slice(1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Operations on Queue
      </motion.h1>

      {/* Queue Visualization */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-96 h-24 bg-gray-700 rounded-lg p-4 flex justify-start items-center border-2 border-gray-600 overflow-hidden">
          {queue.length === 0 && (
            <div className="text-gray-400 w-full text-center">Queue is empty</div>
          )}
          {queue.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`w-20 h-12 ${index === 0 ? 'bg-green-500' : 'bg-blue-500'} flex items-center justify-center text-white font-semibold rounded-lg mx-1 shadow-lg`}
            >
              {element}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between w-full max-w-md mt-2">
          <span className="text-green-400">Front</span>
          <span className="text-blue-400">Rear</span>
        </div>
      </div>

      {/* Enqueue and Dequeue Buttons */}
      <div className="flex space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={enqueueElement}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Enqueue
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={dequeueElement}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Dequeue
        </motion.button>
      </div>

      {/* Subtopic: Queue Initialization */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Queue Initialization</h2>
        <p className="text-gray-300 mb-4">
          A queue requires front and rear pointers to track positions. Initialize them to -1 to indicate an empty queue.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg">
          <code className="text-sm text-green-300">
            {`#define MAX 100
int queue[MAX];
int front = -1, rear = -1;`}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Enqueue Operation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Enqueue Operation</h2>
        <p className="text-gray-300 mb-4">
          Adds an element to the rear of the queue. Checks for queue overflow condition.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg">
          <code className="text-sm text-green-300">
            {`void enqueue(int value) {
  if (rear == MAX - 1) {
    printf("Queue Overflow\\n");
    return;
  }
  if (front == -1) front = 0;
  queue[++rear] = value;
}`}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Dequeue Operation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Dequeue Operation</h2>
        <p className="text-gray-300 mb-4">
          Removes an element from the front of the queue. Checks for queue underflow condition.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg">
          <code className="text-sm text-green-300">
            {`int dequeue() {
  if (front == -1 || front > rear) {
    printf("Queue Underflow\\n");
    return -1;
  }
  return queue[front++];
}`}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Queue Status Checks */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-4">4. Queue Status Checks</h2>
        <p className="text-gray-300 mb-4">
          Essential functions to check queue status and view elements without removal.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg">
          <code className="text-sm text-green-300">
            {`int isEmpty() {
  return front == -1 || front > rear;
}

int isFull() {
  return rear == MAX - 1;
}

int peek() {
  if (isEmpty()) {
    printf("Queue is empty\\n");
    return -1;
  }
  return queue[front];
}`}
          </code>
        </pre>
      </motion.div>

      {/* Subtopic: Circular Queue */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mb-8 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Circular Queue</h2>
        <p className="text-gray-300 mb-4">
          A more efficient queue implementation that reuses empty spaces.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg">
          <code className="text-sm text-green-300">
            {`void enqueue(int value) {
  if ((rear + 1) % MAX == front) {
    printf("Queue is full\\n");
    return;
  }
  if (front == -1) front = 0;
  rear = (rear + 1) % MAX;
  queue[rear] = value;
}

int dequeue() {
  if (front == -1) {
    printf("Queue is empty\\n");
    return -1;
  }
  int item = queue[front];
  if (front == rear) {
    front = rear = -1;
  } else {
    front = (front + 1) % MAX;
  }
  return item;
}`}
          </code>
        </pre>
      </motion.div>
    </div>
  );
}