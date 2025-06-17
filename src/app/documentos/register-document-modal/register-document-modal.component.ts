import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-document-modal',
  templateUrl: './register-document-modal.component.html',
  styleUrls: ['./register-document-modal.component.css']
})
export class RegisterDocumentModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveDocument = new EventEmitter<any>();

  document = {
    title: '',
    category: '',
    quantity: 1,
    publicationDate: '',
    authors: ''
  };

  categories = [
    'Tesis',
    'Artículos',
    'Proyectos',
    'Informes',
    'Otros'
  ];

  onSubmit() {
    this.saveDocument.emit(this.document);
  }

  onClose() {
    this.closeModal.emit();
  }
} 