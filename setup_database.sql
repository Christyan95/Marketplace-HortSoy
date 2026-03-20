-- HortSoy Marketplace - Database Setup (Quote Syntax)
-- Standard: XXXX_YYYY (3 or 4 characters)

CREATE TABLE IF NOT EXISTS "INVE_HORT" (
    "IDEN_ITEM" SERIAL PRIMARY KEY,
    "NAME_ITEM" VARCHAR(255) NOT NULL,
    "BRAN_NAME" VARCHAR(100) NOT NULL,
    "CATE_NAME" VARCHAR(100) NOT NULL,
    "COND_TYPE" VARCHAR(50) NOT NULL,
    "VALU_PRIC" DECIMAL(12, 2) NOT NULL,
    "ORIG_PRIC" DECIMAL(12, 2),
    "IMAG_URLS" TEXT,
    "DESC_TEXT" TEXT,
    "STOC_AMOU" INTEGER DEFAULT 1,
    "DATE_CREA" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "DATE_UPDA" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for performance on common filters
CREATE INDEX "IDX_CATE_HORT" ON "INVE_HORT"("CATE_NAME");
CREATE INDEX "IDX_NAME_HORT" ON "INVE_HORT"("NAME_ITEM");

-- Initial Inventory Data (Explicit IDs are used for the Marketplace)
INSERT INTO "INVE_HORT" ("IDEN_ITEM", "NAME_ITEM", "BRAN_NAME", "CATE_NAME", "COND_TYPE", "VALU_PRIC", "ORIG_PRIC", "IMAG_URLS", "DESC_TEXT", "STOC_AMOU") VALUES 
(25, 'Pulverizador 2500 Star', 'Jacto', 'Pulverizadores', 'Usado', 290000.00, 0.00, './public/img/1.jpeg', 'Ano: 2008, Cor: Laranja, Tração: 4x4', 1),
(26, 'Plantadeira Terraçus 15.000', 'Planticenter', 'Plantadeiras', 'Usado', 110000.00, 0.00, './public/img/4.jpeg', 'Ano: 2018, Modelo: T15000, G3', 1),
(27, 'Plantadeira PST Duo 14L', 'Tatu', 'Plantadeiras', 'Usado', 270000.00, 0.00, './public/img/2.jpeg', 'Ano: 2016', 1),
(28, 'Plantadeira Hitech', 'Valtra', 'Plantadeiras', 'Usado', 110000.00, 0.00, './public/img/6.jpeg', 'Ano: 2018, Modelo H1005, 10 linhas, Espaçamento: 45–50 cm, Reservatório: ~ 1.420 L, Sementes: ~ 650 L, Potência mínima: 120 cv', 1),
(29, 'Distribuidor de Sólidos Fertizer 1300M', 'Valtra', 'Distribuidores', 'Usado', 12000.00, 0.00, './public/img/3.jpeg', '', 1),
(30, 'Distribuidor de Sólidos Lancer 7.500', 'Jan', 'Distribuidores', 'Usado', 55000.00, 0.00, './public/img/5.jpeg', 'Ano: 2018', 1),
(31, 'Pulverizador Auto Propelido 4630', 'John Deere', 'Pulverizadores', 'Usado', 680000.00, 0.00, './public/img/7.jpeg', '', 1);
