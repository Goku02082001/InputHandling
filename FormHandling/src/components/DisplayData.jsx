import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import "../Style/DisplayData.css";

const DisplayData = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    setFormData(data);
  }, []);

  const handleDelete = () => {
    localStorage.removeItem("data");
    setFormData([]);
  };

  const handleAddMore = () => {
    navigate("/");  
  };

  if (formData.length === 0) {
    return <p style={{ textAlign: "center" }}>No data available.</p>;
  }

  return (
    <div className="display-container">
      <h2>User Submitted Details</h2>

      {formData.map((item, index) => (
        <div key={index} className="user-card">
          {item.image && <img src={item.image} alt="Uploaded" />}
          <p><strong>Name:</strong> {item.Name}</p>
          <p><strong>Email:</strong> {item.Email}</p>
          <p><strong>Phone:</strong> {item.phone}</p>
          <p><strong>Gender:</strong> {item.gender}</p>
          <p><strong>Skills:</strong> {item.skills ? item.skills.join(", ") : "N/A"}</p>
          <hr />
        </div>
      ))}

      <button className="delete-btn" onClick={handleDelete}>
        Delete All Data
      </button>
      <button className="addmore-btn" onClick={handleAddMore}>
        Add More
      </button>
    </div>
  );
};

export default DisplayData;
