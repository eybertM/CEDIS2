import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LectoresComponent } from './lectores.component';
import { ViewLectorModalComponent } from './view-lector-modal/view-lector-modal.component';
import { RegisterLectorModalComponent } from './register-lector-modal/register-lector-modal.component';
import { EditLectorModalComponent } from './edit-lector-modal/edit-lector-modal.component';
import { UploadLectoresModalComponent } from './upload-lectores-modal/upload-lectores-modal.component';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';

const routes: Routes = [
  {
    path: '',
    component: LectoresComponent
  }
];

@NgModule({
  declarations: [
    LectoresComponent,
    ViewLectorModalComponent,
    RegisterLectorModalComponent,
    EditLectorModalComponent,
    UploadLectoresModalComponent,
    ConfirmActionModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class LectoresModule { } 