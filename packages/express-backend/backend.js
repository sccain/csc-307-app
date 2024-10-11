import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
	users_list: [
	  {
	    id: "xyz789",
	    name: "Charlie",
	    job: "Janitor"
	  },
	  {
	    id: "abc123",
	    name: "Mac",
	    job: "Bouncer"
	  },
	  {
	    id: "ppp222",
	    name: "Mac",
	    job: "Professor"
	  },
	  {
	    id: "yat999",
	    name: "Dee",
	    job: "Aspring actress"
	  },
	  {
	    id: "zap555",
	    name: "Dennis",
	    job: "Bartender"
	  }
	]
      };

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  }
);

 const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
  }
);

 const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd["id"] = idGen();
    addUser(userToAdd);
    res.status(200);
  });

 const delUser = (user) => {
	users["users_list"].pop(user);
	return user;
      };      
app.delete("/users", (req, res) => {
	    const userToDel = req.body;
	    delUser(userToDel);
	    res.send();
});

const idGen = () => {
    let letters = "";
    var number;

    do {
        var lowercaseAsciiStart = 97;
        var letterIndex = Math.floor(Math.random() * 26);
        var letter = String.fromCharCode(lowercaseAsciiStart + letterIndex);
        letters = letters.concat(letter)
    } while (letters.length < 3)

	do {
  		number = Math.floor(Math.random() * 999);
	} while (number < 100);
	return letters.concat(number)
}

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});