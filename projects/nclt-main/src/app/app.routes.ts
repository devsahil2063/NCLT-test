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
import { CustomerList } from './page/customers/components/customer-list/customer-list';
import { CasesList } from './page/cases/components/search/cases-list';

export const routes: Routes = [
  {
    path: 'customers',
    component: Customers,
    children: [
      { path: '', component: CustomerList },
      { path: 'basic-details', component: BasicDetails },
      { path: 'facility-details', component: FacilityDetails },
      { path: 'other-parties', component: OtherParties },
      { path: 'security-details', component: SecurityDetails },
      { path: 'functioning-unit-status', component: FunctioningUnitStatus },
    ],
  },
  {
    path: 'cases',
    component: Cases,
    children: [
      { path: '', component: CasesList },
      { path: 'banking-arrangements', component: BankingArrangements },
      { path: 'guarantor', component: Guarantor },
      { path: 'security', component: Security },
      { path: 'forensic-audit', component: ForensicAudit },
      { path: 'look-out-circular', component: LookOutCircular },
      { path: 'sarfaesi-details', component: SARFAESIDetails },
      { path: 'drt-suit', component: DrtSuit },
      {
        path: 'cirp',
        children: [
          {
            path: 'admission',
            children: [
              {
                path: 'filing', children: [
                  { path: 'details', component: ApplicationDetails },
                  { path: 'applicant', component: ApplicantDetails },
                  { path: 'documents', component: ApplicationDocuments },
                ]
              },
              {
                path: 'order',
                children: [
                  { path: 'nclt', component: NcltOrderDetails },
                  { path: 'irp', component: IrpAppointments },
                  { path: 'moratorium', component: Moratorium },
                  { path: 'timeline', component: TimelineDashboard },
                ]
              }
            ]
          },
          {
            path: 'claims',
            children: [
              { path: 'bank-baroda', component: BobClaim },
              { path: 'coc-formation', component: CocFormation },
              { path: 'financial-creditors', component: FinancialCreditors },
              { path: 'operational-creditors', component: OperationalCreditors },
              { path: 'other-claims', component: OtherClaims },
              { path: 'summary-stats', component: SummaryStats },
            ]
          },
          {
            path: 'eoi',
            children: [
              { path: 'expression', component: ExpressionInterest },
              { path: 'registry', component: ResolutionPlansRegistery },
              { path: 'comparative-analysis', component: ComparativeAnalysis },
              { path: 'bank-assessment', component: InternalAssesment },
              { path: 'coc-approval', component: CocApproval },
              { path: 'nclt-approval', component: NcltFinalApproval },
            ]
          },
        ]
      },
      { path: 'hearings', component: Hearing },
    ]
  },

];
