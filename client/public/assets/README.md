# Assets — placeholders

Los archivos `.mp3`/`.mp4` restantes en esta carpeta son **placeholders vacíos (0 bytes)**. La aplicación no depende de su contenido real: la UI muestra bloques de color sólido (`ImagePlaceholder`/`VideoPlaceholder`) y el reproductor de audio tolera archivos ausentes o vacíos sin romper la experiencia.

Ya son reales (no placeholders): `victoria/A-Victoria.png`, `victoria/Neto.png`, `victoria/Neto-Blanco.png`, `brisa/A-Brisa.png`, `renata/A-Renata.png`, `brisa/img002.jpeg` … `img015.jpg` (fotos de reclamaciones), `audio/music.mp3`, `audio/correct.mp3`, `audio/incorrect.mp3`.

Antes de producción, reemplazar manteniendo el mismo nombre de archivo y ubicación:

- `audio/{brisa,renata,victoria}/music.mp3` (música de cada minijuego), `audio/timer.mp3`
- `video/portada.mp4`, `video/final.mp4`
- `video/{brisa,renata,victoria}/results.mp4` — uno distinto por personaje, referenciado desde `client/src/data/characters.json` (`resultsVideoSrc`)

Renata y Victoria ya no usan imágenes de reclamación/caja:

- `renata/metadata.json` contiene 50 perfiles de postulantes (nombre, edad, sexo, lugar, carrera, universidad, departamento) que se renderizan como tarjetas de perfil con silueta — ver `client/src/components/minigames/renata/ApplicantCard.tsx`.
- `victoria/metadata.json` contiene 55 tickets de caja de la tienda ficticia "neto" (folio, sucursal, dirección, cajero, caja, gerente, monto) que se renderizan como recibo — ver `client/src/components/minigames/victoria/TicketCard.tsx`. El logo del ticket usa `victoria/Neto-Blanco.png`. 5 de los tickets (`id` 051–055) traen `amount: null` (monto en blanco/ilegible) y son incorrectos sin importar dónde se suelten.

Brisa sí usa imágenes reales de reclamación (`brisa/img002.jpeg` … `img015.jpg`), cada una con una descripción de ejemplo en `metadata.json` / `client/src/data/brisa/claims.json` que se muestra como mensaje de chat.

En los 3 minijuegos, el siguiente elemento a mostrar se elige al azar (sin repetir el anterior) en vez de seguir el orden del arreglo — excepto que Brisa además encola tanto la reclamación como la respuesta del jugador en el historial de chat visible (no reemplaza el mensaje anterior).

El `metadata.json` de cada personaje debe mantenerse en sincronía con su contraparte en `client/src/data/{brisa/claims,renata/applicants,victoria/boxes}.json` si se agregan, quitan o modifican elementos.
