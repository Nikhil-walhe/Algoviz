import { useState } from 'react';

export default function QueueADT() {
  const MAX_SIZE = 5;
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [operationHistory, setOperationHistory] = useState([]);
  const [message, setMessage] = useState('The queue is empty. Try enqueuing an element!');

  const enqueue = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a value to enqueue');
      return;
    }
    if (queue.length >= MAX_SIZE) {
      setMessage('Queue overflow! Cannot enqueue to a full queue.');
      return;
    }

    const newQueue = [...queue, inputValue];
    setQueue(newQueue);
    setOperationHistory([...operationHistory, `Enqueued "${inputValue}"`]);
    setMessage(`Enqueued "${inputValue}" to the queue`);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue underflow! Cannot dequeue from an empty queue.');
      return;
    }

    const dequeuedItem = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    setOperationHistory([...operationHistory, `Dequeued "${dequeuedItem}"`]);
    setMessage(`Dequeued "${dequeuedItem}" from the queue`);
  };

  const front = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty. No front element.');
    } else {
      setMessage(`Front element is "${queue[0]}"`);
    }
  };

  const rear = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty. No rear element.');
    } else {
      setMessage(`Rear element is "${queue[queue.length - 1]}"`);
    }
  };

  const clearQueue = () => {
    setQueue([]);
    setOperationHistory([...operationHistory, 'Cleared queue']);
    setMessage('Queue has been cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Theory */}
        <div className="bg-gray-900 bg-opacity-70 rounded-xl p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">
            Queue ADT
          </h1>
          
          <div className="space-y-4 text-gray-300">
            <p>
              A <span className="text-green-400 font-semibold">Queue</span> is a linear data structure that follows the 
              <span className="text-green-400 font-semibold"> First In, First Out (FIFO)</span> principle. 
              The first element added to the queue is the first one to be removed.
            </p>

            <h2 className="text-xl font-semibold text-green-400 mt-6">Queue Operations (ADT):</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Enqueue</span>: Add an element to the rear of the queue</li>
              <li><span className="font-semibold">Dequeue</span>: Remove an element from the front of the queue</li>
              <li><span className="font-semibold">Front</span>: View the front element without removing it</li>
              <li><span className="font-semibold">Rear</span>: View the last element without removing it</li>
              <li><span className="font-semibold">isEmpty</span>: Check if the queue has no elements</li>
              <li><span className="font-semibold">isFull</span>: Check if the queue has reached its capacity</li>
            </ul>

            <h2 className="text-xl font-semibold text-green-400 mt-6">Applications:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>CPU scheduling</li>
              <li>Printer queues</li>
              <li>Handling requests in web servers</li>
              <li>Breadth-First Search algorithms</li>
              <li>Buffering in networking</li>
            </ul>
          </div>
        </div>

        {/* Right Panel - Visualization */}
        <div className="bg-gray-900 bg-opacity-70 rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col h-full">
            {/* Queue Visualization */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-green-400">Front →</span>
                <span className="font-medium text-green-400">← Rear</span>
              </div>
              
              <div className="flex justify-center space-x-2 mb-6">
                {queue.length === 0 ? (
                  <div className="w-16 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-500 border border-gray-700">
                    [ ]
                  </div>
                ) : (
                  queue.map((item, index) => (
                    <div 
                      key={index} 
                      className={`w-16 h-12 rounded flex items-center justify-center font-mono
                        ${index === 0 ? 'bg-green-900 border-2 border-green-600' : 'bg-gray-800 border border-gray-700'}`}
                    >
                      {item}
                    </div>
                  ))
                )}
                {Array(MAX_SIZE - queue.length).fill(0).map((_, index) => (
                  <div 
                    key={`empty-${index}`} 
                    className="w-16 h-12 bg-gray-800 rounded flex items-center justify-center text-gray-600 border border-dashed border-gray-700"
                  >
                    [ ]
                  </div>
                ))}
              </div>

              <div className="text-center text-sm text-gray-400 mb-6">
                Queue Size: <span className="font-mono">{queue.length}/{MAX_SIZE}</span>
              </div>
            </div>

            {/* Message Display */}
            <div className="mb-6 p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-800">
              <p className="text-center text-green-200">{message}</p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter an element"
                className="col-span-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                onClick={enqueue}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition-colors"
              >
                Enqueue
              </button>
              <button
                onClick={dequeue}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Dequeue
              </button>
              <button
                onClick={front}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Front
              </button>
              <button
                onClick={rear}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md transition-colors"
              >
                Rear
              </button>
              <button
                onClick={clearQueue}
                className="col-span-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Operation History */}
            <div className="mt-6">
              <h3 className="font-medium text-green-400 mb-2">Operation History:</h3>
              <div className="bg-gray-800 p-3 rounded-md h-32 overflow-y-auto border border-gray-700">
                {operationHistory.length === 0 ? (
                  <p className="text-gray-500 text-center">No operations yet</p>
                ) : (
                  <ul className="space-y-1">
                    {operationHistory.map((op, index) => (
                      <li key={index} className="text-sm text-gray-300 font-mono">
                        {op}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}