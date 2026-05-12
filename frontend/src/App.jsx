import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Resume Form
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-24"
          />

          <textarea
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-24"
          />

          <button className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700">
            Save Resume
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
