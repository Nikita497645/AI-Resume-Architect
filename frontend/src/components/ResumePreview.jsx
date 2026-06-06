function ResumePreview({ formData }) {
  const template = formData.template || "modern";

  if (template === "classic") {
    return (
      <div className="bg-white border p-8 shadow-lg rounded-xl h-fit sticky top-6">
        <h1 className="text-3xl font-bold text-center">
          {formData.name || "Your Name"}
        </h1>

        <p className="text-center text-gray-600">
          {formData.email || "your@email.com"}
        </p>

        <p className="text-center text-gray-600">
          {formData.phone || "+91 XXXXX XXXXX"}
        </p>

        <hr className="my-4" />

        <h2 className="font-bold text-lg mb-2">Education</h2>
        <p>{formData.degree}</p>
        <p>{formData.college}</p>
        <p>{formData.graduationYear}</p>

        <h2 className="font-bold text-lg mt-5 mb-2">Experience</h2>
        <p>{formData.role}</p>
        <p>{formData.company}</p>
        <p>{formData.duration}</p>
        <p>{formData.experienceDescription}</p>

        <h2 className="font-bold text-lg mt-5 mb-2">Skills</h2>
        <p>{formData.skills}</p>
      </div>
    );
  }

  if (template === "professional") {
    return (
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl h-fit sticky top-6">
        <h1 className="text-3xl font-bold">
          {formData.name || "Your Name"}
        </h1>

        <p>{formData.email || "your@email.com"}</p>
        <p>{formData.phone || "+91 XXXXX XXXXX"}</p>

        <div className="mt-6">
          <h2 className="text-blue-400 text-xl font-bold border-b border-blue-500 pb-2 mb-3">
            Education
          </h2>

          <p>{formData.degree}</p>
          <p>{formData.college}</p>
          <p>{formData.graduationYear}</p>
          <p>{formData.cgpa && `CGPA: ${formData.cgpa}`}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-blue-400 text-xl font-bold border-b border-blue-500 pb-2 mb-3">
            Experience
          </h2>

          <p>{formData.role}</p>
          <p>{formData.company}</p>
          <p>{formData.duration}</p>
          <p>{formData.experienceDescription}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-blue-400 text-xl font-bold border-b border-blue-500 pb-2 mb-3">
            Skills
          </h2>

          <p>{formData.skills}</p>
        </div>
      </div>
    );
  }

  // MODERN TEMPLATE (DEFAULT)

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl h-fit sticky top-6">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold text-slate-800">
          {formData.name || "Your Name"}
        </h1>

        <p className="text-slate-600">
          {formData.email || "your@email.com"}
        </p>

        <p className="text-slate-600">
          {formData.phone || "+91 XXXXX XXXXX"}
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 border-b pb-1 mb-2">
          Education
        </h2>

        <p className="font-semibold">
          {formData.degree || "Degree"}
        </p>

        <p>{formData.college || "College Name"}</p>

        <p>{formData.graduationYear || "Graduation Year"}</p>

        <p>
          {formData.cgpa && `CGPA: ${formData.cgpa}`}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 border-b pb-1 mb-2">
          Experience
        </h2>

        <p className="font-semibold">
          {formData.role || "Role"}
        </p>

        <p>{formData.company || "Company Name"}</p>

        <p>{formData.duration}</p>

        <p className="mt-2 text-slate-700">
          {formData.experienceDescription}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-blue-600 border-b pb-1 mb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {formData.skills ? (
            formData.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill.trim()}
              </span>
            ))
          ) : (
            <span className="text-slate-500">
              No skills added yet
            </span>
          )}
        </div>
      </section>
    </div>
  );
}

export default ResumePreview;