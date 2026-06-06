function ResumePreview({ formData }) {
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

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-blue-600 border-b pb-1 mb-2">
          Education
        </h2>

        <p className="font-semibold">
          {formData.degree || "Degree"}
        </p>

        <p>{formData.college || "College Name"}</p>

        <p>
          {formData.graduationYear || "Graduation Year"}
        </p>

        <p>
          {formData.cgpa && `CGPA: ${formData.cgpa}`}
        </p>
      </section>

      {/* Experience */}
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

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold text-blue-600 border-b pb-1 mb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {formData.skills
            ? formData.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))
            : (
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