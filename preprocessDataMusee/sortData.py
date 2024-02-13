import json
import csv
import gzip

# Charger le fichier instruments_data (CSV)
with open('data-carte2_2023-11-06.csv', newline='', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter='\t')
    instruments_data = list(csv_reader)

# Charger le fichier continent_infos (JSON)
with open('config.json', 'r', encoding='utf-8') as json_file:
    config = json.load(json_file)
    continents_infos = config['continents_infos']

# Charger le fichier data_countries (JSON)
with open('countries_codes_and_coordinates.json', 'r', encoding='utf-8') as json_file:
    data_countries = json.load(json_file)

# Focntion de préprocessing des données
def create_data_object(instruments_data, continent_infos, data_countries):
    c_data = {
        'pays': set(),
        'continents': {},
        'count_by_type': {},
        'raw_data': instruments_data,
        'convert_iso_name': {},
    }

    country_infos_map = {country["Alpha-2 code"]: country for country in data_countries}

    for item in instruments_data:
        continent = item.get("Continent", "unknown")
        if continent not in c_data['continents']:
            c_data['continents'][continent] = {
                'count': 0,
                'name_en': continent_infos[continent]['name_en'],
                'name': continent,
                'latlng': continent_infos[continent]['latlng'],
                'zoom_level': continent_infos[continent]['zoom_level'],
                'liste_pays': set(),
                'notices': {},
                'raw_data': [],
            }

        continent_data = c_data['continents'][continent]
        continent_data['count'] += 1
        continent_data['liste_pays'].add(item["Code ISO-2"])
        continent_data['raw_data'].append(item)

        country_info = country_infos_map.get(item["Code ISO-2"], None)
        if item["Code ISO-2"] not in continent_data['notices']:
            continent_data['notices'][item["Code ISO-2"]] = {
                'count': 0,
                'cities': {},
                'latlng': [float(country_info["Latitude (average)"]), float(country_info["Longitude (average)"])] if country_info else None,
                'name_fr': item["Pays"],
            }

        country_data = continent_data['notices'][item["Code ISO-2"]]
        country_data['count'] += 1

        if item['Ville'] not in country_data['cities']:
            country_data['cities'][item['Ville']] = {
                'count': 0,
                'notices': [],
            }

        city_data = country_data['cities'][item['Ville']]
        city_data['count'] += 1
        city_data['notices'].append(item)

        c_data['pays'].add(item["Code ISO-2"])
        c_data['convert_iso_name'][item["Code ISO-2"]] = item["Pays"]
        c_data['count_by_type'][item["Type d'objet"]] = c_data['count_by_type'].get(item["Type d'objet"], 0) + 1

    c_data['pays'] = list(c_data['pays'])
    for continent in c_data['continents']:
        c_data['continents'][continent]['liste_pays'] = list(c_data['continents'][continent]['liste_pays'])

    return c_data
    
c_data = create_data_object(instruments_data, continents_infos, data_countries)

# Export au format gzip
with gzip.open('sortedData.json.gz', 'wb') as fichier_gz:
    c_data_en_json = json.dumps(c_data)
    fichier_gz.write(c_data_en_json.encode('utf-8'))