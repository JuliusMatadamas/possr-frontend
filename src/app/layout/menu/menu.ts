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
        const menusItemsDropDown = this.elementRef.nativeElement
            .querySelectorAll<HTMLElement>('.menu-item-dropdown');

        menusItemsDropDown.forEach((menuItem) => {
            const listener = (): void => {
                const subMenu = menuItem.querySelector<HTMLElement>('.sub-menu');
                const isActive = menuItem.classList.toggle('sub-menu-toggle');

                if (subMenu) {
                    if (isActive) {
                        subMenu.style.height = `${subMenu.scrollHeight + 6}px`;
                        subMenu.style.padding = '0.2rem 0';
                    } else {
                        subMenu.style.height = '0';
                        subMenu.style.padding = '0';
                    }
                }

                menusItemsDropDown.forEach((item) => {
                    if (item !== menuItem) {
                        const otherSubmenu = item.querySelector<HTMLElement>('.sub-menu');
                        if (otherSubmenu) {
                            item.classList.remove('sub-menu-toggle');
                            otherSubmenu.style.height = '0';
                            otherSubmenu.style.padding = '0';
                        }
                    }
                });
            };

            menuItem.addEventListener('click', listener);
            this.removeListeners.push(() => {
                menuItem.removeEventListener('click', listener);
            });
        });

        const allMenuItems = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('.menu-item');

        allMenuItems.forEach((item) => {
            const mouseEnterListener = (): void => {
                const sidebarEl = this.elementRef.nativeElement.querySelector<HTMLElement>('#sidebar');
                if (!sidebarEl || !sidebarEl.classList.contains('minimize')) {
                    return;
                }

                const openDropdown = this.elementRef.nativeElement.querySelector<HTMLElement>('.menu-item-dropdown.sub-menu-toggle');

                if (openDropdown && openDropdown !== item) {
                    const openSubMenu = openDropdown.querySelector<HTMLElement>('.sub-menu');
                    if (openSubMenu) {
                        openDropdown.classList.remove('sub-menu-toggle');
                        openSubMenu.style.height = '0';
                        openSubMenu.style.padding = '0';
                    }
                }
            };

            item.addEventListener('mouseenter', mouseEnterListener);
            this.removeListeners.push(() => {
                item.removeEventListener('mouseenter', mouseEnterListener);
            });
        });

        const sidebar = this.elementRef.nativeElement.querySelector<HTMLElement>('#sidebar');
        const menuBtn = this.elementRef.nativeElement.querySelector<HTMLElement>('#menu-btn');

        if (sidebar && menuBtn) {
            const toggleListener = (): void => {
                sidebar.classList.toggle('minimize');
            };

            menuBtn.addEventListener('click', toggleListener);
            this.removeListeners.push(() => {
                menuBtn.removeEventListener('click', toggleListener);
            });
        }
    }

    ngOnDestroy(): void {
        this.removeListeners.forEach((remove) => remove());
    }
}
