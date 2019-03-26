// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//  The classification schema that maps objects to the database.
var class_schema = new mongoose.Schema({
    class_name: String,
    value: Boolean
});

class_schema.plugin(mongoosePaginate);
const classification = mongoose.model('classification', class_schema);

module.exports = classification;