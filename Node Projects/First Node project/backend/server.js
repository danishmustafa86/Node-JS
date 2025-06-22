const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
    console.log(`second middleware ${req.method} request for '${req.url}'`);
    next();
})
app.use((req, res, next) => {
    console.log("Third Middleware");
    next();
})

let items = [];

// Simple get request for home page
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            state: "success",
            message: "Get request successful!, server is running",
            data: items,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: ["hello danish"]
        })
    }
})

// Get request for all items
app.get("/items", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Items retrieved successfully",
            data: items,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
})


// Post request to add a new item
app.post("/additem", (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            message: "Item added successfully",
            data: (() => {
                const newItem = { id: items.length + 1, name: req.body.name, price: req.body.price };
                items.push(newItem);
                return newItem;
            })(),
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})

// Put request to update an item
app.put("/update/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    try {
        if (!item) {
            return res.status(404).json({
                status: "error",
                message: `Item with ID ${itemId} not found`,
                data: []
            })
        } else {
            item.name = req.body.name || item.name;
            item.price = req.body.price || item.price;
            res.status(200).json({
                status: "success",
                message: `Item with ID ${itemId} updated successfully`,
                data: items,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})


// Delete request to remove an item
app.delete("/delete/:id", (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);
    try {
        if (itemIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: `Item with ID ${itemId} not found`,
                data: []
            })
        } else {
            items.splice(itemIndex, 1);
            res.status(200).json({
                status: "success",
                message: `Item with ID ${itemId} deleted successfully`,
                data: items,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

