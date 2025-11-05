import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';

interface SARFAESIData {
  srNo: number;
  detailedAddress: string;
  ownerName: string;
  relationType: string;
  demandNoticeDate: string;
  possessionNoticeDate: string;
  possessionType: string;
  dmOrderStatus: string;
  auctionDetails: {
    date: string;
    reservePrice: string;
  };
  currentStatus: string;
}

@Component({
  selector: 'app-sarfaesi-details',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIcon,
    IconField,
    Popover,
    ButtonModule,
  ],
  templateUrl: './sarfaesi-details.html',
  styleUrl: './sarfaesi-details.scss',
})
export class SARFAESIDetails implements OnInit {
  sarfaesiData: SARFAESIData[] = [];

  ngOnInit() {
    this.sarfaesiData = [
      {
        srNo: 1,
        detailedAddress: 'Plot No. 45, Industrial Area, Sector 8, Mumbai - 440034',
        ownerName: 'Manufacturing Ltd',
        relationType: 'Primary Borrower',
        demandNoticeDate: '2024-01-15',
        possessionNoticeDate: '2024-02-28',
        possessionType: 'Symbolic',
        dmOrderStatus: 'Pending',
        auctionDetails: {
          date: '2024-04-19',
          reservePrice: '12.5 Cr',
        },
        currentStatus: 'Notice Period Active',
      },
      {
        srNo: 2,
        detailedAddress: 'Warehouse Complex, Plot 12-A, MIDC Area, Pune - 411034',
        ownerName: 'Mahesh Kumar',
        relationType: 'Personal Guarantor',
        demandNoticeDate: '2024-01-20',
        possessionNoticeDate: '2024-03-05',
        possessionType: 'Physical',
        dmOrderStatus: 'Approved',
        auctionDetails: {
          date: '2024-04-22',
          reservePrice: '8.2 Cr',
        },
        currentStatus: 'Possession Taken',
      },
    ];
  }

  clearStatusFilter() {
    console.log('Clearing status filter');
  }

  applyStatusFilter() {
    console.log('Applying status filter');
  }

  clearDateRangeFilter() {
    console.log('Clearing date range filter');
  }

  applyDateRangeFilter() {
    console.log('Applying date range filter');
  }
}
