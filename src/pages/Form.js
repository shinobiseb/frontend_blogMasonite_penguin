// Import useState hook
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

//destructure out props
const Form = ({ initialblog, handleSubmit, buttonLabel}) => {

  const navigate = useNavigate()

  ////////////////
  // The Form Data State
  ////////////////
  // Initiallize the form with the initialblog state
  const [formData, setFormData] = useState(initialblog);

  //////////////////////////
  // Functions
  //////////////////////////

  // Standard React Form HandleChange Function
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to run when form is submitted
  const handleSubmisson = (event) => {
    //prevent form refresh
    event.preventDefault();
    //pass formData to handleSubmit prop function
    handleSubmit(formData);
    //push user back to main page
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmisson}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
      />
      <input
        type="title"
        onChange={handleChange}
        value={formData.body}
        name="body"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;