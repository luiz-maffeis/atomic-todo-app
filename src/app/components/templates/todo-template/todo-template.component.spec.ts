import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTemplateComponent } from './todo-template.component';

describe('TodoTemplateComponent', () => {
    let component: TodoTemplateComponent;
    let fixture: ComponentFixture<TodoTemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TodoTemplateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TodoTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the main container', () => {
        const container = fixture.nativeElement.querySelector('.todo-template');
        expect(container).toBeTruthy();
    });

    it('should render the header section', () => {
        const header = fixture.nativeElement.querySelector('.todo-template__header');
        expect(header).toBeTruthy();
    });

    it('should render the main section', () => {
        const main = fixture.nativeElement.querySelector('.todo-template__main');
        expect(main).toBeTruthy();
    });

    it('should render the footer section', () => {
        const footer = fixture.nativeElement.querySelector('.todo-template__footer');
        expect(footer).toBeTruthy();
    });

    it('should render the title with icon', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        expect(title).toBeTruthy();
        expect(title.textContent).toContain('⚡');
        expect(title.textContent).toContain('Atomic Todo');
    });

    it('should render the subtitle', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        expect(subtitle).toBeTruthy();
        expect(subtitle.textContent.trim()).toBe('Built with Atomic Design principles');
    });

    it('should render the footer text', () => {
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');
        expect(footerText).toBeTruthy();
        expect(footerText.textContent.trim()).toBe('Made with ❤️ using Angular & Atomic Design');
    });

    it('should have proper container structure', () => {
        const containers = fixture.nativeElement.querySelectorAll('.todo-template__container');
        expect(containers.length).toBe(3); // Header, main, and footer containers
    });

    it('should have header container', () => {
        const headerContainer = fixture.nativeElement.querySelector('.todo-template__header .todo-template__container');
        expect(headerContainer).toBeTruthy();
    });

    it('should have main container', () => {
        const mainContainer = fixture.nativeElement.querySelector('.todo-template__main .todo-template__container');
        expect(mainContainer).toBeTruthy();
    });

    it('should have footer container', () => {
        const footerContainer = fixture.nativeElement.querySelector('.todo-template__footer .todo-template__container');
        expect(footerContainer).toBeTruthy();
    });

    it('should render the icon in the title', () => {
        const icon = fixture.nativeElement.querySelector('.todo-template__icon');
        expect(icon).toBeTruthy();
        expect(icon.textContent).toBe('⚡');
    });

    it('should have proper heading structure', () => {
        const h1 = fixture.nativeElement.querySelector('h1');
        expect(h1).toBeTruthy();
        expect(h1.classList.contains('todo-template__title')).toBe(true);
    });

    it('should have proper paragraph structure', () => {
        const paragraphs = fixture.nativeElement.querySelectorAll('p');
        expect(paragraphs.length).toBe(2); // Subtitle and footer text
    });

    it('should have subtitle paragraph', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        expect(subtitle.tagName.toLowerCase()).toBe('p');
    });

    it('should have footer text paragraph', () => {
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');
        expect(footerText.tagName.toLowerCase()).toBe('p');
    });

    it('should have proper semantic HTML structure', () => {
        const header = fixture.nativeElement.querySelector('header');
        const main = fixture.nativeElement.querySelector('main');
        const footer = fixture.nativeElement.querySelector('footer');

        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should have proper CSS classes', () => {
        const template = fixture.nativeElement.querySelector('.todo-template');
        const header = fixture.nativeElement.querySelector('.todo-template__header');
        const main = fixture.nativeElement.querySelector('.todo-template__main');
        const footer = fixture.nativeElement.querySelector('.todo-template__footer');

        expect(template).toBeTruthy();
        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should have proper title structure', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const icon = title.querySelector('.todo-template__icon');

        expect(title).toBeTruthy();
        expect(icon).toBeTruthy();
        expect(title.textContent).toContain('Atomic Todo');
    });

    it('should have proper content projection area', () => {
        const mainContainer = fixture.nativeElement.querySelector('.todo-template__main .todo-template__container');
        expect(mainContainer).toBeTruthy();
        // The ng-content will be available for content projection
    });

    it('should have proper accessibility structure', () => {
        const h1 = fixture.nativeElement.querySelector('h1');
        const header = fixture.nativeElement.querySelector('header');
        const main = fixture.nativeElement.querySelector('main');
        const footer = fixture.nativeElement.querySelector('footer');

        expect(h1).toBeTruthy();
        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should have proper text content in title', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const titleText = title.textContent.trim();

        expect(titleText).toContain('⚡');
        expect(titleText).toContain('Atomic Todo');
    });

    it('should have proper text content in subtitle', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        const subtitleText = subtitle.textContent.trim();

        expect(subtitleText).toBe('Built with Atomic Design principles');
    });

    it('should have proper text content in footer', () => {
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');
        const footerTextContent = footerText.textContent.trim();

        expect(footerTextContent).toBe('Made with ❤️ using Angular & Atomic Design');
    });

    it('should have proper icon content', () => {
        const icon = fixture.nativeElement.querySelector('.todo-template__icon');
        const iconText = icon.textContent;

        expect(iconText).toBe('⚡');
    });

    it('should have proper emoji content in footer', () => {
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');
        const footerTextContent = footerText.textContent;

        expect(footerTextContent).toContain('❤️');
    });

    it('should have proper container hierarchy', () => {
        const template = fixture.nativeElement.querySelector('.todo-template');
        const header = template.querySelector('.todo-template__header');
        const main = template.querySelector('.todo-template__main');
        const footer = template.querySelector('.todo-template__footer');

        expect(template).toBeTruthy();
        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should have proper container content hierarchy', () => {
        const headerContainer = fixture.nativeElement.querySelector('.todo-template__header .todo-template__container');
        const mainContainer = fixture.nativeElement.querySelector('.todo-template__main .todo-template__container');
        const footerContainer = fixture.nativeElement.querySelector('.todo-template__footer .todo-template__container');

        expect(headerContainer).toBeTruthy();
        expect(mainContainer).toBeTruthy();
        expect(footerContainer).toBeTruthy();
    });

    it('should have proper title hierarchy', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const icon = title.querySelector('.todo-template__icon');

        expect(title).toBeTruthy();
        expect(icon).toBeTruthy();
        expect(title.contains(icon)).toBe(true);
    });

    it('should have proper text hierarchy', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');

        expect(subtitle).toBeTruthy();
        expect(footerText).toBeTruthy();
        expect(subtitle.tagName.toLowerCase()).toBe('p');
        expect(footerText.tagName.toLowerCase()).toBe('p');
    });

    it('should have proper semantic structure', () => {
        const header = fixture.nativeElement.querySelector('header');
        const main = fixture.nativeElement.querySelector('main');
        const footer = fixture.nativeElement.querySelector('footer');
        const h1 = fixture.nativeElement.querySelector('h1');

        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
        expect(h1).toBeTruthy();
    });

    it('should have proper CSS class naming convention', () => {
        const elements = [
            '.todo-template',
            '.todo-template__header',
            '.todo-template__main',
            '.todo-template__footer',
            '.todo-template__container',
            '.todo-template__title',
            '.todo-template__icon',
            '.todo-template__subtitle',
            '.todo-template__footer-text'
        ];

        elements.forEach(selector => {
            const element = fixture.nativeElement.querySelector(selector);
            expect(element).toBeTruthy();
        });
    });

    it('should have proper content structure', () => {
        const template = fixture.nativeElement.querySelector('.todo-template');
        const children = template.children;

        expect(children.length).toBe(3); // header, main, footer
        expect(children[0].tagName.toLowerCase()).toBe('header');
        expect(children[1].tagName.toLowerCase()).toBe('main');
        expect(children[2].tagName.toLowerCase()).toBe('footer');
    });

    it('should have proper header content structure', () => {
        const header = fixture.nativeElement.querySelector('.todo-template__header');
        const container = header.querySelector('.todo-template__container');
        const title = container.querySelector('.todo-template__title');
        const subtitle = container.querySelector('.todo-template__subtitle');

        expect(container).toBeTruthy();
        expect(title).toBeTruthy();
        expect(subtitle).toBeTruthy();
    });

    it('should have proper main content structure', () => {
        const main = fixture.nativeElement.querySelector('.todo-template__main');
        const container = main.querySelector('.todo-template__container');

        expect(container).toBeTruthy();
        // The container should be empty as it's for content projection
        expect(container.children.length).toBe(0);
    });

    it('should have proper footer content structure', () => {
        const footer = fixture.nativeElement.querySelector('.todo-template__footer');
        const container = footer.querySelector('.todo-template__container');
        const footerText = container.querySelector('.todo-template__footer-text');

        expect(container).toBeTruthy();
        expect(footerText).toBeTruthy();
    });

    it('should have proper title content structure', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const icon = title.querySelector('.todo-template__icon');
        const titleText = title.childNodes;

        expect(icon).toBeTruthy();
        expect(titleText.length).toBeGreaterThan(1); // Icon + text
    });

    it('should have proper icon positioning', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const icon = title.querySelector('.todo-template__icon');

        expect(title.firstChild).toBe(icon);
    });

    it('should have proper text content without extra whitespace', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');

        expect(subtitle.textContent.trim()).toBe('Built with Atomic Design principles');
        expect(footerText.textContent.trim()).toBe('Made with ❤️ using Angular & Atomic Design');
    });

    it('should have proper HTML structure validation', () => {
        const template = fixture.nativeElement.querySelector('.todo-template');
        const header = template.querySelector('header');
        const main = template.querySelector('main');
        const footer = template.querySelector('footer');

        // Check that all semantic elements are present and in correct order
        expect(template.children[0]).toBe(header);
        expect(template.children[1]).toBe(main);
        expect(template.children[2]).toBe(footer);
    });

    it('should have proper container structure validation', () => {
        const containers = fixture.nativeElement.querySelectorAll('.todo-template__container');

        containers.forEach((container: Element) => {
            expect(container).toBeTruthy();
            expect(container.classList.contains('todo-template__container')).toBe(true);
        });
    });

    it('should have proper title structure validation', () => {
        const title = fixture.nativeElement.querySelector('.todo-template__title');
        const icon = title.querySelector('.todo-template__icon');

        expect(title.tagName.toLowerCase()).toBe('h1');
        expect(icon.tagName.toLowerCase()).toBe('span');
        expect(icon.classList.contains('todo-template__icon')).toBe(true);
    });

    it('should have proper text structure validation', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');

        expect(subtitle.tagName.toLowerCase()).toBe('p');
        expect(footerText.tagName.toLowerCase()).toBe('p');
        expect(subtitle.classList.contains('todo-template__subtitle')).toBe(true);
        expect(footerText.classList.contains('todo-template__footer-text')).toBe(true);
    });

    it('should have proper content projection area validation', () => {
        const mainContainer = fixture.nativeElement.querySelector('.todo-template__main .todo-template__container');

        expect(mainContainer).toBeTruthy();
        expect(mainContainer.children.length).toBe(0); // Should be empty for content projection
    });

    it('should have proper accessibility attributes', () => {
        const h1 = fixture.nativeElement.querySelector('h1');
        const header = fixture.nativeElement.querySelector('header');
        const main = fixture.nativeElement.querySelector('main');
        const footer = fixture.nativeElement.querySelector('footer');

        expect(h1).toBeTruthy();
        expect(header).toBeTruthy();
        expect(main).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should have proper content structure for screen readers', () => {
        const h1 = fixture.nativeElement.querySelector('h1');
        const titleText = h1.textContent.trim();

        expect(titleText).toContain('⚡');
        expect(titleText).toContain('Atomic Todo');
        expect(titleText.length).toBeGreaterThan(0);
    });

    it('should have proper footer content for screen readers', () => {
        const footerText = fixture.nativeElement.querySelector('.todo-template__footer-text');
        const footerContent = footerText.textContent.trim();

        expect(footerContent).toBe('Made with ❤️ using Angular & Atomic Design');
        expect(footerContent.length).toBeGreaterThan(0);
    });

    it('should have proper subtitle content for screen readers', () => {
        const subtitle = fixture.nativeElement.querySelector('.todo-template__subtitle');
        const subtitleContent = subtitle.textContent.trim();

        expect(subtitleContent).toBe('Built with Atomic Design principles');
        expect(subtitleContent.length).toBeGreaterThan(0);
    });
}); 