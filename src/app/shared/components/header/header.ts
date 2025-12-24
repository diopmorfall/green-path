import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './header.html',
    styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {
    isMobileMenuOpen: boolean = false;
    isMobileView: boolean = false;
    private readonly desktopBreakpoint = 1024;

    ngOnInit() {
        this.isMobileView = this.checkScreenWidth();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
        this.isMobileView = this.checkScreenWidth();
    }

    checkScreenWidth(): boolean {
        return window.innerWidth < this.desktopBreakpoint;
    }

    toggleMobileMenu(): void {
        if (this.isMobileView) {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        }
    }
}
