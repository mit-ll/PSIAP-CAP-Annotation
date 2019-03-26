/*
 *  Uploads images to mongo database.
 *  
 *  Usage: node baseline_data.js {database_name} {images_folder} {image_set} 
 *    {priority_number| default: 1} {classification_add: -y| default: -n}
 * 
 */

//  Required libraries required from nodejs.
var fs = require('fs');
var shell = require('shelljs');
var mongo = require('mongodb').MongoClient;
var config = require('config');

//  Local mongodb url.
var mongo_url = 'mongodb://127.0.0.1:27017/';
var classifications = 'classifications';
var data_sets = 'data_sets';
var image_sets = 'image_sets';
var fs_files = 'fs.files';
var files_to_upload = 50;

/*
 *
 * Creates the database for the civil air patrol analysis applicatoin.
 * 
 * @param {folder:string}           The starting root directory.
 * @param {database_name:string}    The database name for the application.
 * @param {data_set_name:string}    The data set name from which the images
 *                                  were retrieved.
 * 
 */ 

function create_db(database_name, folder, data_set_name, priority_number = 1, add_class = '-n'){

  console.log('Uploading images to '  + database_name + ' database.');
  var images = upload_images(folder, database_name);
  console.log();

  console.log('Adding image collection name ' + data_set_name + ' to mongo db collection ' + data_sets + '.' );
  add_image_col(database_name, data_set_name);
  console.log();

  console.log('Adding images to image set ' + data_set_name + '.');
  add_images_to_set(images, database_name, data_set_name, priority_number);
  console.log();

  var config_array = config.get('classifications');

  if(config_array && add_class === '-y') {

    console.log('Adding classifications from config file.');
    add_classifications(database_name, config_array);  
    console.log();

  }
  else{

    console.log('No classifications found in config file, or param to include params not provided.');
    console.log();

  }

}

/*
 *
 * Adds classifications for images to mongo db.
 * 
 * @param {database_name:array}     The database name for the application.
 * @param {config_array:array}      Arrray with classifications for images. 
 * 
 */ 

function add_classifications(database_name, config_array){

  mongo.connect(mongo_url + database_name,  { useNewUrlParser: true }, function(err, db) {

    console.log('Connected successfully to mongo db server.');

    var class_coll = db.db(database_name).collection(classifications);
    
    for(var i = 0; i < config_array.length; i++){

      console.log('Inserting classifications ' + config_array[i] + '.');
      class_coll.insertOne( { class_name: config_array[i] } );

    }

    db.close();
  });

}

/*
 *
 * Associates the images with an image set to know where the images
 * were scrapped from.
 * 
 * @param {images:array}            An array of all of the image names.
 * @param {database_name:string}    The database name for the application.
 * @param {data_set_name:string}    The image set name from which the images
 *                                  were retrieved.
 * 
 */ 

async function add_images_to_set(images, database_name, data_set_name, priority_number){

  var parsed_image_names = parse_image_names(images);

  mongo.connect(mongo_url + database_name,  { useNewUrlParser: true }, async function(err, db) {

    console.log('Connected successfully to mongo db server.');

    var image_set_mongo = db.db(database_name).collection(image_sets);

    console.log('Inserting image names into ' + image_sets + '.');

    for(var i = 0; i < files_to_upload; i++){
      if(parsed_image_names[i]){

        var file = await db.db(database_name).collection(fs_files).findOne({filename: parsed_image_names[i]})
        
        image_set_mongo.insertOne( { file_id: file._id, file_name: file.filename , data_set_name: data_set_name , priority: priority_number } )
      }
    }

    db.close();
  });

}

function parse_image_names(image_names){

  var parsed_image_names = [];

  for(var i = 0; i < image_names.length; i++){
    
    var image_name = image_names[i];
    var slash_local = image_names[i].lastIndexOf('/');

    if(slash_local > -1){

      image_name = image_name.substring(slash_local+1,image_name.length);

    }

    parsed_image_names.push(image_name);

  }

  return parsed_image_names;

}

/*
 *
 * Adds image set name to collection data_set.
 * 
 * @param {data_set_name:string}    The data set name to add.
 * 
 */ 

function add_image_col(database_name, data_set_name){

  mongo.connect(mongo_url + database_name,  { useNewUrlParser: true }, function(err, db) {

    console.log('Connected successfully to mongo db server.');

    var data_set_mongo = db.db(database_name).collection(data_sets);

    console.log('Inserting image_col ' + data_sets + '.');
    data_set_mongo.insertOne( { data_set_name: data_set_name } );

    db.close();
  });

}

/*
 *
 * Uploads the images to the mongo db.
 * 
 * @param {folder:string}           The root directory for where the images 
 *                                  are located.
 * @param {database_name:string}    The database name for the application.
 * 
 */ 

function upload_images(folder, database_name){

  var all_files = get_files(folder);
  console.log('Total Images: ' + all_files.length);

  for(var i = 0; i < files_to_upload ; i++) {
    
    console.log('Uploading file #' + i + ': ' + all_files[i]);

    if(all_files[i]){

      var path_array = all_files[i].split('/');
      var dir_lvl = path_array.length-1;
      var back_cmd = '../'
      var full_back_cmd = back_cmd.repeat(dir_lvl)

      if(dir_lvl == 0){
        shell.cd(folder);
      }
      else if(dir_lvl > 0){

        for(var j = 0; j < path_array.length-1; j++){
          shell.cd(path_array[j]);
        }

      }

      var file_name = path_array[path_array.length-1];
      
      var add_image_cmd = 'mongofiles -d ' + database_name + ' put ' + file_name;
      shell.exec(add_image_cmd);

      if(dir_lvl == 0){
        shell.cd(back_cmd);
      }
      else if(dir_lvl > 0){
        shell.cd(full_back_cmd);
      }

    }

  }

  return all_files;

}

/*
 *
 * Given a directory this function returns
 * all of the files in that direcotry and 
 * its subdirectory.
 * 
 * @param {dir:string}    The starting root directory.
 * 
 * @return {array}        The array of files from a folder.
 * 
 */ 

function get_files(dir){
  
  var files = files || [];
  files = fs.readdirSync(dir);
  
  for (var i in files){
    
    var name = dir + '/' + files[i];
    
    if (fs.statSync(name).isDirectory()) {
      get_files(name, files);
    } else {
      files.push(name);
    }
  
  }
  return files;
}

/*
 *
 *  Main method.
 *
 */

if (require.main === module) {

  if(process.argv.length > 4 && process.argv.length < 8) {
    create_db(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
  }
  else {
    console.log('Invalid number of parameters.');
    console.log('Please run as: node baseline_data.js {database_name} {images_folder} {image_col_name} ' +
    '{optional:priority_number: {priority_number} | default: 1} {optional:classification_add: -y | default: -n}');
  }
}

