![image](https://github.com/user-attachments/assets/85a4261b-e310-458d-85b5-beef3db1bfaf)

# Grup 3

# Repte 1: Sequera a la ciutat de Barcelona
- Tòpic: Canvi climàtic
- Agenda 2030: ODS Acció Climàtica | ODS 11: Ciutats i comunitats sostenibles | ODS 6: Aigua neta i sanejament

<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=flat" alt="React Badge" style="height: 23px;"> <img src="https://img.shields.io/badge/PropTypes-lightblue?style=flat&logo=React&logoColor=black" alt="PropTypes Badge" style="height: 23px;"> <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat" alt="Vite Badge" style="height: 23px;"> <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=flat" alt="React Router Badge" style="height: 23px;"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat" alt="Tailwind CSS Badge" style="height: 23px;"> <img src="https://github.com/user-attachments/assets/7e0fc0e6-f118-4f2d-9aba-e330ba6220e8" alt="Vite Badge" style="height: 23px;">




## Objectiu

La sequera és un dels majors problemes que afrontem a Catalunya en els últims anys. A més de provocar problemes ambientals, a una ciutat com Barcelona la sequera pot afectar a l'agricultura, el turisme, la salut i el benestar de la ciutadania, així com l'economia en general.
Tenint en compte aquesta informació, penseu un recurs que utilitzi dades i tecnologies per a abordar els desafiaments de la sequera i millorar la gestió de l'aigua en les ciutats.

## Resum

La nostra aplicació mostra la temperatura i pluja en temps real i la compara amb l'històric de l'últim segle. (1900 - 2023). Amb aquesta informació podem monitorar l'evolució de la mitjana de temperatura mensual per any i dimensionar quant està augmentant la temperatura a la ciutat de barcelona.

## Table of Contents

1. [Data](#Data)
2. [Frontend](#Frontend)
3. [Backend](#Backend)
4. [Nosaltres](#Nosaltres)

## Data

L'equip de data va optar per utilitzar les següents bases de dades:
- [Precipitacions Barcelona Des de 1786](https://opendata-ajuntament.barcelona.cat/data/ca/dataset/precipitacio-hist-bcn/resource/6f1fb778-0767-478b-b332-c64a833d26d2)
- [Temperatures mitjanes mensuals de l’aire de la ciutat de Barcelona des de 1780](https://opendata-ajuntament.barcelona.cat/data/ca/dataset/temperatures-hist-bcn)

Hem optat per utilitzar les dades des del període 1900 a 2023 inclusivament.
Totes dues bases de dades es trobaven sense valors nuls ni atípics pel que immediatament es van crear els corresponents arxius .json perquè l'equip de backend pugui crear els endpoints que alimentaran al frontend.

Finalment, hem desenvolupat un índex de vulnerabilitat, el qual consistia a agafar la temperatura mínima i màxima faig una mitjana de de cada any.

* AVG_*Tmin històrica = 13 °C
* AVG_*Tmax històrica = 18 °C
  
A aquests valors se'ls va assignar un valor d'una escala de l'1 al 10.

* 13 °C -> Nivell 1
* 18 °C -> Nivell 10
  
D'aquesta manera es va poder interpolar i assignar un valor sobre la base de la temperatura d'aquest any i avaluar en què posició es trobava mitjançant aquest índex.

## Frontend - https://github.com/Luovtyrell/Integra

### Eines utilitzades

Utilitzem **React.js** + **javascript** + **tailwind** per a desenvolupar l'aplicació.  
Altres eines emprades:
- **Axios**: client HTTP basat en promeses per fer sol·licituds a APIs. 
- **DaisyUI**: biblioteca de components per a Tailwind CSS. 
- **Chart.js**: permet crear gràfics interactius i responsius de manera senzilla.
- **Leaflet**: biblioteca de codi obert per a mapes.

### Instal·lació

Per a començar a utilitzar aquesta plantilla, seguiu aquests passos:

1. Clona el repositori:

   ```bash
   git clone https://github.com/Luovtyrell/Integra
   ```

2. Navega al directori del projecte:

   ```bash
   cd Integra
   ```

3. Instal·la les dependències:

   ```bash
   npm install
   ```

4. Inicia el servidor de desenvolupament

   ```bash
   npm run dev
   ```

    Això iniciarà el servidor de desenvolupament, i podreu veure l'aplicació a `http://localhost:5173` (o el port configurat).

## Backend - https://github.com/mikedukakis/sequia_integra

## Nosaltres
Som un equip de 9 entusiastes de la tecnologia: 4 persones en frontend ([Alex](https://github.com/alexbessedonato), [Carlos](https://github.com/davila795), [Lucía](https://github.com/luovtyrell) i [Raquel](https://github.com/gatchan1)), 3 persones en backend ([Dani](https://github.com/danidiazd), [Ignasi](https://github.com/mikedukakis) i [Montse](https://github.com/m-maso)) i dues persones en data analysis ([Fede](https://github.com/fhlabate) i Joseph).
