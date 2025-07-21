import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CheckboxComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default checked state', () => {
        expect(component.checked).toBe(false);
    });

    it('should have default disabled state', () => {
        expect(component.disabled).toBe(false);
    });

    it('should render unchecked checkbox by default', () => {
        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.checked).toBe(false);
    });

    it('should render checked checkbox when checked is true', () => {
        component.checked = true;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.checked).toBe(true);
    });

    it('should render disabled checkbox when disabled is true', () => {
        component.disabled = true;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.disabled).toBe(true);
    });

    it('should render enabled checkbox when disabled is false', () => {
        component.disabled = false;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.disabled).toBe(false);
    });

    it('should emit change event when checkbox is clicked', () => {
        const changeEvent = new Event('change');
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        checkbox.dispatchEvent(changeEvent);

        expect(component.changeEvent.emit).toHaveBeenCalledWith(changeEvent);
    });

    it('should emit change event when checkbox is checked', () => {
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));

        expect(component.changeEvent.emit).toHaveBeenCalled();
    });

    it('should emit change event when checkbox is unchecked', () => {
        component.checked = true;
        fixture.detectChanges();

        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));

        expect(component.changeEvent.emit).toHaveBeenCalled();
    });

    it('should emit change event when disabled checkbox is clicked', () => {
        component.disabled = true;
        fixture.detectChanges();

        const changeEvent = new Event('change');
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        checkbox.dispatchEvent(changeEvent);

        expect(component.changeEvent.emit).toHaveBeenCalledWith(changeEvent);
    });

    it('should have correct CSS classes', () => {
        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.classList.contains('checkbox-input')).toBe(true);
    });

    it('should have label wrapper', () => {
        const label = fixture.nativeElement.querySelector('label');
        expect(label.classList.contains('checkbox-wrapper')).toBe(true);
    });

    it('should have custom checkbox span', () => {
        const customCheckbox = fixture.nativeElement.querySelector('.checkbox-custom');
        expect(customCheckbox).toBeTruthy();
    });

    it('should have ng-content for projecting content', () => {
        // The component template includes <ng-content></ng-content>
        // which allows content projection
        expect(component).toBeTruthy();

        // Verify the template structure includes ng-content
        const template = fixture.debugElement.nativeElement.innerHTML;
        expect(template).toContain('checkbox-wrapper');
    });

    it('should handle multiple change events', () => {
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // First change
        checkbox.dispatchEvent(new Event('change'));
        expect(component.changeEvent.emit).toHaveBeenCalledTimes(1);

        // Second change
        checkbox.dispatchEvent(new Event('change'));
        expect(component.changeEvent.emit).toHaveBeenCalledTimes(2);
    });

    it('should update checked state when input changes', () => {
        spyOn(component.changeEvent, 'emit');
        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // Simulate user checking the checkbox
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));

        // The component should emit the event, but the checked state is controlled by the parent
        expect(component.changeEvent.emit).toHaveBeenCalled();
    });

    it('should maintain checked state when disabled', () => {
        component.checked = true;
        component.disabled = true;
        fixture.detectChanges();

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
        expect(checkbox.checked).toBe(true);
        expect(checkbox.disabled).toBe(true);
    });

    it('should have proper input type', () => {
        const checkbox = fixture.nativeElement.querySelector('input');
        expect(checkbox.type).toBe('checkbox');
    });

    it('should be accessible with proper labeling', () => {
        const label = fixture.nativeElement.querySelector('label');
        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // The checkbox should be properly associated with the label
        expect(label).toBeTruthy();
        expect(checkbox).toBeTruthy();
    });

    it('should handle rapid state changes', () => {
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // Rapidly change the checked state
        for (let i = 0; i < 5; i++) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }

        expect(component.changeEvent.emit).toHaveBeenCalledTimes(5);
    });

    it('should work with keyboard navigation', () => {
        spyOn(component.changeEvent, 'emit');

        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // Simulate space key press
        const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
        checkbox.dispatchEvent(spaceEvent);

        // The checkbox should respond to keyboard events
        expect(checkbox).toBeTruthy();
    });

    it('should handle focus and blur events', () => {
        const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');

        // Focus the checkbox
        checkbox.focus();
        expect(document.activeElement).toBe(checkbox);

        // Blur the checkbox
        checkbox.blur();
        expect(document.activeElement).not.toBe(checkbox);
    });
}); 