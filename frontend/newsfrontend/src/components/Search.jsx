import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Axios from "axios";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); 

  const handleSearch = async(articleData) => {
    if (!query) return;
    setLoading(true);
    setResult(null);

    try{
      const response = await Axios.post('http://localhost:8000/api/fact-check/', {
        query: articleData,
  });
      console.log(response.data);
      setResult(response.data);
      setLoading(false);
    }
    catch(error){
      console.log("There was an error!", error)
      setLoading(false);
    }
  }

  const handleExampleClick = (example) => {
    setQuery(example);
  };

  return (
    <section className="w-full py-20 bg-gray-50 flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Check News Genuineness
      </h2>
      <p className="text-gray-600 mb-8 max-w-xl">
        Paste a news headline, article, or URL below to verify if it’s real or fake.
      </p>

      <div className="flex w-full  max-w-2xl border-2 border-blue-500 shadow-lg rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
        <input
          type="text"
          placeholder="Enter news text or URL..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 outline-none text-gray-700"
        />
        <button
          onClick={() => handleSearch(query)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-6 flex items-center gap-2 transition"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search size={20} />}
          {loading ? "Checking..." : "Check"}
        </button>
      </div>


 {/* ✅ Result Card */}
{result && (
  <div
    className={`mt-6 w-full max-w-2xl transition-all duration-1500 ease-out
      ${result ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
    `}
  >
    <div
      className={`p-6 rounded-2xl shadow-lg border
        ${
          result.isFake
            ? "border-red-500 bg-red-50"
            : result.error
            ? "border-gray-400 bg-gray-100"
            : "border-green-500 bg-green-50"
        }`}
    >
      <h3 className="text-xl font-semibold flex items-center gap-2">
        {result.error
          ? "⚠️ Error"
          : result.isFake
          ? "❌ Fake News Detected"
          : "✅ Verified News"}
      </h3>
      <p className="text-gray-700 mt-2">
        {result.error
          ? result.error
          : result.message || "No detailed explanation available."}
      </p>

      {!result.error && (
        <button
          onClick={() =>
            alert(result.details || "No extra details available.")
          }
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          View Details
        </button>
      )}
    </div>
  </div>
)}



      

      {/* Example queries */}
      <div className="mt-6 text-sm text-gray-500 space-x-2">
        Try: 
        <span
          onClick={() => handleExampleClick("India wins World Cup 2025")}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          India wins World Cup 2025
        </span>
        |
        <span
          onClick={() => handleExampleClick("Elon Musk buys Google")}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Elon Musk buys Google
        </span>
      </div>
    </section>
  );
}
