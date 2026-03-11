'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  MousePointerClick, 
  MapPin, 
  Tag, 
  Check, 
  Info, 
  ShieldCheck,
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { supabase, Product } from '@/lib/supabase';

export default function Home() {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [interestedItem, setInterestedItem] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const { data, error } = await supabase
          .from('inventory')
          .select('id, name, brand, category, condition, price, originalPrice:original_price, image, description');
        
        if (error) throw error;
        if (data) setInventory(data as Product[]);
      } catch (err) {
        toast.error('Erro de conexão', { description: 'Não foi possível carregar os dados do painel.' });
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
  }, []);

  const categories = ['Todos', ...Array.from(new Set(inventory.map(item => item.category)))];

  const filteredBaseItems = inventory.filter(item => {
    const matchesCategory = filter === 'Todos' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredItems = filteredBaseItems.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const handleShowAll = () => {
    setVisibleCount(filteredBaseItems.length);
  };

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
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <main className="flex-1 w-full bg-slate-50 relative pb-16 md:pb-24">

      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-screen">
        <div className="absolute w-[500px] md:w-[800px] h-[500px] md:h-[800px] top-[-20%] left-[-10%] bg-gradient-radial from-[var(--color-primary-light)] to-transparent rounded-full opacity-50 blur-3xl" />
        <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bottom-10 right-[-5%] bg-gradient-radial from-[var(--color-primary)]/10 to-transparent rounded-full opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white,transparent_70%)] opacity-30" />
      </div>



      {/* ════════════════════════════════════════════════ */}
      {/* CATALOG SECTION                                 */}
      {/* ════════════════════════════════════════════════ */}
      <section id="produtos" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-20 pb-8 md:pb-16 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 sm:space-y-6 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de Produtos
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto md:mx-0">
              Explore os itens disponíveis atualmente. Os estoques são limitados a 1 unidade por produto listado.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/70">
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 w-full">
            <Loader2 className="h-10 w-10 md:h-12 md:w-12 text-[var(--color-primary)] animate-spin mb-4" />
            <p className="text-sm md:text-base text-slate-500 font-bold tracking-wide animate-pulse">CARREGANDO ESTOQUE...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.article
                  key={item.id}
                  aria-labelledby={`product-title-${item.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-slate-100">
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-md text-slate-800 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm">
                        {item.category}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm">
                        {item.condition}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-1 bg-white">
                    <div className="text-[10px] sm:text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-2">
                      {item.brand}
                    </div>
                    <h3 id={`product-title-${item.id}`} className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-2 sm:mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 flex-1 leading-relaxed font-medium line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 line-through mb-0.5">
                          Original: {formatPrice(item.originalPrice)}
                        </p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleInterest(item.id, item.name, item.price)}
                        aria-pressed={interestedItem.includes(item.id)}
                        className={`flex items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl font-extrabold shadow-sm transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 ${
                          interestedItem.includes(item.id)
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30 scale-105' 
                          : 'bg-slate-100 text-slate-600 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)] group-hover:text-white'
                        }`}
                        title={interestedItem.includes(item.id) ? "Adicionado aos interesses" : "Demonstrar Interesse"}
                      >
                        {interestedItem.includes(item.id) ? (
                          <Check className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3px]" aria-hidden="true" />
                        ) : (
                          <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2px]" aria-hidden="true" />
                        )}
                      </button>
                    </div>

                    {interestedItem.includes(item.id) && (
                      <motion.div 
                        key={`reserva-${item.id}`}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3"
                      >
                        <div className="bg-emerald-100 p-1 sm:p-1.5 rounded-full text-emerald-600"><Check className="h-3 w-3 sm:h-4 sm:w-4" /></div>
                        Pedido de reserva registrado provisoriamente.
                      </motion.div>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 md:py-32 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 shadow-sm mt-6">
            <div className="bg-slate-100 p-4 sm:p-6 rounded-full mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium text-center px-6">Não há itens correspondentes aos filtros selecionados no momento.</p>
            <button 
              onClick={() => { setFilter('Todos'); setSearch(''); }}
              className="mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && visibleCount < filteredBaseItems.length && (
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 sm:mt-12 md:mt-16 py-4">
            <button 
              onClick={handleShowMore}
              className="px-6 sm:px-8 py-3 bg-white border border-slate-200 text-[var(--color-primary)] text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all duration-300 w-full sm:w-auto"
            >
              Mostrar mais 9
            </button>
            <button 
              onClick={handleShowAll}
              className="px-6 sm:px-8 py-3 bg-slate-100 border border-transparent text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 w-full sm:w-auto"
            >
              Mostrar tudo
            </button>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* RULES / HOW IT WORKS SECTION                    */}
      {/* ════════════════════════════════════════════════ */}
      <section id="sobre" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-24 scroll-mt-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          
          {/* Subtle bg */}
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[var(--color-primary-light)] rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-8 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Regras do Marketplace
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium mb-6 sm:mb-10 leading-relaxed">
                Nossa iniciativa visa repassar nossos equipamentos em desuso primeiramente para nosso time, garantindo benefícios tangíveis. 
                Siga os passos ao lado para adquirir seu equipamento.
              </p>
              <div className="hidden lg:block">
                <Image src="/logo.png" alt="Logo HortSoy" width={130} height={45} className="opacity-80 drop-shadow-sm grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                { title: "Consulta & Reserva", desc: "Demonstre interesse nos itens clicando no botão do produto. Isso gera uma intenção de compra, mas não a garante imediatamente.", icon: MousePointerClick, color: "bg-blue-50 text-blue-600 border-blue-100" },
                { title: "Contato do RH", desc: "A equipe administrativa receberá sua intenção e entrará em contato por e-mail corporativo em até 48h para formalizar a reserva.", icon: Info, color: "bg-amber-50 text-amber-600 border-amber-100" },
                { title: "Pagamento", desc: "O pagamento é realizado via PIX diretamente para a conta da empresa ou via desconto simbólico em folha (consultar RH).", icon: Tag, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                { title: "Retirada", desc: "Após a quitação, o colaborador deve se dirigir à portaria da sede no prazo de 7 dias úteis com o termo de retirada assinado.", icon: MapPin, color: "bg-purple-50 text-purple-600 border-purple-100" },
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border ${step.color}`}>
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* FAQ SECTION (DÚVIDAS)                           */}
      {/* ════════════════════════════════════════════════ */}
      <section id="contato" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-24 scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Dúvidas Frequentes
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-2xl">
            Tudo o que você precisa saber sobre o funcionamento do nosso Marketplace interno.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Quem pode comprar no Marketplace?",
              a: "O acesso e a compra são exclusivos para colaboradores ativos da HortSoy. Não é permitida a venda para pessoas externas."
            },
            {
              q: "Os produtos possuem garantia?",
              a: "Os produtos são vendidos no estado em que se encontram. Equipamentos eletrônicos são testados antes da entrega, mas por serem itens de desuso corporativo, não possuem garantia estendida."
            },
            {
              q: "Como é definido o valor dos produtos?",
              a: "Os valores são calculados com base na depreciação contábil e estado de conservação, sempre aplicando um subsídio para garantir que o preço seja inferior ao de mercado."
            },
            {
              q: "Posso parcelar a compra?",
              a: "As condições de parcelamento devem ser consultadas diretamente com o RH no momento da formalização da reserva. Geralmente, aceitamos PIX à vista ou desconto em folha."
            },
            {
              q: "Onde retiro meu produto?",
              a: "A retirada deve ser feita na sede da unidade especificada no momento do contato do RH, após a confirmação do pagamento e assinatura do termo de responsabilidade."
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:border-[var(--color-primary)]/30 transition-all duration-300"
            >
              <details className="w-full">
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                  <span className="text-sm md:text-base font-bold text-slate-800 group-hover:text-[var(--color-primary)] transition-colors">
                    {item.q}
                  </span>
                  <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-[var(--color-primary-light)] transition-colors">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-[var(--color-primary)] transition-transform duration-300 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-5 md:px-6 pb-6 text-sm md:text-base text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                  {item.a}
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 md:mt-24 bg-[var(--color-primary)] rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-[var(--color-primary)]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ainda tem alguma dúvida?</h3>
            <p className="text-white/80 font-medium mb-8 max-w-xl mx-auto">
              Nossa equipe administrativa está pronta para te ajudar com qualquer questão sobre o repasse de ativos.
            </p>
            <a 
              href="https://wa.me/553498357625" 
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-primary)] font-black rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-xl"
            >
              Falar com Suporte
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
