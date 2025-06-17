import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DocumentosComponent } from './documentos.component';
import { RegisterDocumentModalComponent } from './register-document-modal/register-document-modal.component';
import { UploadDocumentsModalComponent } from './upload-documents-modal/upload-documents-modal.component';
import { EditDocumentModalComponent } from './edit-document-modal/edit-document-modal.component';
import { ConfirmActionModalComponent } from './confirm-action-modal/confirm-action-modal.component';
import { ViewDocumentModalComponent } from './view-document-modal/view-document-modal.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentosComponent
  }
];

@NgModule({
  declarations: [
    DocumentosComponent,
    RegisterDocumentModalComponent,
    UploadDocumentsModalComponent,
    EditDocumentModalComponent,
    ConfirmActionModalComponent,
    ViewDocumentModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DocumentosModule { } 