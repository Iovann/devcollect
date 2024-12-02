const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Thing");

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://iovannatcho:XSDOF53lvEVePlpu@cluster0.obuch.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connecté à MongoDB"))
.catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get("/api/products", (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
});

app.post("/api/products", (req, res, next)  => {
    const product = new Product({
        ...req.body
    })
    product.save()
    .then(() => res.status(201).json({message: "Produit créer"}))
    .catch(error => res.status(400).json({ error }));
})

app.get("/api/products/:id", (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
});

app.put("/api/products/:id", (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Produit modifié" }))
    .catch(error => res.status(400).json({ error }));
});

app.delete("/api/products/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Produit supprimé" }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;