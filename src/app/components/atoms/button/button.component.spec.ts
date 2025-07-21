import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant', () => {
    expect(component.variant).toBe('primary');
  });

  it('should have default size', () => {
    expect(component.size).toBe('medium');
  });

  it('should not be disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('should generate correct CSS classes', () => {
    expect(component.buttonClasses).toBe('btn btn--primary btn--medium');
  });

  it('should generate correct CSS classes for different variants', () => {
    component.variant = 'danger';
    component.size = 'large';
    expect(component.buttonClasses).toBe('btn btn--danger btn--large');
  });

  it('should emit click event', () => {
    const clickEvent = new Event('click');
    spyOn(component.action, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(clickEvent);

    expect(component.action.emit).toHaveBeenCalledWith(clickEvent);
  });

  it('should not emit click event when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const clickEvent = new Event('click');
    spyOn(component.action, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(clickEvent);

    expect(component.action.emit).not.toHaveBeenCalled();
  });
});
