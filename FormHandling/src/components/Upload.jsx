import React from 'react';

const Upload = ({ preview, setPreview }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem('myImage', reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <div>
          <p>Preview:</p>
          <img src={preview} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
};

export default Upload;
