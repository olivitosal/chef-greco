# Chef Mattia Greco — Sito Web

Clone statico (HTML/CSS/JS, nessuna build necessaria) del sito portfolio di
Chef Mattia Greco: hero, filosofia, galleria piatti con filtri e scheda
dettaglio, timeline esperienze, contatti.

## 🚀 Come pubblicarlo su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `mattia-greco-chef`).
2. Carica **tutto** il contenuto di questa cartella nella root del repository
   (non in una sottocartella), mantenendo la struttura:
   ```
   index.html
   css/style.css
   js/script.js
   images/...
   ```
3. Vai su **Settings → Pages** nel repository.
4. In "Branch" seleziona `main` (o `master`) e cartella `/ (root)`, poi Save.
5. Dopo 1-2 minuti il sito sarà online su:
   `https://<tuo-utente>.github.io/mattia-greco-chef/`

Puoi anche fare doppio click su `index.html` per vederlo funzionare
localmente nel browser, senza bisogno di un server.

## 🖼️ Sostituire le immagini con le tue foto reali

Ho generato dei **placeholder grafici** (SVG, leggeri, colorati secondo la
palette del sito) al posto delle fotografie originali, che appartengono al
sito del cliente e non potevo riprodurre. Per completare il sito, sostituisci
questi file con le tue foto **mantenendo lo stesso nome** (puoi usare anche
`.jpg`/`.png`: basta aggiornare l'estensione nel relativo `src=""`
nell'HTML/JS):

| File da sostituire                     | Dove appare                         | Dimensioni consigliate |
|-----------------------------------------|--------------------------------------|-------------------------|
| `images/hero-chef.svg`                  | Foto grande in home (hero)           | 900×950 px             |
| `images/philosophy-main.svg`            | Foto grande sezione "Filosofia"      | 700×850 px             |
| `images/philosophy-small.svg`           | Foto piccola sovrapposta             | 380×320 px             |
| `images/dishes/gamberoni.svg`           | Card "Gamberoni alla Brace"          | 700×700 px             |
| `images/dishes/burrata.svg`             | Card "Burrata & Pomodorini"          | 700×700 px             |
| `images/dishes/spaghetti.svg`           | Card "Spaghetti al Pomodoro"         | 700×700 px             |
| `images/dishes/risotto.svg`             | Card "Risotto al Tartufo"            | 700×700 px             |
| `images/dishes/branzino.svg`            | Card "Branzino in Crosta"            | 700×700 px             |
| `images/dishes/tagliata.svg`            | Card "Tagliata di Manzo"             | 700×700 px             |
| `images/dishes/tortino.svg`             | Card "Tortino & Gelato"              | 700×700 px             |
| `images/dishes/pannacotta.svg`          | Card "Panna Cotta"                   | 700×700 px             |

> 💡 Se sostituisci le SVG con dei JPG, ricordati di cambiare l'estensione
> nel file `js/script.js` (campo `img:` di ogni piatto) e in `index.html`
> (hero e filosofia).

## ✏️ Modificare i piatti (aggiungere/rimuovere/rinominare)

Tutti i piatti della galleria sono generati automaticamente da un unico
elenco in cima al file `js/script.js`, nell'array `DISHES`. Per aggiungere un
piatto, copia un blocco esistente e modifica i campi:

```js
{
  id: "nome-univoco",
  category: "antipasti", // antipasti | primi | secondi | dessert
  categoryLabel: "Antipasti",
  name: "Nome del piatto",
  description: "Descrizione che appare nella scheda di dettaglio.",
  tags: ["Ingrediente 1", "Ingrediente 2"],
  img: "images/dishes/nome-file.svg"
}
```

Il filtro, la griglia e il modal si aggiornano da soli: non serve toccare
l'HTML.

## 📁 Struttura del progetto

```
mattia-greco-chef/
├── index.html          → struttura di tutte le sezioni della pagina
├── css/
│   └── style.css        → palette colori, tipografia, layout, animazioni
├── js/
│   └── script.js         → dati piatti, filtri, modal, interazioni
├── images/
│   ├── hero-chef.svg
│   ├── philosophy-main.svg
│   ├── philosophy-small.svg
│   └── dishes/            → una immagine per ogni piatto della galleria
└── README.md
```

## 🎨 Design tokens (in `css/style.css`, blocco `:root`)

- **Sfondo crema**: `#faf8f4`
- **Sfondo galleria**: `#f1ede4`
- **Sfondo sezione esperienze**: `#201c1a` (scuro)
- **Accento terracotta**: `#bf5636`
- **Testo principale**: `#201d19`
- **Font titoli**: Fraunces (serif, Google Fonts)
- **Font testo**: Inter (sans-serif, Google Fonts)

Cambia questi valori per adattare rapidamente i colori a un nuovo brand.

## ✅ Funzionalità incluse

- Header sticky con ombra al passaggio dello scroll + menu mobile animato
- Marquee (testo scorrevole) in loop infinito, in pausa al passaggio del mouse
- Card piatti con hover (zoom immagine, icona "+", titolo che cambia colore)
- Filtro categoria piatti (Tutti / Antipasti / Primi / Secondi / Dessert)
- Modal scheda piatto con ingredienti, apertura/chiusura con tasto Esc,
  overlay cliccabile, gestione del focus per accessibilità
- Timeline verticale con evidenziazione automatica della tappa visibile
- Pulsante "copia email" negli appunti con conferma visiva
- Pulsante "torna in cima" che appare durante lo scroll
- Completamente responsive (desktop, tablet, mobile)
- Rispetta `prefers-reduced-motion` per chi disabilita le animazioni

---
Generato come clone fedele della struttura, dei contenuti e delle
interazioni osservate nel video del sito originale.
