import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Axios from "axios";
const FactCheckCard = ({title, verdict, sources}) =>{
  const getVerdictDisplay = (verdict) =>{

    if(!verdict) return { text: "Unverified", icon: "⚠️", color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-400" };
    const lowerVerdict = verdict.toLowerCase();
    if (lowerVerdict.includes("highly accurate")) {
            return { text: "Highly Accurate", icon: "✅", color: "text-green-600", bg: "from-green-50 to-green-100", border: "border-green-500" };
        } else if (lowerVerdict.includes("inaccurate")) {
            return { text: "Inaccurate", icon: "❌", color: "text-red-600", bg: "from-red-50 to-red-100", border: "border-red-500" };
        }else if(lowerVerdict.includes("mostly accurate")){
          return { text: "Mostly Accurate", icon: "🟡", color: "text-yellow-600", bg: "from-yellow-50 to-yellow-100", border: "border-yellow-500" };
        }
         else {
            return { text: "Unverified", icon: "❓", color: "text-yellow-600", bg: "from-yellow-50 to-yellow-100", border: "border-yellow-500" };
        }
  }

  const verdictDisplay = getVerdictDisplay(verdict);

  return (
        <div className={`mt-6 w-full max-w-2xl p-6 rounded-2xl shadow-xl border-2 text-center font-inter bg-gradient-to-br ${verdictDisplay.bg} ${verdictDisplay.border}`}>
            {title && (
                <h2 className="text-xl font-bold mb-4">{title}</h2>
            )}

            <div className="flex flex-col items-center justify-center mb-4 text-center">
                <h3 className={`text-2xl font-extrabold flex flex-col items-center gap-3 mb-2 md:mb-0 ${verdictDisplay.color}`}>
                    <span className="leading-none">{verdictDisplay.icon} {verdictDisplay.text}</span>
                </h3>
            </div>

            <div className="sources-list p-4 bg-white bg-opacity-80 rounded-lg shadow-inner border border-gray-200">
                <h4 className="text-md font-bold text-gray-800 mb-2">Sources:</h4>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                    {sources && sources.length > 0 ? (
                        sources.map((source, index) => (
                            <a 
                                key={index} 
                                href={source} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-blue-700 hover:underline text-sm transition-colors"
                            >
                                {source}
                            </a>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No sources provided.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (articleData) => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await Axios.post('http://localhost:8000/api/fact-check/', {
        query: articleData,
      });
      console.log(response.data);
      setResult(response.data);
      setLoading(false);
    }
    catch (error) {
      console.log("There was an error!", error)
      setError(error.response?.data?.error || "An unexpected error occurred.");
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
      {result && !error && (
                <FactCheckCard
                    title={result.title}
                    verdict={result.verdict}
                    sources={result.sources}
                />
            )}

      {/* Display error message if an error occurred */}
            {error && (
                <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-700 max-w-2xl text-left">
                    <h4 className="font-bold">Error:</h4>
                    <p>{error}</p>
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
