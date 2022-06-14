import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ToolService{
  public static TOAST_SUCCESS = 'success';
  public static TOAST_INFO = 'info';
  public static TOAST_WARNING = 'warning';
  public static TOAST_INDIVIDUAL = 'individual';
  public static TOAST_ERROR = 'error';

    constructor(public toastrService: ToastrService, private spinerService: NgxSpinnerService){
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
   toastOptions = {
    timeOut: 3000,
    closeButton: true,
    enableHtml: true,
    progressBar: true
  };

  individualToastOptions = {
    disableTimeOut: true,
    closeButton: true,
    enableHtml: true
  };

  /**
   * affiche une notification
   * @param type
   * @param msg
   * @param titre
   */
   showToast(type: string, msg?: string, titre?: string) {
    switch (type) {
      case ToolService.TOAST_ERROR:
        this.toastrService.error(msg, titre, this.toastOptions);
        break;

      case ToolService.TOAST_SUCCESS:
        this.toastrService.success(msg, titre, this.toastOptions);
        break;

      case ToolService.TOAST_INFO:
        this.toastrService.info(msg, titre, this.toastOptions);
        break;

      case ToolService.TOAST_WARNING:
        this.toastrService.warning(msg, titre, this.toastOptions);
        break;

      case ToolService.TOAST_INDIVIDUAL:
        this.toastrService.error(msg, titre, this.individualToastOptions);
        break;

      default:
        break;
    }
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