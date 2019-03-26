// Node librarires.
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

//  The photo schema that maps objects to the database.
var photo_schema = new mongoose.Schema({
    chunkSize: Number,
    uploadDate: String,
    length: Number,
    md5: String,
    filename: String
});

photo_schema.plugin(mongoosePaginate);
const photo = mongoose.model('fs.files', photo_schema);

module.exports = photo;