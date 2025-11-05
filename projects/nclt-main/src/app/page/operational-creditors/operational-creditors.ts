import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface OperationalCreditor {
  srNo: number;
  name: string;
  admittedAmount: number;
  sharePercentage: number;
}

@Component({
  selector: 'app-operational-creditors',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './operational-creditors.html',
  styleUrl: './operational-creditors.scss',
})
export class OperationalCreditors {
  creditors: OperationalCreditor[] = [
    {
      srNo: 1,
      name: 'ABC Suppliers Ltd',
      admittedAmount: 4500000,
      sharePercentage: 52.94,
    },
    {
      srNo: 2,
      name: 'XYZ Services Pvt Ltd',
      admittedAmount: 4000000,
      sharePercentage: 47.06,
    },
  ];

  showDialog: boolean = false;
  editMode: boolean = false;
  selectedCreditor: OperationalCreditor | null = null;

  // Form data
  formData = {
    name: '',
    admittedAmount: null as number | null,
  };

  constructor(private messageService: MessageService) { }

  openAddDialog(): void {
    this.editMode = false;
    this.selectedCreditor = null;
    this.resetForm();
    this.showDialog = true;
  }

  openEditDialog(creditor: OperationalCreditor): void {
    this.editMode = true;
    this.selectedCreditor = creditor;
    this.formData = {
      name: creditor.name,
      admittedAmount: creditor.admittedAmount,
    };
    this.showDialog = true;
  }

  deleteCreditor(creditor: OperationalCreditor): void {
    this.creditors = this.creditors.filter((c) => c.srNo !== creditor.srNo);
    this.recalculateShares();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Operational creditor deleted successfully',
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      admittedAmount: null,
    };
  }

  isFormValid(): boolean {
    return !!(this.formData.name && this.formData.admittedAmount);
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
      this.selectedCreditor.admittedAmount = this.formData.admittedAmount!;
      // Recalculate share percentage
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Operational creditor updated successfully',
      });
    } else {
      // Add new creditor
      const newCreditor: OperationalCreditor = {
        srNo: this.creditors.length + 1,
        name: this.formData.name,
        admittedAmount: this.formData.admittedAmount!,
        sharePercentage: 0,
      };
      this.creditors.push(newCreditor);
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Operational creditor added successfully',
      });
    }

    this.closeDialog();
  }

  recalculateShares(): void {
    const totalAdmitted = this.creditors.reduce(
      (sum, c) => sum + c.admittedAmount,
      0
    );
    this.creditors.forEach((c) => {
      c.sharePercentage =
        totalAdmitted > 0 ? (c.admittedAmount / totalAdmitted) * 100 : 0;
    });
  }
}
