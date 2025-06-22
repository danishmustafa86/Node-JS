const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`second middleware ${req.method} request for '${req.url}'`);
    next();
})
app.use((req, res, next) => {
    console.log(" Third Middleware");
    next();
})


products = []

// GET
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: 'GET request successful!',
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }

});

// POST
app.post("/products", (req, res) => {
    try {
        products.push({
            id : products.length + 1,
            name : req.body.name,
            price : req.body.price
        })
        res.status(201).json({
            status: "success",
            message: "post created successfully",
            data: products,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})

// PUT
app.put("/put/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    try {
        if (!product) {
            return res.status(404).json({
                status: "product not exist",
                message: `Product with ID ${id} not found`,
                data: []
            })
        }
        else {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            res.status(200).json({
                status: "success",
                message: `Product with ID ${id} updated successfully`,
                data: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})


// DELETE
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    try {
        if (productIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: `Product with ID ${id} not found`,
                data: []
            });
        }
        products.splice(productIndex, 1);
        res.status(200).json({
            status: "success",
            message: `Product with ID ${id} deleted successfully`,
            data: []
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})