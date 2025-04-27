import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

const BACKEND_URL = "http://localhost:3000";

export default function PromptInterface() {
  const [weight, setWeight] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [followUp, setFollowUp] = useState("");
  const [followUpResponse, setFollowUpResponse] = useState("");
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const responseRef = useRef(null);
  const followUpRef = useRef(null);

  useEffect(() => {
    if (responseRef.current) {
      //@ts-ignore
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  useEffect(() => {
    if (followUpRef.current) {
      //@ts-ignore
      followUpRef.current.scrollTop = followUpRef.current.scrollHeight;
    }
  }, [followUpResponse]);

  const handleSubmit = async () => {
    if (!weight.trim() || !fatPercentage.trim() || !goal.trim()) return;

    setResponse("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, fatPercentage, goal, history }),
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
      //@ts-ignore

      setHistory((prev) => [
        ...prev,
        { question: `Weight: ${weight}, Fat Percentage: ${fatPercentage}, Goal: ${goal}`, answer: response },
      ]);
    } catch (error) {
      console.error("Streaming error:", error);
      setResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;

    setFollowUpResponse("");
    setIsFollowUpLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, fatPercentage, goal, followUp, history }),
      });

      if (!res.body) throw new Error("No response body received");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setFollowUpResponse("");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setFollowUpResponse((prev) => prev + chunk);
      }
      //@ts-ignore
      setHistory((prev) => [
        ...prev,
        { question: followUp, answer: followUpResponse },
      ]);
    } catch (error) {
      console.error("Follow-up streaming error:", error);
      setFollowUpResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setIsFollowUpLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl p-8 bg-gray-900 text-white rounded-2xl shadow-lg border border-gray-700 mt-28">
        {/* Health Goal Assistant */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-8">Health Goal Assistant</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight (kg)"
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="text"
              value={fatPercentage}
              onChange={(e) => setFatPercentage(e.target.value)}
              placeholder="Enter your fat percentage (%)"
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter your goal"
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-4 rounded-lg mt-8 hover:bg-purple-700 transition disabled:opacity-50"
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

          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 min-h-[200px] max-h-[300px] overflow-y-auto" ref={responseRef}>
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

        {/* Follow-up Section */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-8">Follow-up Chat</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleFollowUp}
            disabled={isFollowUpLoading}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-lg mt-8 hover:bg-green-700 transition disabled:opacity-50"
          >
            {isFollowUpLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Ask
              </>
            )}
          </button>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 min-h-[200px] max-h-[300px] overflow-y-auto" ref={followUpRef}>
            <h3 className="text-lg font-semibold mb-3">Follow-up Response</h3>
            <div className="text-gray-300">
              {isFollowUpLoading ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : followUpResponse ? (
                <p className="whitespace-pre-wrap">{followUpResponse}</p>
              ) : (
                <p className="text-gray-400 text-center">Your follow-up response will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
