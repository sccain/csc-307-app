// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
	const [characters, setCharacters] = useState([]);

	function removeOneCharacter(id) {
		fetch(`http://localhost:8000/users/${id}`, {
		  method: "DELETE",
		})
		.then(res => {
		  if (res.status === 204) {
		    const updated = characters.filter(character => character._id !== id);
		    setCharacters(updated);
		  } else {
		    throw new Error('Delete operation failed');
		  }
		})
		.catch(error => console.log(error));
	    }

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	    }

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	      }, [] );
	
	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
		  method: "POST",
		  headers: {
		    "Content-Type": "application/json",
		  },
		  body: JSON.stringify(person),
		});
	    
		return promise;
	      }

 
	function updateList(person) { 
		postUser(person)
		  .then((newPer) => setCharacters([...characters, newPer]))
		  .catch((error) => {
		    console.log(error);
		  })
	    }



	return (
		<div className="container">
		  <Table
		    characterData={characters}
		    removeCharacter={removeOneCharacter}
		  />
		<Form handleSubmit={updateList} />
		</div>
	      );
      }

export default MyApp;