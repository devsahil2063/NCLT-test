import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

interface HearingData {
  id: string;
  dateOfHearing: string;
  timeOfHearing: string;
  nextDateOfHearing: string;
  gistOfHearing: string;
  bankOfficialName: string;
  bankOfficialDesignation?: string;
  ecNumber?: string;
  hearingOutcome?: string;
  adjournmentReason?: string;
  orderPassed?: string;
  orderDate?: string;
  orderNumber?: string;
  orderCopyFileName?: string;
  stayedByCourt?: string;
  numberOfDays?: string;
  affectsCIRPTimeline?: string;
  extensionGranted?: string;
  extensionPeriod?: string;
  newCIRPDeadline?: string;
}

@Component({
  selector: 'app-hearing',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIcon,
    IconField,
    Button,
    Dialog,
    Divider,
    DatePicker,
    Textarea,
    RadioButtonModule,
    SelectModule,
  ],
  templateUrl: './hearing.html',
  styleUrl: './hearing.scss',
})
export class Hearing implements OnInit {
  hearings: HearingData[] = [];
  searchTerm: string = '';
  dialogVisible: boolean = false;
  selectedHearing: HearingData | null = null;
  isEditMode: boolean = false;

  // Form fields - Hearing Details
  dateOfHearing: Date | null = null;
  ecNumber: string = '';
  bankOfficialName: string = '';
  bankOfficialDesignation: string = '';

  // Form fields - Hearing Outcome
  gistOfHearing: string = '';
  hearingOutcome: string = '';
  nextDateOfHearing: Date | null = null;
  adjournmentReason: string = '';

  // Form fields - Order Details
  orderPassed: string = '';
  orderDate: Date | null = null;
  orderNumber: string = '';
  orderCopyFile: File | null = null;
  orderCopyFileName: string = '';

  // Form fields - Court Directions
  stayedByCourt: string = '';
  numberOfDays: string = '';

  // Form fields - Impact on CIRP Timeline
  affectsCIRPTimeline: string = '';
  extensionGranted: string = '';
  extensionPeriod: string = '';
  newCIRPDeadline: Date | null = null;

  hearingOutcomeOptions = [
    { label: 'Adjourned', value: 'adjourned' },
    { label: 'Disposed', value: 'disposed' },
    { label: 'Pending', value: 'pending' },
  ];

  stayedByCourtOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: 'Partial', value: 'partial' },
  ];

  ngOnInit() {
    this.hearings = [
      {
        id: '1',
        dateOfHearing: '15 Jan 2025',
        timeOfHearing: '10:30 AM',
        ecNumber: 'EC12345',
        bankOfficialName: 'Rajesh Kumar',
        bankOfficialDesignation: 'DGM',
        gistOfHearing: 'Discussion on resolution plan approval. Court asked for additional...',
        hearingOutcome: 'adjourned',
        nextDateOfHearing: '05 Feb 2025',
        adjournmentReason: 'Additional documents required',
        orderPassed: 'yes',
        orderDate: '15 Jan 2025',
        orderNumber: 'ORD/2025/001',
        orderCopyFileName: 'order_copy_001.pdf',
        stayedByCourt: 'no',
        numberOfDays: '0',
        affectsCIRPTimeline: 'no',
        extensionGranted: 'no',
        extensionPeriod: '',
        newCIRPDeadline: '',
      },
      {
        id: '2',
        dateOfHearing: '20 Dec 2024',
        timeOfHearing: '2:00 PM',
        ecNumber: 'EC12346',
        bankOfficialName: 'Priya Sharma',
        bankOfficialDesignation: 'AGM',
        gistOfHearing: 'Preliminary hearing. Court directed submission of claim proofs...',
        hearingOutcome: 'disposed',
        nextDateOfHearing: '15 Jan 2025',
        adjournmentReason: '',
        orderPassed: 'yes',
        orderDate: '20 Dec 2024',
        orderNumber: 'ORD/2024/099',
        orderCopyFileName: 'order_copy_099.pdf',
        stayedByCourt: 'yes',
        numberOfDays: '30',
        affectsCIRPTimeline: 'yes',
        extensionGranted: 'yes',
        extensionPeriod: '30',
        newCIRPDeadline: '19 Jan 2025',
      },
    ];
  }

  get filteredHearings(): HearingData[] {
    if (!this.searchTerm) {
      return this.hearings;
    }
    const searchLower = this.searchTerm.toLowerCase();
    return this.hearings.filter(
      (h) =>
        h.dateOfHearing.toLowerCase().includes(searchLower) ||
        h.nextDateOfHearing.toLowerCase().includes(searchLower) ||
        h.gistOfHearing.toLowerCase().includes(searchLower) ||
        h.bankOfficialName.toLowerCase().includes(searchLower),
    );
  }

  getMenuItems(hearing: HearingData): MenuItem[] {
    return [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => this.viewHearing(hearing),
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editHearing(hearing),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteHearing(hearing),
        styleClass: 'text-red-500!',
      },
    ];
  }

  viewHearing(hearing: HearingData) {
    console.log('View hearing', hearing);
  }

  editHearing(hearing: HearingData) {
    this.selectedHearing = hearing;
    this.isEditMode = true;
    this.dialogVisible = true;

    // Parse and populate form fields
    this.dateOfHearing = new Date(hearing.dateOfHearing);
    this.ecNumber = hearing.ecNumber || '';
    this.bankOfficialName = hearing.bankOfficialName;
    this.bankOfficialDesignation = hearing.bankOfficialDesignation || '';
    this.gistOfHearing = hearing.gistOfHearing;
    this.hearingOutcome = hearing.hearingOutcome || '';
    this.nextDateOfHearing = hearing.nextDateOfHearing ? new Date(hearing.nextDateOfHearing) : null;
    this.adjournmentReason = hearing.adjournmentReason || '';
    this.orderPassed = hearing.orderPassed || '';
    this.orderDate = hearing.orderDate ? new Date(hearing.orderDate) : null;
    this.orderNumber = hearing.orderNumber || '';
    this.orderCopyFileName = hearing.orderCopyFileName || '';
    this.stayedByCourt = hearing.stayedByCourt || '';
    this.numberOfDays = hearing.numberOfDays || '';
    this.affectsCIRPTimeline = hearing.affectsCIRPTimeline || '';
    this.extensionGranted = hearing.extensionGranted || '';
    this.extensionPeriod = hearing.extensionPeriod || '';
    this.newCIRPDeadline = hearing.newCIRPDeadline ? new Date(hearing.newCIRPDeadline) : null;
  }

  deleteHearing(hearing: HearingData) {
    console.log('Delete hearing', hearing);
    this.hearings = this.hearings.filter((h) => h.id !== hearing.id);
  }

  showAddDialog() {
    this.isEditMode = false;
    this.selectedHearing = null;
    this.resetForm();
    this.dialogVisible = true;
  }

  resetForm() {
    this.dateOfHearing = null;
    this.ecNumber = '';
    this.bankOfficialName = '';
    this.bankOfficialDesignation = '';
    this.gistOfHearing = '';
    this.hearingOutcome = '';
    this.nextDateOfHearing = null;
    this.adjournmentReason = '';
    this.orderPassed = '';
    this.orderDate = null;
    this.orderNumber = '';
    this.orderCopyFile = null;
    this.orderCopyFileName = '';
    this.stayedByCourt = '';
    this.numberOfDays = '';
    this.affectsCIRPTimeline = '';
    this.extensionGranted = '';
    this.extensionPeriod = '';
    this.newCIRPDeadline = null;
  }

  saveHearing() {
    if (this.isEditMode && this.selectedHearing) {
      // Update existing hearing
      const index = this.hearings.findIndex((h) => h.id === this.selectedHearing!.id);
      if (index !== -1) {
        this.hearings[index] = {
          ...this.selectedHearing,
          dateOfHearing: this.formatDate(this.dateOfHearing!),
          ecNumber: this.ecNumber,
          bankOfficialName: this.bankOfficialName,
          bankOfficialDesignation: this.bankOfficialDesignation,
          gistOfHearing: this.gistOfHearing,
          hearingOutcome: this.hearingOutcome,
          nextDateOfHearing: this.nextDateOfHearing ? this.formatDate(this.nextDateOfHearing) : '',
          adjournmentReason: this.adjournmentReason,
          orderPassed: this.orderPassed,
          orderDate: this.orderDate ? this.formatDate(this.orderDate) : '',
          orderNumber: this.orderNumber,
          orderCopyFileName: this.orderCopyFileName,
          stayedByCourt: this.stayedByCourt,
          numberOfDays: this.numberOfDays,
          affectsCIRPTimeline: this.affectsCIRPTimeline,
          extensionGranted: this.extensionGranted,
          extensionPeriod: this.extensionPeriod,
          newCIRPDeadline: this.newCIRPDeadline ? this.formatDate(this.newCIRPDeadline) : '',
        };
      }
    } else {
      // Add new hearing
      const newHearing: HearingData = {
        id: (this.hearings.length + 1).toString(),
        dateOfHearing: this.formatDate(this.dateOfHearing!),
        timeOfHearing: '',
        ecNumber: this.ecNumber,
        bankOfficialName: this.bankOfficialName,
        bankOfficialDesignation: this.bankOfficialDesignation,
        gistOfHearing: this.gistOfHearing,
        hearingOutcome: this.hearingOutcome,
        nextDateOfHearing: this.nextDateOfHearing ? this.formatDate(this.nextDateOfHearing) : '',
        adjournmentReason: this.adjournmentReason,
        orderPassed: this.orderPassed,
        orderDate: this.orderDate ? this.formatDate(this.orderDate) : '',
        orderNumber: this.orderNumber,
        orderCopyFileName: this.orderCopyFileName,
        stayedByCourt: this.stayedByCourt,
        numberOfDays: this.numberOfDays,
        affectsCIRPTimeline: this.affectsCIRPTimeline,
        extensionGranted: this.extensionGranted,
        extensionPeriod: this.extensionPeriod,
        newCIRPDeadline: this.newCIRPDeadline ? this.formatDate(this.newCIRPDeadline) : '',
      };
      this.hearings = [newHearing, ...this.hearings];
    }

    this.dialogVisible = false;
    this.resetForm();
  }

  formatDate(date: Date): string {
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
    return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  downloadCourtOrder(hearing: HearingData) {
    console.log('Download court order for', hearing);
  }

  onOrderCopySelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file size (10MB max)
      if (file.size > 10485760) {
        alert('File size exceeds maximum of 10MB');
        return;
      }

      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }

      this.orderCopyFile = file;
      this.orderCopyFileName = file.name;
    }
  }

  removeOrderCopy(): void {
    this.orderCopyFile = null;
    this.orderCopyFileName = '';
  }
}
