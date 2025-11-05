import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

interface ForensicAuditData {
  conductedBy: string;
  dateOfAllotment: string;
  auditorName: string;
  status: string;
  dateOfReport: string;
  dateOfCompletion: string;
  auditorRemarks: string;
}

@Component({
  selector: 'app-forensic-audit',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TextareaModule,
    DialogModule,
    Select,
    DatePicker,
  ],
  templateUrl: './forensic-audit.html',
  styleUrl: './forensic-audit.scss',
})
export class ForensicAudit {
  isForensicAuditDone: boolean | null = true;
  remarks: string = '';
  searchText: string = '';
  showDialog: boolean = false;

  // Form fields
  formData = {
    conductedBy: null,
    dateOfAllotment: null,
    auditorName: '',
    status: null,
    dateOfReport: null,
    dateOfCompletion: null,
    auditorRemarks: '',
  };

  conductedByOptions = [
    { label: 'State Bank Of India', value: 'State Bank Of India' },
    { label: 'HDFC Bank', value: 'HDFC Bank' },
    { label: 'ICICI Bank', value: 'ICICI Bank' },
  ];

  statusOptions = [
    { label: 'Completed', value: 'Completed' },
    { label: 'In Progress', value: 'In Progress' },
  ];

  forensicAudits: ForensicAuditData[] = [
    {
      conductedBy: 'Internal Team',
      dateOfAllotment: '15-Jan-2024',
      auditorName: 'Rajesh Kumar & Associates',
      status: 'Completed',
      dateOfReport: '28-Feb-2024',
      dateOfCompletion: '05-Mar-2024',
      auditorRemarks: 'All financial records verified and found accurate',
    },
    {
      conductedBy: 'External Agency',
      dateOfAllotment: '10-Dec-2023',
      auditorName: 'Sharma Audit Firm',
      status: 'In Progress',
      dateOfReport: '20-Jan-2024',
      dateOfCompletion: '-',
      auditorRemarks: 'Pending final documentation review',
    },
    {
      conductedBy: 'Court Appointed',
      dateOfAllotment: '05-Nov-2023',
      auditorName: 'Mehta & Co. Chartered Accountants',
      status: 'Completed',
      dateOfReport: '15-Dec-2023',
      dateOfCompletion: '22-Dec-2023',
      auditorRemarks: 'Discrepancies found in Q2 transactions, detailed report submitted',
    },
    {
      conductedBy: 'Internal Team',
      dateOfAllotment: '01-Oct-2023',
      auditorName: 'Patel Forensic Services',
      status: 'Completed',
      dateOfReport: '30-Oct-2023',
      dateOfCompletion: '05-Nov-2023',
      auditorRemarks: 'No major issues identified',
    },
  ];

  selectOption(option: boolean) {
    this.isForensicAuditDone = option;
  }

  saveRemarks() {
    console.log('Remarks saved:', this.remarks);
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') {
      return 'status-filed';
    } else if (statusLower === 'in progress') {
      return 'status-admitted';
    } else if (statusLower === 'pending') {
      return 'status-resolution';
    }
    return 'status-default';
  }

  openDialog() {
    this.showDialog = true;
    this.resetForm();
  }

  closeDialog() {
    this.showDialog = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      conductedBy: null,
      dateOfAllotment: null,
      auditorName: '',
      status: null,
      dateOfReport: null,
      dateOfCompletion: null,
      auditorRemarks: '',
    };
  }

  addForensicAudit() {
    if (this.isFormValid()) {
      const newAudit: ForensicAuditData = {
        conductedBy: this.formData.conductedBy || '',
        dateOfAllotment: this.formatDate(this.formData.dateOfAllotment),
        auditorName: this.formData.auditorName,
        status: this.formData.status || '',
        dateOfReport: this.formatDate(this.formData.dateOfReport),
        dateOfCompletion: this.formatDate(this.formData.dateOfCompletion),
        auditorRemarks: this.formData.auditorRemarks,
      };
      this.forensicAudits.push(newAudit);
      this.closeDialog();
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  isFormValid(): boolean {
    return !!(
      this.formData.conductedBy &&
      this.formData.dateOfAllotment &&
      this.formData.auditorName &&
      this.formData.status &&
      this.formData.dateOfReport &&
      this.formData.dateOfCompletion &&
      this.formData.auditorRemarks
    );
  }

  getCharacterCount(): number {
    return this.formData.auditorRemarks.length;
  }
}
