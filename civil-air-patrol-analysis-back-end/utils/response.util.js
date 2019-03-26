/*
 *
 * Checks the file id parameter to see if it is valid.
 * 
 * @return {boolean}    Boolean value to tell if file id is valid. 
 * 
 */ 

exports.check_file_id = function(params){

  return params.id && (typeof params.id === "string");

}

/*
 *
 * Checks the image set collection parameter to see if it is valid.
 * 
 * @return {boolean}    Boolean value to tell if data set is valid. 
 * 
 */ 

exports.check_img_set_param = function(params){
  
  return params.data_set_name && (typeof params.data_set_name === "string");
    
}

/*
 *
 * Checks the analysis id to see if it valid.
 * 
 * @param {params:object}   Params sent from the request.
 * 
 * @return {boolean}        Boolean value to tell if id is valid or not. 
 * 
 */ 

exports.check_analysis_id = function(id){

  return id && (typeof id === "string");

}

/*
 *
 * Checks the analysis body to see if they are valid.
 * 
 * @param {body:object}   Params sent from the request.
 * 
 * @return {boolean}      Boolean value to tell if params are valid or not. 
 * 
 */ 

exports.check_analysis_body = function(body){

  return body.user_name && (typeof body.user_name === "string") &&
          body.file_name && (typeof body.file_name === "string") &&
          body.sec_num && (typeof body.sec_num === "number") && 
          body.created_date && (typeof body.created_date === "string") &&
          body.classes && (typeof body.classes === "object");

}

/*
 *
 * Checks the class object to see if it is valid.
 * 
 * @param {body:object}   Class sent from the request array.
 * 
 * @return {boolean}      Boolean value to tell if class is valid or not. 
 * 
 */ 

exports.check_classes = function(json_class){

  return  json_class.class_name && (typeof json_class.class_name === "string") &&
          json_class.value != null && (typeof json_class.value === "boolean");

}

/*
 *
 * Checks the user body to see if they are valid.
 * 
 * @param  {body:object}    Params sent from the request.
 * 
 * @return {boolean}        Boolean value to tell if params are valid or not. 
 * 
 */ 

exports.check_user_body = function(body){

  return body.user_name && (typeof body.user_name === "string") &&
          body.created_date && (typeof body.created_date === "string") &&
          body.num_of_analysis && (typeof body.num_of_analysis === "number");
    
}

/*
 *
 * Checks the analysis parameters to see if they are valid.
 * 
 * @param  {body:object}    Params sent from the request.
 * 
 * @return {boolean}        Boolean value to tell if params are valid or not. 
 * 
 */ 

exports.check_query_params = function(query){

  return query.page && (typeof query.page === "number") &&
          query.limit && (typeof query.limit === "number");
    
}