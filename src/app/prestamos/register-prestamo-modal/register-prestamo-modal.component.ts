import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-prestamo-modal',
  templateUrl: './register-prestamo-modal.component.html',
  styleUrls: ['./register-prestamo-modal.component.css']
})
export class RegisterPrestamoModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePrestamo = new EventEmitter<any>();

  prestamo = {
    lector: '',
    lectorId: '',
    bibliografia: '',
    bibliografiaId: '',
    fechaSolicitud: new Date(),
    estado: 'Vigente'
  };

  estados = ['Vigente', 'Vencido', 'Devuelto'];

  onSubmit() {
    this.savePrestamo.emit(this.prestamo);
  }

  onClose() {
    this.closeModal.emit();
  }
} 