const TodosPage = require("./todos")
let TDs = new TodosPage("https://elevation-local-todo.herokuapp.com")

TDs.insertAndDelete("exercise 1")
TDs.insertAndComplete("exercise 2")
TDs.insertTwoDeleteFirst("exercise 3a", "exercise 3b")