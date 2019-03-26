// Angular libraries.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatSelectModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

// Custom libraries.
import { DatabaseService } from '../services/database.service';
import { DialogBoxComponent, DialogBox } from '../dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    DialogBox
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  entryComponents: [DialogBoxComponent, DialogBox],
  providers: [DialogBoxComponent, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
