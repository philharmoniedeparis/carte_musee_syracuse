# carte-musee-syracuse

## Mapshapper

### Commandes utiles

carte-musee-syracuse Référenciel de traitement des topojson Utilisation de mapshapper.com

Commandes de console utiles : 

remove properties : -filter-fields names,fields 

split out region : explode 

merge layers : merge-layer target=layer1,layer2 

change coord of layer : -affine shift=360.0 

add prop from csv : join file.csv keys=layer,csv fields=col 

merge all pol on layer (loose data): dissolve 

merge all pol on layer (keep data): dissolve fields=prop1,prop2 

add prop : each prop=value


## Documentation du code map.js

Lien github : https://github.com/ChristopheLeonardi/carte-musee-syracuse

### wait_for_data

Attend le chargement des données avant de lancer la fonction `generalMapMusee`.
La fonction vérifie périodiquement si les données sont chargées et, une fois chargées,
appelle la fonction `generalMapMusee` pour initialiser la carte.




`@param {Promise[]}` promises - Un tableau de promesses représentant les requêtes de données.



```

var promises = []
function wait_for_data(promises) {}

```

### get_data

Charge et décompresse des fichiers JSON gzip à partir d'URLs spécifiées.
Utilise `fetch` pour charger chaque fichier et `pako.inflate` pour décompresser les données.
Une fois les données chargées et décompressées, elles sont stockées dans la variable globale `window["data"]`.
La fonction gère également un délai d'attente pour les requêtes et capture les erreurs potentielles lors du chargement.




`@param {Promise[]}` promises - Un tableau de promesses pour gérer les requêtes asynchrones.
                              Si `promises` n'est pas défini, un nouveau tableau est créé.



```
function get_data(promises) {}

```

### createDataObject

Crée un objet de données structuré à partir de données brutes sur des instruments, des informations sur les continents et des données de pays.
Cette fonction organise les données d'instruments par continent et pays, comptabilise les types d'objets,
et construit une structure de données détaillée pour une utilisation ultérieure dans l'affichage de la carte.




`@param {Object[]}` instruments_data - Tableau d'objets représentant les données des instruments.


`@param {Object}` continent_infos - Objet contenant des informations sur les continents, telles que les noms et les coordonnées.


`@param {Object[]}` data_countries - Tableau d'objets contenant des informations sur les pays, y compris les codes ISO et les coordonnées.


`@returns {Object}` Un objet structuré contenant les données organisées par continents et pays, ainsi que d'autres métadonnées utiles.



```
function createDataObject(instruments_data, continent_infos, data_countries) {}


```



Fonction principale pour initialiser et configurer la carte interactive du musée.
Cette fonction gère la création et l'affichage de la carte, des marqueurs, des clusters, des filtres et des interactions utilisateur.
Elle prend en charge les données initiales, configure les vues et les événements, et initialise les composants interactifs de l'interface utilisateur.




`@param {Object}` data - Les données brutes et configurées nécessaires pour initialiser la carte.


`@param {Object}` [initial_data=false] - Données initiales optionnelles pouvant être utilisées pour réinitialiser ou reconfigurer la carte.



```
function generalMapMusee(data, initial_data = false) {}

```



Fonction pour rendre la carte responsive.
Ajuste dynamiquement la hauteur de la carte et des filtres en fonction de la taille de la fenêtre du navigateur.



```
function responsiveMap() {}

```



Ajuste la hauteur des éléments de la carte pour s'adapter à la taille de la fenêtre.
Calcule et applique la hauteur nécessaire à la carte et aux filtres pour un affichage optimal sur différents appareils.



```
function setResponsiveHeight() {}

```



Normalise et formate une chaîne de caractères pour une utilisation uniforme.
Remplace les caractères spéciaux et les espaces par des underscores et convertit en minuscules.




`@param {string}` str - La chaîne de caractères à normaliser.


`@return {string}` La chaîne normalisée.



```
function normalize_string(str) {}
  
```



Élimine les doublons d'un tableau d'objets en se basant sur une clé spécifique.




`@param {Object[]}` arr - Le tableau d'objets à traiter.


`@param {string}` key - La clé utilisée pour identifier les doublons.


`@return {Object[]}` Un tableau sans doublons.



```
function removeDuplicateObject(arr, key) {}

```



Crée et initialise une carte Leaflet.
Configure les options de base telles que le zoom et les tuiles de la carte.




`@param {Object}` initialView - Objet contenant les coordonnées initiales (latlng) et le niveau de zoom de la vue de la carte.


`@return {L.map}` L'instance de la carte Leaflet créée.



```
function createMap(initialView) {}

```



Crée les layers des pays à partir des données TopoJSON.
Chaque couche de pays est ajoutée à la carte Leaflet.




`@param {Object[]}` data - Tableau d'objets contenant les données TopoJSON.



```
function createCountriesLayers(data) {} 

```



Fonction de style pour les couches GeoJSON.
Définit le style de remplissage, d'opacité et les classes CSS pour les entités géographiques.




`@param {Object}` features - Les caractéristiques de l'entité géographique.


`@return {Object}` Un objet de style pour la couche GeoJSON.



```
function style(features) {}

```



Fonction appelée sur chaque entité TopoJSON lors de la création des couches GeoJSON.
Ajoute des identifiants aux couches, définit les interactions (clic, survol) et filtre les couches sans notices.




`@param {Object}` features - Les caractéristiques de l'entité TopoJSON.


`@param {L.Layer}` layer - La couche Leaflet correspondante.



```
function onEachTopojson(features, layer) {}

```



Détermine si une couche de pays contient des notices en fonction des filtres actifs.
Utilise les filtres sélectionnés pour vérifier si des notices correspondantes existent pour un pays donné.




`@param {L.Layer}` layer - La couche de pays à vérifier.


`@return {boolean}` Vrai si des notices correspondant aux critères de filtre existent, faux sinon.



```
function hasNotices(layer) {}

```



Crée des clusters de marqueurs pour les continents et les pays.
Utilise Leaflet markerClusterGroup pour regrouper les marqueurs par continent et pays.




`@param {Object}` sortedData - Données triées par continent et pays.


`@param {Object[]}` data_countries - Données des pays incluant les coordonnées et les codes.


`@return {Object}` Objets contenant les groupes de clusters pour les continents et les pays.



```
function createCluster(sortedData, data_countries) {}

```



Gère l'événement de survol sur les clusters de pays.
Modifie l'opacité des pays lors du survol d'un cluster.




`@param {Object}` event - Événement déclenché par le survol d'un cluster.


`@param {number}` opacity - Opacité à appliquer aux pays lors du survol.



```
function getHoverCountryCluster(event, opacity) {}

```



Récupère les identifiants des marqueurs à partir d'un tableau de marqueurs.
Utilisé pour identifier les pays dans un cluster lors du survol.




`@param {Array}` markers - Tableau de marqueurs Leaflet.


`@param {Array}` selected_countries - Tableau pour stocker les identifiants des pays récupérés.



```

function getMarkersIds(markers, selected_countries) {}

```



Fonction pour créer l'icône d'un cluster de marqueurs.
Calcule le nombre total d'objets dans le cluster et renvoie une icône personnalisée.




`@param {L.MarkerCluster}` cluster - Cluster de marqueurs Leaflet.


`@return {Object}` Objet contenant le HTML et la classe CSS pour l'icône du cluster.



```
function cluster_icon(cluster) {} 

```



Crée un marqueur pour un continent donné et l'ajoute à un groupe de clusters.
Crée également un marqueur "inconnu" si nécessaire.




`@param {string}` country_code - Code ISO du pays.


`@param {Object}` parentGroup - Groupe parent pour le cluster.


`@param {Object}` countryMarkers - Objet pour stocker les marqueurs de pays.


`@param {string}` continent_name - Nom du continent.


`@param {Object}` sortedData - Données triées contenant les informations des continents et des pays.



```
function createContinentCluster(country_code, parentGroup, countryMarkers, continent_name, sortedData) {}

```



Crée un marqueur pour un continent donné et l'ajoute à un groupe de clusters.
Crée également un marqueur "inconnu" si nécessaire.




`@param {string}` country_code - Code ISO du pays.


`@param {Object}` parentGroup - Groupe parent pour le cluster.


`@param {Object}` countryMarkers - Objet pour stocker les marqueurs de pays.


`@param {string}` continent_name - Nom du continent.


`@param {Object}` sortedData - Données triées contenant les informations des continents et des pays.



```
function createCountriesCluster(country_code_obj, country_code, countryGroupObject) {}

```



Crée un marqueur Leaflet pour une ville donnée.
Utilise les données de la ville pour créer un marqueur et une popup associée.




`@param {string}` city - Nom de la ville.


`@param {Object}` cityData - Données relatives à la ville, y compris les notices associées.


`@return {L.Marker}` Un marqueur Leaflet pour la ville spécifiée.



```
function createMarker(city, cityData) {} 

```



Crée un marqueur Leaflet pour une localisation "inconnue" avec un popup associé.




`@param {Array}` latlng - Coordonnées [latitude, longitude] de la localisation.


`@param {string}` label - Étiquette à afficher pour le marqueur.


`@param {number}` count - Nombre total d'objets associés au marqueur.


`@param {Array}` notices - Ensemble des notices associées au marqueur.


`@return {L.Marker}` Un marqueur Leaflet pour la localisation inconnue.



```
function createUnknownMarker(latlng, label, count, notices) {}

```



Ajuste la longitude pour gérer correctement les valeurs à l'ouest du méridien de Greenwich.




`@param {number|string}` input - Longitude initiale.


`@return {number}` Longitude ajustée.



```
function enableAnteMeridian(input) {} 
```



Crée et ajoute des popups Leaflet pour chaque continent sur la carte.




`@param {Object}` sortedData - Données triées contenant les informations des continents.



```
function createContinentMarkers(sortedData) {}

```



Crée le contenu HTML d'un popup pour un continent.




`@param {Object}` `continent_object - Objet contenant les informations du continent.


`@return {HTMLElement}` Un élément HTML représentant le contenu du popup.



```
function createPopupContinent(continent_object) {}

```



Modifie l'effet de survol sur les pays.

` e - L'événement déclencheur.
` countries_to_display - Les codes des pays à afficher.
` opacity - L'opacité à appliquer.



```
function hoverCountryEffect(e, countries_to_display, opacity) {}

```



Affiche les marqueurs pour un pays sélectionné et gère l'affichage des layers sur la carte.


` e - L'événement déclencheur contenant les informations sur le pays sélectionné.



```
function displayCountryMarkers(e) {}


```



Crée et affiche des marqueurs pour les pays voisins.


` neighbors - Les codes des pays voisins à afficher.
` [bounds=false] - Les limites géographiques pour ajuster la position des marqueurs.



```
function createMarkersNeighbors(neighbors, bounds = false) {}

```



Calcule de nouvelles coordonnées pour un marqueur afin de le positionner à l'intérieur d'une zone spécifiée.


` latlng - Un tableau contenant les coordonnées initiales du marqueur [latitude, longitude].
` bounds - Les limites géographiques au sein desquelles le marqueur doit être positionné.
` Un objet LatLng de Leaflet représentant les nouvelles coordonnées ajustées du marqueur.



```
function calculateNewLatLng(latlng, bounds) {}

```



Crée une popup pour un marqueur avec des informations sur les notices associées.


` notices - Un tableau de notices à afficher dans la popup.
`Le conteneur de la popup.



```
function createMarkerPopup(notices) {}


```



Crée un conteneur pour les informations de la ville.
` notices - Un tableau de notices à utiliser pour les informations de la ville.
` Le conteneur des informations de la ville.

```
function createCityContainer(notices) {}

```



Crée un diaporama de cartels pour afficher des informations sur des objets spécifiques.
Sélectionne aléatoirement des objets et met l'accent sur les objets "incontournables".




`@param {Event}` e - L'événement déclencheur.


`@param {Array}` notices - Un tableau d'objets représentant les notices à afficher.



```
function createCartel(e, notices) {}

```



Crée et ajoute un bouton de fermeture pour le diaporama de cartels.
Le bouton est ajouté uniquement s'il n'existe pas déjà.



```
function createCloseButton() {}

```



Mélange aléatoirement les éléments d'un tableau.




`@param {Array}` array - Le tableau à mélanger.


`@return {Array}` Le tableau mélangé.



```
function shuffleArray(array) {}

```



Crée un bouton audio avec un lecteur pour jouer un extrait audio.




`@param {string}` audioSource - L'URL de la source audio.


`@param {string}` text - Le texte à afficher sur le bouton.


`@param {HTMLElement}` player_element - L'élément DOM dans lequel le bouton et le lecteur seront insérés.



```
function createAudioButton(audioSource, text, player_element) {}

```



Contrôle la lecture audio. Lie les événements de clic sur le bouton pour jouer ou mettre en pause l'audio.




`@param {HTMLElement}` playBtn - Le bouton qui contrôle la lecture/pause de l'audio.



```
function audioPlay(playBtn) {} 

```



Affiche une barre de progression sur le bouton audio en fonction du temps de lecture.




`@param {HTMLElement}` elt - L'élément bouton sur lequel la barre de progression sera affichée.


`@param {HTMLAudioElement}` player - L'élément audio pour lequel la progression est calculée.



```
function progressBar(elt, player) {}

```



Gère les interactions avec les filtres de la carte, y compris les événements de clic et de changement.
Inclut la gestion des filtres pour les enregistrements, les types d'objets et la localisation.



```
function handleFilters() {}

```



Applique les filtres sélectionnés et met à jour les clusters de marqueurs et les popups.
Gère l'affichage des clusters pour les continents et les pays, ainsi que les marqueurs inconnus.



```
function applyFilters() {}

```



Définit le statut d'affichage d'un marqueur inconnu.




`@param {Object}` marker - Le marqueur à mettre à jour.


`@param {string}` country_code - Le code ISO du pays associé au marqueur.


`@param {boolean}` isDisplayed - Indique si le marqueur doit être affiché.



```
function setUnknownMarkerDisplayStatus(marker, country_code, isDisplayed) {}

```



Met à jour le contenu de la popup d'un marqueur.




`@param {Object}` marker - Le marqueur dont la popup doit être mise à jour.


`@param {Array}` filteredNotices - Les notices filtrées à afficher dans la popup.



```
function updateMarkerPopup(marker, filteredNotices) {}

```



Met à jour le contenu de la popup d'un marqueur.




`@param {Object}` marker - Le marqueur dont la popup doit être mise à jour.


`@param {Array}` filteredNotices - Les notices filtrées à afficher dans la popup.



```
function updateMarkerContent(marker, count, type = false, className = false) {}

```



Met à jour le contenu d'un marqueur, y compris le compteur et la classe CSS.




`@param {Object}` marker - Le marqueur à mettre à jour.


`@param {number}` count - Le nombre d'éléments à afficher sur le marqueur.


`@param {string}` [type=false] - Le type de marqueur (continent, ville, etc.).


`@param {string}` [className=false] - La classe CSS à appliquer au marqueur.



```
function updateCountObjects() {}

```



Crée et retourne une fonction de filtrage combiné en fonction des filtres sélectionnés.
Le filtrage est basé sur la présence d'un enregistrement et le type d'objet.


@returns {Function} Une fonction de filtrage qui accepte un objet notice et retourne un booléen.



```
function getFiltersSettings() {}

```



Affiche le nombre total d'objets dans tous les continents.


@param {Object} data - Les données contenant les informations des continents.



```
function displayResultNumber(data) {}
```



Remplit le champ de sélection de localisation avec les options générées.


@param {Object} data - Les données utilisées pour générer les options de localisation.



```
function populateLocalisation(data) {} 

```



Initialise et configure le champ de sélection de localisation avec les options de localisation générées.




`@param {Object}` data - Les données utilisées pour créer les options de localisation.



```
function createOptionsLocalisation(data) {}

```



Génère une structure de données pour les options de localisation utilisées par Selectize.




`@param {Object}` data - Les données contenant les informations des continents et pays.


`@returns {Array}` Un tableau d'options formatées pour Selectize.



```
function createSelectizeDOM(data) {}

```



Formate une option pour l'affichage dans le menu déroulant de Selectize.




`@param {Object}` item - L'objet représentant une option de localisation.


`@param {Function}` escape - Fonction d'échappement de caractères spéciaux.


`@returns {string}` Le HTML formaté pour une option Selectize.



```
function selectizeOptionDOM(item, escape) {}

```



Remplit les options de types d'objets dans l'interface utilisateur en fonction des données disponibles.




`@param {Object}` data - Les données contenant les informations sur les types d'objets.



```
function populateObjectTypes(data) {}

```



Gère les changements de mode plein écran pour la carte, en ajustant l'affichage des filtres.



```
function onFullScreenChange() {}

```



Initialise la fonctionnalité de recherche dans l'interface utilisateur.



```
function searchBox() {}

```



Applique les filtres de recherche sur les données et met à jour la carte en conséquence.
Gère la recherche par mots-clés, les filtres de type et d'enregistrement.



```

function filterSearch() {} 

```



Fonction de création du bouton reset de la carte


`@param {Object}` map - Variable contenant l'objet carte



```
function createResetButton(map) {} 

```



Gère l'ouverture et la fermeture du menu des filtres sur la carte.
Bascule l'icône du bouton et les fonctionnalités de navigation de la carte en fonction de l'état du menu.
Désactive les interactions de la carte (dragging, touchZoom, etc.) lorsque les filtres sont ouverts en mode plein écran.



```
function openCloseFilters() {}

```




```
function createCopyOfLayer(layer, offset)

```


Fonction de création d'une copie de la couche TopoJson


`@param {Object}layer` - couche topojson
`@param {Number}offset` - valeur de décalage



```
function toggleLayers(action, layerCollection)

```

Fonction gérant l'ajout ou la suppression des layers
`@param {str} "add" | "remove"` - Paramétre d'ajout ou de suppresion du layer.
`@param {Array} layerCollection` - Tableau contenant les layers.