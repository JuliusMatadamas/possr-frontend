import {
    AfterViewInit,
    Component,
    OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Menu } from './menu/menu';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, Menu],
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
})
export class Layout implements AfterViewInit, OnDestroy {
    isMenuMinimized = false;
    private readonly BREAKPOINT = 576;
    private resizeListener?: () => void;

    ngAfterViewInit(): void {
        this.checkScreenSize();

        this.resizeListener = (): void => {
            this.checkScreenSize();
        };

        window.addEventListener('resize', this.resizeListener);
    }

    ngOnDestroy(): void {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }

    private checkScreenSize(): void {
        if (window.innerWidth < this.BREAKPOINT) {
            this.isMenuMinimized = true;
        }
    }

    onMenuToggled(minimized: boolean): void {
        this.isMenuMinimized = minimized;
    }
}
