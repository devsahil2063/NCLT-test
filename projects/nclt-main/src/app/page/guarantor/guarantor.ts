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

interface GuarantorData {
  name: string;
  type: string;
  netWorth: {
    lastAccepted: string;
    dateOfLastAccepted: string;
    sourceOfLastAccepted: string;
    present: string;
    dateOfPresent: string;
    sourceOfPresent: string;
  };
}

@Component({
  selector: 'app-guarantor',
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
  ],
  templateUrl: './guarantor.html',
  styleUrl: './guarantor.scss',
})
export class Guarantor implements OnInit {
  guarantors: GuarantorData[] = [];

  ngOnInit() {
    this.guarantors = [
      {
        name: 'Rajesh Kumar',
        type: 'Personal Guarantee',
        netWorth: {
          lastAccepted: '₹2.5 Cr',
          dateOfLastAccepted: 'Mar 2023',
          sourceOfLastAccepted: 'Financial Statement',
          present: '₹2.2 Cr',
          dateOfPresent: 'Dec 2023',
          sourceOfPresent: 'Bank Valuation',
        },
      },
      {
        name: 'ABC Industries Ltd',
        type: 'Corporate Guarantee',
        netWorth: {
          lastAccepted: '₹15.8 Cr',
          dateOfLastAccepted: 'Mar 2023',
          sourceOfLastAccepted: 'Audited Financials',
          present: '₹14.2 Cr',
          dateOfPresent: 'Dec 2023',
          sourceOfPresent: 'Internal Assessment',
        },
      },
      {
        name: 'State Bank of India',
        type: 'Bank Guarantee',
        netWorth: {
          lastAccepted: '₹5.0 Cr',
          dateOfLastAccepted: 'Jan 2024',
          sourceOfLastAccepted: 'Bank Certificate',
          present: '₹5.0 Cr',
          dateOfPresent: 'Jan 2024',
          sourceOfPresent: 'Bank Certificate',
        },
      },
    ];
  }

  clearTypeFilter() {
    console.log('Clearing type filter');
  }

  applyTypeFilter() {
    console.log('Applying type filter');
  }


  viewGuarantor(guarantor: GuarantorData) {
    console.log('View guarantor', guarantor);
  }

  editGuarantor(guarantor: GuarantorData) {
    console.log('Edit guarantor', guarantor);
  }

  deleteGuarantor(guarantor: GuarantorData) {
    console.log('Delete guarantor', guarantor);
  }
}
