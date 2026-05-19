import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

  if (validateForm()) {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/resume",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Error saving resume!");

    }

  }

};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Resume Form
        </h1>

        <div className="space-y-5">

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* College */}
          <div>
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {errors.college && (
              <p className="text-red-500 text-sm mt-1">
                {errors.college}
              </p>
            )}
          </div>

          {/* Degree */}
          <div>
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {errors.degree && (
              <p className="text-red-500 text-sm mt-1">
                {errors.degree}
              </p>
            )}
          </div>

          {/* CGPA */}
          <div>
            <input
              type="text"
              name="cgpa"
              placeholder="CGPA / Percentage"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Graduation Year */}
          <div>
            <input
              type="text"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* Skills */}
          <div>
            <textarea
              name="skills"
              placeholder="Skills (React, Node.js, MongoDB...)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl h-24"
            />

            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skills}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700"
          >
            Save Resume
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;