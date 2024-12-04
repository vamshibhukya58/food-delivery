const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:mern123@cluster0.s026t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");

        // Ensure the connection is established before accessing the collection
        const db = mongoose.connection.db; 
        
        // Fetching the food_items collection
        db.collection("food_items").find({}).toArray(async function(err, data) {
            if (err) {
                console.error("Error fetching food_items:", err);
                return;
            }
            global.food_items = data;

            // Fetching the foodCategory collection
            db.collection("foodCategory").find({}).toArray(function(err, catData) {
                if (err) {
                    console.error("Error fetching foodCategory:", err);
                    return;
                }
                global.foodCategory = catData;

                // Optional: Log the fetched data
                // console.log("Food Items:", global.food_items);
                // console.log("Food Categories:", global.foodCategory);
            });
        });

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = mongoDB;


