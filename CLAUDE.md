# kyle-site — CLAUDE.md

## Design rules

No explainer paragraphs anywhere on the site. Trust, method, and how-it-works
content renders as chips, legends, or short labeled lines — never prose blocks.
If a section needs a paragraph to explain itself, redesign the section.

## Post-deploy check-URLs

After every deploy, print a "Check URLs" block for me to copy-paste. One URL
per page changed in this deploy, using the current git short hash as a cache-
busting query param.

Format:

```
✅ Deployed — fresh check-URLs (send these to Claude for review):

https://kylefindlay.xyz/?v=<hash>
https://kylefindlay.xyz/proofworks?v=<hash>
```

Rules:
- Get the hash with: `git rev-parse --short HEAD`
- Only list pages actually affected by this deploy
- Always include the full `https://` URL so the links are paste-ready
- Print this block last, after confirming the deploy succeeded
