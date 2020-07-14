import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  noteStyle: { display: string; 'margin-top': string; };
  notesList: string[];

  @ViewChild('notetext') noteText: ElementRef;

  dragValueId: number;
  validForItemRemove: boolean = true;
  noteId: any;

  constructor() { }

  ngOnInit(): void {
    this.noteStyle = { 'display': 'none', 'margin-top': '40px' }

    this.notesList = ['Coffee', 'Tea', 'Milk']
  }

  addItem() {

    let value = this.noteText.nativeElement.value

    value.trim() && !this.notesList.includes(value) ? this.notesList.push(value) : ''

    this.addItemHide()
  }
  addItemHide() {
    this.noteText.nativeElement.value = ''
    throw new Error("Method not implemented.");
  }

  // remove() {
  //   this.closeNote.emit(this.noteId)

  // }
  removeItem(item) {
    let index = this.notesList.indexOf(item)
    this.notesList.splice(index, 1)
  }

  allowDrop(ev) {

    ev.preventDefault();
  }

  drag(ev) {

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

  dragend(ev) {
    if ((this.dragValueId || this.dragValueId == 0) && ev.dataTransfer.dropEffect == 'move' && this.validForItemRemove) {
      this.notesList.splice(this.dragValueId, 1)
    }
    debugger

  }

  addItemDrop(value) {
    this.notesList.push(value)
  }

}
