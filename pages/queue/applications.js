import { useState, useEffect } from "react";

export default function SimpleQueueApp() {
  // Queue state
  const [queue, setQueue] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Application scenarios
  const scenarios = [
    {
      id: "printer",
      title: "Printer Queue",
      description: "Documents waiting to print",
      enqueueLabel: "Add Document",
      processLabel: "Print Document",
      generateItem: () => `Document-${Math.floor(Math.random() * 1000)}`,
      color: "bg-blue-500"
    },
    {
      id: "tickets",
      title: "Ticket Queue",
      description: "Customers waiting for service",
      enqueueLabel: "Add Customer",
      processLabel: "Serve Customer",
      generateItem: () => `Customer-${Math.floor(Math.random() * 1000)}`,
      color: "bg-green-500"
    },
    {
      id: "tasks",
      title: "Task Queue",
      description: "Tasks waiting to execute",
      enqueueLabel: "Add Task",
      processLabel: "Run Task",
      generateItem: () => `Task-${Math.floor(Math.random() * 1000)}`,
      color: "bg-purple-500"
    }
  ];

  const [activeScenario, setActiveScenario] = useState(scenarios[0]);

  // Add to queue
  const enqueue = () => {
    const newItem = activeScenario.generateItem();
    setQueue([...queue, newItem]);
  };

  // Process from queue
  const processNext = () => {
    if (queue.length === 0) return;
    
    const nextItem = queue[0];
    setCurrentItem(nextItem);
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setQueue(queue.slice(1));
      setCurrentItem(null);
      setIsProcessing(false);
    }, 2000);
  };

  // Auto-add items for demo
  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.length < 5) {
        enqueue();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [queue, activeScenario]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Queue Application: {activeScenario.title}
        </h1>
        
        <p className="text-gray-600 mb-6">{activeScenario.description}</p>
        
        {/* Scenario selector */}
        <div className="flex gap-2 mb-6">
          {scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenario(scenario);
                setQueue([]);
                setCurrentItem(null);
                setIsProcessing(false);
              }}
              className={`px-3 py-1 rounded text-white text-sm ${
                activeScenario.id === scenario.id 
                  ? scenario.color 
                  : "bg-gray-400"
              }`}
            >
              {scenario.title}
            </button>
          ))}
        </div>
        
        {/* Current processing */}
        {isProcessing && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${activeScenario.color} animate-pulse`}></div>
              <span className="font-medium">Processing: {currentItem}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${activeScenario.color} animate-progress`}
                style={{ animationDuration: '2s' }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Queue visualization */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="font-medium mb-2">
            Queue ({queue.length} {queue.length === 1 ? 'item' : 'items'})
          </h2>
          
          {queue.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Queue is empty</p>
          ) : (
            <div className="space-y-2">
              {queue.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded ${
                    index === 0 ? `${activeScenario.color} text-white` : 'bg-gray-100'
                  } flex justify-between items-center`}
                >
                  <span>{item}</span>
                  {index === 0 && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      Next
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={enqueue}
            className={`flex-1 py-2 px-4 rounded text-white ${activeScenario.color} hover:opacity-90`}
          >
            {activeScenario.enqueueLabel}
          </button>
          <button
            onClick={processNext}
            disabled={queue.length === 0 || isProcessing}
            className={`flex-1 py-2 px-4 rounded ${
              queue.length === 0 || isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            {activeScenario.processLabel}
          </button>
        </div>
        
        {/* Explanation */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">How this works:</h3>
          <p className="text-sm text-blue-700">
            The queue processes items in <strong>First-In-First-Out (FIFO)</strong> order. 
            New items are added to the end, and processing always takes from the front.
          </p>
        </div>
      </div>
    </div>
  );
}