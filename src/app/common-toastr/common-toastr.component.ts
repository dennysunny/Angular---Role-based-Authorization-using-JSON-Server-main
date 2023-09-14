import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-common-toastr',
  templateUrl: './common-toastr.component.html',
  styleUrls: ['./common-toastr.component.css'],
})
export class CommonToastrComponent {
  @Input() type: 'success' | 'error' | 'warn' | 'info' | null = 'success';
  @Input() message: any = null;
  @Output() close = new EventEmitter<void>();
  showToast: boolean = true;

  iconClass =
    this.type === 'success'
      ? 'fa fa-check fa-2x'
      : this.type === 'warn'
      ? 'fa fa-exclamation-triangle fa-2x'
      : this.type === 'error'
      ? 'fa fa-times fa-2x'
      : 'fa fa-info-circle fa-2x';

 
  Toast = setTimeout(()=> {
    this.showToast=false;
    this.message = null
    this.type = null
    this.iconClass = ''
  }, 3000)
 


  closeToastr() {
    this.close.emit();
  }
}
