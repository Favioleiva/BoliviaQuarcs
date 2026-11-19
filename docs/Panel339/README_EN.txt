POPULATION PANEL 1992–2024 · GEO4BOLIVIA 339 REFERENCE

339 municipalities × 4 censuses = 1,356 observations, with no missing population values.
National totals: 1992 6,420,792; 2001 8,274,325; 2012 10,059,856; 2024 11,365,333.

FILES
population_panel_1992_2024_long.csv and .parquet: long panel.
population_panel_1992_2024_wide.csv: one row per reference municipality.
population_panel_geo4bolivia339.gpkg and .geojson: fixed geometry and four population columns.
dictionary_2024_to_geo4bolivia339.csv: 343 unique source keys, 339 destinations.
The geo4bolivia filenames are byte-identical aliases of the original working filenames.
index.html and assets/: local bilingual dashboard. Keep the assets folder beside the HTML.
population_YEAR.png/.svg: Spanish maps; population_YEAR_en.png/.svg: English maps.
population_panel_overview.png and population_panel_overview_en.png: four-map figures.
intersections_2024_affected10.csv, population2024_six_reconstructed.csv and
code_bridge_2024_seven_corrections.csv: spatial and code diagnostics.

METHOD
1992: direct Redatam person counts in the available 339-unit distribution. Original census boundaries are not verified.
2001: LOCALIDA counts aggregated through the frozen v1 crosswalk, retaining accepted inferences. The crosswalk was not changed.
2012: Redatam municipal counts and the reviewed code correspondence. Exact equivalence with 2015 boundaries is unverified.
2024: 333 correspondences from the published geo4bolivia classification. Each of the ten affected units is assigned in full to the polygon with the largest intersection area, under the supervisor's explicit instruction. Areas use an equal-area Albers projection. Raqaypampa goes to Mizque; Macha to Colquechaca; Yura to Tomave; TIM to San Ignacio. The six remaining municipalities retain their reference destination.
Counts come from person microdata, not statistical attributes in the shapefile.

INTERPRETATION
Full numerical coverage does not establish exact individual locations or perfect territorial comparability. The 2024 rule assigns people who may live in a minority-area fraction to a single destination. Their number is unknown. San Ignacio covers 60.64% of TIM's area and Santa Ana 39.36%; all 3,973 people go to San Ignacio. Tomave covers 95.93% of Yura and Porco 3.81%; all 5,819 people go to Tomave. These are area shares, never population weights.
Applying the 95% threshold directly to the selected simplified GeoJSON retains 291 units, compared with 333 in the published classification. The supervisor selected the latter. Both diagnostics remain in the crosswalk; the 339 reference polygons are unchanged.
The final census year is 2024; its source cartography is SDSN 2025 and the common reference is 2015. No annual interpolation was performed.
Municipality names come from the INE 2012 census catalogue. asdf_id is the fixed polygon key; target_code does not replace original census codes.
source_units counts municipalities in 1992/2012/2024 and localities in 2001; this field is not comparable across years.

REFERENCES, STATUS AND REPRODUCTION
references.bib, referencias_2001_congeladas.bib, assets/credits.txt and validation.json.
The original bibliographic authorship and frozen 2001 reference file are retained.
Delivered for human review; the contract is not accepted or closed by the agent.
Data: python -B Outputs/Contract_01/Evidence/Code/build_population_panel339.py
Presentation: python -B Outputs/Contract_01/Evidence/Code/render_population_panel339.py
The HTML, CSS and JavaScript source templates are in the same Code directory.

Author: Favio Leiva
Powered by Codex + GPT6 Astra High Fast
Complete bibliography: references_complete.bib; source catalogue: references_catalog.json.
2001 harmonisation: method2001 section in the HTML and harmonization_2001_summary.json.
