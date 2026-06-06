function ResumePreview({ formData }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl h-fit sticky top-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Live Resume Preview
      </h2>

      <div className="space-y-5">
        <div>
          <h3 className="text-2xl font-bold">{formData.name || "Your Name"}</h3>
          <p>{formData.email || "your@email.com"}</p>
          <p>{formData.phone || "+91 XXXXX XXXXX"}</p>
        </div>

        <hr />

        <div>
          <h4 className="font-bold text-lg">Education</h4>
          <p>{formData.degree}</p>
          <p>{formData.college}</p>
          <p>{formData.graduationYear}</p>
          <p>{formData.cgpa && `CGPA: ${formData.cgpa}`}</p>
        </div>

        <hr />

        <div>
          <h4 className="font-bold text-lg">Experience</h4>
          <p>{formData.role}</p>
          <p>{formData.company}</p>
          <p>{formData.duration}</p>
          <p>{formData.experienceDescription}</p>
        </div>

        <hr />

        <div>
          <h4 className="font-bold text-lg">Skills</h4>
          <p>{formData.skills}</p>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;