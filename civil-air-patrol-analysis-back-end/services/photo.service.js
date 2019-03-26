// Custom photo model.
var photo = require('../models/photo.model');

/*
 *
 * Gets a photo requested by the user.
 * 
 * @param {file_name:string}    The file name of the photo be accessed.
 * 
 * @return {Array<Photo>}       An array with photo information about a file.
 * 
 */ 

exports.get_photo_info = async function(file_name){

    try {

        var photoInfo = await photo.paginate(file_name);

        return photoInfo

    } catch (e) {
        throw Error('Error while getting photo.');
    }
}

/*
 *
 * Gets a random photo from the database.
 * 
 * @return  {Array<Photo>}       An array with ar random photo.
 * 
 */ 

exports.get_rnd_photo = async function(){

    try {

        var rnd_photo = await photo.aggregate([{ $sample: {size: 1} }]);

        return rnd_photo;

    } catch (e) {
        throw Error('Error while getting random photo.');
    }
}