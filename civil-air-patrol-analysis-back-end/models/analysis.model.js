// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// The analysis schema that maps objects to the database.
var analysis_schema = new mongoose.Schema({
    user_name: String,
    file_name: String,
    sec_num: Number,
    created_date: Date,
    classes: Array
});

analysis_schema.plugin(mongoosePaginate);
const analysis = mongoose.model('analysis', analysis_schema);

module.exports = analysis;