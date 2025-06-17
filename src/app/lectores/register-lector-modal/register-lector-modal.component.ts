import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-lector-modal',
  templateUrl: './register-lector-modal.component.html',
  styleUrls: ['./register-lector-modal.component.css']
})
export class RegisterLectorModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();

  // Form data
  formData = {
    nombres: '',
    apellidos: '',
    dni: '',
    correo: '',
    tipo: 'Estudiante'
  };

  // Validation
  errors: { [key: string]: string } = {};

  // Options
  tipoOptions = ['Estudiante', 'Docente', 'Administrativo'];

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Here you would implement the actual registration logic
      console.log('Registering lector:', this.formData);
      
      // Simulate success
      this.registerSuccess.emit();
    }
  }

  private validateForm(): boolean {
    this.errors = {};

    if (!this.formData.nombres.trim()) {
      this.errors.nombres = 'Los nombres son requeridos';
    }

    if (!this.formData.apellidos.trim()) {
      this.errors.apellidos = 'Los apellidos son requeridos';
    }

    if (!this.formData.dni.trim()) {
      this.errors.dni = 'El DNI es requerido';
    } else if (!/^\d{8}$/.test(this.formData.dni)) {
      this.errors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!this.formData.correo.trim()) {
      this.errors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.correo)) {
      this.errors.correo = 'El correo no es válido';
    }

    if (!this.formData.tipo) {
      this.errors.tipo = 'El tipo es requerido';
    }

    return Object.keys(this.errors).length === 0;
  }
} 