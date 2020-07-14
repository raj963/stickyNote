import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { title } from 'process';
import { PopupService } from '../popup.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notesList = []

  @Input() noteId: string;
  @Output() closeNote = new EventEmitter<any>();

  @Output() editNoteTitle = new EventEmitter<any>();

  @ViewChild('notetext') noteText: ElementRef;
  noteStyle: {};
  dragValueId: number;
  validForItemRemove: boolean = true;
  isTitleReadOnly = true
  title: string = '';

  hadder: string

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.noteStyle = { 'display': 'none', 'margin-top': '40px' }

    this.notesList = ['Coffee', 'Tea', 'Milk']
    this.title = 'double Click for edit'
    this.isTitleReadOnly = true

    this.hadder = this.noteId
  }

  /**
* add new item in list
* @param {addItem(item, *)}  ,,,
* @returns {void}
*/

  addItem(ev?): void {
    if(ev){
      ev.stopPropagation();
    }
    let value = this.noteText.nativeElement.value

    value.trim() && !this.notesList.includes(value) ? this.notesList.push(value) : ''

    this.addItemHide()
  }


  /**
 * showing aler popup on litt item deletion
 * @param {remove(item, *)}  ,,,
 * @returns {void}
 */
  remove(): void {
    this.closeNote.emit(this.noteId)
  }

  /**
* showing alert popup on item deletion
* @param {removeItem(item, *)}  ,,,
* @returns {void}
*/
  removeItem(item) {
    let removeEle = () => {
      let index = this.notesList.indexOf(item)
      return this.notesList.splice(index, 1)
    }
    let obj = {
      popupType: 'confirm',
      onSuccess: removeEle,
      onCancel: () => { },
      currentScope: this,
      action: 'update',
      noteId: this.noteId
    }

    this.popupService.showConfirmPopup(obj)

  }



  /**
 * showing add new note textArea , 
 * @param {addItemDisplay()}  ,,,
 * @returns {void}
 */
  addItemDisplay() {
    this.noteStyle['display'] = 'block';

  }



  /**
* hide add new note textArea , and reset text box value
* @param {addItemHide(event, *)}  ,,,
* @returns {void}
*/
  addItemHide(ev?) {
    if(ev){
      ev.stopPropagation();
    }
    this.noteStyle['display'] = 'none';

    this.noteText.nativeElement.value = ''
  }

  /**
  * using browsser native drag drop api 
  * @param {allowDrop(event, *)}  ,,,
  * @returns {function(*, string)}
  */

  allowDrop(ev) {

    ev.preventDefault();
  }

  /**
  *  this funciton handle  drag case
  * @param {drag(ev, *)}  ,,,
  * @returns {void}
  */

  drag(ev):void {
    if (ev.target.innerText.trim()) {
      let finalLength = ev.target.innerText.length - 2;

      let setValue = ev.target.innerText.slice(0, finalLength)
      this.dragValueId = this.notesList.indexOf(setValue)
      let obj = {
        nodeid: this.noteId,
        value: setValue
      }
      ev.dataTransfer.setData("text", JSON.stringify(obj));
    }

  }

  /**
  *  this funciton handle  drop case
  * @param {drop(ev, *)}  ,,,
  * @returns {void}
  */

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    data = JSON.parse(data)
    if (data.value && data.nodeid != this.noteId) {

      this.addItemDrop(data.value)
    } else {
      this.validForItemRemove = false
      setTimeout(() => {
        this.validForItemRemove = true
      }, 100);
    }
  }



  /**
 *  when user done with drag and drop this fuction give control back to initiator
 * @param {dragend(ev, *)}  ,,,
 * @returns {void}
 */
  dragend(ev): void {
    if ((this.dragValueId || this.dragValueId == 0) && ev.dataTransfer.dropEffect == 'move' && this.validForItemRemove) {
      this.notesList.splice(this.dragValueId, 1)
    }
  }


  /**
  * pushing vale to noteList
  * @param {addItemDrop(value)}  ,,,
  * @returns {void}
  */

  addItemDrop(value) {
    this.notesList.push(value)
  }


  /**
* edit fuction for edit node list title
* @param {editTitle()}  ,,,
* @returns {void}
*/
  editTitle() {
    this.editNoteTitle.emit(this.noteId)
  }


  /**
* edit fuction for edit node list item
* @param {editNoteList()}  ,,,
* @returns {void}
*/
  editNoteList(note, ev) {

    this.addItem()

    let updateList = (text, previousText) => {
      let index = this.notesList.indexOf(previousText);
      if (index > -1) {
        this.notesList[index] = text
        return true
      }
      return false
    }

    let obj = {
      popupType: 'inputType',
      onSuccess: updateList,
      onCancel: () => { },
      currentScope: this,
      action: 'update',
      noteId: note

    }

    this.popupService.showPopup(obj)
  }


  /**
* edit fuction for edit node list item
* @param {editNoteList()}  ,,,
* @returns {void}
*/

  saveNoteTitle() {
    this.isTitleReadOnly = true
    this.title = 'double Click for edit'
  }


}
