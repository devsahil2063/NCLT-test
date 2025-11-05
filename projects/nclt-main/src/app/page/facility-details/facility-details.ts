import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { Select } from 'primeng/select';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';

interface Facility {
  accountId: string;
  facilityType: string;
  branchCode: string;
  originalSanctionAmount: number;
  isLimitBased: boolean;
}

interface NewFacility {
  facilityType: string;
  accountId: string;
  branchCode: string;
  productName: string;
  sector: string;
  activity: string;
  scheme: string;
  glCode: string;
  interestType: string;
  rateOfInterest: number | null;
  originalSanctionAuthority: string;
  originalSanctionAuthorityLevel: string;
  originalSanctionDate: Date | null;
  originalSanctionAmount: number | null;
  sanctionRefNo: string;
  lastSanctionAuthority: string;
  lastSanctionAuthorityLevel: string;
  lastSanctionDate: Date | null;
  lastSanctionedAmount: number | null;
  lastSanctionRefNo: string;
  disbursementDate: Date | null;
  acknowledgementOfDebtDate: Date | null;
  provisionAmount: number | null;
  twoAmount: number | null;
  dateOfTWO: Date | null;
  claimDate: Date | null;
  claimEligibleAmount: number | null;
  claimReceived: number | null;
  claimReceivedDate: Date | null;
  claimRejectedReason: string;
  cgtmseClaimDate: Date | null;
  cgtmseCoverAmountClaimed: number | null;
  cgtmseClaimAmountReceived: number | null;
  cgtmseClaimReceivedDate: Date | null;
  cgtmseClaimRejectedReason: string;
  lastCreditDate: Date | null;
  lastCreditAmount: number | null;
  ledgerBalance: number | null;
  balanceOutstandingAfterRecovery: number | null;
  principalLedgerBalance: number | null;
  unappliedInterest: number | null;
  legalExpenses: number | null;
  total: number | null;
  others: string;
}

@Component({
  selector: 'app-facility-details',
  imports: [
    CommonModule,
    FormsModule,
    Button,
    IconField,
    InputIcon,
    InputText,
    TableModule,
    Paginator,
    Select,
    Dialog,
    Divider,
    DatePicker,
    Textarea,
  ],
  templateUrl: './facility-details.html',
  styleUrl: './facility-details.scss',
})
export class FacilityDetails {
  facilities: Facility[] = [
    {
      accountId: 'ACC001234',
      facilityType: 'Term Loan',
      branchCode: 'BR001',
      originalSanctionAmount: 1500000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC002345',
      facilityType: 'Cash Credit',
      branchCode: 'BR002',
      originalSanctionAmount: 500000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC003456',
      facilityType: 'Bank Guarantee',
      branchCode: 'BR001',
      originalSanctionAmount: 200000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC004567',
      facilityType: 'Term Loan',
      branchCode: 'BR003',
      originalSanctionAmount: 2500000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC005678',
      facilityType: 'Overdraft',
      branchCode: 'BR002',
      originalSanctionAmount: 750000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC006789',
      facilityType: 'Letter of Credit',
      branchCode: 'BR004',
      originalSanctionAmount: 1200000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC007890',
      facilityType: 'Term Loan',
      branchCode: 'BR001',
      originalSanctionAmount: 3000000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC008901',
      facilityType: 'Cash Credit',
      branchCode: 'BR003',
      originalSanctionAmount: 800000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC009012',
      facilityType: 'Bank Guarantee',
      branchCode: 'BR002',
      originalSanctionAmount: 450000,
      isLimitBased: true,
    },
    {
      accountId: 'ACC010123',
      facilityType: 'Overdraft',
      branchCode: 'BR004',
      originalSanctionAmount: 600000,
      isLimitBased: true,
    },
  ];

  facilityTypeOptions = [
    { label: 'All', value: null },
    { label: 'Term Loan', value: 'Term Loan' },
    { label: 'Cash Credit', value: 'Cash Credit' },
    { label: 'Bank Guarantee', value: 'Bank Guarantee' },
    { label: 'Overdraft', value: 'Overdraft' },
    { label: 'Letter of Credit', value: 'Letter of Credit' },
  ];

  branchCodeOptions = [
    { label: 'All Branches', value: null },
    { label: 'BR001', value: 'BR001' },
    { label: 'BR002', value: 'BR002' },
    { label: 'BR003', value: 'BR003' },
    { label: 'BR004', value: 'BR004' },
  ];

  selectedFacilityType: string | null = null;
  selectedBranchCode: string | null = null;

  // Pagination
  first = 0;
  rows = 10;
  totalRecords = 10;

  // Dialog
  dialogVisible = false;
  isReadOnly = false;
  newFacility: NewFacility = this.getEmptyFacility();

  get filteredFacilities(): Facility[] {
    return this.facilities.filter((facility) => {
      const matchesFacilityType =
        !this.selectedFacilityType ||
        facility.facilityType === this.selectedFacilityType;
      const matchesBranchCode =
        !this.selectedBranchCode ||
        facility.branchCode === this.selectedBranchCode;
      return matchesFacilityType && matchesBranchCode;
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showDialog() {
    this.isReadOnly = false;
    this.dialogVisible = true;
    this.newFacility = this.getEmptyFacility();
  }

  viewFacility(facility: Facility) {
    this.isReadOnly = true;
    this.dialogVisible = true;
    // Populate the form with facility data
    this.newFacility = {
      facilityType: facility.facilityType,
      accountId: facility.accountId,
      branchCode: facility.branchCode,
      productName: 'Sample Product',
      sector: 'Manufacturing',
      activity: 'Production',
      scheme: 'Standard',
      glCode: 'GL001',
      interestType: 'Fixed',
      rateOfInterest: 8.5,
      originalSanctionAuthority: 'Branch Manager',
      originalSanctionAuthorityLevel: 'Level 3',
      originalSanctionDate: new Date('2023-01-15'),
      originalSanctionAmount: facility.originalSanctionAmount,
      sanctionRefNo: 'SAN/2023/001',
      lastSanctionAuthority: 'Regional Manager',
      lastSanctionAuthorityLevel: 'Level 4',
      lastSanctionDate: new Date('2024-06-20'),
      lastSanctionedAmount: facility.originalSanctionAmount,
      lastSanctionRefNo: 'SAN/2024/045',
      disbursementDate: new Date('2023-02-01'),
      acknowledgementOfDebtDate: new Date('2023-02-05'),
      provisionAmount: 50000,
      twoAmount: 0,
      dateOfTWO: null,
      claimDate: null,
      claimEligibleAmount: null,
      claimReceived: null,
      claimReceivedDate: null,
      claimRejectedReason: '',
      cgtmseClaimDate: null,
      cgtmseCoverAmountClaimed: null,
      cgtmseClaimAmountReceived: null,
      cgtmseClaimReceivedDate: null,
      cgtmseClaimRejectedReason: '',
      lastCreditDate: new Date('2024-10-15'),
      lastCreditAmount: 25000,
      ledgerBalance: facility.originalSanctionAmount * 0.8,
      balanceOutstandingAfterRecovery: facility.originalSanctionAmount * 0.75,
      principalLedgerBalance: facility.originalSanctionAmount * 0.7,
      unappliedInterest: 15000,
      legalExpenses: 5000,
      total: facility.originalSanctionAmount * 0.8 + 15000 + 5000,
      others: 'This is a sample facility record from ILMS system.',
    };
  }

  addFacility() {
    // Add the new facility to the list
    const facility: Facility = {
      accountId: this.newFacility.accountId,
      facilityType: this.newFacility.facilityType,
      branchCode: this.newFacility.branchCode,
      originalSanctionAmount: this.newFacility.originalSanctionAmount || 0,
      isLimitBased: true,
    };

    this.facilities.push(facility);
    this.dialogVisible = false;
    this.newFacility = this.getEmptyFacility();
  }

  private getEmptyFacility(): NewFacility {
    return {
      facilityType: '',
      accountId: '',
      branchCode: '',
      productName: '',
      sector: '',
      activity: '',
      scheme: '',
      glCode: '',
      interestType: '',
      rateOfInterest: null,
      originalSanctionAuthority: '',
      originalSanctionAuthorityLevel: '',
      originalSanctionDate: null,
      originalSanctionAmount: null,
      sanctionRefNo: '',
      lastSanctionAuthority: '',
      lastSanctionAuthorityLevel: '',
      lastSanctionDate: null,
      lastSanctionedAmount: null,
      lastSanctionRefNo: '',
      disbursementDate: null,
      acknowledgementOfDebtDate: null,
      provisionAmount: null,
      twoAmount: null,
      dateOfTWO: null,
      claimDate: null,
      claimEligibleAmount: null,
      claimReceived: null,
      claimReceivedDate: null,
      claimRejectedReason: '',
      cgtmseClaimDate: null,
      cgtmseCoverAmountClaimed: null,
      cgtmseClaimAmountReceived: null,
      cgtmseClaimReceivedDate: null,
      cgtmseClaimRejectedReason: '',
      lastCreditDate: null,
      lastCreditAmount: null,
      ledgerBalance: null,
      balanceOutstandingAfterRecovery: null,
      principalLedgerBalance: null,
      unappliedInterest: null,
      legalExpenses: null,
      total: null,
      others: '',
    };
  }
}
