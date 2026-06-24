
      import { useState } from "react";
      import axios from "axios";
      import ResumePreview from "../components/ResumePreview";
      import { useNavigate } from "react-router-dom";
      
      function ResumeBuilder() {
        const navigate = useNavigate();
      
        const [loading, setLoading] = useState(false);
      
        const [aiLoading, setAiLoading] = useState(false);
        const [loadingMessage, setLoadingMessage] = useState("");
        const [aiSuggestions, setAiSuggestions] = useState("");
      
        const [successMessage, setSuccessMessage] = useState("");
        const [errorMessage, setErrorMessage] = useState("");
        const [resumeId, setResumeId] = useState(null);
        const [isEditing, setIsEditing] = useState(false);
        
      
        const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          college: "",
          degree: "",
          cgpa: "",
          graduationYear: "",
          company: "",
          role: "",
          duration: "",
          experienceDescription: "",
          skills: "",
          template: "modern",
        });
      
        const handleChange = (e) => {
      
          setFormData({
            ...formData,
            [e.target.name]: e.target.value.trimStart(),
          });
      
        };
      
        const handleSubmit = async (e) => {
      
        e.preventDefault();
      
        setLoading(true);
      
        try {
      
          let response;
      
          if (isEditing && resumeId) {
      
            response = await axios.put(
              `${import.meta.env.VITE_API_URL}/api/resume/${resumeId}`,
              formData
            );
      
          } else {
      
            response = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/resume`,
              formData
            );
      
            if (response.data.data?._id) {
              setResumeId(response.data.data._id);
              setIsEditing(true);
            }
      
          }
      
          if (response.data.success) {
      
            setSuccessMessage(
              isEditing
                ? "Resume Updated Successfully!"
                : "Resume Saved Successfully!"
            );
      
            setErrorMessage("");
      
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
      
          }
      
        } catch (error) {
      
          console.log(error);
      
          setErrorMessage("Failed to process resume.");
          setSuccessMessage("");
      
        }
      
        setLoading(false);
      
        };
      
      
        const handleImproveResume = async () => {
      
        try {
      
          setAiLoading(true);
          setLoadingMessage("🔍 Analyzing your resume...");
      
          setTimeout(() => {
            setLoadingMessage("📊 Checking ATS optimization...");
          }, 2000);
      
          setTimeout(() => {
            setLoadingMessage("🤖 Generating AI improvements...");
          }, 4000);
      
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/ai/improve`,
            {
              formData,
            }
          );
      
          if (response.data.success) {
            setAiSuggestions(
              response.data.aiResponse ||
              "No suggestions generated."
            );
      
            setLoadingMessage("✅ AI analysis completed!");
      
            setTimeout(() => {
              setLoadingMessage("");
            }, 2000);
          }
      
        } catch (error) {
      
        console.error(error);
      
        if (error.response) {
      
          setAiSuggestions(
            "⚠️ Server error while generating suggestions."
          );
      
        } else if (error.request) {
      
          setAiSuggestions(
            "⚠️ Unable to connect to AI service."
          );
      
        } else {
      
          setAiSuggestions(
            "⚠️ Something went wrong."
          );
      
        }
      
        } finally {
          
            setAiLoading(false);
        }
      
        };
      
        const handleDownloadPDF = async () => {
          try {
      
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/pdf/download-pdf`,
              formData,
              {
                responseType: "blob",
              }
            );
      
            const file = new Blob(
              [response.data],
              {
                type: "application/pdf",
              }
            );
      
            const fileURL = window.URL.createObjectURL(file);
      
            const link = document.createElement("a");
      
            link.href = fileURL;
            link.download = "resume.pdf";
      
            document.body.appendChild(link);
      
            link.click();
      
            link.remove();
      
          } catch (error) {
            console.log(error);
            alert("Failed to download PDF");
          }
        };
      
       
          const atsKeywords = [
            "react",
            "node",
            "mongodb",
            "javascript",
            "express",
            "api",
            "git",
            "html",
            "css",
            "tailwind",
          ];
      
          const content = `
      ${formData.skills}
      ${formData.experienceDescription}
      ${formData.degree}
      ${formData.role}
          `.toLowerCase();
      
          const foundKeywords = atsKeywords.filter((keyword) =>
            content.includes(keyword)
          );
      
          const atsScore = Math.round(
            (foundKeywords.length / atsKeywords.length) * 100
          );
      
          const missingKeywords = atsKeywords.filter(
            (keyword) => !content.includes(keyword)
          );
       
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-6 sm:py-10 px-3 sm:px-4 md:px-8 overflow-y-auto">
    
                {/* Background Glow Effects */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto space-y-6 animate-[fadeIn_0.6s_ease-in-out]">
      
                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition-all border border-slate-700"
                        >
                            ← Back to Welcome
                        </button>
                    </div>
      
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white p-6 sm:p-8 rounded-2xl shadow-lg">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            CareerForge Pro
                        </h1>
                        <p className="mt-1.5 text-blue-100 text-sm sm:text-base opacity-90">
                            AI-Powered Resume Builder & ATS Optimizer
                        </p>
                    </div>
      
                    {/* Top Section: Analytics */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                        {/* ATS Score */}
                        <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-md flex flex-col justify-center">
                            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                                ATS Score
                            </h2>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-5xl font-black text-emerald-400">{atsScore}%</span>
                                <span className="text-slate-400 text-sm font-medium">Compatibility</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                                <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${atsScore}%` }}></div>
                            </div>
                        </div>

                        {/* Missing Keywords */}
                        <div className="md:col-span-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-md">
                            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Missing Keywords
                            </h2>
                            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto pr-2">
                                {missingKeywords.length > 0 ? (
                                    missingKeywords.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-lg text-xs font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                                        ✓ All ATS keywords found
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Main Workspace: Builder & Preview */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
                        {/* LEFT FORM SECTION */}
                        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    Resume Builder
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">
                                    Fill in your professional details to generate an ATS-ready resume.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
            
                                {/* Personal Information */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        required
                                    />
                                </div>

                                {/* Education */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                                        Education
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="college"
                                            placeholder="College / University"
                                            value={formData.college}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                        <input
                                            type="text"
                                            name="degree"
                                            placeholder="Degree"
                                            value={formData.degree}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                        <input
                                            type="text"
                                            name="cgpa"
                                            placeholder="CGPA"
                                            value={formData.cgpa}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                        <input
                                            type="text"
                                            name="graduationYear"
                                            placeholder="Graduation Year"
                                            value={formData.graduationYear}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                                        Experience
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder="Company Name"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                        <input
                                            type="text"
                                            name="role"
                                            placeholder="Role / Position"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="duration"
                                        placeholder="Duration (Ex: Jan 2024 - Present)"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full"
                                    />
                                    <textarea
                                        name="experienceDescription"
                                        placeholder="Describe your work experience..."
                                        value={formData.experienceDescription}
                                        onChange={handleChange}
                                        className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full h-32 resize-none"
                                    />
                                </div>

                                {/* Skills */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-sm space-y-3">
                                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
                                        Skills
                                    </h3>
                                    <textarea
                                        name="skills"
                                        placeholder="Enter your skills (React, Node.js, MongoDB, Python...)"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="border border-slate-300 bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 text-sm transition-all w-full h-28 resize-none"
                                    />
                                </div>

                                {/* Template Selection */}
                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 shadow-sm space-y-3">
                                    <h3 className="text-lg font-bold text-slate-800 pb-1">
                                        Resume Template
                                    </h3>
                                    <select
                                        name="template"
                                        value={formData.template}
                                        onChange={handleChange}
                                        className="border border-slate-300 bg-white p-3 rounded-lg w-full text-slate-800 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    >
                                        <option value="modern">Modern</option>
                                        <option value="classic">Classic</option>
                                        <option value="professional">Professional</option>
                                    </select>
                                </div>

                                {/* System Feedback Messages */}
                                {successMessage && (
                                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium">
                                        {successMessage}
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm font-medium">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* AI Processing Status */}
                                {aiLoading && (
                                    <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl">
                                        <div className="h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-purple-800 font-medium text-sm">
                                            {loadingMessage}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleImproveResume}
                                        disabled={aiLoading}
                                        className={`w-full text-white font-semibold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all ${
                                            aiLoading
                                                ? "bg-purple-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 active:scale-[0.99]"
                                        }`}
                                    >
                                        {aiLoading ? "Improving..." : "✨ AI Improve"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDownloadPDF}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all active:scale-[0.99]"
                                    >
                                        📄 Download PDF
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full text-white font-semibold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all ${
                                            loading
                                                ? "bg-slate-400 cursor-not-allowed"
                                                : "bg-slate-900 hover:bg-slate-800 active:scale-[0.99]"
                                        }`}
                                    >
                                        {loading ? "Processing..." : isEditing ? "Update Resume" : "Save Resume"}
                                    </button>
                                </div>

                                {/* AI Optimization Suggestions box */}
                                {aiSuggestions && (
                                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-indigo-100 rounded-xl p-5 shadow-inner">
                                        <h3 className="text-md font-bold text-indigo-900 mb-2 flex items-center gap-1">
                                            🤖 AI Suggestions
                                        </h3>
                                        <div className="whitespace-pre-wrap text-slate-600 text-xs leading-relaxed max-h-48 overflow-y-auto pr-1">
                                            {aiSuggestions}
                                        </div>
                                    </div>
                                )}

                            </form>
                        </div>

                        {/* RIGHT PREVIEW SECTION */}
                        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 p-4 sm:p-6 rounded-2xl sticky top-6 shadow-xl backdrop-blur-sm">
                            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                                Live Preview
                            </h2>
                            <div className="max-h-[calc(100vh-280px)] overflow-y-auto rounded-xl shadow-inner bg-slate-950/40 p-2 border border-slate-800/50">
                                <ResumePreview formData={formData} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
      
      }

export default ResumeBuilder;