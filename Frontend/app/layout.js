"use client";
import './globals.css';
import { MainProvider } from "./Components/Context/MainContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green,purple} from '@mui/material/colors';


export const metadata = {
  title: 'Oasis Manors, Inc - Assisted Living Facility at 15116 Roxford St, Sylmar, CA 91342',
  description: 'Best Assisted Living Facility for Elderly. Get Nutritious homestyle meals and furnished rooms. Emergency call system and 24-hour supervision. Low-impact wellness program in pool and spa. Games, walks, local visits, shopping and regular yoga activities. Grab all facilities at one place - Oasis Manors. Call 310-995-4859',
}
const darkTheme = createTheme({
  palette: {
    primary:green,
    secondary: purple,
    mode: "light",
  },
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>   
        <MainProvider>
        <ThemeProvider theme={darkTheme}>
        {children}  
        </ThemeProvider>
        </MainProvider>
        </body>
    </html>
  )
}
