const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try{
        mongoose.connect(process.env.DB_URL, connectionParams);
        console.log('\n\t***Connected to database*** \n');
    }
    catch(err){
        console.log('Error connecting to the database. \n', err);
    }
 }