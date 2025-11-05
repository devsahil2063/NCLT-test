import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-expression-interest',
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './expression-interest.html',
  styleUrl: './expression-interest.scss',
})
export class ExpressionInterest {
  dateOfPublication: Date | null = null;
  republication: string | null = null;
  eoiSubmissionDeadline: Date | null = null;
  totalEOIsReceived: number | null = null;

  republicationOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  constructor(private messageService: MessageService) { }

  isFormValid(): boolean {
    return !!(
      this.dateOfPublication &&
      this.republication &&
      this.eoiSubmissionDeadline
    );
  }

  onCancel(): void {
    this.dateOfPublication = null;
    this.republication = null;
    this.eoiSubmissionDeadline = null;
    this.totalEOIsReceived = null;
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
    console.log('Saving EOI details:', {
      dateOfPublication: this.dateOfPublication,
      republication: this.republication,
      eoiSubmissionDeadline: this.eoiSubmissionDeadline,
      totalEOIsReceived: this.totalEOIsReceived,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'EOI details saved successfully',
    });
  }
}
