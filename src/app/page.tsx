import { Suspense } from 'react';
import { MousePointerClick, MessageCircle, Search, Loader2 } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { InventoryDashboard } from '@/components/InventoryDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 1 minute

export default async function Home() {
  const initialInventory = await getProducts();

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
        </div>

        {/* Dashboard Component */}
        <Suspense fallback={<DashboardLoading />}>
          <InventoryDashboard initialInventory={initialInventory} />
        </Suspense>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* RULES / HOW IT WORKS SECTION                    */}
      {/* ════════════════════════════════════════════════ */}
      <section id="sobre" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-24 scroll-mt-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[var(--color-primary-light)] rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-8 items-start">
            <div className="lg:w-1/3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Marketplace
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium mb-6 sm:mb-10 leading-relaxed">
                Nossa iniciativa visa repassar nossos equipamentos em desuso primeiramente para nosso time, garantindo benefícios tangíveis.
                Siga os passos ao lado para adquirir seu equipamento.
              </p>
            </div>

            <div className="w-full lg:w-2/3 flex justify-start">
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200/60 hover:shadow-lg transition-all duration-300 max-w-lg">
                <div className="grid grid-cols-1 gap-6">
                  <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 mb-2">
                    <MousePointerClick className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Negocie / Demonstre interesse</h3>
                    <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                      Demonstre interesse nos itens clicando no botão do produto. Isso iniciará uma conversa direta para negociação e reserva, mas não a garante imediatamente. A reserva definitiva ocorre após o alinhamento com nossa equipe administrativa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
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
              href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_SUPPORT_TEXT || '')}`}
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

function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-32 w-full">
      <Loader2 className="h-10 w-10 md:h-12 md:w-12 text-[var(--color-primary)] animate-spin mb-4" />
      <p className="text-sm md:text-base text-slate-500 font-bold tracking-wide animate-pulse uppercase">CARREGANDO ESTOQUE...</p>
    </div>
  );
}
