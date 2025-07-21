import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent, InputSize } from './input.component';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputComponent, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default values', () => {
        expect(component.type).toBe('text');
        expect(component.placeholder).toBe('');
        expect(component.value).toBe('');
        expect(component.disabled).toBe(false);
        expect(component.size).toBe('medium');
        expect(component.ariaLabel).toBe('');
    });

    it('should render input element', () => {
        const input = fixture.nativeElement.querySelector('input');
        expect(input).toBeTruthy();
    });

    it('should have correct default CSS classes', () => {
        const input = fixture.nativeElement.querySelector('input');
        expect(input.classList.contains('input')).toBe(true);
        expect(input.classList.contains('input--medium')).toBe(true);
    });

    it('should apply correct size classes', () => {
        component.size = 'small';
        fixture.detectChanges();
        let input = fixture.nativeElement.querySelector('input');
        expect(input.classList.contains('input--small')).toBe(true);

        component.size = 'large';
        fixture.detectChanges();
        input = fixture.nativeElement.querySelector('input');
        expect(input.classList.contains('input--large')).toBe(true);
    });

    it('should set input type correctly', () => {
        component.type = 'email';
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.type).toBe('email');
    });

    it('should set placeholder correctly', () => {
        component.placeholder = 'Enter your name';
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.placeholder).toBe('Enter your name');
    });

    it('should set value correctly', () => {
        component.value = 'test value';
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('test value');
    });

    it('should set disabled state correctly', () => {
        component.disabled = true;
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.disabled).toBe(true);
    });

    it('should set aria-label correctly', () => {
        component.ariaLabel = 'Username input';
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.getAttribute('aria-label')).toBe('Username input');
    });

    it('should emit inputEvent when input changes', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: 'new value' }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe('new value');
    });

    it('should emit enterEvent when Enter key is pressed', () => {
        spyOn(component.enterEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const keyupEvent = new KeyboardEvent('keyup', { key: 'Enter' });

        input.dispatchEvent(keyupEvent);

        expect(component.enterEvent.emit).toHaveBeenCalledWith(keyupEvent);
    });

    it('should emit blurEvent when input loses focus', () => {
        spyOn(component.blurEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const blurEvent = new Event('blur');

        input.dispatchEvent(blurEvent);

        expect(component.blurEvent.emit).toHaveBeenCalledWith(blurEvent);
    });

    it('should emit focusEvent when input gains focus', () => {
        spyOn(component.focusEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const focusEvent = new Event('focus');

        input.dispatchEvent(focusEvent);

        expect(component.focusEvent.emit).toHaveBeenCalledWith(focusEvent);
    });

    it('should not emit enterEvent for non-Enter keys', () => {
        spyOn(component.enterEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const keyupEvent = new KeyboardEvent('keyup', { key: 'Space' });

        input.dispatchEvent(keyupEvent);

        expect(component.enterEvent.emit).not.toHaveBeenCalled();
    });

    it('should handle empty input value', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: '' }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe('');
    });

    it('should handle special characters in input', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: specialValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(specialValue);
    });

    it('should handle very long input values', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const longValue = 'A'.repeat(1000);
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: longValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(longValue);
    });

    it('should handle different input types', () => {
        const types = ['text', 'email', 'password', 'number', 'tel', 'url'];

        types.forEach(type => {
            component.type = type;
            fixture.detectChanges();
            const input = fixture.nativeElement.querySelector('input');
            expect(input.type).toBe(type);
        });
    });

    it('should handle rapid input changes', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');

        for (let i = 0; i < 10; i++) {
            const inputEvent = new Event('input');
            Object.defineProperty(inputEvent, 'target', {
                value: { value: `value${i}` }
            });
            input.dispatchEvent(inputEvent);
        }

        expect(component.inputEvent.emit).toHaveBeenCalledTimes(10);
        expect(component.value).toBe('value9');
    });

    it('should have proper wrapper structure', () => {
        const wrapper = fixture.nativeElement.querySelector('.input-wrapper');
        expect(wrapper).toBeTruthy();
    });

    it('should handle disabled state changes', () => {
        component.disabled = true;
        fixture.detectChanges();
        let input = fixture.nativeElement.querySelector('input');
        expect(input.disabled).toBe(true);

        component.disabled = false;
        fixture.detectChanges();
        input = fixture.nativeElement.querySelector('input');
        expect(input.disabled).toBe(false);
    });

    it('should handle value changes through writeValue', () => {
        component.writeValue('new value');
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('new value');
        expect(component.value).toBe('new value');
    });

    it('should handle empty string in writeValue', () => {
        component.writeValue('');
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('');
        expect(component.value).toBe('');
    });

    it('should register onChange function', () => {
        const mockOnChange = jasmine.createSpy('onChange');
        component.registerOnChange(mockOnChange);

        const input = fixture.nativeElement.querySelector('input');
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: 'test' }
        });

        input.dispatchEvent(inputEvent);

        expect(mockOnChange).toHaveBeenCalledWith('test');
    });

    it('should register onTouched function', () => {
        const mockOnTouched = jasmine.createSpy('onTouched');
        component.registerOnTouched(mockOnTouched);

        const input = fixture.nativeElement.querySelector('input');
        const blurEvent = new Event('blur');
        input.dispatchEvent(blurEvent);

        expect(mockOnTouched).toHaveBeenCalled();
    });

    it('should set disabled state through setDisabledState', () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        let input = fixture.nativeElement.querySelector('input');
        expect(input.disabled).toBe(true);
        expect(component.disabled).toBe(true);

        component.setDisabledState(false);
        fixture.detectChanges();
        input = fixture.nativeElement.querySelector('input');
        expect(input.disabled).toBe(false);
        expect(component.disabled).toBe(false);
    });

    it('should handle multiple rapid focus/blur events', () => {
        spyOn(component.focusEvent, 'emit');
        spyOn(component.blurEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');

        for (let i = 0; i < 5; i++) {
            input.dispatchEvent(new Event('focus'));
            input.dispatchEvent(new Event('blur'));
        }

        expect(component.focusEvent.emit).toHaveBeenCalledTimes(5);
        expect(component.blurEvent.emit).toHaveBeenCalledTimes(5);
    });

    it('should handle input with numbers', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: '12345' }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe('12345');
    });

    it('should handle input with mixed content', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const mixedValue = 'Hello123!@#';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: mixedValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(mixedValue);
    });

    it('should handle input with unicode characters', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const unicodeValue = 'Hello 世界 🌍';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: unicodeValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(unicodeValue);
    });

    it('should maintain value when disabled', () => {
        component.value = 'test value';
        component.disabled = true;
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('test value');
        expect(input.disabled).toBe(true);
    });

    it('should handle all size variants', () => {
        const sizes = ['small', 'medium', 'large'];

        sizes.forEach(size => {
            component.size = size as InputSize;
            fixture.detectChanges();
            const input = fixture.nativeElement.querySelector('input');
            expect(input.classList.contains(`input--${size}`)).toBe(true);
        });
    });

    it('should have proper accessibility attributes when ariaLabel is set', () => {
        component.ariaLabel = 'Search input field';
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.getAttribute('aria-label')).toBe('Search input field');
    });

    it('should handle input with whitespace', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const whitespaceValue = '  hello world  ';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: whitespaceValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(whitespaceValue);
    });

    it('should handle input with newlines', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const newlineValue = 'line1\nline2\nline3';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: newlineValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(newlineValue);
    });

    it('should handle input with tabs', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const tabValue = 'hello\tworld';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: tabValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(tabValue);
    });

    it('should handle input with zero-width characters', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const zeroWidthValue = 'hello\u200Bworld';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: zeroWidthValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(zeroWidthValue);
    });

    it('should handle input with emoji', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const emojiValue = 'Hello 😀 World 🌍';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: emojiValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(emojiValue);
    });

    it('should handle input with HTML-like content', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const htmlValue = '<script>alert("test")</script>';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: htmlValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(htmlValue);
    });

    it('should handle input with SQL-like content', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const sqlValue = "SELECT * FROM users WHERE name = 'test'";
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: sqlValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(sqlValue);
    });

    it('should handle input with JSON-like content', () => {
        spyOn(component.inputEvent, 'emit');
        const input = fixture.nativeElement.querySelector('input');
        const jsonValue = '{"name": "test", "value": 123}';
        const inputEvent = new Event('input');
        Object.defineProperty(inputEvent, 'target', {
            value: { value: jsonValue }
        });

        input.dispatchEvent(inputEvent);

        expect(component.inputEvent.emit).toHaveBeenCalledWith(inputEvent);
        expect(component.value).toBe(jsonValue);
    });
}); 