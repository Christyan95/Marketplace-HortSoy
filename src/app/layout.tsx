import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Toaster } from 'sonner';
import { Users } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HortSoy | Marketplace',
  description: 'Marketplace interno de produtos da HortSoy para colaboradores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative bg-slate-50 text-slate-900 overflow-x-hidden pt-16 md:pt-[72px]">
        
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 md:h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-10 bg-white/85 backdrop-blur-2xl border-b border-black/[0.04] transition-all duration-500">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative h-8 w-24 sm:h-9 sm:w-28 md:w-32 transition-all duration-300 group-hover:opacity-80">
              <Image 
                src="/logo.png" 
                alt="Logo HortSoy" 
                fill 
                style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                priority
              />
            </div>
            <div className="h-4 sm:h-5 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-slate-800 tracking-wider text-[10px] uppercase">
                  Marketplace
                </span>
                <span className="flex items-center gap-1 font-medium text-[var(--color-primary)] tracking-[0.15em] text-[8px] uppercase mt-0.5">
                  <Users className="h-2 w-2" />
                  For Teams
                </span>
              </div>
          </a>

          {/* Nav Links — Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#produtos" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <a href="#sobre" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Como Funciona
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <a href="#contato" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Dúvidas
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href="/#produtos" className="hidden sm:inline-flex items-center justify-center px-5 md:px-7 py-2 md:py-2.5 text-xs md:text-[13px] font-bold text-white bg-slate-900 rounded-full hover:bg-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:-translate-y-px transition-all duration-300">
              Explorar Ofertas
            </a>
            <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors" aria-label="Menu">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </header>

        <Toaster position="top-center" richColors />
        
        {children}

        {/* Footer */}
        <footer className="mt-auto py-8 md:py-12 bg-white border-t border-slate-200">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-20 sm:h-8 sm:w-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                <Image 
                  src="/logo.png" 
                  alt="Logo HortSoy" 
                  fill 
                  style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                />
              </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Marketplace</span>
                  <span className="flex items-center gap-1 text-[9px] text-[var(--color-primary)] font-bold uppercase tracking-widest">
                    <Users className="h-2 w-2" />
                    For Teams
                  </span>
                </div>
            </div>
            <div className="text-center text-xs sm:text-sm font-medium text-slate-400">
              &copy; {new Date().getFullYear()} HortSoy. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
