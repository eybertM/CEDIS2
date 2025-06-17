import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.css']
})
export class ConfirmActionModalComponent {
  @Input() message: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }

  onConfirm(): void {
    this.confirmAction.emit();
  }
} 