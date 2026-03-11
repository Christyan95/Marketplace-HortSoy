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

  // Reset pagination when searching
  // Keeping this effect import compatible
  useEffect(() => {
    setVisibleCount(9);
  }, [search, filter]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const toggleInterest = (id: number, name: string) => {
    setInterestedItem(prev => {
      if (prev.includes(id)) {
        toast.info(`Interesse removido: ${name}`);
        return prev.filter(itemId => itemId !== id);
      } else {
        toast.success(`Interesse registrado`, {
          description: name,
        });
        return [...prev, id];
      }
    });
  };

  return (
    <main className="flex-1 w-full bg-slate-50 relative pb-32">
      {/* Decorative Grid Background - Ultra Modern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-screen">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply"></div>
        <div className="absolute w-[800px] h-[800px] top-[-20%] left-[-10%] bg-gradient-radial from-[var(--color-primary-light)] to-transparent rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute w-[600px] h-[600px] bottom-10 right-[-5%] bg-gradient-radial from-[var(--color-primary)]/10 to-transparent rounded-full opacity-40 blur-3xl"></div>
        
        {/* Modern Dot Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white,transparent_70%)] opacity-30"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full pt-32 pb-24 px-6 lg:px-12 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Header Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center rounded-full border border-[var(--color-primary)]/20 bg-white/70 backdrop-blur-md px-4 py-2 text-sm font-semibold text-[var(--color-primary)] mb-8 shadow-sm">
              <ShieldCheck className="mr-2 h-[18px] w-[18px] text-[var(--color-primary)]" strokeWidth={2.5} />
              <span className="tracking-wide uppercase text-xs">Acesso Restrito a Colaboradores</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Oportunidades <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#005c04]">
                Exclusivas HortSoy
              </span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              Renovação do nosso parque tecnológico e mobiliário. Equipamentos criteriosamente selecionados e revisados, com valores totalmente subsidiados para nosso time interno.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <a href="#produtos" className="group inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-xl shadow-[var(--color-primary)]/20 transition-all duration-300 transform hover:-translate-y-1">
                Acessar Catálogo
                <MousePointerClick className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href="#sobre" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-200 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                <Info className="mr-3 h-5 w-5 text-slate-400" />
                Regras do Bazar
              </a>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Abstract floating cards graphic */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-white shadow-2xl shadow-slate-200/50 rounded-3xl -rotate-6 transform hover:rotate-0 transition-transform duration-700 z-10 border border-slate-100 overflow-hidden">
                <div className="w-full h-48 bg-[#075000]/10 relative">
                  <Image src="/hero_bg.png" alt="Abstrato HortSoy" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="p-8">
                  <div className="h-4 w-1/3 bg-emerald-100 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-8"></div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="h-3 w-16 bg-slate-100 rounded mb-2"></div>
                      <div className="h-8 w-24 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-12 w-32 bg-[var(--color-primary)]/10 rounded-xl"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-white shadow-xl shadow-slate-200/50 rounded-3xl rotate-12 transform hover:rotate-6 transition-transform duration-700 z-0 border border-slate-100/50 -right-20 top-20 scale-90"></div>
              
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-20 z-20 bg-white px-6 py-4 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 flex items-center gap-4"
              >
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><Tag className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Desconto Médio</p>
                  <p className="text-2xl font-black text-slate-800">55% OFF</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Catalog Section */}
      <section id="produtos" className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-12 py-16 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-8 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de Produtos
            </h2>
            <p className="mt-4 text-xl text-slate-600 font-medium">
              Explore os itens disponíveis atualmente. Os estoques são limitados a 1 unidade por produto listado.
            </p>
          </div>

          {/* Filtering & Searching Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-4 rounded-3xl shadow-sm border border-slate-200/70">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar por nome ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex items-center mr-2 text-slate-400">
                <Filter className="h-5 w-5 mr-2" />
                <span className="text-sm font-semibold uppercase tracking-wider">Filtros</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    filter === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 w-full">
            <Loader2 className="h-12 w-12 text-[var(--color-primary)] animate-spin mb-4" />
            <p className="text-slate-500 font-bold tracking-wide animate-pulse">CARREGANDO ESTOQUE...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 gap-y-12">
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
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image Wrapper */}
                <div className="relative h-[280px] w-full overflow-hidden bg-slate-100">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-800 text-xs font-black uppercase tracking-widest shadow-sm">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-[var(--color-primary)] text-white text-xs font-black uppercase tracking-widest shadow-sm">
                      {item.condition}
                    </span>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 relative bg-white">
                  
                  {/* Brand Tag */}
                  <div className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                    {item.brand}
                  </div>
                  
                  <h3 id={`product-title-${item.id}`} className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-base text-slate-500 mb-8 flex-1 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-400 line-through mb-1">
                        Valor Original: {formatPrice(item.originalPrice)}
                      </p>
                      <p className="text-3xl font-black text-slate-900 flex items-center gap-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <button 
                      onClick={() => toggleInterest(item.id, item.name)}
                      aria-pressed={interestedItem.includes(item.id)}
                      className={`relative flex items-center justify-center p-4 rounded-2xl font-extrabold shadow-sm transition-all duration-300 w-16 h-16 ${
                        interestedItem.includes(item.id)
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30 hover:shadow-emerald-500/50 scale-105' 
                        : 'bg-slate-100 text-slate-600 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[var(--color-primary)]/30 group-hover:bg-[var(--color-primary)] group-hover:text-white'
                      }`}
                      title={interestedItem.includes(item.id) ? "Adicionado aos interesses" : "Demonstrar Interesse"}
                    >
                      {interestedItem.includes(item.id) ? (
                        <Check className="h-7 w-7 stroke-[3px]" aria-hidden="true" />
                      ) : (
                        <ShoppingBag className="h-6 w-6 stroke-[2px]" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {interestedItem.includes(item.id) && (
                    <motion.div 
                      key={`reserva-${item.id}`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold p-4 rounded-2xl flex items-center gap-3"
                    >
                      <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600"><Check className="h-4 w-4" /></div>
                        Pedido de reserva registrado provisoriamente.
                    </motion.div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border md:border-dashed border-slate-300 shadow-sm mt-8">
            <div className="bg-slate-100 p-6 rounded-full mb-6">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-slate-500 font-medium">Não há itens correspondentes aos filtros selecionados no momento.</p>
            <button 
              onClick={() => { setFilter('Todos'); setSearch(''); }}
              className="mt-6 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Pagination Buttons Layer */}
        {filteredItems.length > 0 && visibleCount < filteredBaseItems.length && (
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 py-8">
            <button 
              onClick={handleShowMore}
              className="px-8 py-3.5 bg-white border border-slate-200 text-[var(--color-primary)] font-bold rounded-xl shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/30 transition-all duration-300 w-full sm:w-auto"
            >
              Mostrar mais 9
            </button>
            <button 
              onClick={handleShowAll}
              className="px-8 py-3.5 bg-slate-100 border border-transparent text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all duration-300 w-full sm:w-auto"
            >
              Mostrar tudo
            </button>
          </div>
        )}
      </section>

      {/* Como Funciona / Regras Section */}
      <section id="sobre" className="w-full max-w-[90rem] mx-auto px-6 lg:px-12 py-24 scroll-mt-20">
        <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-light)] rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-16 md:gap-8 items-start">
            <div className="md:w-1/3">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Regras do Bazar
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                Nossa iniciativa visa repassar nossos equipamentos em desuso primeiramente para nosso time, garantindo benefícios tangíveis. 
                Siga os passos ao lado para adquirir seu equipamento.
              </p>
              
              <div className="hidden md:block">
                <Image src="/logo.png" alt="Logo HortSoy" width={150} height={50} className="opacity-80 drop-shadow-sm grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Consulta & Reserva", 
                  desc: "Demonstre interesse nos itens clicando no botão do produto. Isso gera uma intenção de compra, mas não a garante imediatamente.", 
                  icon: MousePointerClick,
                  color: "bg-blue-50 text-blue-600 border-blue-100" 
                },
                { 
                  title: "Contato do RH", 
                  desc: "A equipe administrativa receberá sua intenção e entrará em contato por e-mail corporativo em até 48h para formalizar a reserva.", 
                  icon: Info,
                  color: "bg-amber-50 text-amber-600 border-amber-100"
                },
                { 
                  title: "Pagamento", 
                  desc: "O pagamento é realizado via PIX diretamente para a conta da empresa ou via desconto simbólico em folha (consultar RH).", 
                  icon: Tag,
                  color: "bg-emerald-50 text-emerald-600 border-emerald-100"
                },
                { 
                  title: "Retirada", 
                  desc: "Após a quitação, o colaborador deve se dirigir à portaria da sede no prazo de 7 dias úteis com o termo de retirada assinado.", 
                  icon: MapPin,
                  color: "bg-purple-50 text-purple-600 border-purple-100"
                },
              ].map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 border ${step.color}`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
