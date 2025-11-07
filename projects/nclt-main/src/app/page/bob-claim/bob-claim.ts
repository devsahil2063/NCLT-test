import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-bob-claim',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule,
    Card
  ],
  providers: [MessageService],
  templateUrl: './bob-claim.html',
  styleUrl: './bob-claim.scss',
})
export class BobClaim {
  claimAmount: number | null = null;
  admittedAmount: number | null = null;
  votingShare: string = 'Auto-calculated';
  isSecured: boolean | null = null;
  representativeName: string = '';
  representativeContact: string = '';

  constructor(private messageService: MessageService) { }

  isFormValid(): boolean {
    return !!(
      this.claimAmount &&
      this.admittedAmount &&
      this.isSecured !== null &&
      this.representativeName &&
      this.representativeContact
    );
  }

  onCancel(): void {
    this.claimAmount = null;
    this.admittedAmount = null;
    this.votingShare = 'Auto-calculated';
    this.isSecured = null;
    this.representativeName = '';
    this.representativeContact = '';
  }

  onSave(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    // Save logic here
    console.log('Saving claim details:', {
      claimAmount: this.claimAmount,
      admittedAmount: this.admittedAmount,
      votingShare: this.votingShare,
      isSecured: this.isSecured,
      representativeName: this.representativeName,
      representativeContact: this.representativeContact,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Claim details saved successfully',
    });
  }
}
