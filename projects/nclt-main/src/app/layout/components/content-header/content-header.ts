import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-content-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './content-header.html',
    styleUrl: './content-header.scss',
})
export class ContentHeaderComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
}
