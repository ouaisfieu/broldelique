# Broldélique — *La citoyenneté, c'est le brol*

Revue critique en ligne sur la démocratie belge et l'exercice de la citoyenneté.
Site statique **JAMstack sans étape de build** : du HTML sémantique, une feuille de style, un script d'amélioration progressive. Aucun framework, aucune dépendance, aucune ressource tierce.

**En ligne :** <https://ouaisfieu.github.io/broldelique/>

## Contenu

| Chemin | Contenu |
|---|---|
| `/` | Une : édito en « courrier administratif », chiffres clés, dossiers, verdict, chronologie express, FAQ |
| `/brol/` | 01 · Essai — La citoyenneté, c'est le brol |
| `/particratie/` | 02 · Le parti a toujours raison |
| `/labyrinthe/` | 03 · 615 jours, mode d'emploi |
| `/isoloir/` | 04 · L'isoloir à deux vitesses |
| `/defiance/` | 05 · Le grand désamour |
| `/etat-de-droit/` | 06 · L'État qui ne paie pas ses astreintes |
| `/tirage-au-sort/` | 07 · Le hasard, dernier recours |
| `/debroller/` | 08 · Débroller : dix propositions |
| `/chiffres/` | Tableau de bord sourcé + données ouvertes (`/donnees/*.csv`, `*.json`) |
| `/chronologie/` | 1831 → 2026 |
| `/lexique/` | Lexique filtrable (42 entrées) |
| `/sources/` | Toutes les sources, dossier par dossier |
| `/a-propos/` | Auteur, méthode, corrections, vie privée, licence |

## Publier sur GitHub Pages

1. Pousser le contenu de ce dossier à la racine de la branche `main` du dépôt `ouaisfieu/broldelique`.
2. *Settings → Pages → Build and deployment* : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le fichier `.nojekyll` désactive le traitement Jekyll : les fichiers sont servis tels quels.

## SEO et web sémantique

- Chaque page : `<title>` et `meta description` dédiés, URL canonique, Open Graph + Twitter Card avec image 1200×630 propre à la page (`assets/img/og/`), `hreflang` fr-BE.
- JSON-LD schema.org en `@graph` : `WebSite`, `Organization` (collectif), `Person` (auteur), `WebPage`, `BreadcrumbList`, puis selon la page `OpinionNewsArticle` (avec `citation`, `about`, `wordCount`…), `FAQPage`, `DefinedTermSet`, `ItemList` d'`Event`, `Dataset` (+ `DataDownload`), `CollectionPage`, `AboutPage`.
- `sitemap.xml` (avec images), flux Atom `feed.xml`, `manifest.webmanifest`, `llms.txt`, `humans.txt`.
- **Important — site de projet GitHub :** les robots ne lisent `robots.txt` qu'à la racine du domaine (`ouaisfieu.github.io/robots.txt`). Le `robots.txt` de ce dossier ne sera donc pris en compte qu'avec un domaine personnalisé. En attendant, déclarez `https://ouaisfieu.github.io/broldelique/sitemap.xml` dans Google Search Console et Bing Webmaster Tools, ou ajoutez une ligne `Sitemap:` au `robots.txt` du dépôt `ouaisfieu.github.io`.
- **Domaine personnalisé :** remplacer `https://ouaisfieu.github.io/broldelique/` par la nouvelle URL dans tous les fichiers (rechercher/remplacer), ainsi que `/broldelique/` dans `404.html` et `manifest.webmanifest`, puis ajouter un fichier `CNAME`.

## Modifier le site

Tout est en HTML statique : ouvrez la page concernée et éditez-la directement. L'en-tête et le pied de page sont répétés dans chaque fichier (c'est le prix du « sans build ») ; pour une modification globale, utilisez un rechercher/remplacer sur l'ensemble du dossier. Pensez à mettre à jour `dateModified` dans le JSON-LD et `<lastmod>` dans `sitemap.xml`.

## Accessibilité et vie privée

Lien d'évitement, repères ARIA, sommaire, contrastes vérifiés en thèmes clair et sombre, graphiques doublés d'un tableau de données, navigation clavier, `prefers-reduced-motion`, feuille d'impression. Aucun cookie ni traceur ; seule la préférence de thème est stockée localement.

## Auteur et licence

Textes rédigés par **Claude** (IA, Anthropic) à partir d'un corpus fourni par un collectif anonyme, recoupé par une recherche documentaire (septembre 2026). Textes et données sous licence **CC BY-SA 4.0** (voir `LICENSE.md`).
Corrections et contre-arguments bienvenus via les *issues* du dépôt.
