import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-application-details',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    DividerModule,
  ],
  templateUrl: './application-details.html',
  styleUrl: './application-details.scss',
})
export class ApplicationDetails {
  applicationNumber: string = '';
  dateOfApplicationFiled: Date | null = null;
  ncltBench: string = '';
  defaultAmount: number | null = null;

  ncltBenchOptions = [
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Allahabad', value: 'allahabad' },
    { label: 'Bengaluru', value: 'bengaluru' },
    { label: 'Chandigarh', value: 'chandigarh' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Cuttack', value: 'cuttack' },
    { label: 'Guwahati', value: 'guwahati' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Jaipur', value: 'jaipur' },
    { label: 'Kolkata', value: 'kolkata' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'New Delhi', value: 'new-delhi' },
  ];

  onCancel(): void {
    // Reset form
    this.applicationNumber = '';
    this.dateOfApplicationFiled = null;
    this.ncltBench = '';
    this.defaultAmount = null;
  }

  onSave(): void {
    // Validate required fields
    if (!this.applicationNumber || !this.dateOfApplicationFiled || !this.ncltBench || !this.defaultAmount) {
      console.error('Please fill all required fields');
      return;
    }

    // Save logic here
    console.log('Saving application details:', {
      applicationNumber: this.applicationNumber,
      dateOfApplicationFiled: this.dateOfApplicationFiled,
      ncltBench: this.ncltBench,
      defaultAmount: this.defaultAmount,
    });
  }
}
