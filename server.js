const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let items = [
  {
    id: 1,
    name: "Data Structures Book",
    price: 200,
    status: "available",
    claimedBy: null
  },
  {
    id: 2,
    name: "Mini Fridge",
    price: 1500,
    status: "available",
    claimedBy: null
  }
];


// GET ITEMS
app.get("/items", (req, res) => {
  res.json(items);
});


// ADD ITEM
app.post("/items", (req, res) => {

  const newItem = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    status: "available",
    claimedBy: null
  };

  items.push(newItem);

  res.json(newItem);
});


// CLAIM ITEM
app.post("/claim/:id", (req, res) => {

  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  // Prevent multiple claims
  if (item.status !== "available") {
    return res.status(400).json({
      message: "Item no longer available"
    });
  }

  item.status = "claimed";
  item.claimedBy = "Student";

  // Ghost buyer expiration
  setTimeout(() => {

    if (item.status === "claimed") {

      item.status = "available";
      item.claimedBy = null;

      console.log("Claim expired");
    }

  }, 30000);

  res.json({
    message: "Item claimed successfully"
  });

});


// CONFIRM PICKUP
app.post("/pickup/:id", (req, res) => {

  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({
      message: "Item not found"
    });
  }

  item.status = "sold";

  res.json({
    message: "Pickup confirmed"
  });

});


// REMOVE ITEM
app.delete("/remove/:id", (req, res) => {

  items = items.filter(i => i.id != req.params.id);

  res.json({
    message: "Item removed"
  });

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});