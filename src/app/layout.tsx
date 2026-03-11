import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HortSoy | Bazar',
  description: 'Bazar interno de produtos da HortSoy para colaboradores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative bg-slate-50 text-slate-900 overflow-x-hidden pt-20">
        
        {/* Minimalist Premium Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full h-[72px] flex items-center justify-between px-6 lg:px-12 bg-white/85 backdrop-blur-2xl border-b border-black/[0.04] transition-all duration-500">
          
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-3 group relative cursor-pointer">
              <div className="relative h-9 w-28 md:w-32 transition-all duration-300 group-hover:opacity-80">
                <Image 
                  src="/logo.png" 
                  alt="Logo HortSoy" 
                  fill 
                  style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                  priority
                />
              </div>
              
              <div className="h-5 w-[1px] bg-slate-200 hidden sm:block"></div>
              
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-slate-800 tracking-wider text-[10px] uppercase">
                  Bazar Interno
                </span>
              </div>
            </a>
          </div>

          {/* Central Navigation Routes */}
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#produtos" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#sobre" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Como Funciona
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#contato" className="relative group py-2 text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
              Dúvidas
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-slate-900 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <a href="/#produtos" className="hidden sm:inline-flex items-center justify-center px-7 py-2.5 text-[13px] font-bold text-white bg-slate-900 rounded-full hover:bg-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:-translate-y-[1px] transition-all duration-300">
              Explorar Ofertas
            </a>
            
            <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </header>

        <Toaster position="top-center" richColors />
        
        {children}

        {/* Footer */}
        <footer className="mt-auto py-12 bg-white border-t border-slate-200">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="relative h-8 w-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image 
                    src="/logo.png" 
                    alt="Logo HortSoy" 
                    fill 
                    style={{ objectFit: 'contain', objectPosition: 'left center' }} 
                  />
                </div>
                <span className="text-sm text-slate-400 font-medium">Bazar Interno</span>
            </div>
            <div className="text-center text-sm font-medium text-slate-400">
              &copy; {new Date().getFullYear()} HortSoy. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
