// Custom analysis model.
var analysis = require('../models/analysis.model');

/*
 *
 * Gets all of the analysis currently in the database.
 * 
 * @param {query:object}            The query object that provides parameters for the query.
 * 
 * @return {Array<Analysis>}        The array of analysises retrived from the database.
 * 
 */ 

exports.get_analysises = async function(query, options){
    
    try {

        var analysises = await analysis.paginate(query, options);
        
        return analysises;

    } catch (e) {
        throw Error('Error while getting analysis.');
    }
}

/*
 *
 * Creates an analysis object and saves it to the database.
 * 
 * @param {analysis:object}     The analysis json object sent by the users request. 
 * 
 * @return {Analysis}           The analysis object that was saved to the database.
 * 
 */ 

exports.create_analysis = async function(analysis){

    try{

        var saved_analysis = await analysis.save(function(err){

            if(err){
                console.log(err);
                return;
            }
            
        });

        return saved_analysis;

    }catch(e){
        throw Error("Error while creating analysis.");
    }
}

/*
 *
 * Updates a analysis in the database.
 * 
 * @param {analysis:object}     The analysis object to update the database.
 * 
 * @return {Analysis}           Returns the updated analysis.
 * 
 */ 

exports.update_analysis = async function(analysis_req){
    
    var id = analysis_req._id;

    try{
    
        var old_analysis = await analysis.findById(id);

    }catch(e){
        throw Error("Error occured while finding the analysis.");
    }

    if(!old_analysis){
        return false;
    }

    old_analysis.user_name = analysis_req.user_name;
    old_analysis.file_name = analysis_req.file_name;
    old_analysis.sec_num = analysis_req.sec_num;
    old_analysis.classes = analysis_req.classes;

    try{

        var updated_analysis = await old_analysis.save();

        return updated_analysis;

    }catch(e){
        throw Error("Error occured while updating the analysis.");
    }
}

/*
 *
 * Deletes a analysis with a specific id.
 * 
 * @param {id:string}       The analysis id to delete.
 * 
 */ 

exports.delete_analysis = async function(id){
    
    try{
        
        var deleted = await analysis.remove({_id: id});

        if(deleted.n == 0 || deleted.ok == 0){
            throw Error("Analysis could not be deleted");
        };

    }catch(e){
        throw Error("Error occured while removing the analysis.");
    }
}

/*
 *
 * Removes all the analysis from the database.
 * 
 */ 

exports.remove_all_analysis = async function(){
    
    try{
        
        var deleted = await analysis.remove({});
        
        if(deleted.n == 0 || deleted.ok == 0){
            throw Error("All analysises could not be removed.");
        };

    }catch(e){
        throw Error("Error occured while removing all the analysises.");
    }
}