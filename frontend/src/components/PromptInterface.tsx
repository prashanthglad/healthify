import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

const BACKEND_URL = "http://localhost:3000";

export default function PromptInterface() {
  const [weight, setWeight] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const responseRef = useRef(null);

  useEffect(() => {
    if (responseRef.current) {
      //@ts-ignore
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  const handleSubmit = async () => {
    if (!weight.trim() || !fatPercentage.trim() || !goal.trim()) return;

    setResponse("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ai/health`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, fatPercentage, goal }),
      });

      if (!res.body) throw new Error("No response body received");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setResponse("");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Streaming error:", error);
      setResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-10">
      <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg border border-gray-700">  
        <h2 className="text-2xl font-bold text-center mb-6">Health Goal Assistant</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight (kg)"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="text"
            value={fatPercentage}
            onChange={(e) => setFatPercentage(e.target.value)}
            placeholder="Enter your fat percentage (%)"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your goal"
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit
              </>
            )}
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 min-h-[150px] max-h-[300px] overflow-y-auto" ref={responseRef}>
          <h3 className="text-lg font-semibold mb-3">AI Response</h3>
          <div className="text-gray-300">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : response ? (
              <p className="whitespace-pre-wrap">{response}</p>
            ) : (
              <p className="text-gray-400 text-center">Your response will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
