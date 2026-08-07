Build the interactive Proofworks Workforce Transformation Index and Workforce Evolution Engine from the attached bundle.

Important:
- Work locally only.
- Do not deploy until I review.
- Do not redesign the rest of the page.
- Match the current dark editorial Proofworks visual system.
- Use the PNG/SVG files as visual references, not as the final interactive implementation.
- Use `workforce-index-data-v2.json` as the editable source of truth.

## Placement

Add the Workforce Transformation Index after the high-level company vision and before the Proofworks Engine.

Recommended sequence:
1. Company problem / vision
2. Workforce Transformation Index
3. Workforce Evolution Engine
4. Founder / contact

If the page currently has a long role-universe section, shorten or remove it after the map is working.

## Workforce Transformation Index

Rebuild it as native SVG or HTML/SVG.

Axes:
- X-axis: `How urgently the workflow needs to change`
- Y-axis: `How valuable it is to develop the people doing the work`
- Bubble size: modeled commercial opportunity

Quadrants:
- Top right: `Build before replacing`
- Top left: `Develop selectively`
- Bottom right: `Automate or redesign`
- Bottom left: `Watch, don't lead`

Highlight the top-right region:
`Proofworks priority zone`

Supporting copy:
`Urgent change • valuable people • repeatable employer need`

Important:
- The unit is a work cluster, not an entire industry.
- AI labs must appear explicitly as `AI labs / technical talent`.
- Do not rename it back to generic `Technical talent`.
- The AI-labs cluster should show high urgency and high employer spend, but a smaller addressable workforce and a crowded market.
- Companies such as Mercor should appear only as optional examples in the detail panel or a later company-overlay mode—not as default work-cluster bubbles.

## Interaction

Desktop:
- Hover/focus enlarges the selected bubble.
- Dim other bubbles slightly.
- Show a compact tooltip.
- Click/Enter opens a right-side detail panel.
- Escape or clicking outside closes it.

Mobile:
- Tap opens the detail panel below the chart.
- Do not rely on hover.

Tooltip:
- cluster name
- transformation pressure
- development leverage
- commercial opportunity
- 2–3 example roles

Detail panel:
- summary
- representative industries
- representative roles
- why the work is changing
- what can be developed internally
- where outside hiring may be needed
- market examples, when present

## Data architecture

Keep the chart content in one editable data file.

Preferred:
- convert `workforce-index-data-v2.json` into a typed TypeScript module
- keep positions, labels, roles, industries, and all detail-panel text outside the rendering component

Suggested files:
- `WorkforceTransformationIndex.astro` or `.tsx`
- `WorkforceClusterDetail.astro` or `.tsx`
- `ProofworksEvolutionEngine.astro` or `.tsx`
- `workforce-index-data.ts`

## Workforce Evolution Engine

Rebuild the supplied design as semantic HTML/CSS or native SVG.

It should show:
- technology changes the workflow
- internal employees and external candidates entering the same system
- Select → Build → Validate → Route
- four outcomes:
  - retain + redeploy
  - develop further
  - hire + contract
  - rebuild the workflow

Use subtle one-time entrance animation only.
Do not add constant floating motion.

## Accessibility

- keyboard-focusable bubbles
- Enter/Space opens
- Escape closes
- visible focus state
- aria-labels
- mobile-friendly panel
- reduced-motion support

## Constraints

- no fake percentages
- no scientific claims
- no heavy charting library unless already installed
- no raster image map
- no overlapping labels
- no giant paragraphs
- no rainbow palette
- no generic analytics-dashboard look

Label beneath the chart:

`Founder hypothesis. Work clusters—not whole industries. Positions and sizes are directional until supported by employment, wage, adoption, and employer-spend data.`

After implementing, report:
- files changed
- local preview instructions
- how the data can be edited
- whether AI labs are explicitly visible
- whether hover, keyboard, click, Escape, and mobile tap work
- which old sections were shortened or removed
- what still feels visually weak
