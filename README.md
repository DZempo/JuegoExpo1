# Sé una IA por un día

Experiencia web interactiva (solo orientación vertical) donde el usuario elige un personaje y compite en un minijuego contra una IA. Proyecto de primera versión: **sin base de datos**, datos **mock en JSON locales**, **placeholders visuales** (bloques de color sólido) para imágenes/audio/video.

## Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS + React Router + Framer Motion + React DnD
- **Backend**: Node.js + Express + TypeScript (sirve solo configuración de IA y textos finales, ambos mock)
- **Persistencia**: `localStorage` únicamente para récords personales por personaje

## Estructura

```
client/   SPA React (Vite)
server/   API Express (mock JSON, sin BD)
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

Esto levanta:
- Backend en `http://localhost:4000`
- Frontend en `http://localhost:5173`

El frontend intenta consultar al backend (config de IA y textos finales) y, si no está disponible, usa copias locales en `client/src/data` — funciona standalone.

## Personajes y minijuegos

| Personaje | Minijuego |
|---|---|
| Brisa | Validar reclamaciones — chat con imágenes y respuestas en cola |
| Renata | Clasificar postulantes por departamento (drag & drop) — orden aleatorio |
| Victoria | Desbloquear/bloquear cajas por monto (drag & drop) — orden aleatorio, incluye tickets con monto ilegible |

## Contenido a reemplazar antes de producción

Todo lo siguiente es **placeholder** y debe sustituirse por contenido real:

### Imágenes
- `client/public/assets/brisa/img*.jpg`
- Imagen de personaje mostrada en la pantalla Final (`client/src/data/characters.json`, campo `image`)

> Renata y Victoria ya no usan imágenes:
> - Renata muestra tarjetas de perfil (nombre, edad, lugar, carrera, universidad + silueta por sexo) generadas en `client/src/data/renata/applicants.json` / `client/public/assets/renata/metadata.json` — 50 perfiles ficticios de ejemplo.
> - Victoria muestra tickets de caja de la tienda ficticia "neto" (folio, sucursal, dirección, cajero, caja, gerente, monto) generados en `client/src/data/victoria/boxes.json` / `client/public/assets/victoria/metadata.json` — 55 tickets ficticios de ejemplo. El logo usa `client/public/assets/victoria/Neto-Blanco.png`.
>
> En ambos casos, cada partida extrae el siguiente elemento de forma aleatoria (sin repetir el que se acaba de mostrar) en vez de recorrer la lista en orden — ver `pickRandomIndex` en `client/src/lib/random.ts`.
>
> Brisa sí usa imágenes reales (`client/public/assets/brisa/img002.jpeg` … `img015.jpg`, referenciadas desde `client/src/data/brisa/claims.json` junto con una descripción de ejemplo por reclamación). El minijuego es un chat: cada imagen entra en cola junto con su descripción, y la respuesta del jugador ("Reclamación válida/inválida") también se agrega en cola como mensaje de Brisa — el historial completo queda visible y hace scroll automático (`BrisaGame.tsx`, `ChatBubble.tsx`, `BrisaReplyBubble.tsx`).
>
> Victoria: los 55 tickets tienen montos repartidos a propósito cerca de $5000 (unos por arriba, otros por abajo) para que la decisión de desbloquear/no-aplica no sea trivial, y 5 de ellos (`id` 051–055) traen el monto en blanco (`amount: null`) — se muestran como "—" en el ticket y son incorrectos sin importar en qué zona se suelten.

### Audio
- `client/public/assets/audio/music.mp3` — pista compartida que suena en Inicio y en Final (`HomePage`/`FinalPage`, vía `useBackgroundMusic`)
- `client/public/assets/audio/{brisa,renata,victoria}/music.mp3` — música de fondo de cada minijuego (suena solo mientras se juega, en `GamePage`)
- `client/public/assets/audio/correct.mp3`
- `client/public/assets/audio/incorrect.mp3`
- `client/public/assets/audio/timer.mp3`

### Video
- `client/public/assets/video/portada.mp4` — video de fondo de la pantalla de Inicio (portada/carrusel), un solo video para toda la app
- `client/public/assets/video/final.mp4` — video de fondo de la pantalla Final, un solo video para toda la app
- `client/public/assets/video/{brisa,renata,victoria}/results.mp4` — video de fondo de la pantalla de Resultados, **uno distinto por personaje** (igual que la música). La ruta la define el campo `resultsVideoSrc` de cada personaje en `client/src/data/characters.json`.

Todos son opcionales: si el archivo está vacío o no existe, la pantalla cae automáticamente al bloque de color sólido (`VideoPlaceholder`) sin romper la experiencia.

### Nombres, roles y textos finales — importante: qué archivo edita cada uno

Estos datos existen **duplicados** a propósito (backend + copia local de respaldo, ver "Notas de arquitectura"). **Mientras el backend esté corriendo (`npm run dev`), la app siempre usa los archivos de `server/src/data/`** — editar solo la copia de `client/src/data/` no se reflejará en la app y puede parecer que "no se actualiza":

- `server/src/data/characters.json` — nombre/rol de cada personaje (fuente real en desarrollo)
- `server/src/data/finalTexts.json` — texto descriptivo final por personaje (fuente real en desarrollo)
- `client/src/data/characters.json` / `client/src/data/finalTexts.json` — copias de respaldo, solo se usan si el backend no responde (o para build standalone del cliente sin backend)

Si editas uno, replica el cambio en el otro para que ambos modos (con y sin backend) muestren lo mismo. La imagen de personaje (`characters.json`, campo `image`) y la música (`musicSrc`) solo existen en la copia del cliente, ya que son rutas de assets estáticos, no texto configurable.

### Configuración de IA (ya funcional, ajustable)
- `server/src/data/aiConfig.json` — `growthFactor` y `multiplier` por personaje (fuente real en desarrollo; replicar en `client/src/data/aiConfig.json` para el modo de respaldo)

## Notas de arquitectura

- El motor de juego (temporizador 30s, score jugador/IA, notificaciones) es compartido entre los 3 minijuegos vía el hook `useGameEngine`.
- La IA está diseñada para ganar siempre pero de forma dinámica (no fija): `iaScore = elapsedSeconds * growthFactor + playerScore * multiplier`, con una corrección mínima al final si el jugador quedara empatado o por delante.
- `notificationMode` soporta `'visual'` (activo, animaciones de estrés) e `'incremental'` (tipado y enrutado, sin implementación visual — preparado para el futuro).

## Resolución y pantallas táctiles

- El layout está pensado para escalar desde un teléfono angosto hasta una pantalla táctil vertical de hasta **1080×1920** (kiosco/tótem): `.app-shell` (`client/src/styles/index.css`) tiene `max-width: 1080px`, y los componentes clave (carrusel, tarjetas, tickets, botones, textos) tienen variantes `lg:` de Tailwind que aumentan tamaño de fuente/espaciado a partir de 1024px de ancho de viewport. Si necesitas ajustar algún elemento puntual a otra resolución, busca sus clases `lg:` en el componente correspondiente.
- El drag & drop (minijuegos de Renata y Victoria) usa `react-dnd-touch-backend` en vez de `react-dnd-html5-backend`, configurado con `enableMouseEvents: true` (`client/src/App.tsx`) — funciona tanto con dedo (pantalla táctil/kiosco) como con mouse (para probar en escritorio). Los elementos arrastrables usan `touch-action: none` para que el navegador no interprete el gesto como scroll.
