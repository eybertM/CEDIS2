import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportesComponent } from './reportes.component';
import { ViewReportModalComponent } from './view-report-modal/view-report-modal.component';
import { ExportReportModalComponent } from './export-report-modal/export-report-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent
  }
];

@NgModule({
  declarations: [
    ReportesComponent,
    ViewReportModalComponent,
    ExportReportModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ReportesModule { } 