/* visor3d.js: la ventana emergente con la vista 3D (MapLibre GL).
   Expone una sola función para el resto del código: abre3D(empresa). */

const $ = id => document.getElementById(id);   // atajo para getElementById

/* ----- Estilos del mapa 3D ----- */

/* Capa de edificios en relieve; la altura viene de OpenStreetMap.
   Si un edificio no tiene altura, se le asignan 8 metros. */
const CAPA_EDIFICIOS = {
  id:'edificios3d', type:'fill-extrusion', source:'omt',
  'source-layer':'building', minzoom:13,
  paint:{
    'fill-extrusion-color':'#f1f5f9',
    'fill-extrusion-height':['coalesce',['get','render_height'],8],
    'fill-extrusion-base':['coalesce',['get','render_min_height'],0],
    'fill-extrusion-opacity':0.92,
    'fill-extrusion-vertical-gradient':true
  }
};

/* Modo 1 "Satélite 3D": foto de satélite (Esri) + edificios en relieve */
const ESTILO_SATELITE = {
  version:8,
  sources:{
    sat:{ type:'raster', tileSize:256, maxzoom:19, attribution:'Imágenes © Esri',
          tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'] },
    omt:{ type:'vector', url:'https://tiles.openfreemap.org/planet' }
  },
  layers:[ {id:'sat', type:'raster', source:'sat'}, CAPA_EDIFICIOS ]
};

/* Modo 2 "Mapa 3D": mapa de calles con edificios en relieve */
const ESTILO_MAPA = 'https://tiles.openfreemap.org/styles/liberty';

/* ----- Estado del visor ----- */
let visor = null;      // objeto del mapa 3D (null si está cerrado)
let girando = true;    // ¿rota la cámara sola?
let animacion = null;  // id de requestAnimationFrame, para poder pararlo

/* Cambia entre "sat" (satélite) y "3d" (mapa) */
function cambiarModo(modo){
  $('b-sat').classList.toggle('on', modo === 'sat');
  $('b-3d').classList.toggle('on',  modo === '3d');
  if (visor) visor.setStyle(modo === 'sat' ? ESTILO_SATELITE : ESTILO_MAPA);
}

/* Abre la ventana 3D para una empresa del array LUGARES */
function abre3D(l){
  $('modal').style.display = 'flex';
  $('mt').textContent = l.n;
  $('ms').innerHTML = '<b>Por qué está aquí:</b> ' + l.r;

  /* Enlaces externos con las coordenadas de la empresa */
  $('sv').href = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + l.c[0] + ',' + l.c[1];
  $('ge').href = 'https://earth.google.com/web/@' + l.c[0] + ',' + l.c[1] + ',20a,600d,35y,0h,65t,0r';

  /* Si había un visor anterior, se destruye antes de crear otro */
  if (visor){ visor.remove(); visor = null; }

  /* Si la librería no cargó (sin internet), avisamos en vez de dejar en blanco */
  if (typeof maplibregl === 'undefined'){
    $('m3d').innerHTML = '<p style="padding:20px">No se pudo cargar el visor 3D. Revisa tu conexión.</p>';
    return;
  }

  /* Crear el visor: pitch = inclinación de la cámara, bearing = giro */
  visor = new maplibregl.Map({
    container:'m3d', style:ESTILO_SATELITE,
    center:[l.c[1], l.c[0]],    // MapLibre usa [longitud, latitud]
    zoom:16.6, pitch:68, bearing:-25, maxPitch:80
  });
  visor.addControl(new maplibregl.NavigationControl({visualizePitch:true}), 'bottom-right');
  new maplibregl.Marker({color: ZONAS[l.z]}).setLngLat([l.c[1], l.c[0]]).addTo(visor);

  cambiarModo('sat');
  girando = true;
  $('rot').textContent = 'Pausar giro';

  /* Bucle de animación: gira la cámara un poco en cada fotograma */
  const paso = () => {
    if (visor && girando) visor.setBearing(visor.getBearing() + 0.12);
    animacion = requestAnimationFrame(paso);
  };
  cancelAnimationFrame(animacion);
  paso();

  /* Si el usuario arrastra el mapa, se para el giro automático */
  visor.on('mousedown', () => { girando = false; $('rot').textContent = 'Reanudar giro'; });
}

/* Cierra la ventana y libera memoria */
function cierra3D(){
  $('modal').style.display = 'none';
  cancelAnimationFrame(animacion);
  if (visor){ visor.remove(); visor = null; }
}

/* ----- Eventos de la ventana ----- */
$('cl').onclick = cierra3D;
$('modal').onclick = e => { if (e.target.id === 'modal') cierra3D(); };   // clic en el fondo oscuro
document.addEventListener('keydown', e => { if (e.key === 'Escape') cierra3D(); });
$('rot').onclick = () => {
  girando = !girando;
  $('rot').textContent = girando ? 'Pausar giro' : 'Reanudar giro';
};
$('b-sat').onclick = () => cambiarModo('sat');
$('b-3d').onclick  = () => cambiarModo('3d');