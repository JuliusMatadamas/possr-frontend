import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-menu',
    imports: [FormsModule, RouterLink, ButtonModule, DatePickerModule],
    templateUrl: './menu.html',
    styleUrl: './menu.scss',
})
export class Menu implements AfterViewInit, OnDestroy {
    private readonly removeListeners: (() => void)[] = [];

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        const btnMenu = this.elementRef.nativeElement.querySelector<HTMLElement>(
            'aside > div'
        );
        const aside = this.elementRef.nativeElement.querySelector<HTMLElement>(
            'aside'
        );

        if (btnMenu && aside) {
            const toggleMenuListener = (): void => {
                aside.classList.toggle('minimized');
            };

            btnMenu.addEventListener(
                'click',
                toggleMenuListener
            );
            this.removeListeners.push(() => {
                btnMenu.removeEventListener(
                    'click',
                    toggleMenuListener
                );
            });
        }

        const toggleIcons = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
            'aside > nav > ul > li > a > i:last-child'
        );

        toggleIcons.forEach((icon) => {
            const toggleIconListener = (
                event: MouseEvent
            ): void => {
                event.preventDefault();

                const liElement = icon.closest('li');
                if (!liElement) {
                    return;
                }

                const submenu = liElement.querySelector<HTMLElement>(
                    ':scope > ul'
                );
                if (!submenu) {
                    return;
                }

                const isOpen = submenu.classList.toggle('open');
                icon.style.setProperty(
                    'rotate',
                    isOpen ? '180deg' : '0deg'
                );
            };

            icon.addEventListener(
                'click',
                toggleIconListener as EventListener
            );
            this.removeListeners.push(() => {
                icon.removeEventListener(
                    'click',
                    toggleIconListener as EventListener
                );
            });
        });
    }

    ngOnDestroy(): void {
        this.removeListeners.forEach((remove) => remove());
    }
}
