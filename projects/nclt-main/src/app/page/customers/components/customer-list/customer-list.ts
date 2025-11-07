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
import { Router } from '@angular/router';

interface Customer {
  customerId: string;
  customerName: string;
  totalOYS: number;
  dateOfNPA: string;
  panNumber: string;
}
@Component({
  selector: 'app-customer-list',
  imports: [CommonModule,
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
    DatePicker],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList {
  constructor(private router: Router) { }

  customers: Customer[] = [];
  totalRecords: number = 150;
  rows: number = 10;
  first: number = 0;

  // Filter values
  minAmount: number | undefined;
  maxAmount: number | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;

  ngOnInit() {
    this.customers = [
      {
        customerId: '123456',
        customerName: 'Anita Mishra',
        totalOYS: 500000,
        dateOfNPA: '2023-06-01',
        panNumber: 'ABEPM1234L',
      },
      {
        customerId: '234567',
        customerName: 'Rajesh Kumar',
        totalOYS: 750000,
        dateOfNPA: '2023-03-15',
        panNumber: 'ACFPK5678M',
      },
      {
        customerId: '345678',
        customerName: 'Priya Singh',
        totalOYS: 1200000,
        dateOfNPA: '2023-01-20',
        panNumber: 'ADGPS9012N',
      },
      {
        customerId: '456789',
        customerName: 'Vikram Malhotra',
        totalOYS: 650000,
        dateOfNPA: '2023-06-10',
        panNumber: 'AEHVM3456O',
      },
      {
        customerId: '567890',
        customerName: 'Neha Sharma',
        totalOYS: 890000,
        dateOfNPA: '2023-02-28',
        panNumber: 'AFINS7890P',
      },
      {
        customerId: '678901',
        customerName: 'Amit Patel',
        totalOYS: 425000,
        dateOfNPA: '2023-04-12',
        panNumber: 'AGJAP1234Q',
      },
      {
        customerId: '789012',
        customerName: 'Kavita Desai',
        totalOYS: 980000,
        dateOfNPA: '2023-07-05',
        panNumber: 'AHIKD5678R',
      },
      {
        customerId: '890123',
        customerName: 'Suresh Reddy',
        totalOYS: 1100000,
        dateOfNPA: '2023-08-18',
        panNumber: 'AILSR9012S',
      },
      {
        customerId: '901234',
        customerName: 'Meera Joshi',
        totalOYS: 540000,
        dateOfNPA: '2023-05-25',
        panNumber: 'AJMMI3456T',
      },
      {
        customerId: '012345',
        customerName: 'Karan Verma',
        totalOYS: 820000,
        dateOfNPA: '2023-09-02',
        panNumber: 'AKNKV7890U',
      },
    ];
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
    // Apply filter logic here
    console.log('Applying Total O/S filter:', this.minAmount, this.maxAmount);
  }

  clearDateNPAFilter() {
    this.fromDate = undefined;
    this.toDate = undefined;
  }

  applyDateNPAFilter() {
    // Apply filter logic here
    console.log('Applying Date NPA filter:', this.fromDate, this.toDate);
  }

  navigateToCustomer(customer: any): void {
    this.router.navigate(['/customers/basic-details']);
  }
}
