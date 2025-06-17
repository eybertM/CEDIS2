import { Component, Output, EventEmitter } from '@angular/core';

interface Lector {
  id: number;
  selected: boolean;
  fechaRegistro: string;
  nombres: string;
  apellidos: string;
  dni: string;
  correo: string;
  tipo: string;
}

@Component({
  selector: 'app-register-lector-modal',
  templateUrl: './register-lector-modal.component.html',
  styleUrls: ['./register-lector-modal.component.css']
})
export class RegisterLectorModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<Lector>();

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
      // Create new lector object
      const newLector: Lector = {
        id: this.generateId(), // Generate a new ID
        selected: false,
        fechaRegistro: this.getCurrentDate(),
        nombres: this.formData.nombres.trim(),
        apellidos: this.formData.apellidos.trim(),
        dni: this.formData.dni.trim(),
        correo: this.formData.correo.trim(),
        tipo: this.formData.tipo
      };

      console.log('Registering lector:', newLector);
      
      // Emit the new lector data
      this.registerSuccess.emit(newLector);
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

  private generateId(): number {
    // Generate a unique ID (in a real app, this would come from the backend)
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
} 