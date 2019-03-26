// AngularIO libraries.
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

/*
 *
 * The DialogBoxComponent that displays a dynamic
 * dialog box based on the string given.
 * 
 */ 

export class DialogBoxComponent {
  
  // The username the user has chosen
  user_name: string;  

  // Callback function in order to trigger application to start
  callback: Function;

  /*
   *
   * DialogBoxComponent that takes in a MatDialog in order to display it 
   * to the user.
   * 
   * @param {dialog:MatDialog}    The MatDialog used to display to the user.
   *            
   */
  
  constructor(private dialog: MatDialog) { }

  
  /*
   *
   * Opens the MatDialog and adds the string given to display to the user.
   * 
   * @param {message:String}    The string to display on the dialog box.
   *                            
   */

  open_dialog(dialog_title: string, dialog_text: string, submit_input: boolean, confirm_input: boolean): void{

    setTimeout(() => {
       let dialogRef = this.dialog.open(DialogBox,{
        data: { init: true, title: dialog_title, text: dialog_text, submit_input: submit_input, confirm_input: confirm_input },
        height: '50%',
        width: '50%',
        disableClose: true
      });

      if(confirm_input == false){

        dialogRef.afterClosed().subscribe(result => {

          this.user_name = result.data.user_name;
          this.callback.apply(this);
    
        });

      }
    }, 0);

  }

  /*
   *
   * Saves the function to call back to after the user has agreed to the
   * contents of the dialog box.
   * 
   * @param {callBack:Function}   The function that gets called after the 
   *                              user has agreed to the dialog box. 
   *                   
   */

  set_callback(callback:Function): void{
    this.callback = callback;
  }

  /*
   *
   * Returns the user name the user set.
   * 
   * @return {String}   The user name.
   *                          
   */

  get_user_name(): string{
    return this.user_name;
  }

}

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.html',
  styleUrls: ['./dialog-box.component.css']
})

/*
 *
 *  A custom DialogBox that the DialogBoxComponent uses in order to display dynmic text.
 * 
 */

export class DialogBox {

  // Init boolean value.
  init: boolean;
  error: boolean = false;

  // The DialogBox title and text.
  dialog_title: string;
  dialog_text: string;

  // Boolean values to display the proper buttons.
  submit_input: boolean = true;
  confirm_input: boolean = false;

  /*
   *
   * Custom DialogBox that is configured to use any data that is given.
   * 
   * @param {dialogRef:MatDialogRef<DialogBox>}   The current MatDialogBoxRef 
   *                                              that is used to update text.
   * @param {data:any}                            Information that is passed
   *                                              to the DialogBox to display.
   * 
   */

  constructor(
    public dialog_ref: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.init = this.data.init;
      
      this.dialog_title = data.title;
      this.dialog_text = data.text;
      this.submit_input = data.submit_input;
      this.confirm_input = data.confirm_input;

    }

  /*
   *
   * Function sets the username the user has typed in the input box and confirms it is 
   * an email.
   * 
   * @param {matInput:any}    The input string value the user set as their username.
   * 
   */

  set_user_name(matInput: any): void {
    
    var user_name = matInput.value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailTest = user_name != null && user_name != '' && re.test(String(user_name).toLowerCase());

    if(emailTest){
      this.data.user_name = matInput.value;
      this.dialog_ref.close({data:this.data});
    }
    
  }

  /*
   *
   * Calls submit_btn method when a user has typed their name and clicked enter.
   * 
   * @param {event:any}   The event being triggered by all buttons being typed.
   * 
   */

  enter_click(event: any): void {
    
    if(event.keyCode == 13) {
      let submit_btn: HTMLElement = document.getElementById('submit_btn') as HTMLElement;
      submit_btn.click();
    }
    
  }

  /*
   *
   *  Function that closes the second dialog box.
   * 
   */

  close(): void {
    this.dialog_ref.close();
  }

}
