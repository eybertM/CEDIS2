import { Component, OnInit } from '@angular/core';

interface OverdueReader {
  id: number;
  selected: boolean;
  nombres: string;
  apellidos: string;
  tipo: string;
  correoElectronico: string;
  diasVencidosPrimerPrestamo: number;
  diasVencidosSegundoPrestamo: number;
  diasVencidosTotal: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  // Propiedades para los filtros
  fechaInicio: string = '';
  fechaFin: string = '';

  // Propiedades para paginación
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  totalItems: number = 0;

  // Lista original de lectores morosos
  private originalOverdueReaders: OverdueReader[] = [
    {
      id: 1,
      selected: false,
      nombres: 'Juan Carlos',
      apellidos: 'García Rodríguez',
      tipo: 'Estudiante',
      correoElectronico: 'juan.garcia@email.com',
      diasVencidosPrimerPrestamo: 12,
      diasVencidosSegundoPrestamo: 15,
      diasVencidosTotal: 27,
      fechaPrestamo: '2024-01-15',
      fechaDevolucion: '2024-02-15'
    },
    {
      id: 2,
      selected: false,
      nombres: 'María Elena',
      apellidos: 'Rodríguez López',
      tipo: 'Maestro',
      correoElectronico: 'maria.rodriguez@email.com',
      diasVencidosPrimerPrestamo: 22,
      diasVencidosSegundoPrestamo: 0,
      diasVencidosTotal: 22,
      fechaPrestamo: '2024-01-20',
      fechaDevolucion: '2024-02-20'
    },
    {
      id: 3,
      selected: false,
      nombres: 'Carlos Alberto',
      apellidos: 'López Martínez',
      tipo: 'Estudiante',
      correoElectronico: 'carlos.lopez@email.com',
      diasVencidosPrimerPrestamo: 5,
      diasVencidosSegundoPrestamo: 12,
      diasVencidosTotal: 17,
      fechaPrestamo: '2024-02-01',
      fechaDevolucion: '2024-03-01'
    },
    {
      id: 4,
      selected: false,
      nombres: 'Ana Patricia',
      apellidos: 'Martínez Sánchez',
      tipo: 'Administrativo',
      correoElectronico: 'ana.martinez@email.com',
      diasVencidosPrimerPrestamo: 30,
      diasVencidosSegundoPrestamo: 15,
      diasVencidosTotal: 45,
      fechaPrestamo: '2023-12-10',
      fechaDevolucion: '2024-01-10'
    },
    {
      id: 5,
      selected: false,
      nombres: 'Roberto José',
      apellidos: 'Sánchez Díaz',
      tipo: 'Estudiante',
      correoElectronico: 'roberto.sanchez@email.com',
      diasVencidosPrimerPrestamo: 0,
      diasVencidosSegundoPrestamo: 18,
      diasVencidosTotal: 18,
      fechaPrestamo: '2024-02-10',
      fechaDevolucion: '2024-03-10'
    },
    {
      id: 6,
      selected: false,
      nombres: 'Laura Beatriz',
      apellidos: 'Díaz Fernández',
      tipo: 'Maestro',
      correoElectronico: 'laura.diaz@email.com',
      diasVencidosPrimerPrestamo: 10,
      diasVencidosSegundoPrestamo: 10,
      diasVencidosTotal: 20,
      fechaPrestamo: '2024-01-25',
      fechaDevolucion: '2024-02-25'
    },
    {
      id: 7,
      selected: false,
      nombres: 'Miguel Ángel',
      apellidos: 'Fernández Ruiz',
      tipo: 'Estudiante',
      correoElectronico: 'miguel.fernandez@email.com',
      diasVencidosPrimerPrestamo: 25,
      diasVencidosSegundoPrestamo: 0,
      diasVencidosTotal: 25,
      fechaPrestamo: '2024-01-30',
      fechaDevolucion: '2024-02-28'
    },
    {
      id: 8,
      selected: false,
      nombres: 'Carmen Rosa',
      apellidos: 'Ruiz Jiménez',
      tipo: 'Administrativo',
      correoElectronico: 'carmen.ruiz@email.com',
      diasVencidosPrimerPrestamo: 8,
      diasVencidosSegundoPrestamo: 22,
      diasVencidosTotal: 30,
      fechaPrestamo: '2024-02-05',
      fechaDevolucion: '2024-03-05'
    }
  ];

  // Lista filtrada de lectores morosos
  overdueReaders: OverdueReader[] = [];

  // Propiedades para los modales
  showViewModal: boolean = false;
  showExportModal: boolean = false;
  currentReportData: any = null;

  ngOnInit(): void {
    this.applyFilters();
  }

  // Método para aplicar filtros de fecha
  onFilterChange(): void {
    this.applyFilters();
  }

  // Método para aplicar todos los filtros
  private applyFilters(): void {
    let filteredReaders = [...this.originalOverdueReaders];

    // Aplicar filtro de fecha de inicio
    if (this.fechaInicio) {
      const filterStartDate = new Date(this.fechaInicio);
      filterStartDate.setHours(0, 0, 0, 0);
      
      filteredReaders = filteredReaders.filter(reader => {
        const prestamoDate = new Date(reader.fechaPrestamo);
        const devolucionDate = new Date(reader.fechaDevolucion);
        
        // Incluir si la fecha de préstamo o devolución está dentro del rango
        return prestamoDate >= filterStartDate || devolucionDate >= filterStartDate;
      });
    }

    // Aplicar filtro de fecha de fin
    if (this.fechaFin) {
      const filterEndDate = new Date(this.fechaFin);
      filterEndDate.setHours(23, 59, 59, 999);
      
      filteredReaders = filteredReaders.filter(reader => {
        const prestamoDate = new Date(reader.fechaPrestamo);
        const devolucionDate = new Date(reader.fechaDevolucion);
        
        // Incluir si la fecha de préstamo o devolución está dentro del rango
        return prestamoDate <= filterEndDate || devolucionDate <= filterEndDate;
      });
    }

    this.overdueReaders = filteredReaders;
    this.totalItems = this.overdueReaders.length;
    this.currentPage = 1; // Reset to first page when applying filters
  }

  // Método para alternar selección de todos
  toggleSelectAll(): void {
    const allSelected = this.overdueReaders.every(reader => reader.selected);
    this.overdueReaders.forEach(reader => {
      reader.selected = !allSelected;
    });
  }

  // Método para abrir modal de visualización
  openViewReportModal(): void {
    this.currentReportData = {
      totalReaders: this.overdueReaders.length,
      period: this.getPeriodText(),
      readers: this.overdueReaders
    };
    this.showViewModal = true;
  }

  // Método para cerrar modal de visualización
  closeViewModal(): void {
    this.showViewModal = false;
  }

  // Método para abrir modal de exportación
  openExportReportModal(): void {
    this.currentReportData = {
      totalReaders: this.overdueReaders.length,
      period: this.getPeriodText(),
      readers: this.overdueReaders
    };
    this.showExportModal = true;
  }

  // Método para cerrar modal de exportación
  closeExportModal(): void {
    this.showExportModal = false;
  }

  // Método para manejar la exportación
  handleExport(exportOptions: any): void {
    console.log('Exportando reporte con opciones:', exportOptions);
    console.log('Datos del reporte:', this.currentReportData);
    
    // Aquí implementarías la lógica real de exportación
    alert(`Reporte exportado como ${exportOptions.fileName}.${exportOptions.format}`);
    
    this.closeExportModal();
  }

  // Método para obtener texto del período
  private getPeriodText(): string {
    if (this.fechaInicio && this.fechaFin) {
      return `${this.fechaInicio} - ${this.fechaFin}`;
    } else if (this.fechaInicio) {
      return `Desde ${this.fechaInicio}`;
    } else if (this.fechaFin) {
      return `Hasta ${this.fechaFin}`;
    } else {
      return 'Todos los registros';
    }
  }

  // Método para descargar lectores seleccionados
  downloadSelected(): void {
    const selectedReaders = this.overdueReaders.filter(reader => reader.selected);
    
    if (selectedReaders.length === 0) {
      alert('Debe seleccionar al menos un lector para descargar.');
      return;
    }

    // Aquí implementarías la lógica de descarga
    console.log('Descargando lectores seleccionados:', selectedReaders);
    alert(`Se descargarán ${selectedReaders.length} lectores morosos.`);
    // Implementar descarga real aquí
  }

  // Métodos para paginación
  get paginatedReaders(): OverdueReader[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.overdueReaders.slice(startIndex, endIndex);
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