import React, { useState } from "react";
import "../Style/Form.css";
import Upload from "./Upload";


import {useNavigate} from 'react-router-dom'

const Form = () => {
    const navigate =useNavigate()

  const [data, setData] = useState({
    Name: "",
    Email: "",
    phone: "",
    gender: "",
    skills: [],
  });
  const [preview, setPreview] = useState(null);


  const handleChanging = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => {
      if (type === "checkbox") {
        const updatedSkills = checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value);
        return { ...prev, skills: updatedSkills };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (data.skills.length < 2) {
    alert("Please select at least 2 skills");
    return;
  }

  const submissionData = {
    ...data,
    image: preview, 
  };

   const existingData = JSON.parse(localStorage.getItem("data")) || [];
  existingData.push(submissionData);
  localStorage.setItem("data", JSON.stringify(existingData));
  console.log("Submitted data:", submissionData);

 
  setData({
    Name: "",
    Email: "",
    phone: "",
    gender: "",
    skills: [],
  });
 navigate("/display");
  setPreview(null);
};


  return (
    <div className="form-container">
      <h3>Registration Form</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Type Name..."
          value={data.Name}
          name="Name"
          onChange={handleChanging}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Type Email..."
          value={data.Email}
          name="Email"
          onChange={handleChanging}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          placeholder="Type Number..."
          value={data.phone}
          name="phone"
          onChange={handleChanging}
          pattern="\d{10}"
          maxLength={10}
          inputMode="numeric"
          required
        />

        <label>Gender:</label>
        <div className="radio-group">
          {["Male", "Female", "Other"].map((gender) => (
            <label key={gender}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={data.gender === gender}
                onChange={handleChanging}
              />
              {gender}
            </label>
          ))}
        </div>

        <label>Skills:</label>
        <div className="checkbox-group">
          {["HTML", "CSS", "JavaScript", "React", "Node"].map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={data.skills.includes(skill)}
                onChange={handleChanging}
              />
              {skill}
            </label>
          ))}
        </div>

        <Upload preview={preview} setPreview={setPreview} />

        <button type="submit" disabled={data.skills.length < 2}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
