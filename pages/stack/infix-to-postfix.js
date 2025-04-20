import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function InfixToPostfix() {
  // State management
  const [codeStep, setCodeStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [userExpression, setUserExpression] = useState("");
  const [executionResult, setExecutionResult] = useState("");
  const [breakpoints, setBreakpoints] = useState([]);
  const [variables, setVariables] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [conversionSteps, setConversionSteps] = useState([]);

  // Use ref for the interval
  const playInterval = useRef(null);

  // Complete C code with line-by-line explanations
  const codeData = [
    { 
      line: "#include <stdio.h>", 
      explanation: "Includes the standard input/output library for functions like printf() and scanf() which are used for displaying output and reading user input.",
      important: true 
    },
    { 
      line: "#include <stdlib.h>", 
      explanation: "Includes the standard library for functions like exit() and memory management functions, though none are used in this particular code.",
      important: false 
    },
    { 
      line: "#include <ctype.h>", 
      explanation: "Includes the character handling library for functions like isspace() and isalnum() which are used to check for whitespace and alphanumeric characters.",
      important: true 
    },
    { 
      line: "#include <string.h>", 
      explanation: "Includes the string handling library for functions like strcspn() which is used to remove the newline character from input.",
      important: true 
    },
    { 
      line: "#define MAX 100", 
      explanation: "Defines a constant MAX with value 100, which will be used as the maximum size for arrays throughout the program.",
      important: true 
    },
    { 
      line: "char stack[MAX];", 
      explanation: "Declares a character array named 'stack' of size MAX (100) to implement the stack data structure.",
      important: true 
    },
    { 
      line: "int top = -1;", 
      explanation: "Initializes a variable 'top' to -1, indicating the stack is empty (as array indices start from 0).",
      important: true 
    },
    { 
      line: "void push(char c) {", 
      explanation: "Begins definition of push function that takes a character as argument to add to the stack.",
      important: true 
    },
    { 
      line: "    if (top < MAX - 1) {", 
      explanation: "Checks if stack is not full (top < MAX-1 because array indices go from 0 to MAX-1).",
      important: true 
    },
    { 
      line: "        stack[++top] = c;", 
      explanation: "Increments top first (++top) then stores the character at the new top position.",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Else block executes when stack is full.",
      important: false 
    },
    { 
      line: "        printf(\"Stack Overflow\\n\");", 
      explanation: "Prints 'Stack Overflow' error message when trying to push to a full stack.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "}", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "char pop() {", 
      explanation: "Begins definition of pop function that removes and returns the top element from the stack.",
      important: true 
    },
    { 
      line: "    if (top >= 0) {", 
      explanation: "Checks if stack is not empty (top >= 0 means there are elements).",
      important: true 
    },
    { 
      line: "        return stack[top--];", 
      explanation: "Returns the top element and then decrements top (post-decrement).",
      important: true 
    },
    { 
      line: "    } else {", 
      explanation: "Else block executes when stack is empty.",
      important: false 
    },
    { 
      line: "        printf(\"Stack Underflow\\n\");", 
      explanation: "Prints 'Stack Underflow' error message when trying to pop from an empty stack.",
      important: true 
    },
    { 
      line: "        return '\\0';", 
      explanation: "Returns null character as error value when stack is empty.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "}", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "int precedence(char c) {", 
      explanation: "Begins definition of precedence function that returns the precedence level of operators.",
      important: true 
    },
    { 
      line: "    if (c == '+' || c == '-') return 1;", 
      explanation: "Returns 1 for addition and subtraction operators (lowest precedence).",
      important: true 
    },
    { 
      line: "    if (c == '*' || c == '/') return 2;", 
      explanation: "Returns 2 for multiplication and division operators (higher precedence).",
      important: true 
    },
    { 
      line: "    return 0;", 
      explanation: "Returns 0 for all other characters (including parentheses which aren't operators).",
      important: true 
    },
    { 
      line: "}", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "void infixToPostfix(char* infix, char* postfix) {", 
      explanation: "Begins definition of the main conversion function that takes infix and postfix strings.",
      important: true 
    },
    { 
      line: "    int i, j = 0;", 
      explanation: "Declares counter variables: i for infix string, j for postfix string (initialized to 0).",
      important: true 
    },
    { 
      line: "    for (i = 0; infix[i] != '\\0'; i++) {", 
      explanation: "Starts loop through each character of infix string until null terminator is found.",
      important: true 
    },
    { 
      line: "        if (isspace(infix[i])) continue;", 
      explanation: "Skips whitespace characters in the input expression.",
      important: true 
    },
    { 
      line: "        if (isalnum(infix[i])) {", 
      explanation: "Checks if character is alphanumeric (operand).",
      important: true 
    },
    { 
      line: "            postfix[j++] = infix[i];", 
      explanation: "If operand, adds it directly to postfix expression and increments j.",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "        else if (infix[i] == '(') {", 
      explanation: "Checks if character is opening parenthesis.",
      important: true 
    },
    { 
      line: "            push(infix[i]);", 
      explanation: "Pushes '(' onto the stack to mark the start of a sub-expression.",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "        else if (infix[i] == ')') {", 
      explanation: "Checks if character is closing parenthesis.",
      important: true 
    },
    { 
      line: "            while (top != -1 && stack[top] != '(') {", 
      explanation: "Loops until stack is empty or '(' is found at top.",
      important: true 
    },
    { 
      line: "                postfix[j++] = pop();", 
      explanation: "Pops operators from stack to postfix until matching '(' is found.",
      important: true 
    },
    { 
      line: "            }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "            if (top != -1 && stack[top] == '(') pop();", 
      explanation: "Pops and discards the '(' from stack (doesn't add to postfix).",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "        else {", 
      explanation: "Else block handles operators (+, -, *, /).",
      important: true 
    },
    { 
      line: "            while (top != -1 && precedence(stack[top]) >= precedence(infix[i])) {", 
      explanation: "While stack not empty and top operator has higher or equal precedence...",
      important: true 
    },
    { 
      line: "                postfix[j++] = pop();", 
      explanation: "Pop higher precedence operators to postfix before pushing current operator.",
      important: true 
    },
    { 
      line: "            }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "            push(infix[i]);", 
      explanation: "Push the current operator onto the stack.",
      important: true 
    },
    { 
      line: "        }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "    }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "    while (top != -1) {", 
      explanation: "After processing all characters, pop any remaining operators from stack.",
      important: true 
    },
    { 
      line: "        postfix[j++] = pop();", 
      explanation: "Add remaining operators to postfix expression.",
      important: true 
    },
    { 
      line: "    }", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "    postfix[j] = '\\0';", 
      explanation: "Adds null terminator to mark end of the postfix string.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "No explanation required",
      important: false 
    },
    { 
      line: "int main() {", 
      explanation: "Begins main function where program execution starts.",
      important: true 
    },
    { 
      line: "    char infix[MAX], postfix[MAX];", 
      explanation: "Declares character arrays to hold input infix and output postfix expressions.",
      important: true 
    },
    { 
      line: "    printf(\"Enter infix expression: \");", 
      explanation: "Prompts user to enter an infix expression.",
      important: true 
    },
    { 
      line: "    fgets(infix, MAX, stdin);", 
      explanation: "Reads the infix expression from user input with spaces, up to MAX characters.",
      important: true 
    },
    { 
      line: "    infix[strcspn(infix, \"\\n\")] = 0;", 
      explanation: "Removes trailing newline character from the input string.",
      important: true 
    },
    { 
      line: "    infixToPostfix(infix, postfix);", 
      explanation: "Calls the conversion function with infix input and postfix output buffers.",
      important: true 
    },
    { 
      line: "    printf(\"Postfix Expression: %s\\n\", postfix);", 
      explanation: "Prints the converted postfix expression.",
      important: true 
    },
    { 
      line: "    return 0;", 
      explanation: "Returns 0 indicating successful program execution.",
      important: true 
    },
    { 
      line: "}", 
      explanation: "No explanation required",
      important: false 
    }
  ];

  // Actual infix to postfix conversion function
  const infixToPostfix = (infix) => {
    let steps = [];
    let postfix = "";
    let stack = [];
    let stepCount = 1;

    const precedence = (c) => {
      if (c === '^') return 3;
      if (c === '*' || c === '/') return 2;
      if (c === '+' || c === '-') return 1;
      return 0;
    };

    // Initialize table header
    steps.push({
      step: stepCount++,
      symbol: 'Initial',
      stack: stack.join(''),
      postfix: postfix,
      description: 'Initial state'
    });

    for (let i = 0; i < infix.length; i++) {
      const c = infix[i];
      
      if (c === ' ') continue;

      if (/[a-zA-Z0-9]/.test(c)) {
        // Operand
        postfix += c;
        steps.push({
          step: stepCount++,
          symbol: c,
          stack: stack.join(''),
          postfix: postfix,
          description: `Operand '${c}' added to output`
        });
      } else if (c === '(') {
        // Left parenthesis
        stack.push(c);
        steps.push({
          step: stepCount++,
          symbol: c,
          stack: stack.join(''),
          postfix: postfix,
          description: `Left parenthesis '${c}' pushed to stack`
        });
      } else if (c === ')') {
        // Right parenthesis
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          postfix += stack.pop();
          steps.push({
            step: stepCount++,
            symbol: c,
            stack: stack.join(''),
            postfix: postfix,
            description: `Popped operator '${postfix.slice(-1)}' from stack to output`
          });
        }
        stack.pop(); // Remove '(' from stack
      } else {
        // Operator
        while (stack.length > 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
          postfix += stack.pop();
          steps.push({
            step: stepCount++,
            symbol: c,
            stack: stack.join(''),
            postfix: postfix,
            description: `Popped higher precedence operator '${postfix.slice(-1)}' to output`
          });
        }
        stack.push(c);
        steps.push({
          step: stepCount++,
          symbol: c,
          stack: stack.join(''),
          postfix: postfix,
          description: `Operator '${c}' pushed to stack`
        });
      }
    }

    // Pop all remaining operators
    while (stack.length > 0) {
      postfix += stack.pop();
      steps.push({
        step: stepCount++,
        symbol: '',
        stack: stack.join(''),
        postfix: postfix,
        description: `Popped remaining operator '${postfix.slice(-1)}' to output`
      });
    }

    setConversionSteps(steps);
    return postfix;
  };

  // Execute user's expression
  const executeCode = () => {
    if (!userExpression) {
      setExecutionResult("Please enter an expression");
      return;
    }
    
    try {
      const postfix = infixToPostfix(userExpression);
      setExecutionResult(`Postfix: ${postfix}`);
      setCodeStep(0);
      updateVariables(0);
    } catch (error) {
      setExecutionResult(`Error: ${error.message}`);
    }
  };

  // Navigation functions
  const nextStep = () => {
    let nextStep = codeStep + 1;
    if (isPlaying) {
      while (nextStep < codeData.length && !breakpoints.includes(nextStep)) {
        nextStep++;
      }
    }
    if (nextStep < codeData.length) {
      setCodeStep(nextStep);
      updateVariables(nextStep);
    } else {
      // Reached the end - stop playing
      if (isPlaying) {
        clearInterval(playInterval.current);
        setIsPlaying(false);
      }
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

  const toggleBreakpoint = (index) => {
    setBreakpoints(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const togglePlay = () => {
    if (isPlaying) {
      // Stop playing
      clearInterval(playInterval.current);
      setIsPlaying(false);
    } else {
      // Start playing
      setIsPlaying(true);
      const delay = Math.max(1000 / playbackSpeed, 200);
      playInterval.current = setInterval(nextStep, delay);
    }
  };

  // Update variable visualization
  const updateVariables = (step) => {
    const currentLine = codeData[step]?.line || "";
    let vars = {
      top: 0,
      i: 0,
      j: 0,
      stack: [],
      infix: userExpression || "",
      postfix: executionResult.replace("Postfix: ", "") || ""
    };

    // Simple simulation based on code line
    if (currentLine.includes("top = -1")) vars.top = -1;
    if (currentLine.includes("++top")) vars.top += 1;
    if (currentLine.includes("top--")) vars.top -= 1;
    if (currentLine.includes("i++")) vars.i += 1;
    if (currentLine.includes("j++")) vars.j += 1;
    if (currentLine.includes("push")) vars.stack.push("item");
    if (currentLine.includes("pop")) vars.stack.pop();

    setVariables(vars);
  };

  // Clean up interval on unmount and when dependencies change
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
    <div className={`min-h-screen flex flex-col items-center p-4 transition-colors text-sm ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Control Bar */}
      <div className="flex gap-3 mb-4 w-full max-w-6xl justify-end">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 bg-gray-700 text-white rounded text-xs"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button
          onClick={() => setShowTable(!showTable)}
          className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
        >
          {showTable ? 'Show Code' : 'Show Table'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl">
        {/* Code/Table Panel */}
        <div className={`p-3 rounded-lg shadow-lg flex-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {showTable ? 'Conversion Steps' : 'Infix to Postfix Code'}
          </h2>
          
          {showTable ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <th className="p-1 border">Step</th>
                    <th className="p-1 border">Symbol</th>
                    <th className="p-1 border">Stack</th>
                    <th className="p-1 border">Postfix</th>
                    <th className="p-1 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionSteps.map((step, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-700' : 'bg-gray-50')}`}
                    >
                      <td className="p-1 border text-center">{step.step}</td>
                      <td className="p-1 border text-center">{step.symbol}</td>
                      <td className="p-1 border text-center">{step.stack}</td>
                      <td className="p-1 border text-center">{step.postfix}</td>
                      <td className="p-1 border">{step.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <pre className={`p-2 rounded-lg overflow-x-auto max-h-96 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-xs`}>
              <code>
                {codeData.map((item, index) => (
                  <div
                    key={index}
                    className={`${index === codeStep ? (darkMode ? "bg-yellow-700" : "bg-yellow-200") : ""} 
                               ${breakpoints.includes(index) ? "border-l-4 border-red-500" : ""}
                               hover:bg-opacity-50 cursor-pointer py-0.5 px-1 flex`}
                    onClick={() => jumpToStep(index)}
                  >
                    <span 
                      className={`mr-2 w-5 text-center cursor-pointer ${breakpoints.includes(index) ? "text-red-500" : "text-gray-500"}`}
                      onClick={(e) => { e.stopPropagation(); toggleBreakpoint(index); }}
                    >
                      {index + 1}
                    </span>
                    <span className={item.important ? "font-semibold" : ""}>
                      {item.line}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          )}
        </div>

        {/* Explanation Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Explanation
            </h2>
            <div className={`p-2 rounded-lg mb-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} text-xs`}>
              <p>{codeData[codeStep]?.explanation || "No explanation needed for this line."}</p>
              <div className="mt-1 text-xs opacity-75">
                Line {codeStep + 1} of {codeData.length}
              </div>
            </div>

            {/* Execution Panel */}
            <div className="mb-3">
              <label className={`block mb-1 ${darkMode ? 'text-white' : 'text-gray-800'} text-xs`}>
                Enter Infix Expression:
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={userExpression}
                  onChange={(e) => setUserExpression(e.target.value)}
                  className={`flex-1 p-1 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-xs`}
                  placeholder="e.g., a+b*c"
                />
                <button
                  onClick={executeCode}
                  className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                >
                  Convert
                </button>
              </div>
              {executionResult && (
                <div className={`mt-1 p-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-xs`}>
                  <strong>Result:</strong> {executionResult}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-3">
              <button
                onClick={prevStep}
                disabled={codeStep === 0}
                className={`px-2 py-1 rounded-lg ${codeStep === 0 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white text-xs`}
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={togglePlay}
                  className={`px-2 py-1 rounded-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white text-xs`}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <select 
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  className={`border rounded px-1 py-0.5 ${darkMode ? 'bg-gray-700' : 'bg-white'} text-xs`}
                  disabled={isPlaying}
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              <button
                onClick={nextStep}
                disabled={codeStep === codeData.length - 1}
                className={`px-2 py-1 rounded-lg ${codeStep === codeData.length - 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white text-xs`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Variables Panel */}
          <div className={`p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Variable States
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <h3 className="font-semibold mb-1">Stack</h3>
                <div className={`p-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {variables.stack?.length > 0 ? (
                    <div className="flex flex-col-reverse">
                      {variables.stack.map((item, i) => (
                        <div key={i} className={`p-0.5 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="italic">Empty</p>
                  )}
                  <div className="mt-0.5 text-2xs">
                    top = {variables.top}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Expressions</h3>
                <div className="space-y-1">
                  <div>
                    <div className="font-medium">Infix:</div>
                    <div className={`p-0.5 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {variables.infix || "None"}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Postfix:</div>
                    <div className={`p-0.5 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {variables.postfix || "None"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Counters</h3>
                <div className="space-y-0.5">
                  <div>i = {variables.i}</div>
                  <div>j = {variables.j}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Complexity Section */}
      <div className={`p-3 rounded-lg shadow-lg w-full max-w-6xl mt-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Time Complexity
        </h2>
        <p className="text-xs">
          The time complexity is <strong>O(n)</strong> where <strong>n</strong> is the length of the infix expression.
          Each character is processed exactly once, with stack operations taking O(1) time.
        </p>
      </div>
    </div>
  );
}