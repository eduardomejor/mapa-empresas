/* datos.js: TODA la información de las empresas está aquí.
   Para añadir una empresa, copia un bloque { ... } y cambia sus valores.
   No hace falta tocar ningún otro archivo. */

/* Un color por zona (se usa en pines, números y títulos) */
const ZONAS = {
  "Cádiz ciudad":       "#b91c1c",
  "Provincia de Cádiz": "#b45309",
  "Andalucía":          "#047857",
  "España":             "#1d4ed8",
  "Europa":             "#6d28d9"
};

/* Lista de empresas. Mantén juntas las de una misma zona para que
   el panel las agrupe bajo un único título.
     z: zona (debe existir en ZONAS)    n: nombre
     c: [latitud, longitud] aproximadas d: descripción
     r: por qué está ahí */
const LUGARES = [
  { z:"Cádiz ciudad", n:"Eticonsa Informática", c:[36.5013,-6.2650],
    d:"Zona Franca, Cádiz. También aparece CadizPyme (TPV táctil, videovigilancia, WiFi y software de gestión).",
    r:"Es una pyme de servicios informáticos (instalación de equipos, redes y soporte) que atiende a negocios de la zona, sobre todo comercio y hostelería. Se ubica en la Zona Franca porque ofrece oficinas y naves con condiciones ventajosas, y desde allí llega rápido a sus clientes de la Bahía. El motivo concreto es una deducción nuestra." },

  { z:"Provincia de Cádiz", n:"dev2bit", c:[36.5280,-6.1920],
    d:"Puerto Real, en la Bahía de Cádiz.",
    r:"Es una empresa de desarrollo de software (webs, aplicaciones y sistemas) para negocios de la provincia. Desde Puerto Real está cerca de clientes de Cádiz y Jerez, y al ser trabajo digital puede coordinar gran parte en remoto." },

  { z:"Provincia de Cádiz", n:"Valendra", c:[36.6850,-6.1260],
    d:"Startup de Jerez de la Frontera. Ganó el concurso Cámara NEXT 2026.",
    r:"Es una startup tecnológica de inteligencia artificial nacida en Jerez. La feria Jerez Digital, de innovación y nuevas tecnologías, reunió a más de 200 empresas en octubre de 2026 y dio visibilidad a su proyecto, lo que muestra que Jerez tiene un ecosistema tecnológico propio." },

  { z:"Andalucía", n:"Isotrol", c:[37.3891,-5.9845],
    d:"Sevilla, más de 400 empleados. Ayesa Digital también tiene un hub en Andalucía.",
    r:"Es una consultora de software e ingeniería que nació en Sevilla como spin-off de la Escuela de Ingenieros y se instaló en el parque tecnológico de la Cartuja en 2001. Ese parque reúne a empresas tecnológicas y de I+D y ofrece talento de las universidades de Sevilla." },

  { z:"España", n:"Indra", c:[40.4168,-3.7038],
    d:"Sede en Alcobendas (Madrid). Ayesa Digital tiene centros en Madrid y País Vasco.",
    r:"Es una multinacional de tecnologías de la información y defensa. Está en Madrid porque allí se concentran la administración central, los grandes clientes y gran parte del sector tecnológico español." },

  { z:"España", n:"Ayesa Digital (País Vasco)", c:[43.2630,-2.9350],
    d:"Centro de Ayesa Digital en el País Vasco.",
    r:"No hemos encontrado el motivo concreto de este centro. Habría que consultarlo en la web de la empresa." },

  { z:"Europa", n:"SAP", c:[49.2933,8.6422],
    d:"Walldorf, Alemania. Ayesa Digital tiene actividad en 10 países de Europa y América.",
    r:"Es la mayor empresa europea de software de gestión empresarial (ERP). Se fundó en 1972 por cinco ex empleados de IBM, que montaron su empresa en la zona de Mannheim, y su sede está en Walldorf desde 1977." }
];

/* Texto de la conclusión que sale al final del panel */
const CONCLUSION = "En Cádiz predominan las empresas pequeñas de servicios informáticos y desarrollo; las grandes tecnológicas están en Madrid, Sevilla o País Vasco. En la provincia hay empleo en pymes y también la opción de trabajar en remoto para una grande.";