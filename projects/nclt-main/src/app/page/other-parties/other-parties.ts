import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Select } from 'primeng/select';

interface OtherParty {
  name: string;
  relation: string;
  panNumber: string;
}

@Component({
  selector: 'app-other-parties',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIcon,
    IconField,
    Select,
  ],
  templateUrl: './other-parties.html',
  styleUrl: './other-parties.scss',
})
export class OtherParties implements OnInit {
  otherParties: OtherParty[] = [];
  allOtherParties: OtherParty[] = [];
  selectedRelation: string | null = null;

  relations = [
    { label: 'All', value: null },
    { label: 'Director', value: 'Director' },
    { label: 'Guarantor', value: 'Guarantor' },
    { label: 'Promoter', value: 'Promoter' },
  ];

  ngOnInit() {
    this.allOtherParties = [
      {
        name: 'John Smith',
        relation: 'Director',
        panNumber: 'ABCDE1234F',
      },
      {
        name: 'Jane Doe',
        relation: 'Guarantor',
        panNumber: 'BCDEF2345G',
      },
      {
        name: 'Robert Johnson',
        relation: 'Promoter',
        panNumber: 'CDEFG3456H',
      },
      {
        name: 'Sarah Williams',
        relation: 'Director',
        panNumber: 'DEFGH4567I',
      },
      {
        name: 'Michael Brown',
        relation: 'Guarantor',
        panNumber: 'EFGHI5678J',
      },
      {
        name: 'Emily Davis',
        relation: 'Promoter',
        panNumber: 'FGHIJ6789K',
      },
      {
        name: 'David Wilson',
        relation: 'Director',
        panNumber: 'GHIJK7890L',
      },
      {
        name: 'Lisa Anderson',
        relation: 'Guarantor',
        panNumber: 'HIJKL8901M',
      },
      {
        name: 'James Taylor',
        relation: 'Promoter',
        panNumber: 'IJKLM9012N',
      },
      {
        name: 'Patricia Martinez',
        relation: 'Director',
        panNumber: 'JKLMN0123O',
      },
    ];
    this.otherParties = [...this.allOtherParties];
  }

  onRelationChange() {
    if (this.selectedRelation) {
      this.otherParties = this.allOtherParties.filter(
        party => party.relation === this.selectedRelation
      );
    } else {
      this.otherParties = [...this.allOtherParties];
    }
  }
}
