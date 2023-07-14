import '@mui/material/styles';

declare module '@mui/material/styles' {
   interface Palette {
      neutral?: Palette['primary'];
   }

   interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
   }

   interface PaletteColor {
      neutral?: string;
   }

   interface SimplePaletteColorOptions {
      neutral?: string;
   }
}

declare module '@mui/material/Button' {
   interface ButtonPropsColorOverrides {
      neutral: boolean;
   }
}
