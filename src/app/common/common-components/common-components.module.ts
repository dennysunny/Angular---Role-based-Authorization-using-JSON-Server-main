import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextboxCommonComponent } from 'src/app/textbox-common/textbox-common.component'; 
import { FormsModule } from '@angular/forms';
import { CommonToastrComponent } from 'src/app/common-toastr/common-toastr.component';



@NgModule({
  declarations: [
    TextboxCommonComponent,
    CommonToastrComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    TextboxCommonComponent,
    CommonToastrComponent
  ]
})
export class CommonComponentsModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
