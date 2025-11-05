import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * Custom theme preset based on primary color #ff5a39
 * Color palette generated with proper shades for light and dark modes
 */
export const MyPreset = definePreset(Aura, {
  semantic: {
    // Primary color palette based on #ff5a39 (vibrant orange-red)
    primary: {
      50: '#fff5f2',
      100: '#ffe8e0',
      200: '#ffd4c7',
      300: '#ffb8a0',
      400: '#ff8d68',
      500: '#ff5a39', // Base color
      600: '#f03d1f',
      700: '#d42d15',
      800: '#b02515',
      900: '#912419',
      950: '#500f09',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          950: '#0a0a0a',
        },
        content: {
          background: '#ffffff',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
          color: '{surface.700}',
          hoverColor: '{surface.800}',
        },
        table: {
          headerBackground: '#ffffff',
          headerColor: '{surface.700}',
          headerBorderColor: '{surface.200}',
          rowBackground: '#ffffff',
          rowHoverBackground: '{surface.50}',
          rowBorderColor: '{surface.100}',
          cellColor: '{surface.900}',
          cellSecondaryColor: '{surface.600}',
          footerBackground: '#ffffff',
          footerBorderColor: '{surface.200}',
        },
        tab: {
          activeColor: '{primary.500}',
          activeBorder: '{primary.500}',
          inactiveColor: '{surface.500}',
          hoverBorder: '{surface.300}',
        },
        status: {
          filedBackground: '#dcfce7',
          filedColor: '#16a34a',
          admittedBackground: '#fef3c7',
          admittedColor: '#d97706',
          resolutionBackground: '#e0e7ff',
          resolutionColor: '#6366f1',
        },
      },
      dark: {
        primary: {
          color: '{primary.400}',
          contrastColor: '{primary.950}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}',
        },
        highlight: {
          background: 'rgba(255, 90, 57, 0.16)',
          focusBackground: 'rgba(255, 90, 57, 0.24)',
          color: 'rgba(255, 212, 199, 0.87)',
          focusColor: 'rgba(255, 232, 224, 0.87)',
        },
        surface: {
          0: '#0a0a0a',
          50: '#1a1a1a',
          100: '#262626',
          200: '#333333',
          300: '#404040',
          400: '#525252',
          500: '#737373',
          600: '#a3a3a3',
          700: '#d4d4d4',
          800: '#e5e5e5',
          900: '#f5f5f5',
          950: '#fafafa',
        },
        content: {
          background: '{surface.50}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
          color: '{surface.700}',
          hoverColor: '{surface.800}',
        },
        table: {
          headerBackground: '{surface.100}',
          headerColor: '{surface.700}',
          headerBorderColor: '{surface.300}',
          rowBackground: '{surface.50}',
          rowHoverBackground: '{surface.100}',
          rowBorderColor: '{surface.200}',
          cellColor: '{surface.900}',
          cellSecondaryColor: '{surface.600}',
          footerBackground: '{surface.50}',
          footerBorderColor: '{surface.300}',
        },
        tab: {
          activeColor: '{primary.400}',
          activeBorder: '{primary.400}',
          inactiveColor: '{surface.500}',
          hoverBorder: '{surface.400}',
        },
        status: {
          filedBackground: 'rgba(34, 197, 94, 0.2)',
          filedColor: '#4ade80',
          admittedBackground: 'rgba(251, 191, 36, 0.2)',
          admittedColor: '#fbbf24',
          resolutionBackground: 'rgba(129, 140, 248, 0.2)',
          resolutionColor: '#818cf8',
        },
      },
    },
  },
});
