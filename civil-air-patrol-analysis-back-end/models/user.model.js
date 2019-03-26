// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//  The user schema that maps objects to the database.
var user_schema = new mongoose.Schema({
    user_name: String,
    created_date: Date,
    num_of_analysis: Number 
});

user_schema.plugin(mongoosePaginate);
const user = mongoose.model('user', user_schema);

module.exports = user;