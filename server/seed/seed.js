const mongoose = require('mongoose');
const Category = require('../model/category');
const Product = require('../model/product');

// Connect to MongoDB
mongoose.connect("mongodb+srv://CSD:csd@cluster0.pqiynzk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define PC parts data
const products = [
    {
        title: "Intel Core i9-9900K",
        price: 25000,
        discountedprice: 24000,
        category: "Processors",
    },
    {
        title: "AMD Ryzen 7 5800X",
        price: 28000,
        discountedprice: 27000,
        category: "Processors",
    },
    {
        title: "Corsair Vengeance LPX 16GB DDR4 RAM",
        price: 5000,
        discountedprice: 4800,
        category: "RAMs",
    },
    {
        title: "G.Skill Trident Z RGB 32GB DDR4 RAM",
        price: 8000,
        discountedprice: 7700,
        category: "RAMs",
    },
    {
        title: "ASUS ROG Strix B450-F Gaming Motherboard",
        price: 9000,
        discountedprice: 8700,
        category: "Motherboards",
    },
    {
        title: "Samsung 970 EVO 1TB NVMe SSD",
        price: 12000,
        discountedprice: 11500,
        category: "Storage Devices",
    },
    {
        title: "NVIDIA GeForce RTX 3080",
        price: 75000,
        discountedprice: 72000,
        category: "Graphics Cards",
    },
    {
        title: "EVGA SuperNOVA 750W 80+ Gold PSU",
        price: 8000,
        discountedprice: 7800,
        category: "Power Supplies",
    },
    {
        title: "Cooler Master Hyper 212 RGB Cooler",
        price: 2500,
        discountedprice: 2400,
        category: "Cooling Solutions",
    },
    {
        title: "NZXT H510i ATX Mid-Tower Case",
        price: 6000,
        discountedprice: 5800,
        category: "Cases/Cabinets",
    },
    {
        title: "Logitech G Pro Mechanical Gaming Keyboard",
        price: 6000,
        discountedprice: 5800,
        category: "Peripherals",
    },
    {
        title: "Logitech G Pro Wireless Gaming Mouse",
        price: 5000,
        discountedprice: 4800,
        category: "Peripherals",
    },
    {
        title: "Samsung 24-inch Curved Gaming Monitor",
        price: 15000,
        discountedprice: 14500,
        category: "Peripherals",
    },
    {
        title: "Seagate Barracuda 2TB HDD",
        price: 5000,
        discountedprice: 4800,
        category: "Storage Devices",
    },
    {
        title: "ASUS TUF Gaming X570-Plus Motherboard",
        price: 12000,
        discountedprice: 11500,
        category: "Motherboards",
    },
    {
        title: "MSI GeForce GTX 1660 Ti GPU",
        price: 22000,
        discountedprice: 21200,
        category: "Graphics Cards",
    },
    {
        title: "Corsair RM850x 80+ Gold PSU",
        price: 9000,
        discountedprice: 8700,
        category: "Power Supplies",
    },
    {
        title: "HyperX Cloud II Gaming Headset",
        price: 4500,
        discountedprice: 4300,
        category: "Peripherals",
    },
    {
        title: "Crucial MX500 500GB SATA SSD",
        price: 5500,
        discountedprice: 5300,
        category: "Storage Devices",
    },
    {
        title: "Noctua NH-D15 CPU Cooler",
        price: 8000,
        discountedprice: 7700,
        category: "Cooling Solutions",
    },
];


async function seedDB() {
    try {
        // Seed categories
        const categories = ["Processors", "RAMs", "Motherboards", "Storage Devices", "Graphics Cards", "Power Supplies", "Cooling Solutions", "Cases/Cabinets", "Peripherals"];

        for (const categoryTitle of categories) {
            const category = new Category({ title: categoryTitle });
            await category.save();
        }

        // Seed products
        for (const productData of products) {
            const category = await Category.findOne({ title: productData.category });
            const product = new Product({
                title: productData.title,
                description: "Product description goes here",
                price: productData.price,
                manufacturer: "Product manufacturer goes here",
                imagePath: "example_image_path",
                discountprice: productData.discountedprice,
                quantity: 10, // Set the initial quantity
                category: category._id,
                createdAt: Date.now(),
            });
            await product.save();
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
}

seedDB();
