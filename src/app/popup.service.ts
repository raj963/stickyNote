import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  private titleSubject = new Subject<any>();
  private confirmPopupSubject = new Subject<any>();

  
 /**
* Observable for edit popup
* @param {getPopupDatial()}  ,,,
* @returns {asObservable}
*/
  getPopupDatial(): Observable<any> {
    return this.titleSubject.asObservable();
  }

   /**
* Subject for edit popup
* @param {getPopupDatial()}  ,,,
* @returns {asObservable}
*/
  showPopup(obj: any) {
    this.titleSubject.next({ obj });
  }

    /**
* Observable for edit popup
* @param {getPopupDatial()}  ,,,
* @returns {asObservable}
*/
  getConfirmPopupDatial(): Observable<any> {
    return this.confirmPopupSubject.asObservable();
  }

  /**
* ConfirmPopup for edit popup
* @param {getPopupDatial()}  ,,,
* @returns {asObservable}
*/

  showConfirmPopup(obj) {
    this.confirmPopupSubject.next({ obj });
  }
}
