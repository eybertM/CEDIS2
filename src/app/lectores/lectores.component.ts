import { Component, OnInit } from '@angular/core';

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
  selector: 'app-lectores',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.component.css']
})
export class LectoresComponent implements OnInit {
  // Propiedades para filtros
  searchTerm: string = '';
  selectedType: string = '';

  // Propiedades para paginación
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  totalItems: number = 0;

  // Lista original de lectores
  private originalLectores: Lector[] = [
    {
      id: 1,
      selected: false,
      fechaRegistro: '2024-01-15',
      nombres: 'Juan Carlos',
      apellidos: 'García Rodríguez',
      dni: '12345678',
      correo: 'juan.garcia@email.com',
      tipo: 'Estudiante'
    },
    {
      id: 2,
      selected: false,
      fechaRegistro: '2024-01-20',
      nombres: 'María Elena',
      apellidos: 'Rodríguez López',
      dni: '23456789',
      correo: 'maria.rodriguez@email.com',
      tipo: 'Docente'
    },
    {
      id: 3,
      selected: false,
      fechaRegistro: '2024-02-01',
      nombres: 'Carlos Alberto',
      apellidos: 'López Martínez',
      dni: '34567890',
      correo: 'carlos.lopez@email.com',
      tipo: 'Estudiante'
    },
    {
      id: 4,
      selected: false,
      fechaRegistro: '2023-12-10',
      nombres: 'Ana Patricia',
      apellidos: 'Martínez Sánchez',
      dni: '45678901',
      correo: 'ana.martinez@email.com',
      tipo: 'Administrativo'
    },
    {
      id: 5,
      selected: false,
      fechaRegistro: '2024-02-10',
      nombres: 'Roberto José',
      apellidos: 'Sánchez Díaz',
      dni: '56789012',
      correo: 'roberto.sanchez@email.com',
      tipo: 'Estudiante'
    },
    {
      id: 6,
      selected: false,
      fechaRegistro: '2024-01-25',
      nombres: 'Laura Beatriz',
      apellidos: 'Díaz Fernández',
      dni: '67890123',
      correo: 'laura.diaz@email.com',
      tipo: 'Docente'
    },
    {
      id: 7,
      selected: false,
      fechaRegistro: '2024-01-30',
      nombres: 'Miguel Ángel',
      apellidos: 'Fernández Ruiz',
      dni: '78901234',
      correo: 'miguel.fernandez@email.com',
      tipo: 'Estudiante'
    },
    {
      id: 8,
      selected: false,
      fechaRegistro: '2024-02-05',
      nombres: 'Carmen Rosa',
      apellidos: 'Ruiz Jiménez',
      dni: '89012345',
      correo: 'carmen.ruiz@email.com',
      tipo: 'Administrativo'
    }
  ];

  // Lista filtrada de lectores
  lectores: Lector[] = [];

  // Propiedades para modales
  showViewModal: boolean = false;
  showRegisterModal: boolean = false;
  showEditModal: boolean = false;
  showUploadModal: boolean = false;
  showConfirmModal: boolean = false;
  selectedLector: Lector | null = null;
  confirmMessage: string = '';
  confirmAction: (() => void) | null = null;

  // Opciones de tipo
  tipoOptions = ['Estudiante', 'Docente', 'Administrativo'];

  ngOnInit(): void {
    this.applyFilters();
  }

  // Método para aplicar filtros
  onFilterChange(): void {
    this.applyFilters();
  }

  // Método para aplicar todos los filtros
  private applyFilters(): void {
    let filteredLectores = [...this.originalLectores];

    // Aplicar filtro de búsqueda
    if (this.searchTerm) {
      const searchLower = this.normalizeText(this.searchTerm);
      filteredLectores = filteredLectores.filter(lector => {
        const fullName = this.normalizeText(`${lector.nombres} ${lector.apellidos}`);
        const dni = lector.dni;
        const correo = this.normalizeText(lector.correo);
        
        return fullName.includes(searchLower) || 
               dni.includes(searchLower) || 
               correo.includes(searchLower);
      });
    }

    // Aplicar filtro de tipo
    if (this.selectedType) {
      filteredLectores = filteredLectores.filter(lector => 
        lector.tipo === this.selectedType
      );
    }

    this.lectores = filteredLectores;
    this.totalItems = this.lectores.length;
    this.currentPage = 1; // Reset to first page when applying filters
  }

  // Método para alternar selección de todos
  toggleSelectAll(): void {
    const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
    this.lectores.forEach(lector => {
      lector.selected = selectAllCheckbox.checked;
    });
  }

  // Método para obtener lectores seleccionados
  getSelectedLectores(): Lector[] {
    return this.lectores.filter(lector => lector.selected);
  }

  // Método para descargar lectores seleccionados
  downloadSelected(): void {
    const selectedLectores = this.getSelectedLectores();
    if (selectedLectores.length === 0) {
      alert('No hay lectores seleccionados para descargar');
      return;
    }
    
    // Aquí implementarías la lógica de descarga
    console.log('Descargando lectores seleccionados:', selectedLectores);
    alert(`Descargando ${selectedLectores.length} lectores seleccionados`);
  }

  // Método para eliminar lectores seleccionados
  deleteSelectedLectores(): void {
    const selectedLectores = this.getSelectedLectores();
    if (selectedLectores.length === 0) {
      alert('No hay lectores seleccionados para eliminar');
      return;
    }

    this.confirmMessage = `¿Está seguro que desea eliminar ${selectedLectores.length} lector(es) seleccionado(s)? Esta acción no se puede deshacer.`;
    this.confirmAction = () => {
      // Aquí implementarías la lógica de eliminación masiva
      console.log('Eliminando lectores seleccionados:', selectedLectores);
      this.originalLectores = this.originalLectores.filter(lector => 
        !selectedLectores.some(selected => selected.id === lector.id)
      );
      this.applyFilters();
      this.closeConfirmModal();
    };
    this.showConfirmModal = true;
  }

  // Método para abrir modal de visualización
  openViewModal(lector: Lector): void {
    this.selectedLector = lector;
    this.showViewModal = true;
  }

  // Método para cerrar modal de visualización
  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedLector = null;
  }

  // Método para abrir modal de registro
  openRegisterModal(): void {
    this.showRegisterModal = true;
  }

  // Método para cerrar modal de registro
  closeRegisterModal(): void {
    this.showRegisterModal = false;
  }

  // Método para manejar registro exitoso
  onRegisterSuccess(newLector: Lector): void {
    // Add the new lector to the original list
    this.originalLectores.push(newLector);
    
    // Close the modal
    this.closeRegisterModal();
    
    // Apply filters to update the display
    this.applyFilters();
  }

  // Método para abrir modal de edición
  openEditModal(lector: Lector): void {
    this.selectedLector = lector;
    this.showEditModal = true;
  }

  // Método para cerrar modal de edición
  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedLector = null;
  }

  // Método para manejar edición exitosa
  onEditSuccess(): void {
    this.closeEditModal();
    this.applyFilters();
  }

  // Método para abrir modal de carga masiva
  openUploadModal(): void {
    this.showUploadModal = true;
  }

  // Método para cerrar modal de carga masiva
  closeUploadModal(): void {
    this.showUploadModal = false;
  }

  // Método para manejar carga masiva exitosa
  onUploadSuccess(): void {
    this.closeUploadModal();
    this.applyFilters();
  }

  // Método para eliminar lector
  deleteLector(lector: Lector): void {
    this.selectedLector = lector;
    this.confirmMessage = `¿Está seguro que desea eliminar al lector ${lector.nombres} ${lector.apellidos}?`;
    this.confirmAction = () => {
      // Aquí implementarías la lógica de eliminación
      console.log('Eliminando lector:', lector);
      this.originalLectores = this.originalLectores.filter(l => l.id !== lector.id);
      this.applyFilters();
      this.closeConfirmModal();
    };
    this.showConfirmModal = true;
  }

  // Método para cerrar modal de confirmación
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmMessage = '';
    this.confirmAction = null;
    this.selectedLector = null;
  }

  // Método para confirmar acción
  onConfirmAction(): void {
    if (this.confirmAction) {
      this.confirmAction();
    }
  }

  // Métodos para paginación
  get paginatedLectores(): Lector[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.lectores.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onPageSizeChange(event: any): void {
    this.pageSize = parseInt(event.target.value);
    this.currentPage = 1; // Reset to first page when changing page size
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Método para normalizar texto (eliminar acentos y convertir a minúsculas)
  private normalizeText(text: string): string {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
} 