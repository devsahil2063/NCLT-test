import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-stats',
  imports: [CommonModule],
  templateUrl: './summary-stats.html',
  styleUrl: './summary-stats.scss',
})
export class SummaryStats {
  // Summary statistics data
  totalFinancialCreditors = 2;
  totalFCDebt = 4200000000; // 42.00 Cr
  totalOperationalCreditors = 2;
  totalOCDebt = 85000000; // 0.85 Cr
  totalOtherClaims = 12000000; // 0.12 Cr
  grandTotalClaims = 4297000000; // 42.97 Cr

  formatCurrency(amount: number): string {
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(2)} Cr`;
  }
}
