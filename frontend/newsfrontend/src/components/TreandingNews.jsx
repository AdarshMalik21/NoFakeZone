import React from "react";
import NewsCard from "./NewsCard";

const TrendingNews = () => {
  const indiaNews = [
    {
      title: "Government launches AI initiative to tackle fake news",
      description: "India introduces AI systems to combat misinformation effectively.",
      image: "https://images.pexels.com/photos/4072688/pexels-photo-4072688.jpeg",
    },
    {
      title: "Supreme Court issues guidelines on online misinformation",
      description: "India's Supreme Court releases guidelines for social platforms.",
      image: "https://images.pexels.com/photos/10475829/pexels-photo-10475829.jpeg",
    },
  ];

  const worldNews = [
    {
      title: "EU cracks down on disinformation platforms",
      description: "New EU rules enforce stricter content moderation standards.",
      image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
    },
    {
      title: "US introduces bill to regulate AI-generated content",
      description: "Congress proposes AI regulation for ethical content use.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
        🌍 Trending News
      </h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-16">
        {/* India Section */}
        <div>
          <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center gap-2">
            <img src="https://flagcdn.com/w20/in.png" alt="IN" /> Trending in India
          </h3>
          <div className="grid grid-cols-1 gap-8">
            {indiaNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>

        {/* World Section */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center gap-2">
            🌐 Trending Worldwide
          </h3>
          <div className="grid grid-cols-1 gap-8">
            {worldNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNews;
