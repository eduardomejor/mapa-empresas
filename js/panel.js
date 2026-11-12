/* panel.js: construye la lista lateral (tarjetas agrupadas por zona).
   Usa LUGARES y ZONAS (datos.js) y abre3D (visor3d.js). */

function construirPanel(){
  const panel = document.getElementById('side');
  let zonaAnterior = '';

  LUGARES.forEach((l, i) => {
    const color = ZONAS[l.z];

    /* Título de zona: solo cuando cambia respecto a la empresa anterior */
    if (l.z !== zonaAnterior){
      const titulo = document.createElement('div');
      titulo.className = 'zona';
      titulo.innerHTML = '<i style="background:' + color + '"></i>' + l.z;
      panel.appendChild(titulo);
      zonaAnterior = l.z;
    }

    /* Tarjeta de la empresa (el número es la posición + 1) */
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';
    tarjeta.innerHTML =
      '<div class="num" style="border-color:' + color + ';color:' + color + '">' + (i + 1) + '</div>' +
      '<div><h3>' + l.n + '</h3>' +
      '<p>' + l.d + '</p>' +
      '<p class="r"><b>Por qué está aquí:</b> ' + l.r + '</p></div>';
    tarjeta.onclick = () => abre3D(l);   // al pulsar, abre la vista 3D
    panel.appendChild(tarjeta);
  });

  /* Conclusión final */
  const nota = document.createElement('div');
  nota.className = 'nota';
  nota.textContent = CONCLUSION;
  panel.appendChild(nota);
}