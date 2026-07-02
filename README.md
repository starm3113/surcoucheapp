# SeatMap — Coloriseur de plans de salle

## Lancement (une commande)

```bash
node server.js
```

Puis ouvre **http://localhost:3333** dans ton navigateur.
Pas besoin de clé API — tout fonctionne en local.

---

## Utilisation

1. **Sélectionne la salle** dans le menu en haut
2. **Définis les correspondances couleurs** dans la sidebar :
   - Clique sur le carré couleur pour picker la couleur exacte du plan orga
   - Assigne la catégorie DA correspondante
3. **Uploade le plan de l'orga** (PNG ou JPG)
4. Clique **"Coloriser automatiquement"** → l'outil détecte les couleurs et applique ta palette DA
5. **Ajuste** si besoin en cliquant sur les blocs (Shift+clic = sélection multiple)
6. **Exporte le JSON** pour archiver

---

## Ajouter une nouvelle salle

1. Exporte ton SVG Figma avec les IDs de layers activés
2. Crée un dossier `salles/nom-salle/`
3. Place dedans `nom-salle.svg` et `nom-salle.json` (métadonnées des blocs), avec `nom-salle` identique au nom du dossier
4. Ajoute la salle dans `EMBEDDED_SALLES` / `EMBEDDED_DATA` au début du `<script>` de `index.html` (ou recharge via `/api/salles` si tu utilises le serveur)


