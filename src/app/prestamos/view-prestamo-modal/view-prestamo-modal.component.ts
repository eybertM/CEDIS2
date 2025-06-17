import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-prestamo-modal',
  templateUrl: './view-prestamo-modal.component.html',
  styleUrls: ['./view-prestamo-modal.component.css']
})
export class ViewPrestamoModalComponent {
  @Input() prestamo: any;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
} 