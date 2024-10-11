// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
	const [characters, setCharacters] = useState([]);

	function removeOneCharacter(index) {
		const person = characters.filter((character, i) => {
		  return i === index;
		});
		delUser(person)
			.then(() => setCharacters([...characters]))
			.catch((error) => {
		  	console.log(error);
		})
	      }
	    
	function delUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
			method: "DELETE",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		      });
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
		  .then(() => setCharacters([...characters, person]))
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