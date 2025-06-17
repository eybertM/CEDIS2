import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-edit-lector-modal',
  templateUrl: './edit-lector-modal.component.html',
  styleUrls: ['./edit-lector-modal.component.css']
})
export class EditLectorModalComponent {
  @Input() lector: Lector | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() editSuccess = new EventEmitter<void>();

  // Form data
  formData = {
    nombres: '',
    apellidos: '',
    dni: '',
    correo: '',
    tipo: ''
  };

  // Validation
  errors: { [key: string]: string } = {};

  // Options
  tipoOptions = ['Estudiante', 'Docente', 'Administrativo'];

  constructor() { }

  ngOnInit(): void {
    if (this.lector) {
      this.formData = { ...this.lector };
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.validateForm()) {
      // Here you would implement the actual edit logic
      console.log('Editing lector:', this.formData);
      
      // Simulate success
      this.editSuccess.emit();
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