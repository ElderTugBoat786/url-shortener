const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect('mongodb+srv://'+process.env.DB_ADDRESS+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user : process.env.DB_USER,
                    pass : process.env.DB_PASS
                  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

module.exports = db;
