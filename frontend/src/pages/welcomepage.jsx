import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-700 to-purple-700 flex items-center justify-center px-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-4xl text-center text-white shadow-2xl">

        <h1 className="text-6xl font-bold mb-6">
          CareerForge Pro
        </h1>

        <p className="text-xl text-slate-200 mb-8">
          Build ATS-optimized resumes with AI-powered suggestions,
          resume scoring, keyword analysis, and professional templates.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <div className="bg-white/10 p-5 rounded-xl">
            🤖 AI Resume Improvement
          </div>

          <div className="bg-white/10 p-5 rounded-xl">
            📊 ATS Score Analysis
          </div>

          <div className="bg-white/10 p-5 rounded-xl">
            📄 PDF Resume Download
          </div>

        </div>

        <button
          onClick={() => navigate("/resume")}
          className="bg-white text-indigo-700 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Welcome;