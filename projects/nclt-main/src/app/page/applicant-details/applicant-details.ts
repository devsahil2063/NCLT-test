import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-applicant-details',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    DividerModule,
  ],
  templateUrl: './applicant-details.html',
  styleUrl: './applicant-details.scss',
})
export class ApplicantDetails {
  applicantName: string = 'Bank of Baroda';
  filingBranch: string = '';
  branchCode: string = '';
  authorizedOfficerName: string = '';
  authorizedOfficerDesignation: string = '';
  authorizedOfficerContact: string = '';
  authorizedOfficerEmail: string = '';

  filingBranchOptions = [
    { label: 'Mumbai - Fort', value: 'mumbai-fort' },
    { label: 'Delhi - Connaught Place', value: 'delhi-cp' },
    { label: 'Bengaluru - MG Road', value: 'bangalore-mg' },
  ];

  onFilingBranchChange(): void {
    // Auto-fill branch code based on selected branch
    if (this.filingBranch) {
      // This would typically come from an API or mapping
      this.branchCode = 'Auto-filled';
    }
  }

  onCancel(): void {
    // Reset form
    this.applicantName = 'Bank of Baroda';
    this.filingBranch = '';
    this.branchCode = '';
    this.authorizedOfficerName = '';
    this.authorizedOfficerDesignation = '';
    this.authorizedOfficerContact = '';
    this.authorizedOfficerEmail = '';
  }

  onSave(): void {
    // Validate required fields
    if (
      !this.applicantName ||
      !this.filingBranch ||
      !this.authorizedOfficerName ||
      !this.authorizedOfficerDesignation ||
      !this.authorizedOfficerContact ||
      !this.authorizedOfficerEmail
    ) {
      console.error('Please fill all required fields');
      return;
    }

    // Save logic here
    console.log('Saving applicant details:', {
      applicantName: this.applicantName,
      filingBranch: this.filingBranch,
      branchCode: this.branchCode,
      authorizedOfficerName: this.authorizedOfficerName,
      authorizedOfficerDesignation: this.authorizedOfficerDesignation,
      authorizedOfficerContact: this.authorizedOfficerContact,
      authorizedOfficerEmail: this.authorizedOfficerEmail,
    });
  }
}
