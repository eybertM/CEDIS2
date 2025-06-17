import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

interface Prestamo {
  id: number;
  fechaSolicitud: Date;
  lector: string;
  lectorId: string;
  bibliografia: string;
  bibliografiaId: string;
  estado: 'Vigente' | 'Vencido' | 'Devuelto';
  selected?: boolean;
}

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  // Propiedades para los filtros
  searchTerm: string = '';
  fechaSolicitud: string = '';
  selectedEstado: string = '';

  // Propiedades para paginación
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  totalItems: number = 0;

  // Lista original de préstamos
  private originalPrestamos: Prestamo[] = [
    {
      id: 1,
      fechaSolicitud: new Date('2024-03-15'),
      lector: 'Juan Pérez',
      lectorId: 'L-001',
      bibliografia: 'Introducción a la Programación',
      bibliografiaId: 'B-001',
      estado: 'Vigente'
    },
    {
      id: 2,
      fechaSolicitud: new Date('2024-03-10'),
      lector: 'María García',
      lectorId: 'L-002',
      bibliografia: 'Base de Datos Avanzadas',
      bibliografiaId: 'B-002',
      estado: 'Devuelto'
    },
    {
      id: 3,
      fechaSolicitud: new Date('2024-03-05'),
      lector: 'Carlos López',
      lectorId: 'L-003',
      bibliografia: 'Inteligencia Artificial',
      bibliografiaId: 'B-003',
      estado: 'Vencido'
    },
    {
      id: 4,
      fechaSolicitud: new Date('2024-03-18'),
      lector: 'Ana Martínez',
      lectorId: 'L-004',
      bibliografia: 'Desarrollo Web Moderno',
      bibliografiaId: 'B-004',
      estado: 'Vigente'
    },
    {
      id: 5,
      fechaSolicitud: new Date('2024-03-12'),
      lector: 'Roberto Sánchez',
      lectorId: 'L-005',
      bibliografia: 'Machine Learning Aplicado',
      bibliografiaId: 'B-005',
      estado: 'Vigente'
    },
    {
      id: 6,
      fechaSolicitud: new Date('2024-03-08'),
      lector: 'Laura Torres',
      lectorId: 'L-006',
      bibliografia: 'Ciberseguridad',
      bibliografiaId: 'B-006',
      estado: 'Devuelto'
    },
    {
      id: 7,
      fechaSolicitud: new Date('2024-03-20'),
      lector: 'Diego Ramírez',
      lectorId: 'L-007',
      bibliografia: 'Cloud Computing',
      bibliografiaId: 'B-007',
      estado: 'Vigente'
    },
    {
      id: 8,
      fechaSolicitud: new Date('2024-03-01'),
      lector: 'Sofía Vargas',
      lectorId: 'L-008',
      bibliografia: 'Big Data Analytics',
      bibliografiaId: 'B-008',
      estado: 'Vencido'
    },
    {
      id: 9,
      fechaSolicitud: new Date('2024-03-16'),
      lector: 'Miguel Ángel Rodríguez',
      lectorId: 'L-009',
      bibliografia: 'Desarrollo Móvil',
      bibliografiaId: 'B-009',
      estado: 'Vigente'
    },
    {
      id: 10,
      fechaSolicitud: new Date('2024-03-14'),
      lector: 'Carmen Jiménez',
      lectorId: 'L-010',
      bibliografia: 'DevOps Práctico',
      bibliografiaId: 'B-010',
      estado: 'Devuelto'
    },
    {
      id: 11,
      fechaSolicitud: new Date('2024-03-19'),
      lector: 'Pablo González',
      lectorId: 'L-011',
      bibliografia: 'Blockchain y Criptomonedas',
      bibliografiaId: 'B-011',
      estado: 'Vigente'
    },
    {
      id: 12,
      fechaSolicitud: new Date('2024-03-07'),
      lector: 'Isabel Moreno',
      lectorId: 'L-012',
      bibliografia: 'Inteligencia Artificial Ética',
      bibliografiaId: 'B-012',
      estado: 'Vencido'
    },
    {
      id: 13,
      fechaSolicitud: new Date('2024-03-21'),
      lector: 'Fernando Castro',
      lectorId: 'L-013',
      bibliografia: 'Realidad Virtual y Aumentada',
      bibliografiaId: 'B-013',
      estado: 'Vigente'
    },
    {
      id: 14,
      fechaSolicitud: new Date('2024-03-11'),
      lector: 'Lucía Díaz',
      lectorId: 'L-014',
      bibliografia: 'Internet de las Cosas',
      bibliografiaId: 'B-014',
      estado: 'Devuelto'
    },
    {
      id: 15,
      fechaSolicitud: new Date('2024-03-17'),
      lector: 'Javier Ruiz',
      lectorId: 'L-015',
      bibliografia: 'Ciberseguridad Avanzada',
      bibliografiaId: 'B-015',
      estado: 'Vigente'
    }
  ];

  // Lista filtrada de préstamos
  prestamos: Prestamo[] = [];

  // Lista de estados para el filtro
  estados = ['Vigente', 'Vencido', 'Devuelto'];

  // Propiedades para los modales
  showRegisterModal = false;
  showEditModal = false;
  showViewModal = false;
  showDownloadConfirmModal = false;
  showDeleteConfirmModal = false;
  prestamoToEdit: Prestamo | null = null;
  prestamoToView: Prestamo | null = null;

  constructor() {
    this.prestamos = [...this.originalPrestamos];
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  // Función para normalizar texto (eliminar tildes y caracteres especiales)
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
      .replace(/[^a-z0-9\s]/g, '') // Eliminar caracteres especiales
      .replace(/\s+/g, ' ') // Reemplazar múltiples espacios por uno solo
      .trim();
  }

  // Método para aplicar todos los filtros
  private applyFilters(): void {
    let filteredPrestamos = [...this.originalPrestamos];

    // Aplicar filtro de búsqueda
    if (this.searchTerm.trim()) {
      const searchTerms = this.normalizeText(this.searchTerm).split(' ');
      
      filteredPrestamos = filteredPrestamos.filter(prestamo => {
        const normalizedLector = this.normalizeText(prestamo.lector);
        const normalizedBibliografia = this.normalizeText(prestamo.bibliografia);
        
        // Verificar si todos los términos de búsqueda están presentes
        return searchTerms.every(term => 
          normalizedLector.includes(term) || 
          normalizedBibliografia.includes(term)
        );
      });
    }

    // Aplicar filtro de fecha
    if (this.fechaSolicitud) {
      const filterDate = new Date(this.fechaSolicitud);
      filterDate.setHours(0, 0, 0, 0);
      
      filteredPrestamos = filteredPrestamos.filter(prestamo => {
        const prestamoDate = new Date(prestamo.fechaSolicitud);
        prestamoDate.setHours(0, 0, 0, 0);
        return prestamoDate >= filterDate;
      });
    }

    // Aplicar filtro de estado
    if (this.selectedEstado) {
      filteredPrestamos = filteredPrestamos.filter(prestamo => 
        prestamo.estado === this.selectedEstado
      );
    }

    this.prestamos = filteredPrestamos;
    this.totalItems = this.prestamos.length;
    this.currentPage = 1; // Reset to first page when applying filters
  }

  // Métodos para paginación
  get paginatedPrestamos(): Prestamo[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.prestamos.slice(startIndex, endIndex);
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

  // Método para manejar la búsqueda
  onSearch(): void {
    this.applyFilters();
  }

  // Método para manejar cambios en los filtros
  onFilterChange(): void {
    this.applyFilters();
  }

  // Métodos para la selección de préstamos
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.prestamos.forEach(prestamo => prestamo.selected = checked);
  }

  getSelectedPrestamos(): Prestamo[] {
    return this.prestamos.filter(prestamo => prestamo.selected);
  }

  // Métodos para los modales
  addPrestamo(): void {
    this.showRegisterModal = true;
  }

  onCloseModal(): void {
    this.showRegisterModal = false;
  }

  onSavePrestamo(prestamo: any): void {
    const newPrestamo: Prestamo = {
      id: this.originalPrestamos.length + 1,
      fechaSolicitud: new Date(),
      lector: prestamo.lector,
      lectorId: prestamo.lectorId,
      bibliografia: prestamo.bibliografia,
      bibliografiaId: prestamo.bibliografiaId,
      estado: 'Vigente'
    };
    this.originalPrestamos.unshift(newPrestamo);
    this.applyFilters();
    this.showRegisterModal = false;
  }

  editPrestamo(prestamo: Prestamo): void {
    this.prestamoToEdit = { ...prestamo };
    this.showEditModal = true;
  }

  onCloseEditModal(): void {
    this.showEditModal = false;
    this.prestamoToEdit = null;
  }

  onSaveEditPrestamo(prestamo: Prestamo): void {
    const index = this.originalPrestamos.findIndex(p => p.id === prestamo.id);
    if (index !== -1) {
      this.originalPrestamos[index] = { ...prestamo };
      this.applyFilters();
    }
    this.showEditModal = false;
  }

  viewPrestamo(prestamo: Prestamo): void {
    this.prestamoToView = prestamo;
    this.showViewModal = true;
  }

  onCloseViewModal(): void {
    this.showViewModal = false;
    this.prestamoToView = null;
  }

  deletePrestamo(prestamo: Prestamo): void {
    this.prestamoToEdit = prestamo;
    this.showDeleteConfirmModal = true;
  }

  onCloseDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.prestamoToEdit = null;
  }

  onConfirmDelete(): void {
    if (this.prestamoToEdit) {
      this.originalPrestamos = this.originalPrestamos.filter(p => p.id !== this.prestamoToEdit!.id);
      this.applyFilters();
    }
    this.showDeleteConfirmModal = false;
    this.prestamoToEdit = null;
  }

  markAsReturned(prestamo: Prestamo): void {
    const index = this.originalPrestamos.findIndex(p => p.id === prestamo.id);
    if (index !== -1) {
      this.originalPrestamos[index] = { ...prestamo, estado: 'Devuelto' };
      this.applyFilters();
    }
  }

  // Método para descargar préstamos seleccionados
  downloadSelected(): void {
    const selectedPrestamos = this.getSelectedPrestamos();
    if (selectedPrestamos.length === 0) {
      alert('Por favor, seleccione al menos un préstamo para descargar.');
      return;
    }
    this.showDownloadConfirmModal = true;
  }

  onCloseDownloadConfirmModal(): void {
    this.showDownloadConfirmModal = false;
  }

  onConfirmDownload(): void {
    const selectedPrestamos = this.getSelectedPrestamos();
    this.generatePDF(selectedPrestamos);
    this.showDownloadConfirmModal = false;
  }

  private generatePDF(prestamos: Prestamo[]): void {
    const doc = new jsPDF();
    
    // Set document properties
    doc.setProperties({
      title: 'Reporte de Préstamos',
      subject: 'Lista de préstamos seleccionados',
      author: 'Sistema de Biblioteca',
      creator: 'Centro de Documentación'
    });

    // Add header
    doc.setFontSize(20);
    doc.setTextColor(220, 53, 69); // Red color
    doc.text('Centro de Documentación de Ingeniería de Sistemas', 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Reporte de Préstamos', 20, 35);
    
    // Add generation date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Generado el: ${currentDate}`, 20, 45);
    
    // Add summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total de préstamos: ${prestamos.length}`, 20, 60);
    
    // Create table headers
    const headers = ['N°', 'Fecha', 'Lector', 'Bibliografía', 'Estado'];
    const columnWidths = [15, 30, 50, 60, 25];
    let yPosition = 80;
    
    // Add table headers
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(220, 53, 69);
    
    let xPosition = 20;
    headers.forEach((header, index) => {
      doc.rect(xPosition, yPosition - 5, columnWidths[index], 8, 'F');
      doc.text(header, xPosition + 2, yPosition);
      xPosition += columnWidths[index];
    });
    
    // Add table data
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    
    prestamos.forEach((prestamo, index) => {
      yPosition += 8;
      
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Row background
      doc.rect(20, yPosition - 5, 180, 8, 'F');
      
      // Row data
      let xPos = 22;
      
      // Número
      doc.text((index + 1).toString(), xPos, yPosition);
      xPos += columnWidths[0];
      
      // Fecha
      const fecha = new Date(prestamo.fechaSolicitud).toLocaleDateString('es-ES');
      doc.text(fecha, xPos, yPosition);
      xPos += columnWidths[1];
      
      // Lector
      doc.text(prestamo.lector, xPos, yPosition);
      xPos += columnWidths[2];
      
      // Bibliografía
      doc.text(prestamo.bibliografia, xPos, yPosition);
      xPos += columnWidths[3];
      
      // Estado
      const estadoColor = this.getEstadoColor(prestamo.estado);
      doc.setTextColor(estadoColor.r, estadoColor.g, estadoColor.b);
      doc.text(prestamo.estado, xPos, yPosition);
      doc.setTextColor(0, 0, 0); // Reset color
    });
    
    // Add footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Página ${i} de ${totalPages}`, 20, 290);
    }
    
    // Save the PDF
    const fileName = `prestamos_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }

  private getEstadoColor(estado: string): { r: number, g: number, b: number } {
    switch (estado) {
      case 'Vigente':
        return { r: 40, g: 167, b: 69 }; // Green
      case 'Vencido':
        return { r: 220, g: 53, b: 69 }; // Red
      case 'Devuelto':
        return { r: 255, g: 193, b: 7 }; // Yellow
      default:
        return { r: 0, g: 0, b: 0 }; // Black
    }
  }
} 