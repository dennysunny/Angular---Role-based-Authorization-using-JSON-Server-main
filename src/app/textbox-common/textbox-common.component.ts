import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textbox-common',
  templateUrl: './textbox-common.component.html',
  styleUrls: ['./textbox-common.component.css']
})
export class TextboxCommonComponent {

 
  @Input() data: any = " ";
  @Output() postComment: EventEmitter<any> = new EventEmitter();

  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderline: boolean = false;
  fontSize: number = 16; 

  validationStatus: any = null;
  validationType: any = null;


  onSubmitComment() {
    this.postComment.emit(this.data);
    this.validationStatus = "Operation Unsuccessful"
    this.validationType = "info"

  }

  adjustTextareaSize(){

  }

}
