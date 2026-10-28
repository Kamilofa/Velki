-- ========================================================
-- Territoires Gourmands - Schéma PostgreSQL pour Supabase
-- Table 'commandes' pour la gestion des commandes de Douala
-- ========================================================

CREATE TABLE IF NOT EXISTS public.commandes (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_quartier TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_instructions TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL, -- 'orange_money', 'momo', 'cash'
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'cash_on_delivery'
    status TEXT NOT NULL DEFAULT 'recue', -- 'recue', 'en_cuisine', 'en_livraison', 'livree'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_commandes_customer_phone ON public.commandes(customer_phone);
CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON public.commandes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commandes_status ON public.commandes(status);

-- Activer Row Level Security (RLS)
ALTER TABLE public.commandes ENABLE ROW LEVEL SECURITY;

-- Politique d'insertion publique (les clients peuvent passer commande sans compte préalable)
CREATE POLICY "Les clients peuvent insérer une commande"
ON public.commandes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Politique de lecture pour la vérification de sa commande
CREATE POLICY "Lecture des commandes"
ON public.commandes
FOR SELECT
TO anon, authenticated
USING (true);
