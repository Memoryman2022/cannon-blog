import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Cannon Blog',
  description: 'Arsenal FC blog – news, match reports, and opinions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
