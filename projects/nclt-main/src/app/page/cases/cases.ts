import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePicker } from 'primeng/datepicker';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

interface Case {
  caseId: string;
  customerId: string;
  customerName: string;
  totalOYS: number;
  dateOfNPA: string;
  panNumber: string;
  status: string;
}

@Component({
  selector: 'app-cases',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    InputIcon,
    IconField,
    Popover,
    ButtonModule,
    InputGroup,
    InputGroupAddonModule,
    DatePicker,
    Menu,
  ],
  templateUrl: './cases.html',
  styleUrl: './cases.scss',
})
export class Cases implements OnInit {
  allCases: Case[] = [];
  cases: Case[] = [];
  totalRecords: number = 200;
  rows: number = 10;
  first: number = 0;

  // Filter values
  minAmount: number | undefined;
  maxAmount: number | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;

  // Tabs
  private _activeTab: string = 'all';

  get activeTab(): string {
    return this._activeTab;
  }

  set activeTab(value: string) {
    this._activeTab = value;
    this.filterCasesByTab();
  }

  tabs = [
    { label: 'All', value: 'all' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Filed', value: 'filed' },
    { label: 'Admitted', value: 'admitted' },
  ];

  menuItems: MenuItem[] = [];
  selectedCase: Case | null = null;

  ngOnInit() {
    this.allCases = [
      {
        caseId: 'CASE001',
        customerId: '123456',
        customerName: 'Anita Mishra',
        totalOYS: 500000,
        dateOfNPA: '2023-05-01',
        panNumber: 'ABEPM1234L',
        status: 'Filed',
      },
      {
        caseId: 'CASE002',
        customerId: '234567',
        customerName: 'Rajesh Kumar',
        totalOYS: 750000,
        dateOfNPA: '2023-03-15',
        panNumber: 'ACFPK5678M',
        status: 'Admitted',
      },
      {
        caseId: 'CASE003',
        customerId: '345678',
        customerName: 'Priya Singh',
        totalOYS: 1200000,
        dateOfNPA: '2023-01-20',
        panNumber: 'ADGPS9012N',
        status: 'Resolution',
      },
      {
        caseId: 'CASE004',
        customerId: '456789',
        customerName: 'Vikram Malhotra',
        totalOYS: 650000,
        dateOfNPA: '2023-06-10',
        panNumber: 'AEHVM3456O',
        status: 'Filed',
      },
      {
        caseId: 'CASE005',
        customerId: '567890',
        customerName: 'Neha Sharma',
        totalOYS: 890000,
        dateOfNPA: '2023-02-28',
        panNumber: 'AFINS7890P',
        status: 'Admitted',
      },
      {
        caseId: 'CASE006',
        customerId: '678901',
        customerName: 'Amit Patel',
        totalOYS: 425000,
        dateOfNPA: '2023-04-12',
        panNumber: 'AGJAP1234Q',
        status: 'Filed',
      },
      {
        caseId: 'CASE007',
        customerId: '789012',
        customerName: 'Kavita Desai',
        totalOYS: 980000,
        dateOfNPA: '2023-07-05',
        panNumber: 'AHIKD5678R',
        status: 'Resolution',
      },
      {
        caseId: 'CASE008',
        customerId: '890123',
        customerName: 'Suresh Reddy',
        totalOYS: 1100000,
        dateOfNPA: '2023-08-18',
        panNumber: 'AILSR9012S',
        status: 'Filed',
      },
      {
        caseId: 'CASE009',
        customerId: '901234',
        customerName: 'Meera Joshi',
        totalOYS: 540000,
        dateOfNPA: '2023-05-25',
        panNumber: 'AJMMI3456T',
        status: 'Admitted',
      },
      {
        caseId: 'CASE010',
        customerId: '012345',
        customerName: 'Karan Verma',
        totalOYS: 820000,
        dateOfNPA: '2023-09-02',
        panNumber: 'AKNKV7890U',
        status: 'Filed',
      },
      {
        caseId: 'CASE011',
        customerId: '901234',
        customerName: 'Meera Joshi',
        totalOYS: 540000,
        dateOfNPA: '2023-05-25',
        panNumber: 'AJMMI3456T',
        status: 'Filed',
      },
    ];

    this.filterCasesByTab();
  }

  filterCasesByTab() {
    if (this.activeTab === 'all') {
      this.cases = [...this.allCases];
    } else if (this.activeTab === 'resolved') {
      this.cases = this.allCases.filter((c) => c.status.toLowerCase() === 'resolution');
    } else {
      this.cases = this.allCases.filter(
        (c) => c.status.toLowerCase() === this.activeTab.toLowerCase(),
      );
    }

    this.totalRecords = this.cases.length;
    this.first = 0; // Reset to first page when filtering
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  clearTotalOSFilter() {
    this.minAmount = undefined;
    this.maxAmount = undefined;
  }

  applyTotalOSFilter() {
    console.log('Applying Total O/S filter:', this.minAmount, this.maxAmount);
  }

  clearDateNPAFilter() {
    this.fromDate = undefined;
    this.toDate = undefined;
  }

  applyDateNPAFilter() {
    console.log('Applying Date NPA filter:', this.fromDate, this.toDate);
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    return `custom-status-badge status-${statusLower === 'filed' || statusLower === 'admitted' || statusLower === 'resolution' ? statusLower : 'default'}`;
  }

  getMenuItems(caseData: Case): MenuItem[] {
    return [
      {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => this.viewCase(caseData),
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editCase(caseData),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteCase(caseData),
        styleClass: 'text-red-500!',
      },
    ];
  }

  viewCase(caseData: Case) {
    console.log('View case', caseData);
  }

  editCase(caseData: Case) {
    console.log('Edit case', caseData);
  }

  deleteCase(caseData: Case) {
    console.log('Delete case', caseData);
  }
}
