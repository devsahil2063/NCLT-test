import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-moratorium',
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './moratorium.html',
  styleUrl: './moratorium.scss',
})
export class Moratorium {
  moratoriumIssued: boolean | null = null;
  moratoriumStartDate: Date | null = null;
  initialCIRPDeadline: Date | null = null;

  constructor(private messageService: MessageService) { }

  selectMoratoriumOption(value: boolean): void {
    this.moratoriumIssued = value;
  }

  isFormValid(): boolean {
    return this.moratoriumIssued !== null;
  }

  onCancel(): void {
    this.moratoriumIssued = null;
    this.moratoriumStartDate = null;
    this.initialCIRPDeadline = null;
  }

  onSave(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select if moratorium is issued',
      });
      return;
    }

    // Save logic here
    console.log('Saving moratorium details:', {
      moratoriumIssued: this.moratoriumIssued,
      moratoriumStartDate: this.moratoriumStartDate,
      initialCIRPDeadline: this.initialCIRPDeadline,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Moratorium details saved successfully',
    });
  }
}
