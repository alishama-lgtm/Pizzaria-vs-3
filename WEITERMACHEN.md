# WEITERMACHEN — Pizzeria Einkaufssystem

## Terminal-Befehl zum Starten

```powershell
cd "C:\Users\shama\Claude\Pizzaria\.claude\San Carino\aktuell"
claude "Lies WEITERMACHEN.md und mach weiter."
```

---

## Was wir gemacht haben

### Phase 1 — Vollständige Prüfung ✅
- Alle 10 Panels geprüft: produkte, geschaefte, kombis, suche, upload, verlauf, mitarbeiter, fehlmaterial, checkliste, business
- Vollständige Bug-Liste erstellt

### Phase 2 — Kritische Bug-Fixes ✅
- **API-Key gesichert**: Hardcodierter Anthropic-Key entfernt → jetzt sicher via localStorage (`pizzeria_anthropic_key`)
- **Pizza-Kalkulation**: `bizSavePizzaCalcBtn()` liest DOM-Werte korrekt und speichert in localStorage
- **Shop-Filter**: 7 void(0) Filter-Chips durch echte `sucheSetFilter()` Logik ersetzt
- **Mozzarella-Karte**: Entfernt (war hardcoded, inkonsistent)
- **Set-Objekte**: `SUCHE_STATE.addedIds` von Set auf Array umgestellt (JSON-serialisierbar)
- **renderKombisTab()**: Komplett neu mit Codex optimiert — null-safe, responsive, nur #8B0000 Theme

### Agenten-Setup ✅
- `AGENTS.md` — Kollaborationsprotokoll Claude Code + Codex
- `CODEX_PROMPT.md` — Fertiger Copy-Paste Prompt für Codex
- `CLAUDE.md` — Erweitert mit MCP-Agenten Dokumentation
- `.mcp.json` — MCP-Server Konfiguration (Perplexity, Notion, GitHub, Brave Search)
- `.env.example` — Vorlage für API Keys
- `.gitignore` — Schützt .env vor git

### MCP-Agenten Status
| Agent | Status | Key |
|-------|--------|-----|
| GitHub | ✅ Aktiv | Eingebaut |
| Notion | ✅ Aktiv | setx NOTION_API_KEY gesetzt |
| Perplexity | ✅ Aktiv | Key in .env |
| Brave Search | ❌ Noch kein Key | BRAVE_API_KEY fehlt |

---

## Aktueller Stand: Phase 3 — Verbesserungen pro Panel

### Nächste Aufgaben (in dieser Reihenfolge):

- [ ] **3.1 Kombis-Panel** — Empfehlungsalgorithmus verbessern
- [ ] **3.2 Produkte-Panel** — Bessere Bestandsanzeige
- [ ] **3.3 Upload-Panel** — iPhone/Safari Kompatibilität
- [ ] **3.4 Business-Panel** — Monatsbericht PDF verbessern
- [ ] **3.5 Suche-Panel** — Echte Angebotssuche
- [ ] **3.6 Verlauf-Panel** — Erweiterte Statistiken & Charts
- [ ] **3.7 Fehlmaterial-Panel** — Benachrichtigungen
- [ ] **3.8 Checkliste-Panel** — Erinnerungen / Notifications

---

## Wichtige Infos

- **Branch:** `claude/recommend-compose-apps-Y4zch`
- **Hauptdatei:** `pizzaria.html` (~7000 Zeilen, alles in einer Datei)
- **Business-Passwort:** ali2024
- **Git-Regel:** Nach jeder Änderung committen + pushen
- **Syntax-Check:** `node -e "const fs=require('fs');const html=fs.readFileSync('pizzaria.html','utf8');const scripts=html.match(/<script>([\s\S]*?)<\/script>/g)||[];const script=scripts.map(s=>s.replace(/<\/?script>/g,'')).join('\n');try{new Function(script);console.log('OK');}catch(e){console.error(e.message);}"`

---

## Anweisung für Claude Code

Du arbeitest am Pizzeria-Einkaufssystem von Ali (San Carino Pizzeria, Österreich).
- Lies `CLAUDE.md` für alle Regeln
- Lies `AGENTS.md` für das Agenten-Kollaborationsprotokoll
- Wir sind bei **Phase 3 — Verbesserungen pro Panel**
- Beginne mit **3.1 Kombis-Panel** — frage Ali welche Verbesserung er möchte
- Arbeite Schritt für Schritt, committe nach jeder Änderung
- GitHub, Notion und Perplexity MCP-Agenten sind verfügbar
