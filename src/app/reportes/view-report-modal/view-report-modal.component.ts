import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-report-modal',
  templateUrl: './view-report-modal.component.html',
  styleUrls: ['./view-report-modal.component.css']
})
export class ViewReportModalComponent {
  @Input() isOpen: boolean = false;
  @Input() reportData: any = null;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
} 