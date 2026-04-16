# Agenten-Kollaboration: Claude Code + Codex

Dieses Dokument definiert das **permanente Zusammenarbeits-Protokoll** zwischen
Claude Code und OpenAI Codex für das Pizzeria-Einkaufssystem.

---

## Projekt-Kontext

- **Hauptdatei:** `pizzaria.html` — Single-File App (~7000 Zeilen, alles in einer Datei)
- **Datenbank:** `pizzeria.db` — SQLite Preishistorie (via better-sqlite3)
- **Shops:** Metro, Billa, Lidl, Spar, Etsan, UM Trade (Österreich)
- **GitHub:** https://github.com/alishama-lgtm/pizzeria-einkauf
- **Branch:** claude/recommend-compose-apps-Y4zch
- **Business-Passwort:** ali2024
- **API Key:** Wird sicher in localStorage gespeichert (`pizzeria_anthropic_key`)

---

## Rollen

### Claude Code — Architekt & Qualitätsprüfer
- Analysiert das Projekt und plant die Umsetzung
- Schreibt den ersten Code-Entwurf
- Prüft nach Codex' Optimierungen die Qualität
- Macht Syntax-Check und Commit

### Codex — Optimierer & Tester
- Übernimmt Claude Codes Entwurf
- Führt ihn aus, prüft Randfälle und Fehler
- Optimiert Performance und Lesbarkeit
- Kommentiert jede Änderung mit Begründung

---

## Arbeitsreihenfolge (immer gleich)

```
1. Claude Code — Analyse & Entwurf
   ↓
2. Codex — Optimierung & Test
   ↓
3. Claude Code — Finalisierung & Commit
   ↓
4. Gemeinsames Ergebnis
```

### 1. Claude Code — Analyse & Entwurf
- Liest relevante Code-Bereiche in pizzaria.html
- Plant die Änderung (welche Funktionen, welche Zeilen)
- Schreibt ersten Code-Entwurf mit Kommentaren
- Gibt aus unter: **„Claude Code — Analyse & Entwurf:"**

### 2. Codex — Optimierung
- Übernimmt den Entwurf von Claude Code
- Prüft: Fehler, Randfälle, Performance, Lesbarkeit
- Macht Verbesserungen und erklärt jeden Schritt
- Gibt aus unter: **„Codex — Optimierung:"**

### 3. Claude Code — Finalisierung
- Prüft Codex' Ergebnis gegen die Projekt-Regeln
- Führt Syntax-Check aus: `node -e "new Function(script)"`
- Fügt finalen Code in pizzaria.html ein
- Commitet: `git add pizzaria.html && git commit -m "YYYY-MM-DD: [beschreibung]" && git push`
- Gibt aus unter: **„Claude Code — Finalisierung:"**

### 4. Gemeinsames Ergebnis
- Finaler Code
- Kurze Zusammenfassung der Änderungen
- Nächste Schritte

---

## Pizzeria-spezifische Regeln (BEIDE Agenten müssen diese kennen)

### JavaScript
- `let`/`const` Variablen NIE vor ihrer Deklaration verwenden (TDZ-Bug!)
- `renderKombisTab()` nur in `DOMContentLoaded` aufrufen, nicht inline
- Alle 10 Panel-IDs müssen erhalten bleiben:
  `produkte, geschaefte, kombis, suche, upload, verlauf, mitarbeiter, fehlmaterial, checkliste, business`

### Git & Commit
- Commit-Nachricht auf Deutsch, max. 72 Zeichen
- Format: `YYYY-MM-DD: [kurze Beschreibung]`
- Immer pushen — kein lokaler Commit ohne Push

### Sicherheit
- API Keys NIE im Quellcode — immer über localStorage
- Business-Passwort bleibt: ali2024
- Keine Passwörter in Commit-Nachrichten

### Syntax-Check (nach jeder Änderung)
```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('pizzaria.html','utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g)||[];
const script = scripts.map(s=>s.replace(/<\/?script>/g,'')).join('\n');
try { new Function(script); console.log('✅ Syntax OK'); }
catch(e) { console.error('❌ Fehler:', e.message); process.exit(1); }
"
```

---

## Übergabe-Format zwischen Agenten

Wenn Claude Code an Codex übergibt:
```
## Übergabe an Codex

**Aufgabe:** [Was soll gemacht werden]
**Betroffene Zeilen:** [z.B. 1369-1386]
**Aktueller Code:**
[code block]

**Entwurf:**
[neuer code block]

**Offene Fragen:** [Was Codex prüfen soll]
```

Wenn Codex an Claude Code übergibt:
```
## Übergabe an Claude Code

**Optimierter Code:**
[code block]

**Änderungen:**
- [Änderung 1]: [Begründung]
- [Änderung 2]: [Begründung]

**Getestet:** [Was getestet wurde]
**Randfälle berücksichtigt:** [Liste]
```

---

## Masterplan-Status

Der vollständige Entwicklungsplan liegt in:
`/root/.claude/plans/piped-popping-treasure.md`

Aktuell: **Phase 3 — Verbesserungen pro Panel**
