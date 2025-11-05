import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { DatePicker } from 'primeng/datepicker';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Security {
  accountId: string;
  badge?: string;
  securityId: string;
  securityNature: string;
  securityType: string;
  description: string;
  value?: number;
}

interface Valuation {
  id: string;
  amount: number;
  date: Date | null;
  valuerName: string;
}

interface NewSecurity {
  // Basic Information
  securityType: string;
  accountId: string;
  securityChargeType: string;
  valueAtTimeOfSanction: number | null;
  securityNature: string;
  typesOfAssets: string;
  valuationDateAtTimeOfSanction: Date | null;
  description: string;

  // Property & Registry Information
  eAuctionPropertyId: string;
  cersaiRegistryNo: string;
  cersaiRegistryDate: Date | null;
  modificationNo: string;
  modificationDate: Date | null;
  satisfactionNo: string;
  satisfactionDate: Date | null;
  bankSharePercent: number | null;
  reservePrice: number | null;
  actualSellingPrice: number | null;
}

@Component({
  selector: 'app-security-details',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIcon,
    IconField,
    Select,
    ButtonModule,
    Dialog,
    Divider,
    DatePicker,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './security-details.html',
  styleUrl: './security-details.scss',
})
export class SecurityDetails implements OnInit {
  allSecurities: Security[] = [];
  securities: Security[] = [];

  private _selectedNature: string | null = null;
  private _selectedType: string | null = null;
  private _selectedValue: string | null = null;

  // Dialog
  dialogVisible = false;
  activeTab = 'details';
  newSecurity: NewSecurity = this.getEmptySecurity();

  // Valuations
  valuations: Valuation[] = [];
  clonedValuations: { [s: string]: Valuation } = {};
  newValuation: Valuation = this.getEmptyValuation();

  // Options
  securityTypeOptions = [
    { label: 'Select Security Type', value: '' },
    { label: 'Property', value: 'Property' },
    { label: 'Vehicle', value: 'Vehicle' },
    { label: 'Shares', value: 'Shares' },
    { label: 'Land', value: 'Land' },
    { label: 'Fixed Deposit', value: 'Fixed Deposit' },
    { label: 'Machinery', value: 'Machinery' },
    { label: 'Bonds', value: 'Bonds' },
  ];

  chargeTypeOptions = [
    { label: 'Select Charge Type', value: '' },
    { label: 'Primary', value: 'Primary' },
    { label: 'Collateral', value: 'Collateral' },
    { label: 'Third Party', value: 'Third Party' },
  ];

  securityNatureOptions = [
    { label: 'Select Security Nature', value: '' },
    { label: 'Immovable', value: 'Immovable' },
    { label: 'Movable', value: 'Movable' },
    { label: 'Financial', value: 'Financial' },
  ];

  get selectedNature(): string | null {
    return this._selectedNature;
  }

  set selectedNature(value: string | null) {
    this._selectedNature = value;
    this.applyFilters();
  }

  get selectedType(): string | null {
    return this._selectedType;
  }

  set selectedType(value: string | null) {
    this._selectedType = value;
    this.applyFilters();
  }

  get selectedValue(): string | null {
    return this._selectedValue;
  }

  set selectedValue(value: string | null) {
    this._selectedValue = value;
    this.applyFilters();
  }

  natureOptions = [
    { label: 'All', value: null },
    { label: 'Immovable', value: 'Immovable' },
    { label: 'Movable', value: 'Movable' },
    { label: 'Financial', value: 'Financial' },
  ];

  typeOptions = [
    { label: 'All', value: null },
    { label: 'Property', value: 'Property' },
    { label: 'Vehicle', value: 'Vehicle' },
    { label: 'Shares', value: 'Shares' },
    { label: 'Land', value: 'Land' },
    { label: 'Fixed Deposit', value: 'Fixed Deposit' },
    { label: 'Machinery', value: 'Machinery' },
    { label: 'Bonds', value: 'Bonds' },
  ];

  valueOptions = [
    { label: 'All', value: null },
    { label: 'Below ₹2 Cr', value: 'below-2cr' },
    { label: '₹2-5 Cr', value: '2-5cr' },
    { label: '₹5-10 Cr', value: '5-10cr' },
    { label: 'Above ₹10 Cr', value: 'above-10cr' },
  ];

  ngOnInit() {
    this.allSecurities = [
      {
        accountId: 'ACC001234',
        badge: 'NCLT',
        securityId: 'SEC001',
        securityNature: 'Immovable',
        securityType: 'Property',
        description: 'Commercial Building',
        value: 35000000,
      },
      {
        accountId: 'ACC002345',
        badge: 'ILMS',
        securityId: 'SEC002',
        securityNature: 'Movable',
        securityType: 'Vehicle',
        description: 'Toyota Fortuner',
        value: 2500000,
      },
      {
        accountId: 'ACC001234',
        badge: 'NCLT',
        securityId: 'SEC003',
        securityNature: 'Financial',
        securityType: 'Shares',
        description: 'Equity Shares - ABC Ltd',
        value: 8500000,
      },
      {
        accountId: 'ACC003456',
        badge: 'ILMS',
        securityId: 'SEC004',
        securityNature: 'Immovable',
        securityType: 'Land',
        description: 'Agricultural Land, Pune',
        value: 12000000,
      },
      {
        accountId: 'ACC004567',
        badge: 'NCLT',
        securityId: 'SEC005',
        securityNature: 'Financial',
        securityType: 'Fixed Deposit',
        description: 'FD Certificate - Bank',
        value: 5000000,
      },
      {
        accountId: 'ACC005678',
        badge: 'ILMS',
        securityId: 'SEC006',
        securityNature: 'Movable',
        securityType: 'Machinery',
        description: 'Manufacturing Equipment',
        value: 18000000,
      },
      {
        accountId: 'ACC006789',
        badge: 'NCLT',
        securityId: 'SEC007',
        securityNature: 'Financial',
        securityType: 'Bonds',
        description: 'Government Bonds',
        value: 40000000,
      },
      {
        accountId: 'ACC007890',
        badge: 'ILMS',
        securityId: 'SEC008',
        securityNature: 'Immovable',
        securityType: 'Property',
        description: 'Residential Apartment',
        value: 6500000,
      },
      {
        accountId: 'ACC008901',
        badge: 'NCLT',
        securityId: 'SEC009',
        securityNature: 'Movable',
        securityType: 'Vehicle',
        description: 'Honda City',
        value: 1200000,
      },
      {
        accountId: 'ACC009012',
        badge: 'ILMS',
        securityId: 'SEC010',
        securityNature: 'Financial',
        securityType: 'Shares',
        description: 'Equity Shares - XYZ Ltd',
        value: 15000000,
      },
    ];
    this.securities = [...this.allSecurities];
  }

  applyFilters() {
    this.securities = this.allSecurities.filter((security) => {
      // Filter by Nature
      if (this._selectedNature && security.securityNature !== this._selectedNature) {
        return false;
      }

      // Filter by Type
      if (this._selectedType && security.securityType !== this._selectedType) {
        return false;
      }

      // Filter by Value
      if (this._selectedValue && security.value) {
        const value = security.value;
        switch (this._selectedValue) {
          case 'below-2cr':
            if (value >= 20000000) return false;
            break;
          case '2-5cr':
            if (value < 20000000 || value >= 50000000) return false;
            break;
          case '5-10cr':
            if (value < 50000000 || value >= 100000000) return false;
            break;
          case 'above-10cr':
            if (value < 100000000) return false;
            break;
        }
      }

      return true;
    });
  }

  getBadgeClass(badge: string): string {
    return badge === 'NCLT' ? 'custom-badge badge-nclt' : 'custom-badge badge-ilms';
  }

  constructor(private messageService: MessageService) { }

  showDialog() {
    this.dialogVisible = true;
    this.activeTab = 'details';
    this.newSecurity = this.getEmptySecurity();
    this.valuations = [
      {
        id: '1',
        amount: 434,
        date: new Date('2025-11-09'),
        valuerName: 'ffd',
      },
      {
        id: '2',
        amount: 3232323,
        date: new Date('2025-11-13'),
        valuerName: 'dsdshd',
      },
    ];
    this.newValuation = this.getEmptyValuation();
  }

  addSecurity() {
    // Add the new security to the list
    const security: Security = {
      accountId: this.newSecurity.accountId,
      securityId: 'SEC' + (this.allSecurities.length + 1).toString().padStart(3, '0'),
      securityNature: this.newSecurity.securityNature,
      securityType: this.newSecurity.securityType,
      description: this.newSecurity.description,
      value: this.newSecurity.valueAtTimeOfSanction || undefined,
      badge: 'NCLT',
    };

    this.allSecurities.push(security);
    this.securities = [...this.allSecurities];
    this.dialogVisible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Security added successfully',
    });
  }

  // Valuation methods
  addValuation() {
    if (!this.newValuation.amount || !this.newValuation.date || !this.newValuation.valuerName) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all valuation fields',
      });
      return;
    }

    const valuation: Valuation = {
      id: (this.valuations.length + 1).toString(),
      amount: this.newValuation.amount,
      date: this.newValuation.date,
      valuerName: this.newValuation.valuerName,
    };

    this.valuations.push(valuation);
    this.newValuation = this.getEmptyValuation();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Valuation added',
    });
  }

  onRowEditInit(valuation: Valuation) {
    this.clonedValuations[valuation.id] = { ...valuation };
  }

  onRowEditSave(valuation: Valuation) {
    if (valuation.amount > 0 && valuation.valuerName) {
      delete this.clonedValuations[valuation.id];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Valuation updated',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid data',
      });
    }
  }

  onRowEditCancel(valuation: Valuation, index: number) {
    this.valuations[index] = this.clonedValuations[valuation.id];
    delete this.clonedValuations[valuation.id];
  }

  deleteValuation(valuation: Valuation) {
    this.valuations = this.valuations.filter((v) => v.id !== valuation.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Valuation deleted',
    });
  }

  private getEmptySecurity(): NewSecurity {
    return {
      securityType: '',
      accountId: '',
      securityChargeType: '',
      valueAtTimeOfSanction: null,
      securityNature: '',
      typesOfAssets: '',
      valuationDateAtTimeOfSanction: null,
      description: '',
      eAuctionPropertyId: '',
      cersaiRegistryNo: '',
      cersaiRegistryDate: null,
      modificationNo: '',
      modificationDate: null,
      satisfactionNo: '',
      satisfactionDate: null,
      bankSharePercent: null,
      reservePrice: null,
      actualSellingPrice: null,
    };
  }

  private getEmptyValuation(): Valuation {
    return {
      id: '',
      amount: 0,
      date: null,
      valuerName: '',
    };
  }
}
