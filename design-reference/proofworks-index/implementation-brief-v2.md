# Proofworks interactive artifacts — implementation brief v2

## Files in this bundle

- `01_workforce_transformation_index_high.png` — visual preview
- `01_workforce_transformation_index_high.svg` — editable visual reference
- `02_workforce_evolution_engine_high.png` — visual preview
- `02_workforce_evolution_engine_high.svg` — editable visual reference
- `workforce-index-data-v2.json` — editable content and interaction data
- `claude-code-build-prompt.md` — copy/paste implementation prompt

## Important modeling choice

The map plots **work clusters**, not whole industries.

For example, construction planning can sit high on the map while frontline construction labor sits much lower. Healthcare administration can be a strong opportunity even though clinical work belongs elsewhere.

## AI labs

AI labs are explicitly included as the cluster:

`AI labs / technical talent`

This is useful for showing where companies such as Mercor and other technical-talent marketplaces sit relative to Proofworks.

Interpretation:

- Smaller addressable workforce than many distributed service sectors
- Very high employer spend per worker
- High urgency
- Crowded market

Do not hide AI labs inside a generic “technical talent” label.

## Recommended implementation

Rebuild the Index as native SVG or HTML/SVG.

Do not use the PNG as the live chart.

The chart should:
- read all content from `workforce-index-data-v2.json`
- render every bubble as a real SVG element
- support hover, keyboard focus, click, Escape-to-close, and mobile tap
- open a detail panel for each cluster
- keep short labels on the chart
- show roles, industries, rationale, and development paths in the panel
- clearly label the map as a founder hypothesis

## Optional company overlay

Add a toggle later:

`Work clusters | Company examples`

In company-example mode, show small reference markers or tooltip tags for companies serving parts of the market.

Example:
- Mercor → near `AI labs / technical talent`
- Enterprise talent-mobility vendors → near internal workforce transformation clusters
- Corporate learning vendors → near lower-fidelity development solutions

Do not mix company bubbles and work-cluster bubbles in the default view.
