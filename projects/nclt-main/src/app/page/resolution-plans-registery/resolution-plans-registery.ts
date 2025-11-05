import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface ResolutionPlan {
  srNo: number;
  applicantName: string;
  amountOffered: number;
  upfrontPayment: number;
  paymentTimeline: string;
  amountToBoB: number;
  bobRecoveryPercent: number;
  bobHaircutPercent: number;
  gistOfPlan: string;
  rpRecommendation: string;
}

@Component({
  selector: 'app-resolution-plans-registery',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './resolution-plans-registery.html',
  styleUrl: './resolution-plans-registery.scss',
})
export class ResolutionPlansRegistery {
  applicantName: string = '';
  totalPlansSubmitted: number = 3;

  resolutionPlans: ResolutionPlan[] = [
    {
      srNo: 1,
      applicantName: 'ABC Capital Ltd',
      amountOffered: 4500000000, // 45.00 Cr
      upfrontPayment: 2000000000, // 20.00 Cr
      paymentTimeline: '24 months',
      amountToBoB: 3850000000, // 38.50 Cr
      bobRecoveryPercent: 91.67,
      bobHaircutPercent: 8.33,
      gistOfPlan: 'Full takeover with...',
      rpRecommendation: 'Recommended',
    },
  ];

  constructor(private messageService: MessageService) { }

  formatCurrency(amount: number): string {
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(2)} Cr`;
  }

  getRecommendationClass(recommendation: string): string {
    return recommendation === 'Recommended'
      ? 'recommendation-badge-recommended'
      : 'recommendation-badge-not-recommended';
  }

  addPlan(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Add plan functionality to be implemented',
    });
  }

  viewPlan(plan: ResolutionPlan): void {
    console.log('Viewing plan:', plan);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: `Viewing plan for ${plan.applicantName}`,
    });
  }

  downloadPlan(plan: ResolutionPlan): void {
    console.log('Downloading plan:', plan);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Downloading plan for ${plan.applicantName}`,
    });
  }

  editPlan(plan: ResolutionPlan): void {
    console.log('Editing plan:', plan);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: `Editing plan for ${plan.applicantName}`,
    });
  }

  deletePlan(plan: ResolutionPlan): void {
    this.resolutionPlans = this.resolutionPlans.filter(
      (p) => p.srNo !== plan.srNo
    );
    this.totalPlansSubmitted = this.resolutionPlans.length;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Resolution plan deleted successfully',
    });
  }
}
