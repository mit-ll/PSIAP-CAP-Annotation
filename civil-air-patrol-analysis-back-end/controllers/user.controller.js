// Custom services.
var user_service = require('../services/user.service');
var util_service = require('../utils/response.util');

// Custom user model.
var user = require('../models/user.model');

/*
 *
 * Retrieves all of the users from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with the user data.
 * 
 */ 

exports.get_users = async function(req, res){

    try{
    
        var users = await user_service.get_users();
        
        return res.status(200).json({status: 200, data: users, message: "Succesfully recieved users."});
        
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}


/*
 *
 * Creates a user and saves it to the database.
 * 
 * @param   {req:Request}       The request object sent fromfront-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with the created user.
 * 
 */ 

exports.create_user = async function(req, res){

    try{

        if(util_service.check_user_body(req.body)){         
        
            var user_obj = new user({
                user_name: req.body.user_name,
                created_date: req.body.created_date,
                num_of_analysis: req.body.num_of_analysis
            });

            var created_user = await user_service.create_user(user_obj);

            return res.status(201).json({status: 201, data: created_user, message: "Succesfully created user."});

        }
        else{
            return res.status(404).json({status: 404, message: "User object not complete."}); 
        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}
