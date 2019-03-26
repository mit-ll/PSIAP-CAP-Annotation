// Custom services.
var analysis_service = require('../services/analysis.service');
var util_service = require('../utils/response.util');

// Custom analysis model.
var analysis = require('../models/analysis.model');

/*
 *
 * Retrieves the list of analysis from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with all the analysises requested.
 * 
 */ 

exports.get_analysises = async function(req, res){

    var page = req.query.page ? Number(req.query.page) : 1;
    var limit = req.query.limit ? Number(req.query.limit) : 50;
    var query = { page: page, limit: limit };

    try{

        if(util_service.check_query_params(query)){
   
            var analysises = await analysis_service.get_analysises({}, query);
        
            return res.status(200).json({status: 200, data: analysises, message: "Succesfully recieved analysises."});
            
        }
        else{

            res.status(404).json({status: 404, message: "Invalid query params provided."});

        }
        
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

/*
 *
 * Retrieves the analysis requested by the id.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with the requested analysis.
 * 
 */ 

exports.get_analysis = async function(req, res){
  
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try{

        if(req.params && util_service.check_analysis_id(req.params.id)){
   
            var get_analysis = await analysis_service.get_analysises({ _id: req.params.id }, page, limit);

            return res.status(200).json({status:200, data: get_analysis, message: "Succesfully recieved analysis."});
   
        }
        else{

            return res.status(404).json({status: 404, message: "No analysis id provided."});

        }
     
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

/*
 *
 * Creates a analysis and saves it to the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with the created analysis.
 * 
 */ 

exports.create_analysis = async function(req, res){

    try{

        if(util_service.check_analysis_body(req.body)){

            var classes = [];

            for(var i = 0; i < req.body.classes.length; i++){

                if(util_service.check_classes(req.body.classes[i])){

                    classes.push( { name : req.body.classes[i].class_name, value : req.body.classes[i].value } )

                }
                else{

                    return res.status(400).json({status: 400, message: "Analysis create was unsuccesfull. Classes array malformed ."});
                
                }

            }

            var analysis_obj = new analysis({
                user_name: req.body.user_name,
                file_name: req.body.file_name,
                sec_num: req.body.sec_num,
                created_date: req.body.created_date,
                classes: classes
            });           

            var created_analysis = await analysis_service.create_analysis(analysis_obj);

            return res.status(201).json({status: 201, data: created_analysis, message: "Succesfully created analysis."});

        }
        else{

            return res.status(404).json({status: 404, message: "Analysis object not complete."}); 
        
        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

/*
 *
 * Updates a analysis that exists in the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with the updated analysis.
 * 
 */ 

exports.update_analysis = async function(req, res){

    
    try{

        if(req.body && util_service.check_analysis_id(req.body.id) && util_service.check_analysis_body(req.body)){
    
            var analysis = {
                _id: req.body.id ? req.body.id : null,
                userName: req.body.user_name ? req.body.user_name : null,
                imageSection: req.body.file_name ? req.body.file_name : null,
                imageSection: req.body.sec_num ? req.body.sec_num : null,
                imageName: req.body.classes ? req.body.classes : null
            };

            var updated_analysis = await analysis_service.update_analysis(analysis);

            return res.status(200).json({status: 200, data: updated_analysis, message: "Succesfully updated analysis."});            

        }
        else {

            return res.status(404).json({status: 404., message: "Analysis update was unsuccesfull. Id must be present."});
        
        }
        
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}


/*
 *
 * Removes a analysis that exists in the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object.
 *                              
 * 
 */ 

exports.remove_analysis = async function(req, res){

    try{

        if(req.params && util_service.check_analysis_id(req.params.id)){

            await analysis_service.delete_analysis(req.params.id);

            return res.status(204).json({status:204, message: "Succesfully removed analysis."});       

        }
        else{

            return res.status(404).json({status: 404., message: "Id must be present."});            
        
        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}


/*
 *
 * Removes all of the analysises.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object.
 *                              
 * 
 */ 

exports.remove_all_analysises = async function(req, res){

    try{

        await analysis_service.remove_all_analysis();

        return res.status(204).json({status:204, message: "Succesfully removed all analysises."});

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }

}