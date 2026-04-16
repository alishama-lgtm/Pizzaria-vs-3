# Pizzeria Einkaufssystem — Claude Code Regeln

## Auto-Commit nach Änderungen

Nach **jeder erfolgreichen Änderung** an `pizzaria.html` oder `pizzeria.db`:

```bash
git add pizzaria.html pizzeria.db
git commit -m "YYYY-MM-DD: [kurze Beschreibung der Änderung]"
git push
```

- Datum immer im Format `YYYY-MM-DD` (heute: automatisch mit `date`)
- Commit-Nachricht auf Deutsch, max. 72 Zeichen
- Immer pushen — kein lokaler Commit ohne Push

## Projekt-Kontext

- **Datei:** `pizzaria.html` — Single-File App, alles in einer Datei
- **DB:** `pizzeria.db` — SQLite Preishistorie (via better-sqlite3)
- **Shops:** Metro, Billa, Lidl, Spar (österreichische Geschäfte)
- **Business-Passwort:** ali2024
- **GitHub:** https://github.com/alishama-lgtm/pizzeria-einkauf

## Rechnungs-Automatisierung

Wenn Ali sagt **"neue Rechnung von UM Trade"** → schaue automatisch in `rechnungen\um-trade\`
nach der neuesten PDF Datei (alphabetisch letzter Dateiname = neueste).

Wenn Ali sagt **"neue Rechnung von Metro"** → schaue automatisch in `rechnungen\metro\`
nach der neuesten PDF Datei.

Wenn Ali sagt **"neue Rechnung von Etsan"** → schaue automatisch in `rechnungen\etsan\`
nach der neuesten PDF Datei.

Wenn Ali sagt **"neue Rechnung"** ohne Lieferant → frage welcher Lieferant, dann schaue
im passenden Unterordner nach.

Vollständige Ordnerstruktur: `C:\Users\shama\Claude\Pizzaria\rechnungen\`
Details siehe: `rechnungen\RECHNUNGEN.md`

## Agenten-Kollaboration mit Codex

Dieses Projekt verwendet ein **2-Agenten-System**: Claude Code + OpenAI Codex.
Vollständiges Protokoll: siehe `AGENTS.md` im Repo-Root.

**Kurzfassung:**
1. Claude Code → Analyse & Entwurf
2. Codex → Optimierung & Test (Prompt in `CODEX_PROMPT.md`)
3. Claude Code → Finalisierung & Commit

## MCP-Server (aktive Agenten)

Konfiguration liegt in `.mcp.json` im Repo-Root. Claude Code lädt sie automatisch.

| Agent | Zweck | Key-Variable |
|-------|-------|--------------|
| **GitHub** | Issues, PRs, Commits | `GITHUB_TOKEN` |
| **Notion** | Seiten, Datenbanken | `NOTION_API_KEY` |
| **Perplexity** | Web-Suche, Preisrecherche | `PERPLEXITY_API_KEY` |
| **Brave Search** | Angebotssuche | `BRAVE_API_KEY` |

### Einrichtung auf neuem Gerät (Mac)

```bash
# 1. Ins Projekt-Verzeichnis wechseln
cd /pfad/zu/Pizzaria-vs-3

# 2. Umgebungsvariablen setzen (einmalig in ~/.zshrc)
echo 'export NOTION_API_KEY=DEIN_KEY_HIER' >> ~/.zshrc
# PERPLEXITY_API_KEY und BRAVE_API_KEY analog hinzufügen wenn vorhanden

# 3. Aktivieren
source ~/.zshrc

# 4. Claude Code starten — MCP-Server laufen automatisch
claude
```

### Einrichtung auf neuem Gerät (Linux/Server)

```bash
# .env Datei anlegen (wird nicht gepusht — steht in .gitignore)
cp .env.example .env
# Keys in .env eintragen, dann Claude Code starten
```

### Keys holen

- **Notion:** https://www.notion.so/my-integrations → "New integration"
- **Perplexity:** https://www.perplexity.ai/settings/api → "Generate"
- **Brave Search:** https://brave.com/search/api/ → "Get started for free"
- **GitHub:** https://github.com/settings/tokens → "Generate new token"

## Wichtige Regeln

- JavaScript-Variablen mit `let`/`const` NIE inline vor ihrer Deklaration aufrufen (TDZ-Bug!)
- `renderKombisTab()` nur in `DOMContentLoaded` aufrufen, nicht inline
- Alle 10 Panel-IDs müssen existieren: produkte, geschaefte, kombis, suche, upload, verlauf, mitarbeiter, fehlmaterial, checkliste, business
- Nach Änderungen immer Syntax prüfen: `node -e "new Function(script)"`
