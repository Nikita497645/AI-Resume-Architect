import { useState } from "react";
import axios from "axios";
import ResumePreview from "./components/ResumePreview";

function App() {

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume`,
        formData
      );

      if (response.data.success) {

        setSuccessMessage("Resume Saved Successfully!");
        setErrorMessage("");

        setFormData({
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

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

      }

      setLoading(false);

    } catch (error) {

      console.log(error);

      setErrorMessage("Failed to save resume. Please try again.");
      setSuccessMessage("");

      setLoading(false);

    }

  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-6 sm:py-10 px-3 sm:px-4 md:px-8">

      {/* Background Glow Effects */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto animate-[fadeIn_0.8s_ease-in-out]">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-[32px] overflow-hidden">

          <div className="grid grid-cols-1 xl:grid-cols-7">

            {/* LEFT HERO SECTION */}

            <div className="xl:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 sm:p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm w-fit mb-6 backdrop-blur-md shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  AI-Powered Resume Intelligence
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                  CareerForge <br /> Pro
                </h1>

                <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-md">
                  Build ATS-optimized resumes with a modern AI-powered workflow designed
                  for students, developers, and professionals.
                </p>

                <div className="space-y-5 text-sm text-blue-100">

                  <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-cyan-300"></div>
                    Professional Resume Builder
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-cyan-300"></div>
                    ATS Optimization Ready
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-cyan-300"></div>
                    MERN Stack Powered
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT FORM SECTION */}

            <div className="xl:col-span-3 bg-white p-5 sm:p-8 md:p-12 lg:p-14">

              <div className="mb-12">

                <h2 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">
                  Resume Builder
                </h2>

                <p className="text-slate-500 text-lg leading-relaxed">
                  Fill in your professional details to generate an ATS-ready resume.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Personal Information */}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                  <h3 className="text-2xl font-semibold mb-7 text-slate-800">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                      required
                    />

                  </div>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400 w-full mt-5"
                    required
                  />

                </div>

                {/* Education */}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                  <h3 className="text-2xl font-semibold mb-7 text-slate-800">
                    Education
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                      type="text"
                      name="college"
                      placeholder="College / University"
                      value={formData.college}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                    <input
                      type="text"
                      name="cgpa"
                      placeholder="CGPA"
                      value={formData.cgpa}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                    <input
                      type="text"
                      name="graduationYear"
                      placeholder="Graduation Year"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                  </div>

                </div>

                {/* Experience */}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                  <h3 className="text-2xl font-semibold mb-7 text-slate-800">
                    Experience
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                    <input
                      type="text"
                      name="role"
                      placeholder="Role / Position"
                      value={formData.role}
                      onChange={handleChange}
                      className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
                    />

                  </div>

                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (Ex: Jan 2024 - Present)"
                    value={formData.duration}
                    onChange={handleChange}
                    className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400 w-full mt-5"
                  />

                  <textarea
                    name="experienceDescription"
                    placeholder="Describe your work experience..."
                    value={formData.experienceDescription}
                    onChange={handleChange}
                    className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400 w-full mt-5 h-36 resize-none"
                  />

                </div>

                {/* Skills */}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

                  <h3 className="text-2xl font-semibold mb-7 text-slate-800">
                    Skills
                  </h3>

                  <textarea
                    name="skills"
                    placeholder="Enter your skills (React, Node.js, MongoDB, Python...)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="border border-slate-300 bg-white p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:border-blue-500 transition-all duration-300 hover:border-blue-400 w-full h-36 resize-none"
                  />

                </div>

                {/* Success Message */}

                {successMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-5 py-4 rounded-2xl shadow-sm">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}

                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-2xl shadow-sm">
                    {errorMessage}
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm">
                  <h3 className="text-2xl font-semibold mb-5 text-slate-800">
                     Resume Template
                  </h3>

                  <select
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    className="border border-slate-300 bg-white p-4 rounded-2xl w-full"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-semibold py-5 rounded-2xl shadow-xl transition-all duration-300 text-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,99,235,0.45)] hover:brightness-110"
                  }`}
                >
                  {loading ? "Saving Resume..." : "Save Resume"}
                </button>

              </form>

            </div>
            <div className="xl:col-span-2 bg-slate-100 p-6">
              <ResumePreview formData={formData} />
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;