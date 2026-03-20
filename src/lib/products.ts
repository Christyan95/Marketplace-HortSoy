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

export async function getProducts(): Promise<Product[]> {
  try {
    // Note: After `npx prisma db pull`, Prisma generated the model as `INVE_HORT`
    // with properties `IDEN_ITEM`, `NAME_ITEM`, etc.
    const data = await (prisma as any).iNVE_HORT.findMany({
      orderBy: { IDEN_ITEM: 'asc' },
    });
    
    return data.map((item: any) => ({
      id: Number(item.IDEN_ITEM),
      name: item.NAME_ITEM || '',
      brand: item.BRAN_NAME || '',
      category: item.CATE_NAME || '',
      condition: item.COND_TYPE || '',
      price: Number(item.VALU_PRIC || 0),
      originalPrice: item.ORIG_PRIC ? Number(item.ORIG_PRIC) : 0,
      
      // Senior Master Sanitization:
      // Converts local storage paths (./public/img/...) to Next.js public paths (/img/...)
      // to avoid "Invalid URL" errors in the Image component.
      image: item.IMAG_URLS 
        ? item.IMAG_URLS.replace('./public', '').replace('./', '/') 
        : '/img/placeholder.jpg',
        
      description: item.DESC_TEXT || '',
      stock: item.STOC_AMOU || 0,
    }));
  } catch (error) {
    console.error('Prisma fetch error:', error);
    return [];
  }
}
