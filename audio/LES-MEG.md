# Lydklipp

Denne mappen fylles av **lydgeneratoren**, en egen HTML-fil (`lydgenerator-les-verden.html`) som ikke er en del av nettstedet.

- `aksenter/<aksentkode>/<tekst>-<nummer>.mp3` – klipp med KI-stemmer fra ElevenLabs.
- `lyd.js` – lista over klippene. Nettstedet leser den og spiller klippene i stedet for nettleserens stemme.

Ikke rediger `lyd.js` for hånd. Har du slettet eller flyttet klipp, åpner du generatoren, velger repo-mappen og trykker «Oppdater bare lyd.js».

Nummeret i filnavnet er laget ut fra teksten. Endres teksten på nettstedet, må klippet lages på nytt.
