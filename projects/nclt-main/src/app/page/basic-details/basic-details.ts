import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-basic-details',
  imports: [CommonModule, FormsModule, InputText, Select, DatePicker, Button, Card, Divider],
  templateUrl: './basic-details.html',
  styleUrl: './basic-details.scss',
})
export class BasicDetails {
  // Customer Details
  customerId: string = '';
  salutation: string = '';
  customerName: string = '';
  lineOfActivity: string = '';
  segment: string = '';
  panNumber: string = '';

  // Branch & Organization Details
  sunId: string = '';
  branch: string = '';
  region: string = '';
  zone: string = '';

  // Account Classification
  npaDate: Date | null = null;
  assetClassification: string = '';
  tno: string = '';
  provisionHeldAsOn: Date | null = null;

  // Fraud & WFD Details
  fraudDeclared: string = '';
  dateOfFraudDeclared: Date | null = null;
  wfdDeclared: string = '';
  dateOfWfdDeclared: Date | null = null;

  // Address Details
  addressType: string = '';
  addressCategory: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  addressLine3: string = '';
  pincode: string = '';
  country: string = '';
  state: string = '';
  district: string = '';

  // Contact Details
  officeStdCode: string = '';
  officePhoneNumber: string = '';
  resStdCode: string = '';
  resPhoneNumber: string = '';

  // Dropdown options
  salutationOptions = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Mrs', value: 'Mrs' },
  ];

  lineOfActivityOptions = [
    { label: 'Manufacturing', value: 'Manufacturing' },
    { label: 'Services', value: 'Services' },
    { label: 'Trading', value: 'Trading' },
  ];

  segmentOptions = [
    { label: 'MSME', value: 'MSME' },
    { label: 'Corporate', value: 'Corporate' },
    { label: 'Retail', value: 'Retail' },
  ];

  addressTypeOptions = [
    { label: 'Registered', value: 'Registered' },
    { label: 'Residential', value: 'Residential' },
    { label: 'Office', value: 'Office' },
  ];

  addressCategoryOptions = [
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Residential', value: 'Residential' },
  ];

  assetClassificationOptions = [
    { label: 'Standard', value: 'Standard' },
    { label: 'Substandard', value: 'Substandard' },
    { label: 'Doubtful', value: 'Doubtful' },
  ];

  yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  onBack() {
    // Navigate back logic
  }

  onClose() {
    // Close logic
  }
}
