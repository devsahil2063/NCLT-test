import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface FinancialCreditor {
  srNo: number;
  name: string;
  claimAmount: number;
  admittedAmount: number;
  sharePercentage: number;
  isSecured: boolean;
}

@Component({
  selector: 'app-financial-creditors',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    Button,
    Dialog,
    InputTextModule,
    InputNumber,
    Select,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './financial-creditors.html',
  styleUrl: './financial-creditors.scss',
})
export class FinancialCreditors {
  creditors: FinancialCreditor[] = [
    {
      srNo: 1,
      name: 'Bank of Baroda',
      claimAmount: 25000000,
      admittedAmount: 24500000,
      sharePercentage: 45.37,
      isSecured: true,
    },
    {
      srNo: 2,
      name: 'State Bank of India',
      claimAmount: 18000000,
      admittedAmount: 17500000,
      sharePercentage: 32.41,
      isSecured: true,
    },
  ];

  showDialog: boolean = false;
  editMode: boolean = false;
  selectedCreditor: FinancialCreditor | null = null;

  // Security options for dropdown
  securityOptions = [
    { label: 'Secured', value: true },
    { label: 'Unsecured', value: false },
  ];

  // Form data
  formData = {
    name: '',
    claimAmount: null as number | null,
    admittedAmount: null as number | null,
    isSecured: null as boolean | null,
  };

  constructor(private messageService: MessageService) {}

  openAddDialog(): void {
    this.editMode = false;
    this.selectedCreditor = null;
    this.resetForm();
    this.showDialog = true;
  }

  openEditDialog(creditor: FinancialCreditor): void {
    this.editMode = true;
    this.selectedCreditor = creditor;
    this.formData = {
      name: creditor.name,
      claimAmount: creditor.claimAmount,
      admittedAmount: creditor.admittedAmount,
      isSecured: creditor.isSecured,
    };
    this.showDialog = true;
  }

  deleteCreditor(creditor: FinancialCreditor): void {
    this.creditors = this.creditors.filter((c) => c.srNo !== creditor.srNo);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Financial creditor deleted successfully',
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      claimAmount: null,
      admittedAmount: null,
      isSecured: null,
    };
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.claimAmount &&
      this.formData.admittedAmount &&
      this.formData.isSecured !== null
    );
  }

  saveCreditor(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    if (this.editMode && this.selectedCreditor) {
      // Update existing creditor
      this.selectedCreditor.name = this.formData.name;
      this.selectedCreditor.claimAmount = this.formData.claimAmount!;
      this.selectedCreditor.admittedAmount = this.formData.admittedAmount!;
      this.selectedCreditor.isSecured = this.formData.isSecured!;
      // Recalculate share percentage
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Financial creditor updated successfully',
      });
    } else {
      // Add new creditor
      const newCreditor: FinancialCreditor = {
        srNo: this.creditors.length + 1,
        name: this.formData.name,
        claimAmount: this.formData.claimAmount!,
        admittedAmount: this.formData.admittedAmount!,
        sharePercentage: 0,
        isSecured: this.formData.isSecured!,
      };
      this.creditors.push(newCreditor);
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Financial creditor added successfully',
      });
    }

    this.closeDialog();
  }

  recalculateShares(): void {
    const totalAdmitted = this.creditors.reduce((sum, c) => sum + c.admittedAmount, 0);
    this.creditors.forEach((c) => {
      c.sharePercentage = totalAdmitted > 0 ? (c.admittedAmount / totalAdmitted) * 100 : 0;
    });
  }

  getSecurityClass(isSecured: boolean): string {
    return isSecured ? 'security-badge-secured' : 'security-badge-unsecured';
  }
}
