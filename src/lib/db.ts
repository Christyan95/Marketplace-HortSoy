import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

/**
 * Senior Master Database Client Singleton (Prisma 7.5.0)
 * Using the PG Driver Adapter to solve initialization and engine binary 
 * conflicts in Next.js Turbopack.
 */

// We use any for the pool to avoid type-mismatch conflicts between 
// @types/pg and @prisma/adapter-pg expectations.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('FATAL: DATABASE_URL is not defined in environment variables.');
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
