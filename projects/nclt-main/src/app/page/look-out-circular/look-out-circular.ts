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
import { Divider } from 'primeng/divider';

interface LookOutCircularData {
  name: string;
  relationshipType: string;
  dateOfIssue: string;
  outcome: string;
}

@Component({
  selector: 'app-look-out-circular',
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
    Divider
  ],
  templateUrl: './look-out-circular.html',
  styleUrl: './look-out-circular.scss',
})
export class LookOutCircular {
  isLookOutCircularIssued: boolean | null = true;
  remarks: string = '';
  searchText: string = '';
  showDialog: boolean = false;

  // Form fields
  formData = {
    name: null,
    relationshipType: '',
    dateOfIssue: null,
    outcome: '',
  };

  nameOptions = [
    { label: 'Rajesh Kumar', value: 'Rajesh Kumar', relationshipType: 'Director' },
    { label: 'Priya Sharma', value: 'Priya Sharma', relationshipType: 'Promoter' },
    { label: 'Amit Patel', value: 'Amit Patel', relationshipType: 'Guarantor' },
    { label: 'Sunita Verma', value: 'Sunita Verma', relationshipType: 'Director' },
    { label: 'Vikram Singh', value: 'Vikram Singh', relationshipType: 'Promoter' },
  ];

  lookOutCirculars: LookOutCircularData[] = [
    {
      name: 'Rajesh Kumar',
      relationshipType: 'Director',
      dateOfIssue: '12-Mar-2024',
      outcome: 'Active',
    },
    {
      name: 'Priya Sharma',
      relationshipType: 'Promoter',
      dateOfIssue: '05-Feb-2024',
      outcome: 'Detained',
    },
    {
      name: 'Amit Patel',
      relationshipType: 'Guarantor',
      dateOfIssue: '18-Jan-2024',
      outcome: 'Active',
    },
    {
      name: 'Sunita Verma',
      relationshipType: 'Director',
      dateOfIssue: '22-Dec-2023',
      outcome: 'Revoked',
    },
    {
      name: 'Vikram Singh',
      relationshipType: 'Promoter',
      dateOfIssue: '10-Nov-2023',
      outcome: 'Active',
    },
  ];

  selectOption(option: boolean) {
    this.isLookOutCircularIssued = option;
  }

  saveRemarks() {
    console.log('Remarks saved:', this.remarks);
  }

  getOutcomeClass(outcome: string): string {
    const outcomeLower = outcome.toLowerCase();
    if (outcomeLower === 'active') {
      return 'status-filed';
    } else if (outcomeLower === 'detained') {
      return 'status-admitted';
    } else if (outcomeLower === 'revoked') {
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
      name: null,
      relationshipType: '',
      dateOfIssue: null,
      outcome: '',
    };
  }

  onNameChange() {
    const selectedOption = this.nameOptions.find((opt) => opt.value === this.formData.name);
    if (selectedOption) {
      this.formData.relationshipType = selectedOption.relationshipType;
    }
  }

  addLookOutCircular() {
    if (this.isFormValid()) {
      const newCircular: LookOutCircularData = {
        name: this.formData.name || '',
        relationshipType: this.formData.relationshipType,
        dateOfIssue: this.formatDate(this.formData.dateOfIssue),
        outcome: this.formData.outcome,
      };
      this.lookOutCirculars.push(newCircular);
      this.closeDialog();
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    const day = date.getDate().toString().padStart(2, '0');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.relationshipType &&
      this.formData.dateOfIssue &&
      this.formData.outcome
    );
  }

  getCharacterCount(): number {
    return this.formData.outcome.length;
  }
}
