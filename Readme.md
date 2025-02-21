# Project Overview

- Platformă de Management al Evenimentelor Corporative
Descriere: O platformă complexă pentru organizarea și gestionarea evenimentelor corporative, inclusiv conferințe, team-building-uri și workshop-uri, cu sisteme integrate de plată, monitorizare a participanților și analiză post-eveniment.

## Tipuri de Utilizatori

### 1. Administrator de Sistem
- Gestionează întreaga platformă
- Administrează toate companiile înregistrate
- Are acces la statistici globale și rapoarte
- Poate gestiona probleme tehnice și suport
- Administrează pachete și prețuri
- Gestionează template-uri globale pentru evenimente

### 2. Administrator Companie (Corporate Manager)
- Gestionează setările companiei
- Administrează utilizatorii companiei
- Creează și gestionează toate evenimentele companiei
- Administrează bugetele evenimentelor
- Gestionează resursele și programările
- Are acces la rapoarte și statistici la nivel de companie
- Gestionează facturarea și plățile
- Poate trimite invitații și gestiona participanții
- Administrează template-uri de evenimente la nivel de companie

### 3. Participant
- Se poate înscrie la evenimente
- Poate oferi feedback
- Își poate gestiona profilul și preferințele
- Are acces la calendar personal
- Poate descărca materiale și certificate

## Structura Frontend

### Pagini Publice
1. **Landing Page**
    - Prezentare generală a platformei
    - Formular de înregistrare companie
    - Login pentru utilizatori existenți
    - Informații despre prețuri și pachete

2. **Pagină de Înregistrare**
    - Formular pentru înregistrare companie nouă
    - Formular pentru înregistrare utilizator nou
    - Opțiune de conectare la o companie existentă

3. **Pagină de Login**
    - Autentificare cu email și parolă
    - Recuperare parolă
    - Alegere companie (pentru utilizatori care aparțin mai multor companii)

### Pagini Private

#### Dashboard Administrator Sistem
- Overview platformă
- Gestiune companii
- Statistici globale
- Management utilizatori
- Setări sistem
- Template-uri globale pentru evenimente

#### Dashboard Administrator Companie
- Overview companie
- Management departamente și utilizatori
- Calendar evenimente corporate
- Creare/editare evenimente
- Gestiune resurse și spații
- Gestiune participanți
- Rapoarte detaliate (evenimente, financiare, participare)
- Setări companie
- Facturare și plăți
- Template-uri evenimente
- Buget și cheltuieli

#### Portal Participant
- Calendar personal
- Evenimente disponibile
- Istoric participări
- Profil și preferințe
- Certificări și materiale
- Feedback evenimente

## Funcționalități Cheie

### Management Evenimente
- Creare și configurare evenimente
- Sistem de programare cu verificare conflicte
- Alocare resurse (săli, echipamente)
- Management participanți
- Sistem de notificări
- Generator de agenda
- Template-uri pentru evenimente recurente

### Sistem de Resurse
- Inventar resurse disponibile
- Calendar ocupare
- Sistem de rezervări
- Gestiune conflicte
- Raportare utilizare
- Categorii de resurse (săli, echipamente, catering, etc.)

### Sistem de Participanți
- Înregistrare la evenimente
- Generare coduri QR pentru acces
- Tracking prezență
- Sistem de feedback
- Certificare participare
- Gestiune preferințe dietetice și alte cerințe speciale

### Gestiune Financiară
- Bugetare evenimente
- Procesare plăți
- Facturare
- Rapoarte financiare
- Integrare multiple metode de plată
- Tracking cheltuieli per eveniment

### Raportare și Analiză
- Dashboard-uri interactive
- Rapoarte customizabile
- Exporturi în multiple formate
- Analiza feedback-ului
- Statistici și KPI-uri
- ROI per eveniment

### Integrări
- Calendar (Google Calendar, Outlook)
- Sisteme de plăți
- Platforme de comunicare
- Sisteme de email marketing
- Export date (Excel, PDF, CSV)

## Fluxuri de Lucru

### Înregistrare Companie Nouă
1. Completare formular companie
2. Verificare și validare date
3. Creare cont administrator companie
4. Configurare inițială companie
5. Adăugare utilizatori
6. Configurare resurse disponibile
7. Setare template-uri evenimente

### Creare Evenimente
1. Selectare template sau creare eveniment custom
2. Configurare detalii eveniment
3. Alocare resurse
4. Setare buget
5. Configurare formulare înregistrare
6. Trimitere invitații
7. Monitorizare înregistrări
8. Gestiune participanți

### Participare la Evenimente
1. Primire invitație
2. Înregistrare participare
3. Completare informații necesare
4. Primire confirmare și cod QR
5. Participare eveniment
6. Completare feedback
7. Primire certificat


## Backend
- **Technology**: Express.js

src/
├── config/         # Configurări (database, env, etc.)
├── models/         # Modele Mongoose
├── controllers/    # Logica pentru route handlers
├── routes/         # Definirea rutelor
├── middleware/     # Middleware-uri (auth, validation, etc.)
├── utils/          # Utilitare și funcții helper
└── services/       # Logica de business

## Frontend
- **Technology**: React with TypeScript

frontend/
├── src/
│   ├── components/     # Componente reutilizabile
│   ├── pages/          # Paginile aplicației
│   ├── contexts/       # Context providers
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicii API
│   ├── utils/          # Utilitare
│   └── styles/         # Stilizare

![alt text](image.png)
![alt text](image-1.png)