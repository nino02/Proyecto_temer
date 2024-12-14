import requests
import json

url = "https://api.makcorps.com/mapping"
params = {
    'api_key': '675d5e967d3a82d995227024',
    'name': 'Andalucia'
}

response = requests.get(url, params=params)

# Verificar si la solicitud fue exitosa (código de estado 200)
if response.status_code == 200:
    # Parsear la respuesta JSON
    json_data = response.json()
    
    # Guardar los datos en un archivo JSON en el ordenador
    output_file = f"mapping_city\\city_mapping_{params['name']}.json"
    try:
        with open(output_file, "w", encoding="utf-8") as file:
            json.dump(json_data, file, ensure_ascii=False, indent=4)
        print(f"Datos guardados correctamente en {output_file}")
    except Exception as e:
        print(f"Error al guardar el archivo: {e}")
else:
    # Imprimir un mensaje de error si la solicitud falla
    print(f"Error: {response.status_code}, {response.text}")

