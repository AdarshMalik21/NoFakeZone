import { ShieldCheck, Search, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "AI-Powered Fake News Detection",
      desc: "Advanced machine learning models analyze and verify news in seconds.",
    },
    {
      icon: <Search className="w-10 h-10 text-green-600" />,
      title: "Instant Verification",
      desc: "Paste any news article or headline and check its authenticity instantly.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
      title: "Trending News",
      desc: "Stay updated with real-time trending stories from India and worldwide.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why Choose <span className="text-blue-600">NoFakeZone?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
