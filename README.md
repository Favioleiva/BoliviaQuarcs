# BoliviaQuarcs

Panel de población de Bolivia para los censos de **1992, 2001, 2012 y 2024**, armonizado sobre **339 polígonos de referencia geo4bolivia**. Interfaz en español e inglés.

**Autor: Favio Leiva**  
**Powered by Codex + GPT6 Astra High Fast**

## Abrir el panel

Descarga este repositorio y abre `docs/Panel339/index.html` en un navegador. También puedes servirlo localmente desde la raíz:

```sh
python -m http.server 8000 --directory docs
```

Luego abre [el panel local](http://localhost:8000/Panel339/index.html). La tabla está ordenada ascendentemente por código de referencia y muestra código, departamento, provincia, municipio y población por año.

## Datos y documentación

- [Panel de 339 municipios](docs/Panel339/population_panel_1992_2024_wide.csv)
- [Panel largo de 1.356 observaciones](docs/Panel339/population_panel_1992_2024_long.csv)
- [Geometrías y población](docs/Panel339/population_panel_geo4bolivia339.geojson)
- [Diccionario geográfico de localidades 2001](docs/Sources/diccionario_poblacion2001_mendez339_v1.csv)
- [Correspondencias 2024 a geo4bolivia339](docs/Panel339/dictionary_2024_to_geo4bolivia339.csv)
- [Métodos y limitaciones](docs/Panel339/LEEME.txt)
- [Bibliografía completa](docs/Panel339/references_complete.bib)
- [Créditos visuales y atribuciones](docs/Panel339/assets/credits.txt)

El repositorio contiene el producto publicado y sus datos agregados. Las microbases de personas y viviendas y los archivos internos de trabajo no forman parte de esta publicación. El diccionario2001 contiene códigos de localidades y conteos agregados, no registros individuales de personas. El trabajo exploratorio1976 no está incorporado a este panel.

La cobertura numérica completa no demuestra equivalencia territorial exacta. Para1992 se utiliza la distribución disponible en339 unidades;2001 conserva las inferencias del diccionario revisado;2012 usa el puente de códigos documentado;2024 conserva333 correspondencias publicadas y asigna completas las10 unidades afectadas al destino con mayor superficie compartida. Los porcentajes de superficie no son porcentajes de población. El último censo es2024, su mapa de origen es2025 y la cartografía común es2015.

## English

Bolivia population panel for the **1992, 2001, 2012 and 2024 censuses**, harmonised to **339 geo4bolivia reference polygons**. The dashboard supports English and Spanish. Its table is sorted by reference code and displays code, department, province, municipality and census-year counts.

Open `docs/Panel339/index.html` directly, or run the local server above. This repository contains the static dashboard, maps, aggregate data, geographic crosswalks and references. Person and dwelling microdata, internal working files and the exploratory1976 reconstruction are excluded.

See [English methods and limitations](docs/Panel339/README_EN.txt). Full numerical coverage does not imply exact historical boundary equivalence or individual geolocation. The2024 whole-unit allocations use the largest area overlap; area shares are not population shares.

Visual design adapted from [geo4bolivia / QUARCS Lab](https://github.com/quarcs-lab/geo4bolivia). Satellite image: Sentinel-2 cloudless2016, EOX IT Services GmbH, CC BY4.0. Full third-party attribution is preserved in the credits and bibliography.

The `docs/` directory is a self-contained static product. This commit does not enable GitHub Pages hosting.
