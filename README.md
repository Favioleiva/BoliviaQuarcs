# 🇧🇴 BoliviaQuarcs — Bolivia Census Observatory (1976–2024)

**Harmonized Subnational Census Megapanel of Bolivia across Five Censuses (`1976, 1992, 2001, 2012, 2024`) · 193 Indicators · Three Territorial Architectures · Bilingual ES/EN.**

**Author:** Favio Leiva  
**Live Observatory (Netlify):**
- **339 Municipalities (`1992–2024`):** https://geo4bolivialeiva2026.netlify.app/panel339/
- **290 AMC (`1976–2024`, 48-year long-term):** https://geo4bolivialeiva2026.netlify.app/panelamc/
- **343 Municipalities/TIOCs (`1992–2024`, MPD / SDSN 2025):** https://geo4bolivialeiva2026.netlify.app/panel343/

---

## 🌎 Three Territorial Architectures

All three architectures are linked via an in-map switcher and constructed under **strict territorial indivisibility** (zero fractional allocations, `diff = 0` exact national conservation across `2,676 / 2,676` additive checks):

| Architecture | Census Waves | Spatial Units | Purpose |
|---|---:|---:|---|
| **[290 AMC](docs/PanelAMC/index.html)** | `1976, 1992, 2001, 2012, 2024` (5) | `290` Minimum Comparable Areas | Uninterrupted 48-year historical analysis (`256` intact + `34` AMC unions, `0` empty polygons) |
| **[339 Municipalities](docs/Panel339/index.html)** | `1992, 2001, 2012, 2024` (4) | `339` GeoBolivia 2015 polygons | Full compatibility with Prof. Carlos Méndez’s Geo4Bolivia research infrastructure |
| **[343 Municipalities / TIOCs](docs/Panel343/index.html)** | `1992, 2001, 2012, 2024` (4) | `343` SDSN 2025 / CPV 2024 units | Extends CensoBO and INE REDATAM (`2001–2024`) harmonization back to **1992** with expanded indicators |

---

## 📊 193 Indicators Across Three Tiers

Every indicator is available in both **Rate / %** (person-weighted standard for housing, basic services, and assets) and **Raw Count** modes, mapped on a **common pooled historical color scale** (`Min · Center · Max`), paired with a **national weighted-average reference trendline**, and individually downloadable as CSV:

- **Tier 1 — Core Peru–Bolivia (`130` indicators):** Harmonized for cross-country comparability with the Peruvian census panel developed for my doctoral dissertation (demography, fertility, marital status, spoken languages, migration, literacy, educational attainment, labor force & women’s economic participation, ISCO/ISIC sectors, household structure, cooking fuel, water, sanitation, electricity, housing materials, overcrowding, tenure, dwelling type).
- **Tier 2 — Bolivia Panel Expansion (`40` indicators):** Multi-wave Bolivia-specific modules (mortality `MORTA`, indigenous self-identification, mother tongue, civil identity, institutional childbirth, health facility use, disability, waste/plaster, emigration abroad `EMIGRA`, household assets & ICT).
- **Tier 3 — Single-Census Special Modules (`23` indicators):** Rich single-wave modules including **1992 religion & official NBI**, **2001 maternal mortality & water pump**, and **2024 commuting, 19th ICLS labor force, health insurance, mean age at first birth, and modern appliances/fixed & mobile internet**.

---

## 📦 Datasets & Dictionaries (Parquet + CSV)

Aggregated panel datasets and variable dictionaries for researchers (zero individual microdata included):

| Panel | Raw Additive Counts (`255` vars) | Derived Rates (`69` indicators) | Variable Dictionary |
|---|---|---|---|
| **290 AMC (`1976–2024`)** | [megapanel_counts_long.parquet](docs/PanelAMC/megapanel_counts_long.parquet) | [megapanel_rates_long.parquet](docs/PanelAMC/megapanel_rates_long.parquet) | [megapanel_dictionary.csv](docs/PanelAMC/megapanel_dictionary.csv) |
| **339 Municipalities (`1992–2024`)** | [megapanel_counts_long.parquet](docs/Panel339/megapanel_counts_long.parquet) | [megapanel_rates_long.parquet](docs/Panel339/megapanel_rates_long.parquet) | [megapanel_dictionary.csv](docs/Panel339/megapanel_dictionary.csv) |
| **343 Municipalities (`1992–2024`)** | [megapanel_counts_long.parquet](docs/Panel343/megapanel_counts_long.parquet) | [megapanel_rates_long.parquet](docs/Panel343/megapanel_rates_long.parquet) | [megapanel_dictionary.csv](docs/Panel343/megapanel_dictionary.csv) |

Additional population tables, GIS layers (`.geojson`, `.gpkg`, `.zip`), geographic crosswalks, methods, and bibliographies remain available in [`docs/PanelAMC/`](docs/PanelAMC/), [`docs/Panel339/`](docs/Panel339/), and [`docs/Sources/`](docs/Sources/).

### Run locally / Ejecutar localmente

```sh
python -m http.server 8000 --directory docs
```

Then open `http://localhost:8000/PanelAMC/`, `http://localhost:8000/Panel339/`, or `http://localhost:8000/Panel343/`.

---

## 🇪🇸 Resumen en Español

**BoliviaQuarcs** es un observatorio y megapanel censal subnacional armonizado de Bolivia que cubre **cinco censos nacionales (`1976, 1992, 2001, 2012 y 2024`)**, con **193 indicadores socioeconómicos** visualizables en modo **Tasa / %** y **Conteo crudo**, escala cromática común del *pool* histórico, curva de **promedio nacional ponderado** en la línea de tiempo y descarga CSV individual por variable.

- **290 AMC (`1976–2024`):** Áreas Mínimas Comparables para análisis histórico continuo de 48 años (`0` polígonos vacíos).
- **339 municipios (`1992–2024`):** Compatibilidad total con la cartografía de referencia `Geo4Bolivia` del Prof. Carlos Méndez.
- **343 territorios (`1992–2024`):** Extiende hacia atrás hasta **1992** la armonización `2001–2024` de CensoBO y las bases REDATAM del INE, ampliando el conjunto de indicadores con conservación nacional exacta (`diff = 0`).

El repositorio contiene únicamente agregados territoriales, diccionarios y visores estáticos autocontenidos. No incluye microdatos individuales de personas ni viviendas.

---

## 🔬 Future Research / Investigación Futura

- Reconstructing 1976 municipal boundaries to extend harmonization across the other territorial architectures.
- Developing gender-disaggregated indicators to analyze subnational inequalities in education, employment, and access to basic services.
- Supporting development monitoring, territorial planning, cross-country Peru–Bolivia comparisons, and **Bayesian Model Averaging (BMA)**.

---

## 📄 License, Attribution & Citation / Licencia y Cita

Newly authored code, interactive viewers, and documentation in this repository are released under the **MIT License** ([LICENSE](LICENSE), Copyright (c) 2026 Favio Leiva). Underlying INE census data, Geo4Bolivia / SDSN Bolivia boundaries, and third-party visual assets (including visual design adapted from [geo4bolivia / QUARCS Lab](https://github.com/quarcs-lab/geo4bolivia) and Sentinel-2 cloudless 2016 imagery by EOX IT Services GmbH, CC BY 4.0) retain their respective original licenses and terms.

### How to cite / Cómo citar

> Leiva, F. (2026). *BoliviaQuarcs: Harmonized Subnational Census Megapanel of Bolivia (1976–2024) — 193 Indicators Across 290 AMC, 339, and 343 Territorial Architectures* [Software and dataset]. GitHub. https://github.com/Favioleiva/BoliviaQuarcs

```bibtex
@misc{leiva2026boliviaquarcs,
  author       = {Leiva, Favio},
  title        = {{BoliviaQuarcs: Harmonized Subnational Census Megapanel of Bolivia (1976--2024) across 290 AMC, 339, and 343 Territorial Architectures}},
  year         = {2026},
  publisher    = {GitHub},
  howpublished = {\url{https://github.com/Favioleiva/BoliviaQuarcs}},
  note         = {MIT License (code and original materials); underlying INE census data, Geo4Bolivia/SDSN boundaries, and third-party visual assets retain their original terms}
}
```

Structured metadata in [CITATION.cff](CITATION.cff).
