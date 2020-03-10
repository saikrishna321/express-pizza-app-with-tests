const express = require("express");
const router = express.Router();

let pizzas = [
  { id: "1", 
    details: {
      name: "Super Friday", 
      price: {
        veg: 25,
        non_veg: 30
      }
    },
    has_combo: false
  }  ,
  { id: "2", 
    details: {
      name: "hawaiian pizza", 
      price: {
        veg: 15,
        non_veg: 20
      }
    },
    has_combo: true
  }  
];

router.get("/", (req, res) => {
  res.json(pizzas);
});

router.get("/:id", (req, res, next) => {
  const pizza = pizzas.find(element => element.id == req.params.id);

  if (pizza) {
    res.json(pizza);
  } else {
    next();
  }
});

router.post("/", (req, res) => {
  const newPizza = {
    id: String(pizzas.length + 1),
    details: {
      name: req.body.details.name,
      price: {
        veg: req.body.details.price.veg,
        non_veg: req.body.details.price.non_veg
      }
    },
    has_combo: req.body.has_combo
  };
  pizzas = [...pizzas, newPizza];
  res.json(newPizza);
});

router.put("/:id", (req, res) => {
  pizzas = pizzas.map(pizza => {
    const idOfRequestedPizza = req.params.id;

    if (pizza.id === idOfRequestedPizza) return Object.assign(pizza, req.body);
    else return pizza;
  });

  res.json(pizzas.find(pizza => pizza.id === req.params.id));
});

router.delete("/:id", (req, res) => {
  pizzas = pizzas.filter(pizza => pizza.id != req.params.id);
  res.json(`pizza with id ${req.params.id} deleted successfully`);
});

module.exports = router;
