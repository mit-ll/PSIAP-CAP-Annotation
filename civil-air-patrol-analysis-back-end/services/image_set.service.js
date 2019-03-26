// Custom image set model.
var image_set = require('../models/image_set.model');

/*
 *
 * Gets a random image set collection from the database.
 * 
 * @return  {array}     An array with a random image set collection.
 * 
 */ 

exports.get_rnd_image_set = async function(data_set_name){

    try {

        var rnd_image_set = await image_set.aggregate([{ $match : { data_set_name: data_set_name } } , { $sample: {size: 1} } ]);

        return rnd_image_set;

    } catch (e) {
        throw Error('Error while getting image set collections.');
    }
}

/*
 *
 * Gets all of the image collections from the database.
 * 
 * @return  {Array<ImageSetCol>}        An array of image set collections.
 * 
 */ 

exports.get_all_image_sets = async function(){

    try {

        var all_image_sets = await image_set.paginate();

        return all_image_sets;

    } catch (e) {
        throw Error('Error while getting image set collections.');
    }
}