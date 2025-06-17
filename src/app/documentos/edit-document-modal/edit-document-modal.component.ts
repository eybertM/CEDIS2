import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-document-modal',
  templateUrl: './edit-document-modal.component.html',
  styleUrls: ['./edit-document-modal.component.css']
})
export class EditDocumentModalComponent {
  @Input() document: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveDocument = new EventEmitter<any>();

  categories = [
    'Tesis',
    'Artículos',
    'Proyectos',
    'Informes',
    'Otros'
  ];

  onSubmit(): void {
    this.saveDocument.emit(this.document);
  }

  onClose(): void {
    this.closeModal.emit();
  }
} 