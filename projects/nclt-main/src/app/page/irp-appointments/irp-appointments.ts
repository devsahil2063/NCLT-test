import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Card } from 'primeng/card';


@Component({
  selector: 'app-irp-appointments',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    ToastModule,
    Card
  ],
  providers: [MessageService],
  templateUrl: './irp-appointments.html',
  styleUrl: './irp-appointments.scss',
})
export class IrpAppointments {
  irpName: string = '';
  ibbiRegistrationNumber: string = '';
  irpContactNumber: string = '';
  irpEmail: string = '';
  irpAppointmentDate: Date | null = null;

  constructor(private messageService: MessageService) { }

  isFormValid(): boolean {
    return !!(
      this.irpName &&
      this.irpContactNumber &&
      this.irpEmail &&
      this.irpAppointmentDate
    );
  }

  onCancel(): void {
    this.irpName = '';
    this.ibbiRegistrationNumber = '';
    this.irpContactNumber = '';
    this.irpEmail = '';
    this.irpAppointmentDate = null;
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
    console.log('Saving IRP appointment details:', {
      irpName: this.irpName,
      ibbiRegistrationNumber: this.ibbiRegistrationNumber,
      irpContactNumber: this.irpContactNumber,
      irpEmail: this.irpEmail,
      irpAppointmentDate: this.irpAppointmentDate,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'IRP appointment details saved successfully',
    });
  }
}
