import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-functioning-unit-status',
  imports: [CommonModule, FormsModule, Select, DatePicker, Button, Card, Divider, Textarea],
  templateUrl: './functioning-unit-status.html',
  styleUrl: './functioning-unit-status.scss',
})
export class FunctioningUnitStatus {
  status: string = '';
  notRunningSince: Date | null = null;
  remarks: string = '';

  statusOptions = [
    { label: 'Running', value: 'Running' },
    { label: 'Not Running', value: 'Not Running' },
    { label: 'Partial Running', value: 'Partial Running' },
    { label: 'Others', value: 'Others' },
  ];

  onReset() {
    this.status = '';
    this.notRunningSince = null;
    this.remarks = '';
  }

  onSave() {
    console.log('Saving functioning unit status:', {
      status: this.status,
      notRunningSince: this.notRunningSince,
      remarks: this.remarks,
    });
  }
}
