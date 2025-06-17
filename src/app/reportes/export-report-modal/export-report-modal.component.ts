import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-report-modal',
  templateUrl: './export-report-modal.component.html',
  styleUrls: ['./export-report-modal.component.css']
})
export class ExportReportModalComponent {
  @Input() isOpen: boolean = false;
  @Input() reportData: any = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() exportReport = new EventEmitter<any>();

  exportOptions = {
    format: 'excel',
    includeHeaders: true,
    includeSummary: true,
    fileName: 'reporte_lectores_morosos'
  };

  availableFormats = [
    { value: 'excel', label: 'Excel (.xlsx)', icon: 'pe-7s-file' },
    { value: 'csv', label: 'CSV (.csv)', icon: 'pe-7s-file' },
    { value: 'pdf', label: 'PDF (.pdf)', icon: 'pe-7s-file' }
  ];

  constructor() { }

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onExport(): void {
    this.exportReport.emit(this.exportOptions);
  }

  updateFileName(): void {
    const date = new Date().toISOString().split('T')[0];
    this.exportOptions.fileName = `reporte_lectores_morosos_${date}`;
  }
} 