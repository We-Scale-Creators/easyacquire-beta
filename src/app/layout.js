import { AppProvider } from '@/context/AppContext';
import './globals.css';

export const metadata = {
  title: 'EasyAcquire - Business Acquisition Intelligence',
  description: 'Find, analyze, and acquire businesses with confidence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
