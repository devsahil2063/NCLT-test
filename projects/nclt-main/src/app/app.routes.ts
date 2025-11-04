import { Routes } from '@angular/router';
import { Customers } from './page/customers/customers';
import { Cases } from './page/cases/cases';

export const routes: Routes = [
    {
        path: 'customers',
        component: Customers
        // children: [
        //     { path: 'basic-details', component: Customers },
        //     { path: 'facility-details', component: Customers },
        //     { path: 'other-parties', component: Customers },
        //     { path: 'security-details', component: Customers },
        //     { path: 'functioning-unit-status', component: Customers },
        // ]
    },
    {
        path: 'cases',
        component: Cases
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
];


