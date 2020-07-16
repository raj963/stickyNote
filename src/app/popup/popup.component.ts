import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { PopupService } from '../popup.service';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  
  getServicepopup: Subscription;
  getConfirmServicepopup: Subscription;
  popupDetails: any;

  constructor(private popupService: PopupService) { }

  @ViewChild('popupid') popupid: ElementRef;


  @Input() showPopup = false;
  @Output() setTitle = new EventEmitter<string>();

  listName = '';

  ngOnInit(): void {

    this.getTitleSubscribe();
    this.getConfirmPopupSubscribe()

  }


  /**
* subscribe notification from service to show popup fot title update
* @param {getTitleSubscribe()}  ,,,
* @returns {void}
*/
  private getTitleSubscribe() {
    this.getServicepopup = this.popupService.getPopupDatial().subscribe(obj => {

      if (this.popupid) {

        this.popupDetails = obj.obj;

        if (this.popupDetails?.noteId && this.popupDetails?.action != 'new') {
          this.listName = this.popupDetails?.noteId;
        } else {
          this.listName = '';
        }

        var modal = this.popupid.nativeElement;
        modal.style.display = "block";
      }
    });
  }


  /**
* subscribe notification from service to show popup
* @param {getConfirmPopupSubscribe()}  ,,,
* @returns {void}
*/
  private getConfirmPopupSubscribe() {
    this.getConfirmServicepopup = this.popupService.getConfirmPopupDatial().subscribe(obj => {

      this.popupDetails = obj.obj;
      var modal = this.popupid.nativeElement;
      modal.style.display = "block";

    });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.hidPopup()
  }


  /**
* hiding pop anfter task completed
* @param {hidPopup()}  ,,,
* @returns {void}
*/
  hidPopup() {

    var modal = this.popupid.nativeElement
    modal.style.display = "none";
  }

  /**
* handling popup cancel click
* @param {cancel()}  ,,,
* @returns {void}
*/
  cancel() {
    var modal = this.popupid.nativeElement
    modal.style.display = "none";
  }



  /**
* handling popup ok click
* @param {ok()}  ,,,
* @returns {void}
*/

  ok() {
    if (this.popupDetails?.popupType == 'inputType') {
      this.inputBanHandler();
    } else {
      // handling of confimation box
      return this.confirmBoxHandler();
    }
  }

  private confirmBoxHandler() {
    let result = this.popupDetails.onSuccess();
    this.hidePopup();
    return true;
  }

  private inputBanHandler() {
    var text = this.listName;
    if (text.trim()) {
      // handling of input box
      let previousVal = this.popupDetails?.noteId;
      let result = this.popupDetails.onSuccess(text, previousVal);

      if (result) {
        var modal = this.hidePopup();
      }
    }
    else {
      alert('please enter valid value');
    }
  }

  private hidePopup() {
    var modal = this.popupid.nativeElement;
    modal.style.display = "none";
    return modal;
  }

  ngOnDestroy() {
    this.getServicepopup.unsubscribe();
    this.getConfirmServicepopup.unsubscribe();
  }

}
