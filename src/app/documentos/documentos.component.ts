import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Document {
  id: number;
  title: string;
  titleId: string;
  registrationDate: Date;
  publicationDate: Date;
  category: string;
  authors: string;
  currentVersion: number;
  totalVersions: number;
  selected?: boolean;
  description?: string;
  status?: string;
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  // Propiedades para los filtros
  searchTerm: string = '';
  publicationDate: string = '';
  selectedCategory: string = '';
  
  // Propiedades para paginación
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  totalItems: number = 0;

  // Lista de categorías
  categories: Category[] = [
    { id: 1, name: 'Tesis' },
    { id: 2, name: 'Artículos' },
    { id: 3, name: 'Proyectos' },
    { id: 4, name: 'Informes' },
    { id: 5, name: 'Otros' }
  ];

  // Lista de autores
  authors: Author[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'María García', email: 'maria.garcia@example.com' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com' },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com' }
  ];

  // Lista original de documentos
  private originalDocuments: Document[] = [
    {
      id: 1,
      title: 'Sistema de Gestión Documental',
      titleId: 'T-001',
      registrationDate: new Date('2024-03-15'),
      publicationDate: new Date('2024-03-20'),
      category: 'Tesis',
      authors: 'Juan Pérez',
      currentVersion: 1,
      totalVersions: 1,
      description: 'Sistema para la gestión de documentos académicos',
      status: 'Publicado'
    },
    {
      id: 2,
      title: 'Análisis de Requisitos',
      titleId: 'T-002',
      registrationDate: new Date('2024-03-10'),
      publicationDate: new Date('2024-03-18'),
      category: 'Proyectos',
      authors: 'María García',
      currentVersion: 2,
      totalVersions: 3,
      description: 'Documento de análisis de requisitos del sistema',
      status: 'En revisión'
    },
    {
      id: 3,
      title: 'Metodología de Desarrollo Ágil',
      titleId: 'T-003',
      registrationDate: new Date('2024-03-05'),
      publicationDate: new Date('2024-03-15'),
      category: 'Artículos',
      authors: 'Carlos López, Ana Martínez',
      currentVersion: 1,
      totalVersions: 1,
      description: 'Artículo sobre metodologías ágiles en el desarrollo de software',
      status: 'Publicado'
    },
    {
      id: 4,
      title: 'Informe de Proyecto Final',
      titleId: 'T-004',
      registrationDate: new Date('2024-03-01'),
      publicationDate: new Date('2024-03-12'),
      category: 'Informes',
      authors: 'Juan Pérez, María García',
      currentVersion: 3,
      totalVersions: 3,
      description: 'Informe final del proyecto de grado',
      status: 'Finalizado'
    },
    {
      id: 5,
      title: 'Manual de Usuario',
      titleId: 'T-005',
      registrationDate: new Date('2024-02-28'),
      publicationDate: new Date('2024-03-10'),
      category: 'Otros',
      authors: 'Ana Martínez',
      currentVersion: 1,
      totalVersions: 2,
      description: 'Manual de usuario del sistema',
      status: 'En revisión'
    }
  ];

  // Lista filtrada de documentos
  documents: Document[] = [];

  // Documento seleccionado para edición
  selectedDocument: Document | null = null;
  isEditing: boolean = false;
  showRegisterModal = false;
  showUploadModal = false;
  showEditModal = false;
  documentToEdit: Document | null = null;
  showDownloadConfirmModal = false;
  showDeleteConfirmModal = false;
  showViewModal = false;
  documentToView: Document | null = null;

  constructor() { }

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
    let filteredDocs = [...this.originalDocuments];

    // Aplicar filtro de búsqueda
    if (this.searchTerm.trim()) {
      const searchTerms = this.normalizeText(this.searchTerm).split(' ');
      
      filteredDocs = filteredDocs.filter(doc => {
        const normalizedTitle = this.normalizeText(doc.title);
        const normalizedTitleId = this.normalizeText(doc.titleId);
        
        // Verificar si todos los términos de búsqueda están presentes
        return searchTerms.every(term => 
          normalizedTitle.includes(term) || 
          normalizedTitleId.includes(term)
        );
      });
    }

    // Aplicar filtro de fecha
    if (this.publicationDate) {
      const filterDate = new Date(this.publicationDate);
      // Establecer la hora a 00:00:00 para comparar solo fechas
      filterDate.setHours(0, 0, 0, 0);
      
      filteredDocs = filteredDocs.filter(doc => {
        const docDate = new Date(doc.publicationDate);
        docDate.setHours(0, 0, 0, 0);
        return docDate >= filterDate;
      });
    }

    // Aplicar filtro de categoría
    if (this.selectedCategory) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.category === this.selectedCategory
      );
    }

    this.documents = filteredDocs;
    this.totalItems = this.documents.length;
    this.currentPage = 1; // Reset to first page when applying filters
  }

  // Métodos para paginación
  get paginatedDocuments(): Document[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.documents.slice(startIndex, endIndex);
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

  // Método para seleccionar/deseleccionar todos los documentos
  toggleSelectAll(): void {
    const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
    this.documents.forEach(doc => doc.selected = selectAllCheckbox.checked);
  }

  // Método para ver un documento
  viewDocument(doc: Document): void {
    this.documentToView = { ...doc };
    this.showViewModal = true;
  }

  // Método para editar un documento
  editDocument(doc: Document): void {
    this.documentToEdit = { ...doc };
    this.showEditModal = true;
  }

  // Método para eliminar un documento
  deleteDocument(doc: Document): void {
    if (confirm(`¿Está seguro de eliminar el documento "${doc.title}"?`)) {
      this.originalDocuments = this.originalDocuments.filter(d => d.id !== doc.id);
      this.applyFilters();
      console.log('Documento eliminado:', doc);
    }
  }

  // Método para guardar los cambios de edición
  saveDocument(): void {
    if (this.selectedDocument) {
      const index = this.originalDocuments.findIndex(d => d.id === this.selectedDocument?.id);
      if (index !== -1) {
        this.originalDocuments[index] = { ...this.selectedDocument };
        this.applyFilters();
      }
      this.isEditing = false;
      this.selectedDocument = null;
    }
  }

  // Método para cancelar la edición
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedDocument = null;
  }

  // Método para obtener documentos seleccionados
  getSelectedDocuments(): Document[] {
    return this.documents.filter(doc => doc.selected);
  }

  // Método para eliminar documentos seleccionados
  deleteSelectedDocuments(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para eliminar.');
      return;
    }
    this.showDeleteConfirmModal = true;
  }

  onCloseDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
  }

  onConfirmDelete(): void {
    const selectedDocs = this.getSelectedDocuments();
    this.originalDocuments = this.originalDocuments.filter(doc => !doc.selected);
    this.applyFilters();
    console.log('Documentos eliminados:', selectedDocs);
    this.showDeleteConfirmModal = false;
  }

  // Método para agregar un nuevo documento
  addDocument(): void {
    this.showRegisterModal = true;
  }

  onCloseModal(): void {
    this.showRegisterModal = false;
  }

  onSaveDocument(documentData: any): void {
    const newDocument: Document = {
      id: this.originalDocuments.length + 1,
      title: documentData.title,
      titleId: documentData.titleId,
      registrationDate: new Date(),
      publicationDate: new Date(documentData.publicationDate),
      category: documentData.category,
      authors: documentData.authors,
      currentVersion: 1,
      totalVersions: documentData.quantity,
      description: '',
      status: 'Nuevo'
    };

    this.originalDocuments.unshift(newDocument);
    this.applyFilters();
    this.showRegisterModal = false;
  }

  // Método para descargar documentos seleccionados
  downloadSelected(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para descargar.');
      return;
    }
    this.showDownloadConfirmModal = true;
  }

  onCloseDownloadConfirmModal(): void {
    this.showDownloadConfirmModal = false;
  }

  onConfirmDownload(): void {
    const selectedDocs = this.getSelectedDocuments();
    console.log('Descargando documentos:', selectedDocs);
    this.showDownloadConfirmModal = false;
  }

  // Método para subir documentos a la nube
  uploadToCloud(): void {
    const selectedDocs = this.getSelectedDocuments();
    if (selectedDocs.length === 0) {
      alert('Por favor, seleccione al menos un documento para subir a la nube.');
      return;
    }
    console.log('Subiendo documentos a la nube:', selectedDocs);
    alert(`Subiendo ${selectedDocs.length} documento(s) a la nube`);
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  onCloseUploadModal() {
    this.showUploadModal = false;
  }

  onUploadDocuments(file: File) {
    // Handle file upload logic here
    console.log('File to upload:', file);
    this.showUploadModal = false;
  }

  onCloseEditModal(): void {
    this.showEditModal = false;
    this.documentToEdit = null;
  }

  onSaveEditDocument(updatedDoc: Document): void {
    const index = this.originalDocuments.findIndex(d => d.id === updatedDoc.id);
    if (index !== -1) {
      this.originalDocuments[index] = { ...updatedDoc };
      this.applyFilters();
    }
    this.showEditModal = false;
    this.documentToEdit = null;
  }

  onCloseViewModal(): void {
    this.showViewModal = false;
    this.documentToView = null;
  }
} 