import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="checkbox-wrapper">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        (change)="changeEvent.emit($event)"
        class="checkbox-input"
      />
      <span class="checkbox-custom"></span>
      <ng-content></ng-content>
    </label>
  `,
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() changeEvent = new EventEmitter<Event>();
}
