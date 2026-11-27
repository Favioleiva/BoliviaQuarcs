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

## Licencia y cita / License and citation

El código fuente, el visor interactivo y la documentación original de este repositorio se distribuyen bajo la **Licencia MIT** ([LICENSE](LICENSE), Copyright (c) 2026 Favio Leiva). Los datos censales del INE, la cartografía de referencia de Geo4Bolivia / SDSN Bolivia y los recursos visuales de terceros (incluida la imagen Sentinel-2 cloudless 2016 de EOX IT Services GmbH bajo CC BY 4.0) conservan sus licencias y términos originales.

*Newly authored code, interactive viewer, and documentation in this repository are released under the **MIT License** ([LICENSE](LICENSE), Copyright (c) 2026 Favio Leiva). Underlying INE census data, Geo4Bolivia / SDSN Bolivia boundaries, and third-party visual assets retain their respective original licenses and terms.*

### Cómo citar / How to cite

> Leiva, F. (2026). *BoliviaQuarcs: Harmonized Municipal Population Panel of Bolivia (1992, 2001, 2012, and 2024) on 339 Geo4Bolivia Reference Polygons* [Software and dataset]. GitHub. https://github.com/Favioleiva/BoliviaQuarcs

```bibtex
@misc{leiva2026boliviaquarcs,
  author       = {Leiva, Favio},
  title        = {{BoliviaQuarcs: Harmonized Municipal Population Panel of Bolivia (1992, 2001, 2012, and 2024) on 339 Geo4Bolivia Reference Polygons}},
  year         = {2026},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/Favioleiva/BoliviaQuarcs}},
  note         = {MIT License (code and original materials); underlying INE census data, Geo4Bolivia/SDSN boundaries, and third-party visual assets retain their original terms}
}
```

Metadatos estructurados en [CITATION.cff](CITATION.cff).


## Visualización compacta / Compact visualisation

Los botones de 1992, 2001, 2012 y 2024 están dentro del gráfico. El panel reúne
mapa, población nacional, detalle municipal, evolución y Top 10/Bottom 10.
En escritorio cabe en una vista de 1366 × 768 al pulsar **Explorar**; en móvil
se reorganiza verticalmente. Los rankings muestran nombre y población juntos.
**Limpiar** quita el resaltado y el recuadro; zoom, enfoque y ajuste permiten
recorrer los municipios. Fuentes y notas completas están al pie del panel.

El visor usa una escala continua **logarítmica azul–amarillo–rojo**, con rango
común a los cuatro censos: **92 a 1.610.982 personas**. La interpolación RGB
usa cinco stops equidistantes en log10, adaptados del diseño CambodiaCensus.
La misma población tiene el mismo color en cualquier año. No se modifican
los valores ni la metodología de armonización. Los PNG descargables conservan
sus ocho intervalos y paleta históricos, disponibles en un desplegable.

Year buttons are embedded in the map. The green panel combines the map,
national totals, municipal detail, four-census series and both rankings.
**Clear** removes the highlight and selection frame. The continuous logarithmic
blue–yellow–red scale uses one common domain, **92–1,610,982 people**, across
all years. Values, harmonisation methods and downloads are unchanged;
downloadable PNGs retain their historical eight classes and colours.

Validation: 339 municipalities and 1,356 values preserved; 2,712 selection and
colour states checked across both languages, 800 ranking rows checked across
five viewport sizes, and year/clear/zoom/fit interactions tested with mouse,
keyboard and touch. HTML remains self-contained and works offline.
Readable enhancement sources accompany the inline code in
`docs/Panel339/assets/interaction.css` and `interaction.js`.

## Panel de largo plazo 1976–2024 (290 Áreas Mínimas Comparables — AMC)

Además del panel estándar `1992–2024` de 339 municipios ([docs/Panel339/index.html](docs/Panel339/index.html)), el repositorio incorpora ahora el **Panel de largo plazo 1976–2024** ([docs/PanelAMC/index.html](docs/PanelAMC/index.html)) sobre un shapefile propio simplificado de **290 Áreas Mínimas Comparables (AMC)** (`256` municipios intactos + `34` uniones AMC documentadas, **0 polígonos vacíos**). Ambos visores están enlazados mediante un selector bilingüe **ES/EN** en la parte superior.

- **Censo 1976 (4.613.419 hab.):** `4.534.252` hab. (**98,28%**) asignados de forma exacta sin imputación (INE Volumen 11, catálogos cantonales 2001, CDRN y leyes de creación) + `79.167` hab. (**1,72%**) mediante balanceo intraprovincial 1992 con redondeo entero Hamilton (`179` áreas 100% exactas y `111` con balanceo explícito separado en `population_1976_exact` e `imputed_1976`).
- **Censos 1992–2024:** suma exacta de municipios miembros (`6.420.792`, `8.274.325`, `10.059.856`, `11.365.333`).
- **Escala cromática:** `log10` continua acotada **P2–P98** (`≤ 840` a `≥ 185.752`).
- **Descargas AMC:** [Panel ancho 290 AMC](docs/PanelAMC/population_panel_amc_1976_2024_wide.csv) · [Panel largo (1.450 filas)](docs/PanelAMC/population_panel_amc_1976_2024_long.csv) · [Puente 339 → 290 AMC](docs/PanelAMC/amc_to_geo4bolivia339_bridge.csv) · [Shapefile 290 AMC (ZIP)](docs/PanelAMC/population_panel_amc_1976_2024_shp.zip) · [GeoPackage](docs/PanelAMC/population_panel_amc_1976_2024.gpkg) · [Métodos AMC](docs/PanelAMC/LEEME.txt).

### Long-term panel 1976–2024 (290 Minimum Comparable Areas — AMC)

Alongside the standard `1992–2024` 339-municipality panel (`docs/Panel339/index.html`), this repository now includes the **1976–2024 Long-Term Panel** (`docs/PanelAMC/index.html`) built on a dedicated simplified **290 Minimum Comparable Areas (AMC)** shapefile (`256` intact municipalities + `34` documented AMC unions, **0 empty polygons**), linked via a bilingual **ES/EN** switcher at the top of both dashboards. In 1976, `98.28%` (`4,534,252`) is exact observed and `1.72%` (`79,167`) is allocated within validated 1992 provinces by 1992 shares (explicitly separated in `population_1976_exact` and `imputed_1976`), with a P2–P98 clamped `log10` color scale.
