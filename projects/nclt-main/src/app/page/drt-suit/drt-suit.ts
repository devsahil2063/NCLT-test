import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-drt-suit',
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './drt-suit.html',
  styleUrl: './drt-suit.scss',
})
export class DrtSuit {
  addDrtSuit() {
    console.log('Add DRT & SUIT clicked');
  }
}
