import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-document-modal',
  templateUrl: './view-document-modal.component.html',
  styleUrls: ['./view-document-modal.component.css']
})
export class ViewDocumentModalComponent {
  @Input() document: any;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
} 