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
  selector: 'app-view-lector-modal',
  templateUrl: './view-lector-modal.component.html',
  styleUrls: ['./view-lector-modal.component.css']
})
export class ViewLectorModalComponent {
  @Input() lector: Lector | null = null;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }
} 