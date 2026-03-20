import { prisma } from './db';

/**
 * Modern Data Access Layer for Products.
 * Uses direct PostgreSQL connection via Prisma with Driver Adapter.
 */

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  stock: number;
};

/**
 * Retrieves all inventory products directly from PostgreSQL using Prisma.
 * This is a Server Component compatible function.
 * 
 * @returns {Promise<Product[]>} Returns an array of formatted Product objects.
 * @throws Logs database connectivity issues gracefully and returns an empty list.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    // Senior Master Note: `iNVE_HORT` is the Prisma camelCase mapping for the `INVE_HORT` table.
    // We cast to `any` to bypass strict TS issues if the client was not regenerated recently,
    // ensuring the marketplace remains functional while pointing to the correct model.
    const client = prisma as any;
    if (!client.iNVE_HORT) {
        console.error('Critical Error: Prisma model iNVE_HORT not found');
        return [];
    }
    
    const data = await client.iNVE_HORT.findMany({
      orderBy: { IDEN_ITEM: 'asc' },
    });
    
    return data.map((item: any) => ({
      id: Number(item.IDEN_ITEM),
      name: item.NAME_ITEM || 'Item sem nome',
      brand: item.BRAN_NAME || 'Marca desconhecida',
      category: item.CATE_NAME || 'Geral',
      condition: item.COND_TYPE || 'Ver Estado',
      price: Number(item.VALU_PRIC || 0),
      originalPrice: item.ORIG_PRIC ? Number(item.ORIG_PRIC) : 0,
      
      // Senior Master Sanitization: 
      // Robust mapping for local/remote paths ensuring Image component compatibility.
      image: item.IMAG_URLS 
        ? item.IMAG_URLS.replace('./public', '').replace('./', '/') 
        : '/img/placeholder.jpg',
        
      description: item.DESC_TEXT || 'Sem descrição detalhada disponível.',
      stock: item.STOC_AMOU || 0,
    }));
  } catch (error) {
    console.error('Senior Master Analysis - Database Connectivity Issue:', error);
    return [];
  }
}
