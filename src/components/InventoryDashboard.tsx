'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/products';

interface InventoryDashboardProps {
  initialInventory: Product[];
}

export const InventoryDashboard = ({ initialInventory }: InventoryDashboardProps) => {
  const [inventory] = useState<Product[]>(initialInventory);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [interestedItem, setInterestedItem] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(inventory.map(item => item.category)))];
  }, [inventory]);

  const filteredBaseItems = useMemo(() => {
    return inventory.filter(item => {
      const matchesCategory = filter === 'Todos' || item.category === filter;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [inventory, filter, search]);

  const filteredItems = useMemo(() => {
    return filteredBaseItems.slice(0, visibleCount);
  }, [filteredBaseItems, visibleCount]);

  useEffect(() => {
    setVisibleCount(9);
  }, [search, filter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const toggleInterest = (id: number, name: string, price: number) => {
    const isAlreadyInterested = interestedItem.includes(id);

    if (isAlreadyInterested) {
      setInterestedItem(prev => prev.filter(itemId => itemId !== id));
      toast.info(`Interesse removido: ${name}`);
    } else {
      setInterestedItem(prev => [...prev, id]);
      toast.success(`Interesse registrado`, { description: name });

      // WhatsApp Redirect
      const phoneNumber = "553498357625";
      const message = `Olá tenho interesse no produto ${name} pelo valor ${formatPrice(price)}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="w-full">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/70 mb-8 md:mb-12">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar por nome ou marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-xl sm:rounded-2xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all font-medium text-slate-700"
          />
        </div>
        <div className="relative sm:w-48 md:w-56">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none block w-full pl-9 sm:pl-11 pr-8 py-2.5 sm:py-3 border border-slate-200 rounded-xl sm:rounded-2xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all font-bold text-slate-700 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInterested={interestedItem.includes(item.id)}
              onToggleInterest={toggleInterest}
              formatPrice={formatPrice}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 md:py-32 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 shadow-sm">
          <Search className="h-10 w-10 text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-sm text-slate-500 text-center px-6">Não há itens correspondentes no momento.</p>
          <button
            onClick={() => { setFilter('Todos'); setSearch(''); }}
            className="mt-6 px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredItems.length > 0 && visibleCount < filteredBaseItems.length && (
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 mt-12 md:mt-16">
          <button
            onClick={() => setVisibleCount(prev => prev + 9)}
            className="px-8 py-3 bg-white border border-slate-200 text-[var(--color-primary)] text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all duration-300 w-full sm:w-auto"
          >
            Mostrar mais 9
          </button>
          <button
            onClick={() => setVisibleCount(filteredBaseItems.length)}
            className="px-8 py-3 bg-slate-100 border border-transparent text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 w-full sm:w-auto"
          >
            Mostrar tudo
          </button>
        </div>
      )}
    </div>
  );
};
