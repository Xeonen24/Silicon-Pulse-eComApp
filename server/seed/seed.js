const Chance = require('chance');
const mongoose = require('mongoose');
const Category = require('../model/category');
const Product = require('../model/product');

// Connect to MongoDB
mongoose.connect("mongodb+srv://CSD:csd@cluster0.pqiynzk.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a new instance of Chance
const chance = new Chance();

async function seedDB() {
    const chanceInstance = new Chance();

    async function seedCateg(titleStr) {
        try {
            const categ = await new Category({ title: titleStr });
            await categ.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async function seedProducts(titlesArr, categStr) {
        try {
            const categ = await Category.findOne({ title: categStr });
            for (let i = 0; i < titlesArr.length; i++) {
                let prod = new Product({
                    productCode: chanceInstance.string({ length: 2, alpha: true, numeric: true }) + "-" + chanceInstance.string({ length: 4, alpha: true, numeric: true }),
                    title: titlesArr[i],
                    description: chanceInstance.paragraph(),
                    price: chanceInstance.integer({ min: 50, max: 250 }),
                    manufacturer: chanceInstance.company(),
                    imagePath: 'example_image_path', // Provide a valid image path here
                    discountprice: chanceInstance.integer({ min: 0, max: 250 }), // Provide a valid discount price
                    quantity: chanceInstance.integer({ min: 0, max:1}),
                    category: categ._id,
                    createdAt: Date.now(),
                });
                await prod.save();
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async function closeDB() {
        console.log("CLOSING CONNECTION");
        await mongoose.disconnect();
    }

    await seedCateg("Processors");
    await seedCateg("RAMs");
    await seedCateg("Motherboards");
    await seedCateg("Storage Devices");
    await seedCateg("Graphics Cards");
    await seedCateg("Power Supplies");
    await seedCateg("Cooling Solutions");
    await seedCateg("Cases/Cabinets");
    await seedCateg("Peripherals");

    await seedProducts(["Product 1", "Product 2"], "Processors");
    await seedProducts(["Product 3", "Product 4"], "RAMs");
    await seedProducts(["Product 5", "Product 6"], "Motherboards");
    await seedProducts(["Product 7", "Product 8"], "Storage Devices");
    await seedProducts(["Product 9", "Product 10"], "Graphics Cards");
    await seedProducts(["Product 11", "Product 12"], "Power Supplies");
    await seedProducts(["Product 13", "Product 14"], "Cooling Solutions");
    await seedProducts(["Product 15", "Product 16"], "Cases/Cabinets");
    await seedProducts(["Product 17", "Product 18"], "Peripherals");
    await seedProducts(["Product 19", "Product 20"], "Peripherals");
    await seedProducts(["Product 21", "Product 22"], "Peripherals");
    await seedProducts(["Product 23", "Product 24"], "Peripherals");


    await closeDB();
}

seedDB();
