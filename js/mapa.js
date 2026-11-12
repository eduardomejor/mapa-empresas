/* mapa.js: el mapa 2D (Leaflet) y el arranque de la aplicación.
   Se carga el último porque usa todo lo anterior. */

function construirMapa(){
  /* Crear el mapa; el zoom se coloca abajo a la izquierda */
  const mapa = L.map('map', { zoomControl:false }).setView([40.5, -3.5], 5);
  L.control.zoom({ position:'bottomleft' }).addTo(mapa);

  /* Mapa base gris claro de Esri (no requiere clave) */
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    { attribution:'Tiles © Esri', maxZoom:16 }
  ).addTo(mapa);

  /* Recalcular tamaño por si el contenedor aún no tenía medidas al cargar */
  setTimeout(() => mapa.invalidateSize(), 300);

  /* Líneas punteadas desde la primera empresa (Cádiz) hacia las demás */
  const origen = LUGARES[0].c;
  LUGARES.slice(1).forEach(l =>
    L.polyline([origen, l.c], { color:'#9ca3af', weight:1.2, opacity:.8, dashArray:'4 6' }).addTo(mapa)
  );

  /* Un pin numerado por empresa; al pulsarlo se abre el 3D */
  LUGARES.forEach((l, i) => {
    const color = ZONAS[l.z];
    const icono = L.divIcon({
      className:'',
      html:'<div class="pin" style="border-color:' + color + ';color:' + color + '">' + (i + 1) + '</div>',
      iconSize:[26, 26], iconAnchor:[13, 13]
    });
    L.marker(l.c, { icon:icono }).addTo(mapa).on('click', () => abre3D(l));
  });

  /* Encuadrar todas las empresas en la vista inicial */
  mapa.fitBounds(L.latLngBounds(LUGARES.map(l => l.c)), { padding:[50, 50] });
}

/* ---------- ARRANQUE ---------- */
construirPanel();   // panel.js
construirMapa();    // este archivo