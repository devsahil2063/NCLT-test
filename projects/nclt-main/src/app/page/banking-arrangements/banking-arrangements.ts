import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

interface BankingArrangement {
  id: string;
  arrangementType: string;
  sanctionAuthority: string;
  runningStatus: string;
  sanctionDate: string;
}

@Component({
  selector: 'app-banking-arrangements',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIcon,
    IconField,
    Popover,
    ButtonModule,
    Menu,
    Dialog,
    Select,
    DatePicker,
  ],
  templateUrl: './banking-arrangements.html',
  styleUrl: './banking-arrangements.scss',
})
export class BankingArrangements implements OnInit {
  bankingArrangements: BankingArrangement[] = [];
  dialogVisible: boolean = false;

  // Form fields
  selectedArrangementType: string | undefined;
  sanctionAuthority: string = '';
  selectedRunningStatus: string | undefined;
  sanctionDate: Date | undefined;

  // Dropdown options
  arrangementTypes = [
    { label: 'Term Loan', value: 'Term Loan' },
    { label: 'Working Capital', value: 'Working Capital' },
    { label: 'Cash Credit', value: 'Cash Credit' },
    { label: 'Overdraft', value: 'Overdraft' },
  ];

  runningStatuses = [
    { label: 'Active', value: 'Active' },
    { label: 'NPA', value: 'NPA' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Written Off', value: 'Written Off' },
  ];

  ngOnInit() {
    this.bankingArrangements = [
      {
        id: 'BA001',
        arrangementType: 'Term Loan',
        sanctionAuthority: 'RBI',
        runningStatus: 'Active',
        sanctionDate: '2020-01-15',
      },
      {
        id: 'BA002',
        arrangementType: 'Cash Credit',
        sanctionAuthority: 'Branch Manager',
        runningStatus: 'NPA',
        sanctionDate: '2021-03-20',
      },
      {
        id: 'BA003',
        arrangementType: 'Overdraft',
        sanctionAuthority: 'Regional Manager',
        runningStatus: 'Active',
        sanctionDate: '2022-05-10',
      },
      {
        id: 'BA004',
        arrangementType: 'Term Loan',
        sanctionAuthority: 'Head Office',
        runningStatus: 'Active',
        sanctionDate: '2021-08-25',
      },
      {
        id: 'BA005',
        arrangementType: 'Cash Credit',
        sanctionAuthority: 'RBI',
        runningStatus: 'NPA',
        sanctionDate: '2020-11-30',
      },
    ];
  }

  clearTypeFilter() {
    console.log('Clearing type filter');
  }

  applyTypeFilter() {
    console.log('Applying type filter');
  }

  clearStatusFilter() {
    console.log('Clearing status filter');
  }

  applyStatusFilter() {
    console.log('Applying status filter');
  }

  getMenuItems(arrangement: BankingArrangement): MenuItem[] {
    return [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => this.viewArrangement(arrangement),
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editArrangement(arrangement),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteArrangement(arrangement),
        styleClass: 'text-red-500!',
      },
    ];
  }

  viewArrangement(arrangement: BankingArrangement) {
    console.log('View arrangement', arrangement);
  }

  editArrangement(arrangement: BankingArrangement) {
    console.log('Edit arrangement', arrangement);
  }

  deleteArrangement(arrangement: BankingArrangement) {
    console.log('Delete arrangement', arrangement);
  }

  showDialog() {
    this.dialogVisible = true;
  }
}
