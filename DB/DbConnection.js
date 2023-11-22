const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
// db.on('error', () =>   console.log(error)
// db.once('open', () =>{
//     // logger.debug('Connection is established to AVL Database.')
//     console.log(error)}
// );

module.exports = { db };
