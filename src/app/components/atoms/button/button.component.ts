import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="executeAction($event)"
      type="button"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter<Event>();

  get buttonClasses(): string {
    return `btn btn--${this.variant} btn--${this.size}`;
  }

  executeAction(event: Event): void {
    if (!this.disabled) {
      this.action.emit(event);
    }
  }
}
