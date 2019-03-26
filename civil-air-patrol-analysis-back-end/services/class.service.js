// Custom classification model.
var classification = require('../models/class.model');

/*
 *
 * Gets all of the classifications from the database.
 * 
 * @return  {array}     An array with all of the classifications.
 * 
 */ 

exports.get_classifications = async function(query, options){

    try {

        var classes = await classification.paginate(query, options);

        return classes;

    } catch (e) {
        throw Error('Error while getting classifcations.');
    }
}