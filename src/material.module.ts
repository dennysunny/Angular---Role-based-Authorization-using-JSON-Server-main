import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatRadioModule } from "@angular/material/radio"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"





@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDialogModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule
    ]
})

export class MaterialModule {}