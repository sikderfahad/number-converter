import { useState } from "react";

const NumberConverter = () => {
  const [input, setInput] = useState("");
  const [base, setBase] = useState("decimal");
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState("");

  const baseMapping = {
    binary: 2,
    decimal: 10,
    octal: 8,
    hexadecimal: 16,
  };

  const validateInput = (value, base) => {
    const regexMap = {
      binary: /^[01]+$/,
      decimal: /^\d+$/,
      octal: /^[0-7]+$/,
      hexadecimal: /^[0-9A-Fa-f]+$/,
    };
    return regexMap[base].test(value);
  };

  const convertNumber = () => {
    if (!validateInput(input, base)) {
      setResult(null);
      setExplanation("Invalid number for the selected base.");
      return;
    }

    const decimalValue = parseInt(input, baseMapping[base]);
    const converted = {
      binary: decimalValue.toString(2),
      decimal: decimalValue.toString(10),
      octal: decimalValue.toString(8),
      hexadecimal: decimalValue.toString(16).toUpperCase(),
    };

    delete converted[base];
    setResult(converted);
    generateExplanation(decimalValue, converted);
  };

  const generateExplanation = (decimalValue, converted) => {
    let explanationText = `The input number (${input}) in ${base} converts as follows:\n`;
    for (const [key, value] of Object.entries(converted)) {
      explanationText += `- ${key}: ${value}\n`;
    }
    setExplanation(explanationText);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Number Converter</h2>
        <label className="block mb-2">Select Numbering System:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        >
          {Object.keys(baseMapping).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Enter Number:</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={convertNumber}
        >
          Convert
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold">Converted Values:</h3>
            {Object.entries(result).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        )}

        {explanation && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold">Explanation:</h3>
            <pre className="whitespace-pre-wrap">{explanation}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberConverter;
