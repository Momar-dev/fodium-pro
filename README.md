# FODIUM PRO — Console d'Organisation & Opérations Événementielles

> Espace SaaS professionnel B2B de l'écosystème Fodium, conçu pour les producteurs de spectacles, organisateurs de festivals et régisseurs d'événements au Sénégal et en Afrique de l'Ouest.

---

## 1. Présentation & Vision Produit

**Fodium Pro** est le pendant professionnel de la billetterie grand public Fodium. 

Alors que Fodium Public est orienté spectateur (**Découvrir → Choisir → Acheter → Participer**), **Fodium Pro** répond à l'ensemble du cycle de vie opérationnel d'un organisateur :


L'application allie la rigueur d'un outil d'exploitation et la fluidité d'un produit SaaS contemporain, pensé pour le terrain (smartphones des régisseurs et agents) comme pour le bureau (tablettes et ordinateurs des directeurs de production).

---

## 2. Distinction Fondamentale : Accueil vs. Tableau de Bord

Fodium Pro applique une séparation nette entre l'opérationnel immédiat et l'analyse stratégique :

| Dimension | **Accueil Opérationnel (`/`)** | **Tableau de Bord Analytique (`/analytics`)** |
| :--- | :--- | :--- |
| **Question centrale** | *"Que se passe-t-il actuellement dans mon activité ?"* | *"Comment mon activité performe-t-elle ?"* |
| **Temporalité** | Présent & Direct (J-J / Heure par heure) | Rétrospectif & Stratégique (Mois, Trimestre, Année) |
| **Contenu clé** | Événement phare actif (**WALO UP 2026**), alertes immédiates, flux des dernières ventes, état des agents de scan | CA consolidé, mix des paiements (Wave vs OM vs CB), performance des canaux, rentabilité |
| **Action attendue** | Réagir (débloquer un quota, affecter un agent, valider un vendeur) | Décider (ajuster la politique tarifaire, réallouer le budget) |

---

## 3. Périmètre Fonctionnel Implémenté

### 3.1. Choix de l'Univers (`/welcome`)
- Présentation contrastée des 2 univers métier :
  - **Fodium Événement** : Billetterie, équipes, vendeurs, partenaires, contrôle d'accès *(Actif & Opérationnel)*.
  - **Fodium Transport** : Flottes de navettes événementielles, lignes directes *(Bientôt disponible avec modal explicatif)*.

### 3.2. Authentification & Sécurité (`/login` & `/pin-unlock`)
- **Connexion classique** : Identifiant (email ou téléphone) + mot de passe sécurisé + parcours mot de passe oublié.
- **Continuer avec Google** : Simulation fluide du parcours SSO Google pour le compte `Momar Diop · Kanzey Media`.
- **Déverrouillage rapide par PIN 4 chiffres** : Pavé tactile et écoute clavier physique pour réactiver rapidement une session sur le terrain sans retaper ses identifiants complets (code par défaut : `2026`).

### 3.3. Navigation & Bouton Central d'Action `+`
- **Mobile-first** : Bottom navigation ergonomique à 5 points avec bouton central `+` surélevé et contrasté.
- **Desktop/Tablette** : Sidebar professionnelle complète avec sélecteur d'organisation (`Kanzey Media Group`), raccourcis et verrouillage instantané.
- **Action Sheet / Bottom Sheet modal** : Déclenche les 5 actions métier majeures :
  1. **Créer un événement** (titre, lieu, ville, date, jauge, tarification Standard/VIP).
  2. **Demander des billets physiques** (carnets avec bande holographique et QR code infalsifiable, points relais Dakar/Dagana).
  3. **Ajouter un vendeur** (nom, contact Wave/OM, quota de billets, commission en %).
  4. **Ajouter un agent de contrôle** (matricule, contact, porte d'accès assignée).
  5. **Ajouter un partenaire** (avec les 8 catégories réglementaires du cahier des charges).

### 3.4. Gestion d'Événement Cockpit (`/events/:id`)
Interface dédiée à un événement précis (ex: **WALO UP 2026** à Dagana) organisée en 9 onglets spécialisés :
1. **Vue d'ensemble** : Jauge de remplissage (742 / 1 000), alertes, KPIs financiers.
2. **Billetterie** : Suivi des Pass Standard (2 000 F), VIP (5 000 F) et Carré Or (10 000 F).
3. **Finances & Dépenses** : CA brut (1 860 000 FCFA), ventilation Wave/OM/CB, postes de dépenses (scène, sono, sécurité, redevance SODAV), calcul de marge nette.
4. **Équipe & Accès** : Rôles d'administration et permissions des collaborateurs.
5. **Vendeurs physiques** : Suivi des points relais avec compteurs de vente individuels.
6. **Agents de contrôle** : Supervision des terminaux de scan, affectation aux portes (Ouest, VIP Nord, Est).
7. **Partenaires & Stands** : Classement par catégorie (*Sponsor, Exposant, Média, Institution, Prestataire, Restauration, Sécurité, Technique*).
8. **Contrôle d'accès** : Métriques jour J (742 scannés, 6 anomalies détectées, pic 21h-22h).
9. **Documents & Rapport** : Bordereau officiel SODAV et rapport financier certifié téléchargeables.

---

## 4. Stack Technique & Architecture

- **React 19** + **TypeScript**
- **Vite** (bundler rapide, build optimisé)
- **Tailwind CSS v4** (design system utilitaire, charte sombre pro `#0B0F17` / `#121824`)
- **React Router v7** (routage déclaratif et sous-navigation)
- **Motion (Framer Motion)** (transitions fluides, micro-interactions, bottom sheet tactile)
- **Lucide React** (icônes métier vectorielles)

### Arborescence du Code

```text
src/
├── types/
│   └── index.ts                 # Types stricts (ProEvent, Vendor, Agent, Partner, etc.)
├── data/
│   └── mockData.ts              # Données mockées réalistes (WALO UP 2026, ventes, dépenses)
├── context/
│   ├── AuthContext.tsx          # Gestion session, Google simulé, verrouillage PIN
│   └── ProDataContext.tsx       # State management réactif des événements et actions
├── components/
│   ├── layout/
│   │   └── ProLayout.tsx        # Shell de l'application (Sidebar + TopNav + MobileNav)
│   ├── navigation/
│   │   ├── DesktopSidebar.tsx   # Sidebar enrichie pour grands écrans
│   │   ├── TopNavbar.tsx        # Barre d'état, fil d'Ariane et verrouillage
│   │   └── MobileBottomNav.tsx  # Barre basse tactile avec bouton central +
│   ├── actions/
│   │   ├── QuickActionModal.tsx # Action Sheet central déclenché par le bouton +
│   │   ├── CreateEventModal.tsx # Formulaire guidé de création d'événement
│   │   ├── PhysicalTicketModal.tsx # Commande de carnets sécurisés
│   │   ├── AddVendorModal.tsx   # Enregistrement vendeur & quota
│   │   ├── AddAgentModal.tsx    # Accréditation agent de scan
│   │   └── AddPartnerModal.tsx  # Ajout partenaire (8 catégories)
│   └── ui/
│       ├── Modal.tsx            # Fenêtre modale accessible & responsive
│       ├── StatCard.tsx         # Cartes d'indicateurs standardisées
│       └── StatusBadge.tsx      # Badges de statut sémantiques (En vente, Terminé, etc.)
├── pages/
│   ├── UniverseSelection.tsx    # Écran de sélection d'univers (Événement vs Transport)
│   ├── Login.tsx                # Authentification classique & Google simulé
│   ├── PinUnlock.tsx            # Déverrouillage tactile par code PIN 4 chiffres
│   ├── OperationalHome.tsx      # Accueil opérationnel temps réel
│   ├── EventsList.tsx           # Répertoire de tous les événements
│   ├── EventManagement.tsx      # Cockpit complet de gestion d'un événement
│   ├── AnalyticsDashboard.tsx   # Tableau de bord analytique consolidé
│   └── Profile.tsx              # Organisation Kanzey Media & préférences
├── App.tsx                      # Configuration des routes protégées
└── main.tsx                     # Point d'entrée de l'application
```

---

## 5. Précisions sur les Données Mockées & Limites

Conformément au cahier des charges :
* **Aucun backend réel ni base de données SQL n'est connecté.** Toutes les données sont mockées côté frontend et réactives en mémoire / `localStorage`.
* **Les ajouts d'événements, vendeurs, agents, partenaires et demandes de billets physiques sont réellement reflétés dans l'application** au cours de votre session.
* **Les paiements Wave / Orange Money et les scans QR sont simulés**, démontrant la chaîne de valeur sans exposer de secrets d'API bancaires.
* **Le module Fodium Transport** est volontairement positionné en « Bientôt disponible » pour respecter les priorités du produit.

---

## 6. Lancement en Local

```bash
# 1. Installer les dépendances
npm install --legacy-peer-deps

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```
