// Custom user model.
var user = require('../models/user.model');

/*
 *
 * Gets all of the users from the database.
 * 
 * @return  {array}     An array with all of the users.
 * 
 */ 

exports.get_users = async function(){

    try {

        var users = await user.paginate();

        return users;

    } catch (e) {
        throw Error('Error while getting users.');
    }
}

/*
 *
 * Saves the user object to the database.
 * 
 * @param {analysis:object}     The user json object. 
 * 
 * @return {User}               The user object that was saved.
 * 
 */ 

exports.create_user = async function(user_req){

    try{

        var saved_user = await user_req.save(function(err){

            if(err){
                console.log(err);
                return;
            }
            
        });

        return saved_user;

    }catch(e){
      
        throw Error("Error while creating user.");
    }
}