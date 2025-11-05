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

interface HearingData {
  id: string;
  dateOfHearing: string;
  timeOfHearing: string;
  nextDateOfHearing: string;
  gistOfHearing: string;
  bankOfficialName: string;
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

  // Form fields
  dateOfHearing: Date | null = null;
  timeOfHearing: string = '';
  nextDateOfHearing: Date | null = null;
  gistOfHearing: string = '';
  bankOfficialName: string = '';

  ngOnInit() {
    this.hearings = [
      {
        id: '1',
        dateOfHearing: '15 Jan 2025, 10:30 AM',
        timeOfHearing: '10:30 AM',
        nextDateOfHearing: '05 Feb 2025',
        gistOfHearing: 'Discussion on resolution plan approval. Court asked for additional...',
        bankOfficialName: 'Rajesh Kumar (DGM)',
      },
      {
        id: '2',
        dateOfHearing: '20 Dec 2024, 2:00 PM',
        timeOfHearing: '2:00 PM',
        nextDateOfHearing: '15 Jan 2025',
        gistOfHearing: 'Preliminary hearing. Court directed submission of claim proofs...',
        bankOfficialName: 'Priya Sharma (AGM)',
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
    this.timeOfHearing = hearing.timeOfHearing;
    this.nextDateOfHearing = new Date(hearing.nextDateOfHearing);
    this.gistOfHearing = hearing.gistOfHearing;
    this.bankOfficialName = hearing.bankOfficialName;
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
    this.timeOfHearing = '';
    this.nextDateOfHearing = null;
    this.gistOfHearing = '';
    this.bankOfficialName = '';
  }

  saveHearing() {
    if (this.isEditMode && this.selectedHearing) {
      // Update existing hearing
      const index = this.hearings.findIndex((h) => h.id === this.selectedHearing!.id);
      if (index !== -1) {
        this.hearings[index] = {
          ...this.selectedHearing,
          dateOfHearing: this.formatDateTime(this.dateOfHearing!, this.timeOfHearing),
          timeOfHearing: this.timeOfHearing,
          nextDateOfHearing: this.formatDate(this.nextDateOfHearing!),
          gistOfHearing: this.gistOfHearing,
          bankOfficialName: this.bankOfficialName,
        };
      }
    } else {
      // Add new hearing
      const newHearing: HearingData = {
        id: (this.hearings.length + 1).toString(),
        dateOfHearing: this.formatDateTime(this.dateOfHearing!, this.timeOfHearing),
        timeOfHearing: this.timeOfHearing,
        nextDateOfHearing: this.formatDate(this.nextDateOfHearing!),
        gistOfHearing: this.gistOfHearing,
        bankOfficialName: this.bankOfficialName,
      };
      this.hearings = [newHearing, ...this.hearings];
    }

    this.dialogVisible = false;
    this.resetForm();
  }

  formatDateTime(date: Date, time: string): string {
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
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${time}`;
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
}
