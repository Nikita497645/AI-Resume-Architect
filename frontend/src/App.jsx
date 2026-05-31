import { useState } from "react";
import axios from "axios";

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
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

        console.log(response.data);

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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex justify-center items-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-4xl">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            CareerForge Pro
          </h1>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            AI-Powered ATS Resume Optimizer
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal Information */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full mt-5"
              required
            />

          </div>

          {/* Education */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="college"
                placeholder="College / University"
                value={formData.college}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="cgpa"
                placeholder="CGPA"
                value={formData.cgpa}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="graduationYear"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>

          {/* Experience */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="role"
                placeholder="Role / Position"
                value={formData.role}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <input
              type="text"
              name="duration"
              placeholder="Duration (Ex: Jan 2024 - Present)"
              value={formData.duration}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full mt-5"
            />

            <textarea
              name="experienceDescription"
              placeholder="Describe your work experience..."
              value={formData.experienceDescription}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full mt-5 h-32"
            />

          </div>

          {/* Skills */}

          <div>

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2">
              Skills
            </h2>

            <textarea
              name="skills"
              placeholder="Enter your skills (React, Node.js, MongoDB, Python...)"
              value={formData.skills}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
            />

          </div>

          {/* Success Message */}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
              {successMessage}
            </div>
          )}

          {/* Error Message */}

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving Resume..." : "Save Resume"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default App;