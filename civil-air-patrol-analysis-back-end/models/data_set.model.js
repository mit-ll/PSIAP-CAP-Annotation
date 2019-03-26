// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//  The data set schema that maps objects to the database.
var data_set_schema = new mongoose.Schema({
    data_set_name: String
});

data_set_schema.plugin(mongoosePaginate);
const data_set = mongoose.model('data_set', data_set_schema);

module.exports = data_set;