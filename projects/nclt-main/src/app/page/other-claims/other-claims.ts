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
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';

interface OtherClaim {
  srNo: number;
  claimType: string;
  admittedAmount: number;
  sharePercentage: number;
}

@Component({
  selector: 'app-other-claims',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    Card,
    Divider
  ],
  providers: [MessageService],
  templateUrl: './other-claims.html',
  styleUrl: './other-claims.scss',
})
export class OtherClaims {
  claims: OtherClaim[] = [
    {
      srNo: 1,
      claimType: 'Workmen Dues',
      admittedAmount: 1200000,
      sharePercentage: 100,
    },
  ];

  showDialog: boolean = false;
  editMode: boolean = false;
  selectedClaim: OtherClaim | null = null;

  // Form data
  formData = {
    claimType: '',
    admittedAmount: null as number | null,
  };

  constructor(private messageService: MessageService) { }

  openAddDialog(): void {
    this.editMode = false;
    this.selectedClaim = null;
    this.resetForm();
    this.showDialog = true;
  }

  openEditDialog(claim: OtherClaim): void {
    this.editMode = true;
    this.selectedClaim = claim;
    this.formData = {
      claimType: claim.claimType,
      admittedAmount: claim.admittedAmount,
    };
    this.showDialog = true;
  }

  deleteClaim(claim: OtherClaim): void {
    this.claims = this.claims.filter((c) => c.srNo !== claim.srNo);
    this.recalculateShares();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Other claim deleted successfully',
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      claimType: '',
      admittedAmount: null,
    };
  }

  isFormValid(): boolean {
    return !!(this.formData.claimType && this.formData.admittedAmount);
  }

  saveClaim(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    if (this.editMode && this.selectedClaim) {
      // Update existing claim
      this.selectedClaim.claimType = this.formData.claimType;
      this.selectedClaim.admittedAmount = this.formData.admittedAmount!;
      // Recalculate share percentage
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Other claim updated successfully',
      });
    } else {
      // Add new claim
      const newClaim: OtherClaim = {
        srNo: this.claims.length + 1,
        claimType: this.formData.claimType,
        admittedAmount: this.formData.admittedAmount!,
        sharePercentage: 0,
      };
      this.claims.push(newClaim);
      this.recalculateShares();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Other claim added successfully',
      });
    }

    this.closeDialog();
  }

  recalculateShares(): void {
    const totalAdmitted = this.claims.reduce(
      (sum, c) => sum + c.admittedAmount,
      0
    );
    this.claims.forEach((c) => {
      c.sharePercentage =
        totalAdmitted > 0 ? (c.admittedAmount / totalAdmitted) * 100 : 0;
    });
  }
}
