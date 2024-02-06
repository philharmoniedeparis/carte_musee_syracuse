old get_data function
/* function get_data(promises) {
  const controller = new AbortController();
  try {
    if (promises == undefined) { var promises = [] }
    
    // Liste des URL des fichiers JSON gzip
    const jsonUrls = [
      '/ui/plug-in/integration/carte-instrument-musee2-1/data/old-sortedData.json.gz',
      '/ui/plug-in/integration/carte-instrument-musee2-1/data/config.json.gz',
      '/ui/plug-in/integration/carte-instrument-musee2-1/data/countries_codes_and_coordinates.json.gz',
      '/ui/plug-in/integration/carte-instrument-musee2-1/data/output-topo.json.gz',
    ];

    // Utilisez une boucle pour charger et décompresser les fichiers JSON
    for (const url of jsonUrls) {
      promises.push(
        fetch(url)
          .then(response => {
            if (!response.ok) {
              //throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.arrayBuffer(); // Utilisez arrayBuffer pour récupérer les données brutes
          })
          .then(arrayBuffer => {
            // Décompressez le contenu avec pako
            const inflatedData = pako.inflate(new Uint8Array(arrayBuffer), { to: 'string' });

            // Parsez le contenu décompressé en tant qu'objet JSON
            return JSON.parse(inflatedData);
          })
      );
    }

    setTimeout(() => controller.abort(), 2000);
    Promise.all(promises, { signal: controller.signal })
      .then(data => {
        window["data"] = data;
      })
      .catch(error => {
        //console.error('Erreur lors du chargement des fichiers gzip :', error);
      });
  } catch (err) {
    console.log(err);
  }
} */
  
  
  window["mapMusee"] = createMap(initialView)
    window["topo_countries_layers"] = []
    window["groups"] = []
    window["markers"] = []
    window["countryMarkers"] = []
    window["unknown_markers"] = {
      "continents": {},
      "countries": {}
    }
    window["continents_popups"] = []
    window["object_type"] = data[1].object_type
    window["topojson_data"] = []
    window["data_countries"] =  data[2]
    window["object_type_data"] =  data[1]
    window["output_topo_data"] =  data[3]
    window["initial_data"] = initial_data || data



    function getInfos() {
      console.log(window.countryMarkers) // countries
      console.log(window.markers) // villes
      console.log(window.groups)
      console.log(window.countries_layers)
      var countGroup = 0
      var countMarker = 0
      var countCluster = 0
      window.mapMusee.eachLayer(layer => {
        // Vérifier si la couche est un marqueur, un marqueur de cluster ou un groupe de marqueurs
  
        if (layer instanceof L.Marker || layer instanceof L.MarkerCluster || layer instanceof L.LayerGroup) {
          if (layer instanceof L.Marker){
            countMarker++
          }
          if(layer instanceof L.MarkerCluster){
            countCluster++
          }
          if (layer instanceof L.LayerGroup) {
            countGroup++
          }
        }
          });
          console.log("countMarker : " + countMarker)
          console.log("countGroup : " + countGroup)
          console.log("countCluster :" + countCluster)
    }
    getInfos()


    function zoomEventHandler(){

  // Comportement au dezoom
  window.mapMusee.on('moveend', function() {
    var selectedEntry = selectizeItem[0].selectize.getValue();
    const currentZoom = window.mapMusee.getZoom();

    if (selectedEntry == "empty" || selectedEntry == "") {
      selectedEntry = false;
    } 
    // Seul le reset des clusters sur le niveau de zoom initial est trigger
    if (currentZoom === 2) {
      const dezoomLayersToRemove = [
        ...Object.values(window.unknown_markers.continents),
        ...Object.values(window.groups.countriesGroup),
        ...Object.values(window.unknown_markers.countries),
        ...Object.values(window.groups.continentGroup).map(group => group.getLayers()).flat(),
        ...Object.values(window.groups.countriesGroup).map(group => group.getLayers()).flat(),
      ]
      toggleNoClusterLayers('remove', dezoomLayersToRemove);


      toggleNoClusterLayers('add', Object.values(window.continents_popups));

      if (selectedEntry) {
        const countryPath = `path.${selectedEntry.toLowerCase()}`;
        const $countryPath = $(countryPath);
        $countryPath.removeClass("selected focused");
        
        selectizeItem[0].selectize.setValue("empty");
        $("#legend-cartel p b").text("Monde")

      }
    }

    updateCountObjects();


  });

  [
    
    {
        "Numéro de notice": "156675",
        "Titre": "Accordeur électronique / E.999.21.1",
        "Facteur ou auteur": "Anonyme",
        "Date de création": "vers 1980",
        "Type d'objet": "Accessoire",
        "Instrument niveau 1": "",
        "Instrument niveau 2": "",
        "Instrument niveau 3": "",
        "Collection d'origine": "",
        "Incontournable": "",
        "URL Photographie": "",
        "URL Enregistrement": "",
        "Enregistrement": "",
        "Continent": "Asie",
        "Pays": "Japon",
        "Code ISO-2": "JP",
        "Ville": "",
        "Coordonnées": "",
        "Autres descripteurs géographiques": ""
    },
    {
        "Numéro de notice": "156676",
        "Titre": "Etui d'accordeur électronique / E.999.21.2",
        "Facteur ou auteur": "Anonyme",
        "Date de création": "vers 1980",
        "Type d'objet": "Accessoire",
        "Instrument niveau 1": "",
        "Instrument niveau 2": "",
        "Instrument niveau 3": "",
        "Collection d'origine": "",
        "Incontournable": "",
        "URL Photographie": "",
        "URL Enregistrement": "",
        "Enregistrement": "",
        "Continent": "Asie",
        "Pays": "Japon",
        "Code ISO-2": "JP",
        "Ville": "",
        "Coordonnées": "",
        "Autres descripteurs géographiques": ""
    },
    
    {
        "Numéro de notice": "157376",
        "Titre": "Amplificateur / E.2000.30.2",
        "Facteur ou auteur": "Anonyme",
        "Date de création": "1980-1989",
        "Type d'objet": "Accessoire",
        "Instrument niveau 1": "",
        "Instrument niveau 2": "",
        "Instrument niveau 3": "",
        "Collection d'origine": "",
        "Incontournable": "",
        "URL Photographie": "https://mimo-international.com/media/CM/IMAGE/CMIM000024234.jpg",
        "URL Enregistrement": "",
        "Enregistrement": "",
        "Continent": "Asie",
        "Pays": "Japon",
        "Code ISO-2": "JP",
        "Ville": "",
        "Coordonnées": "",
        "Autres descripteurs géographiques": ""
    },
    {
        "Numéro de notice": "1078790",
        "Titre": "Pédalier GR700 de la guitare synthétiseur G-707 / E.2017.7.2",
        "Facteur ou auteur": "Anonyme",
        "Date de création": "1984-1985",
        "Type d'objet": "Accessoire",
        "Instrument niveau 1": "",
        "Instrument niveau 2": "",
        "Instrument niveau 3": "",
        "Collection d'origine": "",
        "Incontournable": "",
        "URL Photographie": "https://mimo-international.com/media/CM/IMAGE/CMIM000033569.jpg",
        "URL Enregistrement": "",
        "Enregistrement": "",
        "Continent": "Asie",
        "Pays": "Japon",
        "Code ISO-2": "JP",
        "Ville": "",
        "Coordonnées": "",
        "Autres descripteurs géographiques": ""
    },
    {
        "Numéro de notice": "1078797",
        "Titre": "Etui de guitare synthétiseur G-707 / E.2017.7.3",
        "Facteur ou auteur": "Anonyme",
        "Date de création": "1984-1985",
        "Type d'objet": "Accessoire",
        "Instrument niveau 1": "",
        "Instrument niveau 2": "",
        "Instrument niveau 3": "",
        "Collection d'origine": "",
        "Incontournable": "",
        "URL Photographie": "https://mimo-international.com/media/CM/IMAGE/CMIM000033571.jpg",
        "URL Enregistrement": "",
        "Enregistrement": "",
        "Continent": "Asie",
        "Pays": "Japon",
        "Code ISO-2": "JP",
        "Ville": "",
        "Coordonnées": "",
        "Autres descripteurs géographiques": ""
    }
]