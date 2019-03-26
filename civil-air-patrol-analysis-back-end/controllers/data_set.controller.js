// Custom service.
var data_set_service = require('../services/data_set.service');
var util_service = require('../utils/response.util');

/*
 *
 * Retrieves all of the image collections from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with the image collections data.
 * 
 */ 

exports.get_all_data_sets = async function(req, res){

    var page = req.query.page ? Number(req.query.page) : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 50;
    var query = { page: page, limit: limit };

    try{
    
        if(util_service.check_query_params(query)){

            var data_sets = await data_set_service.get_all_data_sets();
            
            return res.status(200).json({status: 200, data: data_sets, message: "Succesfully recieved image collections."});
            
        }
        else{

            return res.status(404).json({status: 404, message: "Invalid query params provided."});

        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}