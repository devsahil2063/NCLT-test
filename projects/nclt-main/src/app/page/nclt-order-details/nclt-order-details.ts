import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nclt-order-details',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    DividerModule,
    RadioButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './nclt-order-details.html',
  styleUrl: './nclt-order-details.scss',
})
export class NcltOrderDetails {
  applicationStatus: string = '';
  admissionDecision: string = '';
  orderDate: Date | null = null;
  orderNumber: string = '';
  insolvencyCommencementDate: Date | null = null;
  orderCopyFile: File | null = null;
  orderCopyFileName: string = '';
  rejectionReason: string = '';

  applicationStatusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Under Review', value: 'under-review' },
    { label: 'Admitted', value: 'admitted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Withdrawn', value: 'withdrawn' },
  ];

  constructor(private messageService: MessageService) { }

  onOrderCopySelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file size (10MB max)
      if (file.size > 10485760) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size exceeds maximum of 10MB',
        });
        return;
      }

      // Validate file type
      const validTypes = ['application/pdf'];
      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please upload a PDF file',
        });
        return;
      }

      this.orderCopyFile = file;
      this.orderCopyFileName = file.name;

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order copy uploaded successfully',
      });
    }
  }

  removeOrderCopy(): void {
    this.orderCopyFile = null;
    this.orderCopyFileName = '';
  }

  onCancel(): void {
    // Reset form
    this.applicationStatus = '';
    this.admissionDecision = '';
    this.orderDate = null;
    this.orderNumber = '';
    this.insolvencyCommencementDate = null;
    this.orderCopyFile = null;
    this.orderCopyFileName = '';
    this.rejectionReason = '';
  }

  getRejectionReasonCharacterCount(): number {
    return this.rejectionReason.length;
  }

  onSave(): void {
    // Validate required fields
    if (!this.applicationStatus || !this.admissionDecision) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
      });
      return;
    }

    if (this.admissionDecision === 'admitted' && !this.insolvencyCommencementDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Insolvency Commencement Date is required for admitted applications',
      });
      return;
    }

    // Save logic here
    console.log('Saving NCLT order details:', {
      applicationStatus: this.applicationStatus,
      admissionDecision: this.admissionDecision,
      orderDate: this.orderDate,
      orderNumber: this.orderNumber,
      insolvencyCommencementDate: this.insolvencyCommencementDate,
      orderCopyFile: this.orderCopyFile,
      rejectionReason: this.rejectionReason,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'NCLT order details saved successfully',
    });
  }
}
