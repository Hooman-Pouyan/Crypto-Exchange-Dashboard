import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "./material.persian-date.adapter";


@NgModule({
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatDividerModule,
    MatGridListModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatRippleModule,
    MatTreeModule,
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatStepperModule,
    MatDividerModule,
    MatGridListModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatRippleModule,
    MatTreeModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ]
})
export class MaterialModule {}
