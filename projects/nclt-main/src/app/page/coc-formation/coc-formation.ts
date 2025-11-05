import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-coc-formation',
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './coc-formation.html',
  styleUrl: './coc-formation.scss',
})
export class CocFormation {
  cocFormationDate: Date | null = null;
  firstCocMeetingDate: Date | null = null;

  constructor(private messageService: MessageService) { }

  isFormValid(): boolean {
    return !!this.cocFormationDate;
  }

  onCancel(): void {
    this.cocFormationDate = null;
    this.firstCocMeetingDate = null;
  }

  onSave(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill CoC Formation Date',
      });
      return;
    }

    // Save logic here
    console.log('Saving CoC formation details:', {
      cocFormationDate: this.cocFormationDate,
      firstCocMeetingDate: this.firstCocMeetingDate,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'CoC details saved successfully',
    });
  }
}
