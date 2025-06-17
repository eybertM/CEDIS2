import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-prestamo-modal',
  templateUrl: './edit-prestamo-modal.component.html',
  styleUrls: ['./edit-prestamo-modal.component.css']
})
export class EditPrestamoModalComponent {
  @Input() prestamo: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePrestamo = new EventEmitter<any>();

  estados = ['Vigente', 'Vencido', 'Devuelto'];

  onSubmit(): void {
    this.savePrestamo.emit(this.prestamo);
  }

  onClose(): void {
    this.closeModal.emit();
  }
} 