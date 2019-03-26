// Custom service.
var image_set_service = require('../services/image_set.service');
var util_service = require('../utils/response.util');

/*
 *
 * Retrieves a random image from the specific collection.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with a specific image set collection.
 * 
 */ 

exports.get_rnd_image_from_set = async function(req, res){

    try{

        if(util_service.check_img_set_param(req.params)){
            
            var image_set = await image_set_service.get_rnd_image_set(req.params.data_set_name);

            return res.status(200).json({status: 200, data: image_set, message: "Succesfully recieved random image set collection."});

        }
        else{

            return res.status(404).json({status: 404, message: "Image set collection not found."});      

        }
        
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

/*
 *
 * Retrieves all of the image set collections from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with the image set collections data.
 * 
 */ 

exports.get_all_image_sets = async function(req, res){

    var page = req.query.page ? Number(req.query.page) : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 50;
    var query = { page: page, limit: limit };

    try{
    
        if(util_service.check_query_params(query)){

            var image_set = await image_set_service.get_all_image_sets();
        
            return res.status(200).json({status: 200, data: image_set, message: "Succesfully recieved image set collections."});
            
        }
        else{

            return res.status(404).json({status: 404, message: "Invalid query params provided."});

        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}