// Node librarires.
var mongoose = require('mongoose');

// Custom services.
var photo_service = require('../services/photo.service');
var util_service = require('../utils/response.util');

/*
 *
 * Retrieves a random photo info from the database.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {response}          The response object with random photo info.
 * 
 */ 

exports.get_rnd_photo_info = async function(req, res){

    try{
    
        var random_photo = await photo_service.get_rnd_photo();
        
        return res.status(200).json({status: 200, data: random_photo, message: "Succesfully got random photo."});
        
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

/*
 *
 * Retrieves an image from the database based off of the file id.
 * 
 * @param   {req:Request}       The request object sent from front-end application.
 * @param   {res:Response}      The response object to return to the user.
 * 
 * @return  {Response}          The response object with the images data.
 * 
 */ 

exports.get_photo = async function(req, res){

    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new mongoDriver.GridFSBucket(db, mongoDriver);

    try{
    
        if(util_service.check_file_id(req.params)){
            
            var photo_info = await photo_service.get_photo_info({ _id: req.params.id });

            if(photo_info.docs.length > 0){

                var read_stream = gfs.openDownloadStreamByName(photo_info.docs[0].filename);
            
                return read_stream.pipe(res);

            }
            else {

                return res.status(404).json({status: 404, message: "Filename does not exist."});      

            }
        }
        else{

            return res.status(404).json({status: 404, message: "Filename format not recognized."});      

        }
        
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}