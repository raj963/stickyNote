import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup.service';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NoteListComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,FormsModule      ,
    AppRoutingModule
  ],
  providers: [PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
