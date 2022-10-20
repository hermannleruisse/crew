import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolService{

  constructor(private spinerService: NgxSpinnerService, private _snackBar: MatSnackBar){
        console.log('Hello ToolProvider Provider');
    }

  /**
   * affiche une alerte
   * @param title 
   * @param text 
   * @param icon 
   * @returns 
   */
  showAlert(title: string, text: string, icon: SweetAlertIcon){
    return Swal.fire({
      title: title, 
      text: text, 
      icon: icon
    })
  }

  /**
   *  toast parametrage
   */
  //  toastOptions = {
  //   timeOut: 3000,
  //   closeButton: true,
  //   enableHtml: true,
  //   progressBar: true
  // };

  // individualToastOptions = {
  //   disableTimeOut: true,
  //   closeButton: true,
  //   enableHtml: true
  // };

  /**
   * affiche une notification
   */
  
  showToast(msg?: string, actionText?: string, miliSecond?: number) {
    this._snackBar.open(msg, actionText, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: miliSecond
    });
  }

  showLoading() {
    console.log('show spiner =>');
    this.spinerService.show();
  }

  hideLoading() {
    console.log('show spiner =>');
    this.spinerService.hide();
  }

  /**
   * affiche une alerte de confirmation
   * @param title 
   * @param text 
   * @param icon 
   * @param confirmButtonText 
   * @param cancelButtonText 
   * @param allowOutsideClick 
   * @returns 
   */
  showConfirmation(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string,
    cancelButtonText: string, allowOutsideClick: boolean): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      allowOutsideClick: allowOutsideClick,
    });
  }

  /*Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })*/

  /**
   * 
   * @param objectArray 
   * @param key 
   * Supprime un element dans un tableau d'objet
   */
  removeElementFromObjectArray(objectArray: any[], key: number|string){
    objectArray.forEach((value, index) =>{
      if(value.id == key){
        objectArray.splice(index, 1);
      }
    })
  }
}