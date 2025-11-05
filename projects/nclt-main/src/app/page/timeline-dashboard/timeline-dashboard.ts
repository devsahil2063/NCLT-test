import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface KeyDeadline {
  name: string;
  date: string;
}

@Component({
  selector: 'app-timeline-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './timeline-dashboard.html',
  styleUrl: './timeline-dashboard.scss',
})
export class TimelineDashboard {
  daysSinceICD: number = 45;
  daysRemaining: number = 135;
  extensionApplied: boolean | null = null;
  extendedDeadline: Date | null = null;
  maximumDeadline: Date | null = null;

  keyDeadlines: KeyDeadline[] = [
    { name: 'Claims Submission Deadline', date: '15 Feb 2025 (ICD + 30)' },
    { name: 'CoC Formation Deadline', date: '15 Feb 2025 (ICD + 30)' },
    { name: 'Resolution Plan Deadline', date: '03 Jul 2025 (ICD + 180)' },
  ];

  constructor(private messageService: MessageService) { }

  onReset(): void {
    this.extensionApplied = null;
    this.extendedDeadline = null;
    this.maximumDeadline = null;
  }

  onUpdate(): void {
    console.log('Updating timeline:', {
      extensionApplied: this.extensionApplied,
      extendedDeadline: this.extendedDeadline,
      maximumDeadline: this.maximumDeadline,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Timeline updated successfully',
    });
  }
}
