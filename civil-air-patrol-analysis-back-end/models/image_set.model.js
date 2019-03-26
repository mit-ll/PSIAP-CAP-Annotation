// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//  The image set schema that maps objects to the database.
var image_set_schema = new mongoose.Schema({
    file_name: String,
    data_set_name: String,
});

image_set_schema.plugin(mongoosePaginate);
const image_set = mongoose.model('image_set', image_set_schema);

module.exports = image_set;