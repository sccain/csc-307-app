import React, { useState } from "react";


function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: "",
    id: ""
  });

  function handleChange(event) {
	const { name, value, id } = event.target;
	if (name === "job")
	  setPerson({ name: person["name"], job: value, id: id});
	else setPerson({ name: value, job: person["job"], id: id});
      }
	return (
	<form>
	  <label htmlFor="name">Name</label>
	  <input
	    type="text"
	    name="name"
	    value={person.name}
	    onChange={handleChange}
	  />
	  <label htmlFor="job">Job</label>
	  <input
	    type="text"
	    name="job"
	    value={person.job}
	    onChange={handleChange}
	  />
	<input type="button" value="Submit" onClick={submitForm} />

	</form>
      );

      function submitForm() {
	props.handleSubmit(person);
	setPerson({ name: "", job: "" , id: ""});
      }
}


export default Form;