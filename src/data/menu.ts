import { MenuItem, DeliveryQuartier } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ndole-royal',
    name: 'Ndolé Royal de Douala',
    category: 'plats',
    region: 'Littoral (Sawa)',
    price: 4500,
    description: 'Feuilles amères de vernonia fraîches lavées à la main, pâte d\'arachides douces mijotées, crevettes royales fraîches sautées et viande de bœuf fumée tendre.',
    image: '/src/assets/images/hero_ndole_cameroon_1793227837919.jpg',
    popular: true,
    spicyLevel: 1,
    cookingTime: '25-35 min',
    ingredients: ['Feuilles de ndolé fraîches', 'Arachides blanches', 'Crevettes fraîches de Youpwè', 'Bœuf fumé', 'Ail', 'Oignons sautés', 'Huile raffinée'],
    heritageStory: 'Le plat national par excellence chez les peuples Sawa du Littoral, préparé traditionnellement pour célébrer les grandes retrouvailles familiales et festins côtiers.'
  },
  {
    id: 'poulet-dg',
    name: 'Poulet DG Traditionnel',
    category: 'plats',
    region: 'Plat national (Yaoundé / Ouest)',
    price: 4200,
    description: 'Le plat des Directeurs Généraux : poulet fermier doré au feu, mijoté dans une sauce onctueuse de tomates fraîches, carottes croquantes, haricots verts, poivrons et plantains mûrs dorés.',
    image: '/src/assets/images/poulet_dg_specialty_1793227838069.jpg',
    popular: true,
    spicyLevel: 2,
    cookingTime: '20-30 min',
    ingredients: ['Poulet fermier mariné', 'Plantains mûrs frits', 'Poivrons tricolores', 'Carottes fraîches', 'Épices camerounaises', 'Tomates fraîches', 'Oignons'],
    heritageStory: 'Né dans les années 1980 au Cameroun pour honorer les invités de marque, ce chef-d\'œuvre allie la douceur du plantain mûr au croustillant du poulet sauté aux petits légumes.'
  },
  {
    id: 'poisson-braise',
    name: 'Poisson Braisé de Youpwè',
    category: 'plats',
    region: 'Littoral (Douala)',
    price: 5000,
    description: 'Bar entier frais ou carpe de la Sanaga mariné aux épices du terroir (pébè, rondelles, djansang), braisé à la braise de bois d\'acacia. Servi avec bobolo chaud et piment de Douala.',
    image: '/src/assets/images/poisson_braise_douala_1793227839193.jpg',
    popular: true,
    spicyLevel: 3,
    cookingTime: '30-40 min',
    ingredients: ['Bar frais du littoral', 'Pébè & rondelles pilées', 'Djansang torréfié', 'Ail & gingembre sauvage', 'Huile parfumée', 'Piment rouge frais'],
    heritageStory: 'L\'expérience nocturne mythique des berges du fleuve Wouri et du quai de Youpwè à Douala, où la braise exhale un parfum d\'épices inoubliable.'
  },
  {
    id: 'eru-waterleaf',
    name: 'Eru & Waterleaf des Grands Plateaux',
    category: 'plats',
    region: 'Sud-Ouest & Nord-Ouest',
    price: 4000,
    description: 'Lianes d\'Eru sauvage finement ciselées, feuilles de waterleaf soyeuses, huile de palme vierge dorée, peau de bœuf fumée (kanda), crevettes séchées et poisson fumé.',
    image: '/src/assets/images/hero_ndole_cameroon_1793227837919.jpg', // high-grade fallback visual
    popular: true,
    spicyLevel: 2,
    cookingTime: '25-35 min',
    ingredients: ['Feuilles d\'Eru sauvage', 'Waterleaf fraîche', 'Peau de bœuf kanda', 'Poisson fumé de mer', 'Huile de palme rouge extra vierge', 'Écrevisses séchées'],
    heritageStory: 'Un met ancestral de la forêt équatoriale du Sud-Ouest camerounais, symbole de force et de connexion avec la générosité des terroirs forestiers.'
  },
  {
    id: 'koki-haricots',
    name: 'Koki de Niébé & Huile Rouge',
    category: 'plats',
    region: 'Grand Ouest & Centre',
    price: 3000,
    description: 'Gâteau fondant de graines de niébé blanches battues à la perfection, coloré et parfumé à l\'huile de palme rouge chaude, cuit lentement à l\'étouffée dans des feuilles de bananier.',
    image: '/src/assets/images/poulet_dg_specialty_1793227838069.jpg',
    popular: false,
    spicyLevel: 1,
    cookingTime: '15-20 min',
    ingredients: ['Graines de haricot blanc niébé', 'Huile de palme rouge vierge', 'Piment oiseau entier', 'Eau de source tiède', 'Feuilles de bananier fraîches'],
    heritageStory: 'Plat rituel et d\'accueil chez les Bamiléké et les Bafia, où la texture mousseuse du koki fond sur la langue comme un nuage safrané.'
  },
  {
    id: 'taro-sauce-jaune',
    name: 'Taro Pilé & Sauce Jaune d\'Achu',
    category: 'plats',
    region: 'Grassfields (Nord-Ouest & Ouest)',
    price: 4500,
    description: 'Purée onctueuse et veloutée de tubercules de taro pilés au mortier traditionnel, servie dans un cratère avec sa sauce jaune aux épices médicinales et sel gemme kanwa.',
    image: '/src/assets/images/poisson_braise_douala_1793227839193.jpg',
    popular: false,
    spicyLevel: 2,
    cookingTime: '25-30 min',
    ingredients: ['Taro blanc des montagnes', 'Huile de palme rouge', 'Sel gemme kanwa', 'Épices secrètes d\'Achu (na\'a poh, pébè)', 'Peau de bœuf fumée', 'Piment'],
    heritageStory: 'La reine des sauces camerounaises. Se déguste traditionnellement au doigt dans un grand plat collectif, créant une onde de partage chaleureux.'
  },

  // JUS NATURELS
  {
    id: 'jus-folere',
    name: 'Foléré Royal à la Menthe & Ananas',
    category: 'jus',
    region: 'Grand Nord & Littoral',
    price: 1500,
    volume: '500 ml',
    description: 'Infusion à froid de fleurs d\'hibiscus rouge pourpre récoltées au soleil, sublimée d\'un trait de jus d\'ananas de Penja frais pressé et de feuilles de menthe verte.',
    image: '/src/assets/images/jus_naturels_folere_1793227838590.jpg',
    popular: true,
    ingredients: ['Calices séchés d\'hibiscus sabdariffa', 'Pur jus d\'ananas de Penja', 'Menthe fraîche', 'Clous de girofle', 'Sucre de canne roux bio'],
    heritageStory: 'La boisson rafraîchissante camerounaise par excellence, riche en antioxydants, tonique et gorgée de soleil africain.'
  },
  {
    id: 'jus-gingembre',
    name: 'Pur Jus de Gingembre & Citron Vert',
    category: 'jus',
    region: 'Terroirs du Littoral',
    price: 1500,
    volume: '500 ml',
    description: 'Gingembre camerounais corsé pressé à froid avec jus de citron vert acidulé de Njombé et une pointe de miel sauvage de l\'Adamaoua. Énergisant pur.',
    image: '/src/assets/images/jus_naturels_folere_1793227838590.jpg',
    popular: true,
    ingredients: ['Gingembre frais racine', 'Citrons verts de Njombé', 'Miel sauvage d\'abeilles de l\'Adamaoua', 'Eau minérale filtrée'],
    heritageStory: 'Consommé depuis des générations au Cameroun pour dynamiser le corps et revigorer les papilles après un bon repas épicé.'
  },
  {
    id: 'jus-corossol',
    name: 'Nectar Onctueux de Corossol Sauvage',
    category: 'jus',
    region: 'Zones Forestières du Sud',
    price: 1800,
    volume: '500 ml',
    description: 'Pulpe fraîche de corossol tropical pressée au tamis fin, texture veloutée très douce avec des notes florales et une pointe de vanille naturelle.',
    image: '/src/assets/images/jus_naturels_folere_1793227838590.jpg',
    popular: false,
    ingredients: ['Pulpe de corossol mûr', 'Eau de coco fraîche', 'Gousse de vanille naturelle', 'Zeste de citronnelle'],
    heritageStory: 'Reconnu pour ses vertus apaisantes et son parfum exotique exquis, un joyau des vergers tropicaux camerounais.'
  },
  {
    id: 'jus-baobab-mangue',
    name: 'Cocktail Baobab & Mangue de Maroua',
    category: 'jus',
    region: 'Grand Nord & Savanes',
    price: 1800,
    volume: '500 ml',
    description: 'Le mariage magique du fruit du baobab (pain de singe) riche en vitamines C et calcium, et de mangues sauvages juteuses gorgées de douceur.',
    image: '/src/assets/images/jus_naturels_folere_1793227838590.jpg',
    popular: false,
    ingredients: ['Poudre de pulpe de baobab blanc', 'Purée de mangue fraîche', 'Fleur d\'oranger', 'Sucre de canne léger'],
    heritageStory: 'Le trésor des plaines sahéliennes du Nord Cameroun, une boisson nourrissante et délicieusement douce.'
  },

  // ACCOMPAGNEMENTS DU TERROIR
  {
    id: 'miondo-artisanal',
    name: 'Miondo Frais Artisanal (6 bâtons)',
    category: 'accompagnements',
    region: 'Littoral (Douala)',
    price: 1000,
    description: 'Fins rubans de pâte de manioc fermentée, enveloppés et cuits à la vapeur dans des feuilles de marantacée. L\'accompagnement inséparable du Ndolé et du poisson.',
    image: '/src/assets/images/hero_ndole_cameroon_1793227837919.jpg',
    popular: true,
    ingredients: ['Manioc sélectionné', 'Feuilles marantacées végétales traditionnelles']
  },
  {
    id: 'plantains-frits-dodo',
    name: 'Plantains Frits Caramélisés (Dodo)',
    category: 'accompagnements',
    region: 'Cameroun entier',
    price: 1200,
    description: 'Tranches épaisses de bananes plantains mûres frites à cœur jusqu\'à obtenir cette belle couleur ambrée et ce fondant inimitable.',
    image: '/src/assets/images/poulet_dg_specialty_1793227838069.jpg',
    popular: true,
    ingredients: ['Bananes plantains mûres sélectionnées', 'Huile végétale saine', 'Pincée de sel gemme']
  },
  {
    id: 'bobolo-traditionnel',
    name: 'Bobolo Traditionnel de Manioc (4 bâtons)',
    category: 'accompagnements',
    region: 'Centre & Sud (Beti)',
    price: 1200,
    description: 'Gros bâtons de manioc fermenté à la texture ferme et dense, cuits dans de grandes feuilles naturelles. Parfait pour saucer le poisson braisé.',
    image: '/src/assets/images/poisson_braise_douala_1793227839193.jpg',
    popular: false,
    ingredients: ['Manioc fermenté roui', 'Feuilles protectrices naturelles']
  },
  {
    id: 'fufu-manioc',
    name: 'Fufu de Manioc Moelleux',
    category: 'accompagnements',
    region: 'Sud-Ouest & Littoral',
    price: 1000,
    description: 'Boule de fufu chaud et soyeux, travaillée au pilon avec une texture élastique incomparable pour napper l\'Eru ou les sauces à l\'huile rouge.',
    image: '/src/assets/images/hero_ndole_cameroon_1793227837919.jpg',
    popular: false,
    ingredients: ['Farine de manioc traditionnel pure', 'Eau bouillante de source']
  }
];

export const DOUALA_QUARTIERS: DeliveryQuartier[] = [
  { id: 'akwa', name: 'Akwa (Centre des affaires)', fee: 1000, estimatedTime: '25-35 min' },
  { id: 'bonanjo', name: 'Bonanjo (Zone administrative)', fee: 1000, estimatedTime: '25-35 min' },
  { id: 'bonapriso', name: 'Bonapriso & Armée de l\'Air', fee: 1000, estimatedTime: '25-40 min' },
  { id: 'deido', name: 'Deïdo (Rond-point / Rue de la Joie)', fee: 1200, estimatedTime: '30-45 min' },
  { id: 'bali', name: 'Bali & Koumassi', fee: 1200, estimatedTime: '25-40 min' },
  { id: 'makepe', name: 'Makèpè & Rhône Poulenc', fee: 1500, estimatedTime: '35-50 min' },
  { id: 'kotto', name: 'Kotto & Santa Barbara', fee: 1500, estimatedTime: '35-50 min' },
  { id: 'denver', name: 'Bonamoussadi & Denver', fee: 1500, estimatedTime: '35-50 min' },
  { id: 'logpom', name: 'Logpom & Bassong', fee: 1800, estimatedTime: '40-55 min' },
  { id: 'bepanda', name: 'Bépanda & Omnisports', fee: 1400, estimatedTime: '30-45 min' },
  { id: 'bonaberi', name: 'Bonabéri (Quatre-Étages / Ancienne Douane)', fee: 2000, estimatedTime: '45-60 min' },
  { id: 'ndogpassi', name: 'Ndogpassi & Nyalla', fee: 2000, estimatedTime: '45-60 min' }
];

export const BRAND_VALUES = [
  {
    id: 'authenticite',
    title: 'Authenticité',
    quote: 'Sans compromis',
    description: 'Vraies recettes de nos mères et grands-mères, épices rares de Penja, Youpwè et de nos forêts sacrées, sans aucun additif artificiel.'
  },
  {
    id: 'partage',
    title: 'Partage',
    quote: 'La convivialité africaine',
    description: 'Des portions généreuses qui rassemblent collègues, familles et amis autour du plaisir du bien manger camerounais.'
  },
  {
    id: 'terroir',
    title: 'Terroir',
    quote: 'Du champ à l\'assiette',
    description: 'Approvisionnement en circuit court directement auprès de nos pêcheurs du Wouri et planteurs locaux de nos dix régions.'
  },
  {
    id: 'savoir-faire',
    title: 'Savoir-Faire',
    quote: 'L\'art du feu et de la braise',
    description: 'Lente cuisson à l\'étouffée, sauces patiemment tournées à la spatule en bois et braises savamment dosées.'
  },
  {
    id: 'fierte',
    title: 'Fierté',
    quote: 'Notre patrimoine en lumière',
    description: 'Célébrer la grandeur culinaire du Cameroun, berceau de saveurs uniques convoitées dans toute l\'Afrique.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Samuel Eto’o M.',
    location: 'Bonapriso, Douala',
    dish: 'Ndolé Royal & Poisson Braisé',
    text: '« Le Ndolé a exactement le goût de celui que ma grand-mère préparait à New-Bell. Les crevettes sont fraîches, la sauce a du corps, rien à redire. Du très grand art ! »',
    rating: 5
  },
  {
    name: 'Christelle Nkongho',
    location: 'Akwa, Douala',
    dish: 'Poulet DG & Foléré Ananas',
    text: '« Commandé pour un déjeuner d\'affaires au bureau à Akwa. Arrivé encore fumant dans des emballages soignés. Le Foléré frais avec ananas est juste divin. »',
    rating: 5
  },
  {
    name: 'Dr. Jean-Marc Mbida',
    location: 'Denver - Bonamoussadi',
    dish: 'Poisson Braisé de Youpwè',
    text: '« Le goût du poisson braisé de Youpwè directement chez moi à Bonamoussadi sans les embouteillages. L’assaisonnement au pébè et djansang est un chef d\'œuvre. »',
    rating: 5
  }
];
