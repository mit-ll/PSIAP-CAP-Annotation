// Custom services.
var class_Service = require('../services/class.service');
var util_service = require('../utils/response.util');

/*
 *
 * Retrieves all of the classifications from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with the classification data.
 * 
 */ 

exports.get_classifications = async function(req, res){

    var page = req.query.page ? Number(req.query.page) : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 50;
    var query = { page: page, limit: limit };

    try{
    
        if(util_service.check_query_params(query)){

            var classes = await class_Service.get_classifications({}, query);
        
            return res.status(200).json({status: 200, data: classes, message: "Succesfully recieved classifications."});
        
        }
        else{

            return res.status(404).json({status: 404, message: "Invalid query params provided."});

        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}