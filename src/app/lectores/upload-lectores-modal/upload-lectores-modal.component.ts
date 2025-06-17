import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-lectores-modal',
  templateUrl: './upload-lectores-modal.component.html',
  styleUrls: ['./upload-lectores-modal.component.css']
})
export class UploadLectoresModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() uploadSuccess = new EventEmitter<void>();

  selectedFile: File | null = null;
  isUploading = false;

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      
      // Simulate upload process
      setTimeout(() => {
        console.log('Uploading file:', this.selectedFile);
        this.isUploading = false;
        this.uploadSuccess.emit();
      }, 2000);
    }
  }
} 