# Info Update — Mail & Website

Plan voor de aankomende info-update richting onze gasten. Bestaat uit twee delen:
1. **Mail/webpagina update** — gericht naar bevestigde gasten
2. **Uitbreiding website** — extra info voor wie nieuwsgierig is

---

## Deel 1 — Mail / Update-pagina

**Doel:** het feest laten leven, laatste praktische puntjes op de i, en vrijdag-gasten een helder dagprogramma geven.

### 1.1 Sfeer & aftellen — "het gaat leven"
- Korte enthousiaste opening: nog X weken te gaan
- Teaser foto / sneak peek (locatie, kampvuur, ijs?)
- Iets persoonlijks van ons: waar we naar uitkijken
- Toon: warm, informeel, een beetje opgewonden

### 1.2 RSVP & camping update
- Stand van zaken: hoeveel gasten zijn er, hoeveel kamperen er
- "Nog niet gereageerd? Laat het ons z.s.m. weten via [link]"
- Voor wie kampeert: bevestiging dat ze op de lijst staan
- Eventuele last-call voor camping-plek

### 1.3 Dresscode — verduidelijking
- Wat we **wel** bedoelen: festival-chic / kleurrijk / comfortabel
- Wat we **niet** bedoelen: stijve pakken / lange galajurken
- Voorbeelden of moodboard (foto's)
- Praktische tip: schoenen waar je op kunt dansen én over gras kunt lopen
- Vrijdag vs. zaterdag: zelfde sfeer of verschil?

### 1.4 Dagprogramma vrijdag (voor vrijdag-gasten)
- Tijd van aankomst / inchecken
- Wat staat er op het programma (activiteiten, eten, drinken)
- Eindtijd / overnachten
- Wat mee te nemen (slaapzak, regenkleding, etc.)
- Contactpersoon bij vragen op de dag zelf

---

## Deel 2 — Uitbreiding website

**Doel:** meer context en avontuur uitstralen, gasten enthousiast maken voor het hele weekend.

### 2.1 Camping guide — "kom je avontuur tegemoet"
- **Waarom bij ons kamperen?**
  - Samen wakker worden, geen rit naar huis na het feest
  - Gezamenlijk ontbijt zondagochtend — het feest gaat door
  - Sfeer van een mini-festival, niet van een hotel
- **Praktisch:**
  - Wat te brengen (tent, slaapzak, matje, zaklamp)
  - Wat is er aanwezig (douches, toiletten, water)
  - Stroom / opladen?
- **Sport & spel:**
  - Wat is er te doen overdag (sport, spel, ontspannen)
- **Kampvuur:**
  - 's Avonds samen rond het vuur — drankje, muziek, verhalen
- **Zondagochtend ontbijt:**
  - Tijd, wat er is, hoe lang we blijven hangen

### 2.2 Locatie info
- **Parkeren**
  - Waar parkeer je, hoeveel plek, kosten?
  - Carpoolen aanmoedigen
- **De camping zelf**
  - Foto's van het terrein
  - Douches & sanitair
  - Sport- en spelruimte
  - Kampvuurplek
- **Aankomst & route**
  - Adres, beste route, OV-optie?

### 2.3 In de buurt — voor wie er een weekendje van wil maken
- **Vreugderijkerwaard**
  - Natuurgebied, wandeling, wat te zien
  - Afstand vanaf locatie
- **Geitenboerderij**
  - Wat je er kunt doen, leuk voor kids / 's ochtends
  - Openingstijden, adres
- **Haas met Ballen**
  - Wat het is (restaurant / café?)
  - Waarom de moeite waard
  - Reserveren?

---

## Open vragen / nog uit te zoeken
- [ ] Exacte RSVP & camping aantallen op moment van versturen
- [ ] Moodboard / voorbeeldfoto's dresscode
- [ ] Definitief tijdschema vrijdag
- [ ] Adressen + openingstijden buurt-tips (kan in Google My Maps zelf)
- [ ] Wanneer versturen we de update? (X weken voor de bruiloft)

## Volgorde / prioriteit
1. Website-uitbreiding eerst live (zodat de mail ernaar kan linken)
2. Mail/update versturen met links naar de nieuwe pagina's
3. Eventueel reminder dichter op de datum

---

## Hand-off — kaarten op de website

De twee nieuwe secties (`Locatie` en `Buurt`) staan al live met de teksten erin,
maar de kaarten zelf zijn nu nog placeholders. Beide gebruiken **Google My Maps**,
zodat jij ze later zelf kunt blijven aanpassen zonder code te hoeven editen.

### Hoe maak je een Google My Map
1. Ga naar [mymaps.google.com](https://www.google.com/mymaps) en klik "Nieuwe kaart maken"
2. Geef de kaart een naam (bijv. "J&D — Terrein" of "J&D — In de buurt")
3. Zet pinnetjes neer + voeg per pin een titel en beschrijving toe
4. Voor het terrein: optioneel polygonen tekenen voor zones (parkeren, camping, feesttent)
5. Zet de kaart op "openbaar" via "Delen"
6. Klik op het menu (drie puntjes) → "Insluiten op mijn site"
7. Kopieer de **`src`** uit het `<iframe>`-snippet

### Waar plak je 'm in de code
- Terrein-kaart: `src/components/Locatie.tsx` → `TERREIN_MAP_EMBED_SRC`
- Buurt-kaart: `src/components/Buurt.tsx` → `BUURT_MAP_EMBED_SRC`

Beide staan bovenaan het bestand met een `// TODO`-comment erboven. Zodra
de string is ingevuld verdwijnt de "Kaart volgt"-placeholder automatisch.

### Optioneel voor het terrein
Je vroeg of je een Google Maps screenshot kon aanleveren om het terrein
te kaderen — niet meer nodig als je voor de live-editable My Maps-route
gaat, want die heeft satelliet als ondergrond. Wel handig om vooraf even
te bepalen waar de tenten, parkeerplekken en feestlocatie precies komen.
