const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
      title: { type: String },
      brand: { type: String },
      description: { type: String },
      price: { type: Number },
      productType: { type: String },
      productImage: { type: String },
      availability: { type: Boolean }
    
})
const Products = mongoose.model("Products", ProductSchema);


module.exports = { Products };
