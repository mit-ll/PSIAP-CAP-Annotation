// Custom image model.
var data_set = require('../models/data_set.model');

/*
 *
 * Gets all of the data collections from the database.
 * 
 * @return  {array}     An array with all of the image collections.
 * 
 */ 

exports.get_all_data_sets = async function(){

    try {

        var data_sets = await data_set.paginate();

        return data_sets;

    } catch (e) {
        throw Error('Error while getting image collections.');
    }
}