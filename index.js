const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const cors = require("cors");


const PORT = process.env.PORT || 3010;

let todoList = [{
    todo: "Learn Express",
    done: true
  },
  {
    todo: "Learn React",
    done: false
  }
];

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.get("/todo/search", (req, res) => {
  let seacrhKey = req.query.todo;
  let result = todoList.filter(todo =>
    todo.todo.toLowerCase().includes(seacrhKey.toLowerCase())
  );
  res.send(result);
})

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/todo", (req, res) => {
  res.send(todoList);
});

app.post("/todo", (req, res) => {
  let newTodo = req.body;
  todoList.push(newTodo);
  res.send("New data added success!");
  // console.log(newTodo);
});

app.get("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;

  if (index > length - 1) {
    res.send("not found");
  } else {
    res.send({
      data: todoList[index]
    });
  }
});


app.delete("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;

  if (index > length - 1) {
    res.send({
      success: false,
      message: "data not found"
    });
  } else {
    todoList.splice(index, 1);
    res.send({
      success: true,
      data: todoList
    });
  }
});

app.put("/todo/:id", (req, res) => {
  todoList[req.params.id] = req.body;
  res.send("Update data successfuly");
});
// app.post("/todo", (req, res) => {
//   let todo = req.body.todo;
//   let done = JSON.parse(req.body.done);
//   console.log(typeof done);
//   if (todo === "") {
//     res.send("todo cannot empty");
//   } else {
//     let newTodo = {
//       todo: req.body.todo,
//       done: done
//     };
//     todoList.push(newTodo);
//     res.send({ success: true, data: newTodo});
//   }
// });

app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}`));
