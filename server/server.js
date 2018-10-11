const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
// const { ObjectID } = require("mongodb");
const mysql = require('mysql');
require("./db/mongoose");
const { Products } = require("./models/products");
const { ContactInfo } = require("./models/contact");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());




app.post("/products", (req, res) => {
  const {
  
    title,
    brand,
    description,
    price,
    productType,
    productImage,
    availability
  } = req.body;
  const product = new Products({
   
    title,
    brand,
    description,
    price,
    productType,
    productImage,
    availability
  });

  product.save().then(
    () => {
      res.redirect('http://localhost:3000/admin/products');
    },
    e => {
      res.send(product);
    }
  );
});
app.post("/admin/contact", (req, res) => {
  const { firstName, lastName, email, comments, phoneNum } = req.body;
  const contact = new ContactInfo({
    firstName, lastName, email, comments, phoneNum 
  });


  contact.save().then(
    () => {
      res.redirect('http://localhost:3000/contact');
    },
    e => {
      res.send(e);
    }
  );
});


app.get("/admin/contact", (req, res) => {
    ContactInfo.find().then(
      data => {
        res.send(data);
      },
      e => {
        res.send(e);
      }
    );
  });
app.get("/products", (req, res) => {
  Products.find({}).then(
    data => {
      res.send(data);
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/products/:id", (req, res) => {
  let id = req.params.id;
  Products.findById(id)
    .then(data => {
      if (!data) {
        return res.send("No product found with this ID");
      }
      res.send(data);
    })
    .catch(e => {
      res.send(e.message);
    });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  Products.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.send("Product not found");
      }
 
      res.redirect('http://localhost:3000/admin/products');
    })
    .catch(e => {
      res.send(e.message);
    });
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  const body = _.pick(req.body, [
    "productID",
    "title",
    "brand",
    "description",
    "price",
    "productType",
    "productImage",
    "availability"
  ]);
  Products.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(data => {
      if (!data) {
        return res.send("Product not found");
      }
      res.send(data);
    })
    .catch(e => {
      res.status(400).send(e.message);
    });
});

app.listen(3007, () => {
    console.log("started on port 3007");
  });