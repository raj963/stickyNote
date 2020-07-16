import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopupService } from './popup.service';
import { exit } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sticky-Note';
  notes = ['Default Title']
  showPopup: boolean;
  options: any[] = [
    { label: 'default', value: "brightness(1)" },
    { label: 'brightness', value: "brightness(0.5)" },
    { label: 'grayscale', value: "grayscale(1)" },
    { label: 'invert', value: "invert(1)" },
    { label: 'contrast', value: "contrast(0.5)" },
  ];
  selectedQuantity = { label: 'default', value: "brightness(1) " };

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {

  }

  /**
* add new Note call
* @param {addNote()} 
* @returns {void}
*/
  addNote(): void {

    let successFunc = (title, previousVal?) => {
      return this.setTitle(title, previousVal)
    }
    let obj = {
      popupType: 'inputType',
      onSuccess: successFunc,
      onCancel: () => { },
      currentScope: '',
      action: 'new',
    }

    this.popupService.showPopup(obj)
  }


  /**
* remove existing Note call
* @param {closeNote()} 
* @returns {void}
*/
  closeNote(id): void {
    let removeEle = () => {
      let originalId = this.notes.indexOf(id)
      return this.notes.splice(originalId, 1)
    }
    let obj = {
      popupType: 'confirm',
      onSuccess: removeEle,
      onCancel: () => { },
      currentScope: this,
      action: 'update',
      noteId: ''
    }

    this.popupService.showConfirmPopup(obj)


  }


  /**
* edit existing Note call
* @param {editNoteTitle(id)} 
* @returns {void}
*/
  editNoteTitle(id) {
    let obj = {
      popupType: 'inputType',
      onSuccess: this.setTitle.bind(this),
      onCancel: () => { },
      currentScope: this,
      action: 'update',
      noteId: id
    }

    this.popupService.showPopup(obj)
  }


  setTitle(title, previousVal?): boolean {

    let result = false;

    let matchFount = false
    for (let index = 0; index < this.notes.length; index++) {
      const element = this.notes[index].toLowerCase();
      if (element == title.toLowerCase()) {
        matchFount = true
        break;
      }

    }

    if (!matchFount && !previousVal) {
      this.notes.push(title);
      result = true;
    } else if (previousVal  ) {

      if(!matchFount){
        let id = this.notes.indexOf(previousVal);
        this.notes[id] = title;
        result = true;
      }else{
        alert('please enter some unique value')
      }
    } else{
      alert('please enter some unique value')
    }
    return result;
  }


  /**
* change application theam
* @param {changeTheam(event, element)} 
* @returns {void}
*/
  changeTheam(ev, el) {
    el.parentElement.style.filter = el.value

  }
}
