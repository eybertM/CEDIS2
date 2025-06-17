import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-documents-modal',
  templateUrl: './upload-documents-modal.component.html',
  styleUrls: ['./upload-documents-modal.component.css']
})
export class UploadDocumentsModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() uploadFile = new EventEmitter<File>();

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.uploadFile.emit(this.selectedFile);
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
} 