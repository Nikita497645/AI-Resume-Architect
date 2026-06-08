function ResumePreview({ formData }) {
  const template = formData.template || "modern";

  if (template === "classic") {
    return (
      <div className="bg-white border border-slate-200 p-4 md:p-10 shadow-2xl rounded-xl h-fit sticky top-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-center">
          {formData.name || "Your Name"}
        </h1>

        <div className="text-center text-slate-600 mt-2">
          <p>{formData.email || "your@email.com"}</p>
          <p>{formData.phone || "+91 XXXXX XXXXX"}</p>
        </div>

        <hr className="my-6 border-slate-300" />

        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-2 mb-4">
          Education
        </h2>

        <p className="font-semibold">{formData.degree}</p>

        <div className="flex flex-col md:flex-row md:justify-between text-slate-700">
          <span>{formData.college}</span>
          <span>{formData.graduationYear}</span>
        </div>

        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-2 mb-4 mt-8">
          Experience
        </h2>

        <p className="font-semibold">{formData.role}</p>

        <div className="flex flex-col md:flex-row md:justify-between text-slate-700">
          <span>{formData.company}</span>
          <span>{formData.duration}</span>
        </div>

        <p className="mt-3">{formData.experienceDescription}</p>

        <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-800 pb-2 mb-4 mt-8">
          Skills
        </h2>

        <p>{formData.skills}</p>
      </div>
    );
  }

  if (template === "professional") {
    return (
      <div className="bg-slate-900 text-white p-4 md:p-10 rounded-3xl shadow-2xl h-fit sticky top-6">
        <div className="text-center border-b border-blue-500 pb-5">
          <h1 className="text-4xl font-bold uppercase tracking-wider">
            {formData.name || "Your Name"}
          </h1>

          <p className="mt-2">
            {formData.email || "your@email.com"}
          </p>

          <p>
            {formData.phone || "+91 XXXXX XXXXX"}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-blue-400 text-lg font-bold uppercase tracking-widest border-b border-blue-500 pb-2 mb-4">
            Education
          </h2>

          <p className="font-semibold">{formData.degree}</p>

          <div className="flex flex-col md:flex-row md:justify-between">
            <span>{formData.college}</span>
            <span>{formData.graduationYear}</span>
          </div>

          {formData.cgpa && (
            <p className="mt-2">CGPA: {formData.cgpa}</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-blue-400 text-lg font-bold uppercase tracking-widest border-b border-blue-500 pb-2 mb-4">
            Experience
          </h2>

          <p className="font-semibold">{formData.role}</p>

          <div className="flex flex-col md:flex-row md:justify-between">
            <span>{formData.company}</span>
            <span>{formData.duration}</span>
          </div>

          <p className="mt-3">
            {formData.experienceDescription}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-blue-400 text-lg font-bold uppercase tracking-widest border-b border-blue-500 pb-2 mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {formData.skills ? (
              formData.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 px-4 py-2 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span className="text-slate-400">
                No skills added yet
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

 return (
  <div className="bg-white w-full max-w-[800px] mx-auto p-4 md:p-10 shadow-2xl border border-slate-200 rounded-2xl h-fit sticky top-6 overflow-x-auto">

    {/* HEADER */}

    <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-slate-900">
        {formData.name || "Your Name"}
      </h1>

      <div className="mt-3 text-slate-600 text-sm">
        <p>{formData.email || "your@email.com"}</p>
        <p>{formData.phone || "+91 XXXXX XXXXX"}</p>
      </div>
    </div>

    {/* EDUCATION */}

    <section className="mb-8">
      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
        Education
      </h2>

      <p className="font-semibold text-lg">
        {formData.degree || "Degree"}
      </p>

      <div className="flex flex-col md:flex-row md:justify-between text-slate-700 mt-1">
        <span>{formData.college || "College Name"}</span>
        <span>{formData.graduationYear || "Graduation Year"}</span>
      </div>

      {formData.cgpa && (
        <p className="mt-2 text-slate-700">
          CGPA: {formData.cgpa}
        </p>
      )}
    </section>

    {/* EXPERIENCE */}

    <section className="mb-8">
      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
        Experience
      </h2>

      <p className="font-semibold text-lg">
        {formData.role || "Role"}
      </p>

      <div className="flex flex-col md:flex-row md:justify-between text-slate-700">
        <span>{formData.company || "Company Name"}</span>
        <span>{formData.duration || "Duration"}</span>
      </div>

      <p className="mt-3 text-slate-700 leading-relaxed">
        {formData.experienceDescription ||
          "Describe your work experience here."}
      </p>
    </section>

    {/* SKILLS */}

    <section>
      <h2 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3">
        {formData.skills ? (
          formData.skills.split(",").map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm shadow-md"
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