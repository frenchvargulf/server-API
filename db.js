// db.js
var mongoose = require('mongoose');
const uri = 'mongodb+srv://Martine:kanapka1@importantcluster-i8xgk.gcp.mongodb.net/test?retryWrites=true&w=majority';

const connectToDb = async () => {
    try {
        await mongoose.connect( uri, { useNewUrlParser: true } );
        console.log('Connected to mongo!!!');
        
    }           
    catch (err) {
        console.log(err);
       // logger.error('Could not connect to MongoDB');
    }
}

connectToDb()