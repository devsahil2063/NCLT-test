import { Routes } from '@angular/router';
import { Customers } from './page/customers/customers';
import { Cases } from './page/cases/cases';
import { BasicDetails } from './page/basic-details/basic-details';
import { FacilityDetails } from './page/facility-details/facility-details';
import { OtherParties } from './page/other-parties/other-parties';
import { SecurityDetails } from './page/security-details/security-details';
import { FunctioningUnitStatus } from './page/functioning-unit-status/functioning-unit-status';
import { BankingArrangements } from './page/banking-arrangements/banking-arrangements';
import { Guarantor } from './page/guarantor/guarantor';
import { Security } from './page/security/security';
import { ForensicAudit } from './page/forensic-audit/forensic-audit';
import { LookOutCircular } from './page/look-out-circular/look-out-circular';
import { SARFAESIDetails } from './page/sarfaesi-details/sarfaesi-details';
import { DrtSuit } from './page/drt-suit/drt-suit';
import { ApplicationDetails } from './page/application-details/application-details';
import { ApplicantDetails } from './page/applicant-details/applicant-details';
import { ApplicationDocuments } from './page/application-documents/application-documents';
import { NcltOrderDetails } from './page/nclt-order-details/nclt-order-details';
import { IrpAppointments } from './page/irp-appointments/irp-appointments';
import { Moratorium } from './page/moratorium/moratorium';
import { TimelineDashboard } from './page/timeline-dashboard/timeline-dashboard';
import { BobClaim } from './page/bob-claim/bob-claim';
import { CocFormation } from './page/coc-formation/coc-formation';
import { FinancialCreditors } from './page/financial-creditors/financial-creditors';
import { OperationalCreditors } from './page/operational-creditors/operational-creditors';
import { OtherClaims } from './page/other-claims/other-claims';
import { SummaryStats } from './page/summary-stats/summary-stats';
import { ExpressionInterest } from './page/expression-interest/expression-interest';
import { ResolutionPlansRegistery } from './page/resolution-plans-registery/resolution-plans-registery';
import { ComparativeAnalysis } from './page/comparative-analysis/comparative-analysis';
import { InternalAssesment } from './page/internal-assesment/internal-assesment';
import { CocApproval } from './page/coc-approval/coc-approval';
import { NcltFinalApproval } from './page/nclt-final-approval/nclt-final-approval';
import { Hearing } from './page/hearing/hearing';

export const routes: Routes = [
  {
    path: 'customers',
    component: Customers,
    children: [
      // { path: 'basic-details', component: BasicDetails },
      // { path: 'facility-details', component: Customers },
      // { path: 'other-parties', component: Customers },
      // { path: 'security-details', component: Customers },
      // { path: 'functioning-unit-status', component: Customers },
    ],
  },
  {
    path: 'cases',
    component: Cases,
    // children: [
    //     { path: 'banking-arrangement', component: Cases },
    //     { path: 'guarantor', component: Cases },
    //     { path: 'security', component: Cases },
    //     { path: 'forensic-audit', component: Cases },
    //     { path: 'look-out-circular', component: Cases },
    //     { path: 'sarfaesi-details', component: Cases },
    //     { path: 'drt-suit', component: Cases },
    //     {
    //         path: 'cirp',
    //         children: [
    //             {
    //                 path: 'admission',
    //                 children: [
    //                     { path: 'filing', component: Cases },
    //                     {
    //                         path: 'order',
    //                         children: [
    //                             { path: 'nclt', component: Cases },
    //                             { path: 'irp', component: Cases },
    //                             { path: 'moratorium', component: Cases },
    //                             { path: 'timeline', component: Cases },
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 path: 'claims',
    //                 children: [
    //                     { path: 'bank-baroda', component: Cases },
    //                     { path: 'coc-formation', component: Cases },
    //                     { path: 'financial-creditors', component: Cases },
    //                     { path: 'operational-creditors', component: Cases },
    //                     { path: 'other-claims', component: Cases },
    //                     { path: 'summary-stats', component: Cases },
    //                 ]
    //             },
    //             {
    //                 path: 'eoi',
    //                 children: [
    //                     { path: 'expression', component: Cases },
    //                     { path: 'registry', component: Cases },
    //                     { path: 'comparative-analysis', component: Cases },
    //                     { path: 'bank-assessment', component: Cases },
    //                     { path: 'coc-approval', component: Cases },
    //                     { path: 'nclt-approval', component: Cases },
    //                 ]
    //             },
    //             { path: 'hearings', component: Cases },
    //         ]
    //     }
    // ]
  },
  {
    path: 'customers/basic-details',
    component: BasicDetails,
  },
  {
    path: 'customers/facility-details',
    component: FacilityDetails,
  },
  {
    path: 'customers/other-parties',
    component: OtherParties,
  },
  {
    path: 'customers/security-details',
    component: SecurityDetails,
  },
  {
    path: 'customers/functioning-unit-status',
    component: FunctioningUnitStatus,
  },
  {
    path: 'cases/banking-arrangements',
    component: BankingArrangements,
  },
  {
    path: 'cases/guarantor',
    component: Guarantor,
  },
  {
    path: 'cases/security',
    component: Security,
  },
  {
    path: 'cases/forensic-audit',
    component: ForensicAudit,
  },
  {
    path: 'cases/look-out-circular',
    component: LookOutCircular,
  },
  {
    path: 'cases/sarfaesi-details',
    component: SARFAESIDetails,
  },
  {
    path: 'cases/drt-suit',
    component: DrtSuit,
  },
  {
    path: 'cases/cirp/application/details',
    component: ApplicationDetails,
  },
  {
    path: 'cases/cirp/application/applicant',
    component: ApplicantDetails,
  },
  {
    path: 'cases/cirp/application/documents',
    component: ApplicationDocuments,
  },
  {
    path: 'cases/cirp/admission/order/nclt',
    component: NcltOrderDetails,
  },
  {
    path: 'cases/cirp/admission/order/irp',
    component: IrpAppointments,
  },
  {
    path: 'cases/cirp/admission/order/moratorium',
    component: Moratorium,
  },
  {
    path: 'cases/cirp/admission/order/timeline',
    component: TimelineDashboard,
  },
  {
    path: 'cases/cirp/claims/bank-baroda',
    component: BobClaim,
  },
  {
    path: 'cases/cirp/claims/coc-formation',
    component: CocFormation,
  },
  {
    path: 'cases/cirp/claims/financial-creditors',
    component: FinancialCreditors,
  },
  {
    path: 'cases/cirp/claims/operational-creditors',
    component: OperationalCreditors,
  },
  {
    path: 'cases/cirp/claims/other-claims',
    component: OtherClaims,
  },
  {
    path: 'cases/cirp/claims/summary-stats',
    component: SummaryStats,
  },
  {
    path: 'cases/cirp/eoi/expression',
    component: ExpressionInterest,
  },
  {
    path: 'cases/cirp/eoi/registry',
    component: ResolutionPlansRegistery,
  },
  {
    path: 'cases/cirp/eoi/comparative-analysis',
    component: ComparativeAnalysis,
  },
  {
    path: 'cases/cirp/eoi/bank-assessment',
    component: InternalAssesment,
  },
  {
    path: 'cases/cirp/eoi/coc-approval',
    component: CocApproval,
  },
  {
    path: 'cases/cirp/eoi/nclt-approval',
    component: NcltFinalApproval,
  },
  {
    path: 'cases/cirp/hearings',
    component: Hearing,
  },
];
