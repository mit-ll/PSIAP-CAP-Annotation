//  AngularIO libraries.
import { Component, Input } from '@angular/core';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { environment } from '../environments/environment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

//  Custom libraries.
import { DatabaseService } from '../services/database.service';
import { ResponseUtil } from '../utils/util.response';
import { MathUtil } from '../utils/util.math';
import { Class } from '../models/class';
import { Data_Set } from '../models/data_set';
import { Image_Set } from '../models/image_set';
import { User } from '../models/user';
import { Analysis } from '../models/analysis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*
 *
 *  The main application component. 
 * 
 */

export class AppComponent{
  
  // The title of the applicaiton.
  app_title: string;

  // The simplified text of the applicaiton.
  app_text: string;

  // The dialog title.
  dialog_title: string;

  // The dialog text.
  dialog_text: string;

  // Boolean value to check if the user has agreed to dialog box.
  init: boolean = false;

  // User's username.
  user_name: string;

  // The file name of the current photo being displayed.
  file_name: string;

  // Current imageset to pull from.
  data_set: string;

  // Number of images the user has annotated from an image set.
  counter: number = 0;

  // The quadrant counter to keep track of what the user is looking at.
  quad_counter: number = -1;

  // The array holding the list of classifications.
  left_classes: Array<Class> = [];
  right_classes: Array<Class> = [];

  // Image classifications from the database.
  data_set_cols: Array<Data_Set> = [];

  // The currnet image being displayed.
  image_set: Image_Set = null;

  // The currently displayed photo.
  cur_photo: string;

  // Clipping options that will change the view of the image.
  clip_options: Array<string> = ['inset(0% 50% 50% 0%)',
    'inset(0% 0% 50% 50%)','inset(50% 50% 0% 0%)',
    'inset(50% 0% 0% 50%)'];

  // Current clipping option.
  cur_clip: SafeStyle;

  // The current width size of the photo.
  cur_width: SafeStyle = this.sanitizer.bypassSecurityTrustStyle('25%');

  // Boolean representing the view size of the photo.
  expanded_photo: boolean = false;

  // Enables the buttons on the login screen.
  disable_btns: boolean = true;
 
  /*
   *
   * The main application component constructor.
   * 
   * @param {dialog:DialogBoxComponent}         The DialogBoxComponent that
   *                                            handles errors and the 
   *                                            instructions the users will agree to.
   * @param {database_service:DatabaseService}  The DatabaseService that 
   *                                            handles the http requests.
   * @param {sanitizer:DomSanitizer}            The DomSanitizer that helps
   *                                            preventing cross site scripting.
   *                                            
   */

  constructor(
    private dialog: DialogBoxComponent,
    private database_service: DatabaseService,
    private sanitizer: DomSanitizer
  ) { 
    this.app_title = environment.app_title;
    this.app_text = environment.app_text;
    this.dialog_title = environment.dialog_title;
    this.dialog_text = environment.dialog_text;
  }

  /*
   *
   * Init method that sets up the application.
   * 
   */

  ngOnInit(): void {

    if(!this.init){
       
      this.dialog.open_dialog(environment.dialog_title, environment.dialog_text, true, false);

      this.dialog.set_callback(result => {

        this.user_name = this.dialog.get_user_name()

        this.get_all_classes();
        this.get_all_data_sets();

      });

    }

  }

  /*
   *
   * Pulls the classification from the back-end api.
   * 
   */

  get_all_classes(): void {

    this.database_service.get_all_classes().subscribe(
      response => this.classes_res(response)
    );

  }

  /*
   *
   * Handles the response of the get classifications request.
   *
   * @param  {response:any}    The response object for getting all of 
   *                           classifications.
   * 
   */

  classes_res(response: any): void {
    
    if(ResponseUtil.response_status_check(response.status)) {

      this.set_classes(response.data.docs);

    }
    else {

      this.dialog.open_dialog('Error loading classifications.', 'Please check \
        back-end for classification error.', false, false);

    }

  }

  /*
   *
   * Sets the data model of the classifications to the proper data.  This
   * allows the data to be displayed on the UI.
   *
   * @param  {response:array<Class>}   The array of classifications to 
   *                                   display on the UI.
   * 
   */

  set_classes(classes: Array<Class>): void {

    var halfNum = MathUtil.divide_by_and_rnd(classes.length, 2);
 
    for(var i = 0; i < classes.length; i++){
      classes[i].value = false;
    }

    this.left_classes = classes.splice(0, halfNum);
    this.right_classes = classes;

  }

  /*
   *
   * Pulls the image collection names from the back-end api.
   * 
   */

  get_all_data_sets(): void {

    this.database_service.get_all_data_sets().subscribe(
      response => this.img_col_res(response)
    );

  }

  /*
   *
   * Handles the response of the get image collections request.
   * 
   * @param  {response:any}    The response object for getting all of 
   *                           image collections.
   * 
   */

  img_col_res(response: any): void {

    if(ResponseUtil.response_status_check(response.status)) {

      this.set_img_col(response.data.docs);

    }
    else {
      
      this.dialog.open_dialog('Error loading image collections.', 'Please check \
        back-end for image collections error.', false, false);

    }

  }

  /*
   *
   * Sets the data model of the image collection to the proper data.  This
   * allows the data to be displayed on the UI.
   *
   * @param  {response:array<Class>}   The array of image collections to 
   *                                   display on the UI.
   * 
   */

  set_img_col(data_set_cols: Array<Data_Set>): void {

    this.data_set_cols = data_set_cols;

  }

  /*
   *
   * Method event called when data set has changed.
   * 
   */

  change_data_set(): void {

    this.get_rnd_img_from_set(this.data_set);

    this.set_img_quad(0);

    if(this.disable_btns){
      this.disable_btns = false;
    }

  }

  /*
   *
   * Pulls a random image set collection.
   * 
   * @param  {data_set:string}    The image set string to retrive from the 
   *                            database collection.
   */

  get_rnd_img_from_set(data_set: string): void {
    this.database_service.get_rnd_img_set_col(data_set).subscribe(
      response => this.rnd_img_from_set_res(response)
    );
  }

  /*
   *
   * Handles the response of the get random image set collections request.
   * 
   * @param  {response:any}    The response object for getting the image set
   *                           collection.
   * 
   */

  rnd_img_from_set_res(response: any): void {
 
    if(ResponseUtil.response_status_check(response.status)) {

      this.set_rnd_img_from_set(response.data[0]);
    }
    else {
      
      this.dialog.open_dialog('Error loading random image set collection.', 'Please check \
        back-end for image set collection  error.', false, false);

    }

  }

  /*
   *
   * Sets the data model of the image set collection to the proper data.  This
   * allows the data to be displayed on the UI.
   *
   * @param  {response:array<Class>}    The image set collection to display on 
   *                                    the UI.
   * 
   */

  set_rnd_img_from_set(imgSetCol: Image_Set): void {
    
    this.image_set = imgSetCol;

    this.set_cur_img();

  }

  /*
   *
   * Sets the current photo model to the image collection retrieved from the 
   * database.
   * 
   */
  
  set_cur_img(): void{

    this.cur_photo = this.database_service.get_api_url() + 
      this.database_service.get_photos_url() + this.image_set.file_id;

    this.file_name = this.image_set.file_name;

    this.set_img_quad(this.quad_counter);

  }

  /*
   *
   * Sets the quadrant the user is supposed to look at.
   * 
   * @param  {quad:number}    The number quadrant the user is supposed to look at.
   * 
   */

  set_img_quad(quad: number): void{

    this.quad_counter = quad;

    this.cur_clip = this.sanitizer.bypassSecurityTrustStyle(this.clip_options[this.quad_counter % 4])

  }

  /*
   *
   * Opens the instructions dialog box for the user.
   * 
   */

  open_instruction(): void {

    this.dialog.open_dialog(environment.dialog_title, environment.dialog_text, false, true);

  }

  /*
   *
   * Creates a analysis object that is sent to the back-end
   * API in order to save it to the database.
   *  
   */

  submit(): void {
    
    var classes = this.left_classes.concat(this.right_classes);

    var analysis_obj: Analysis = {
      user_name: this.user_name,
      file_name: this.image_set.file_name,
      sec_num: ((this.quad_counter % 4) + 1),
      created_date: new Date(),
      classes: classes
    };

    this.database_service.create_analysis(analysis_obj).subscribe(
      response => { 
        this.create_analysis_res(response);
      }
    );
  }

  /*
   *
   * Handles the response of the submit analysis request.
   * 
   * @param  {response:any}    The response object for creating the analysis.
   * 
   */

  create_analysis_res(response: any): void {
 
    if(ResponseUtil.response_status_check(response.status)) {

      this.counter++;
      this.quad_counter++;

      if(this.quad_counter % 4 === 0){
        this.quad_counter = 0;
        this.get_rnd_img_from_set(this.data_set);
      }
      else{
        this.set_img_quad(this.quad_counter);
      }

    }
    else {
      
      this.dialog.open_dialog('Error creating analysis.', 'Please check \
        back-end for creating analysis error.', false, false);

    }

  }

  /*
   *
   * Creates a user object that is sent to the back-end API in order to
   * save it to the database.
   *  
   */

  save_counter(): void {
    
    if(this.counter > 0){

      var user_obj: User = {
        user_name: this.user_name,
        num_of_analysis: this.counter,
        created_date: new Date()
      };

      this.database_service.create_user(user_obj).subscribe(
        response => { 
          this.create_user_res(response);
        }
      );
      
    }

  }

  /*
   *
   * Handles the response of the submit user request.
   * 
   * @param  {response:any}    The response object for creating the user.
   * 
   */

  create_user_res(response: any): void {
 
    if(!ResponseUtil.response_status_check(response.status)) {
    
      this.dialog.open_dialog('Error creating user.', 'Please check \
        back-end for creating user error.', false, false);
      
    }

  }

  /*
   *
   * Resets the all the checkboxes for the user.
   *  
   */

  reset_boxes(): void {
    
    for(var i = 0; i < this.left_classes.length; i++){
      this.left_classes[i].value = false;
    }
    
    for(var i = 0; i < this.right_classes.length; i++){
      this.right_classes[i].value = false;
    }

  }

  /*
   *
   * Changes the size of the photo.
   *  
   */

  change_photo_size(element): void {
    
    if(this.expanded_photo){

      this.cur_width = this.sanitizer.bypassSecurityTrustStyle('25%');
      this.expanded_photo = false;

    }
    else {

      this.cur_width = this.sanitizer.bypassSecurityTrustStyle('50%');
      this.expanded_photo = true;

    }

  }

}
