import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

export interface ThemeState {
    currentTheme: ThemeMode;
    isDarkMode: boolean;
}

const THEME_STORAGE_KEY = 'app-theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    // Private BehaviorSubjects for state management
    private readonly themeSubject: BehaviorSubject<ThemeMode>;
    private readonly isDarkModeSubject: BehaviorSubject<boolean>;

    // Public observables
    readonly currentTheme$: Observable<ThemeMode>;
    readonly isDarkMode$: Observable<boolean>;

    // Combined state observable
    readonly themeState$: Observable<ThemeState>;

    constructor() {
        // Load saved preference or detect system theme
        const savedTheme = this.loadThemePreference();
        const initialTheme = savedTheme || ThemeMode.SYSTEM;

        // Determine if dark mode should be active
        let isDark: boolean;
        if (initialTheme === ThemeMode.SYSTEM) {
            isDark = this.detectSystemTheme();
        } else {
            isDark = initialTheme === ThemeMode.DARK;
        }

        // Initialize BehaviorSubjects with determined values
        this.themeSubject = new BehaviorSubject<ThemeMode>(initialTheme);
        this.isDarkModeSubject = new BehaviorSubject<boolean>(isDark);

        // Set up public observables
        this.currentTheme$ = this.themeSubject.asObservable();
        this.isDarkMode$ = this.isDarkModeSubject.asObservable();
        this.themeState$ = combineLatest([
            this.currentTheme$,
            this.isDarkMode$
        ]).pipe(
            map(([currentTheme, isDarkMode]) => ({
                currentTheme,
                isDarkMode
            }))
        );

        // Apply initial theme to HTML element
        this.applyTheme(isDark);

        // Set up listener for system theme changes
        this.setupSystemThemeListener();
    }

    /**
     * Detects the system theme preference using matchMedia
     * @returns true if system prefers dark mode, false otherwise
     */
    private detectSystemTheme(): boolean {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return false;
        }

        try {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            console.warn('Failed to detect system theme:', error);
            return false;
        }
    }

    /**
     * Loads the saved theme preference from localStorage
     * @returns The saved ThemeMode or null if not found
     */
    private loadThemePreference(): ThemeMode | null {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved && Object.values(ThemeMode).includes(saved as ThemeMode)) {
                return saved as ThemeMode;
            }
            return null;
        } catch (error) {
            console.warn('Failed to load theme preference:', error);
            return null;
        }
    }

    /**
     * Saves the theme preference to localStorage
     * @param theme The ThemeMode to save
     */
    private saveThemePreference(theme: ThemeMode): void {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
    }

    /**
     * Applies the theme by adding or removing the dark mode CSS class
     * @param isDark Whether dark mode should be active
     */
    private applyTheme(isDark: boolean): void {
        try {
            const htmlElement = document.querySelector('html');
            if (htmlElement) {
                if (isDark) {
                    htmlElement.classList.add('my-app-dark');
                } else {
                    htmlElement.classList.remove('my-app-dark');
                }
            } else {
                console.warn('HTML element not found for theme application');
            }
        } catch (error) {
            console.warn('Failed to apply theme:', error);
        }
    }

    /**
     * Sets up a listener for system theme changes
     * Only updates the theme when current mode is SYSTEM
     */
    private setupSystemThemeListener(): void {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        try {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Listen for system theme changes
            mediaQuery.addEventListener('change', (event) => {
                // Only update if current theme mode is SYSTEM
                if (this.themeSubject.value === ThemeMode.SYSTEM) {
                    const isDark = event.matches;
                    this.isDarkModeSubject.next(isDark);
                    this.applyTheme(isDark);
                }
            });
        } catch (error) {
            console.warn('Failed to set up system theme listener:', error);
        }
    }

    /**
     * Toggles between light and dark themes
     * Switches the current theme and persists the preference
     */
    toggleTheme(): void {
        // Get current isDarkMode value
        const currentIsDark = this.isDarkModeSubject.value;

        // Toggle between light and dark
        const newIsDark = !currentIsDark;

        // Determine new ThemeMode based on toggled value
        const newTheme = newIsDark ? ThemeMode.DARK : ThemeMode.LIGHT;

        // Update BehaviorSubjects with new values
        this.themeSubject.next(newTheme);
        this.isDarkModeSubject.next(newIsDark);

        // Apply theme to HTML element
        this.applyTheme(newIsDark);

        // Save preference to localStorage
        this.saveThemePreference(newTheme);
    }

    /**
     * Sets a specific theme mode (light, dark, or system)
     * @param theme The ThemeMode to set
     */
    setTheme(theme: ThemeMode): void {
        // Determine isDark boolean based on theme mode
        let isDark: boolean;
        if (theme === ThemeMode.SYSTEM) {
            // Detect current system preference
            isDark = this.detectSystemTheme();
        } else {
            isDark = theme === ThemeMode.DARK;
        }

        // Update BehaviorSubjects with new values
        this.themeSubject.next(theme);
        this.isDarkModeSubject.next(isDark);

        // Apply theme to HTML element
        this.applyTheme(isDark);

        // Save preference to localStorage
        this.saveThemePreference(theme);
    }

    /**
     * Gets the current theme mode synchronously
     * @returns The current ThemeMode
     */
    getCurrentTheme(): ThemeMode {
        return this.themeSubject.value;
    }

    /**
     * Gets the current dark mode state synchronously
     * @returns true if dark mode is active, false otherwise
     */
    isDarkMode(): boolean {
        return this.isDarkModeSubject.value;
    }
}
