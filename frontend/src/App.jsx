function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[500px]">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          AI Resume Builder
        </h1>

        <p className="text-gray-600 mb-6">
          Build ATS Optimized Resume with AI
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          Create Resume
        </button>
      </div>
    </div>
  )
}

export default App
