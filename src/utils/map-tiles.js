export default [
  {
    id: 'osm-mapnik',
    name: 'OSM / mapnik',
    type: 'tiles',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  {
    id: 'osm-fr',
    name: 'OSM / fr',
    type: 'tiles',
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    attribution:
      '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  {
    id: 'osm-hot',
    name: 'OSM / hot',
    type: 'tiles',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>'
  },
  {
    id: 'geoportail-ign-map',
    name: 'Géoportail / Carte IGN',
    type: 'tiles',
    url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    attribution: 'IGN-F/Geoportail'
  },
  {
    id: 'geoportail-scan-express-standard',
    name: 'Géoportail / Scan Express Standard',
    type: 'tiles',
    url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    attribution: 'IGN-F/Geoportail'
  },
  {
    id: 'geoportail-ign-plan',
    name: 'Géoportail / Plan IGN',
    type: 'tiles',
    url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}',
    attribution: 'IGN-F/Geoportail'
  },
  {
    id: 'geoportail-photographies-aeriennes',
    name: 'Géoportail / Photographies aériennes',
    type: 'tiles',
    url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    attribution: 'IGN-F/Geoportail'
  },
  {
    id: 'geoportail-parcelles-cadastrales',
    name: 'Géoportail / Parcelles cadastrales',
    type: 'tiles',
    url: 'https://wxs.ign.fr/ff8nyjqym1ym7bz3mw6mpehc/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&LAYER=CADASTRALPARCELS.PARCELS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    attribution: 'IGN-F/Geoportail'
  },
  {
    id: 'brgm-geo',
    name: 'BRGM / Cartes géologiques 1/50 000',
    type: 'wms',
    url: 'https://geoservices.brgm.fr/geologie',
    layers: 'SCAN_H_GEOL50',
    attribution: 'BRGM'
  },
  {
    id: 'sdom-zones',
    name: 'SDOM (schéma départemental d’orientation minière)',
    type: 'wms',
    url: 'https://datacarto.geoguyane.fr/wms/SDOM_GUYANE',
    layers:
      'ZONE2activiteminiereautoriseesouscontrainte,ZONE1activiteminiereinterditesaufexploitationsouterraineetrecherchesaeriennes,ZONE0activiteminiereinterdite,Zone0potentielle,LimitesdescommunesdeGuyane',
    attribution: 'GéoGuyane',
    version: '1.3.0'
  }
]
