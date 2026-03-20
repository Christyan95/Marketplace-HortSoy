'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check } from 'lucide-react';
import Image from 'next/image';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  isInterested: boolean;
  onToggleInterest: (id: number, name: string, price: number) => void;
  formatPrice: (price: number) => string;
}

export const ProductCard = ({ product, isInterested, onToggleInterest, formatPrice }: ProductCardProps) => {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <motion.article
      aria-labelledby={`product-title-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-2 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-slate-100">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-md text-slate-800 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm">
            {product.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm">
            {product.condition}
          </span>
        </div>
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc('/img/placeholder.jpg')}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-1 bg-white">
        <div className="text-[10px] sm:text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">
          {product.brand}
        </div>
        <h3 id={`product-title-${product.id}`} className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-2 sm:mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 flex-1 leading-relaxed font-medium line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            onClick={() => onToggleInterest(product.id, product.name, product.price)}
            aria-pressed={isInterested}
            className={`flex items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl font-extrabold shadow-sm transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 ${isInterested
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30 scale-105'
              : 'bg-slate-100 text-slate-600 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)] group-hover:text-white'
              }`}
            title={isInterested ? "Adicionado aos interesses" : "Demonstrar Interesse"}
          >
            {isInterested ? (
              <Check className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3px]" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2px]" aria-hidden="true" />
            )}
          </button>
        </div>

        {isInterested && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3"
          >
            <div className="bg-emerald-100 p-1 sm:p-1.5 rounded-full text-emerald-600">
              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            Pedido de reserva registrado provisoriamente.
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};
