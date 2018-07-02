const express = require("express");
const app = express();

let pizzas = [
  { id: "1", name: "pepperoni pizza", price: 20 },
  { id: "2", name: "hawaiian pizza", price: 16 }
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "hello pizzas" });
});

app.get("/pizzas", (req, res) => {
  res.send(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
  res.send(pizzas.find(element => element.id == req.params.id));
});

app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.send(pizzas);
});

app.put("/pizzas/:id", (req, res) => {
  pizzas = pizzas.map(pizza => {
    const idOfRequestedPizza = req.params.id;

    if (pizza.id === idOfRequestedPizza) return Object.assign(pizza, req.body);
    else return pizza;
  });

  res.send(pizzas);
});

app.delete("/pizzas/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => pizza.id != req.params.id);
  res.send(pizzas);
});

module.exports = app;
