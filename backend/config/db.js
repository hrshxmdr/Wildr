const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDatabase = async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://madhurharsh16_db_user:uDetteECkRZplpK3@cluster0.4efnxba.mongodb.net/woodsandwild?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoUri, {
        autoIndex: true
    });
    console.log('Connected to MongoDB Atlas');
};

module.exports = { connectToDatabase };
