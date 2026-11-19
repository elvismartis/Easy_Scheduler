# Easy Scheduler — React v2 (experimental)

A React + Vite rebuild of Easy Scheduler. This project is intended for testing on the `Little_features` branch before any release or merge to `main`.

## Requirements
- Node.js 20 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`; Vite writes the site to `dist/`.

## GitHub Pages

`vite.config.js` sets the repository base path to `/Easy_Scheduler/`. Configure GitHub Pages to deploy the `dist` directory using GitHub Actions. Do not point Pages at the source root for this Vite application.

## Included in this first React build
- React components and reducer-based application state.
- Weekly grid and responsive day view.
- Configurable active days, start/end times and slot interval.
- User-created categories and editable colours; no predefined categories.
- Empty timetable on first launch.
- Activity add/edit/delete and multi-day assignment.
- Overlap detection with explicit **Go back and edit** / **Save anyway** choices.
- Browser localStorage persistence.
- JSON import/export, PDF, Excel and PNG exports.

## Data
The app stores data in browser localStorage under `easy-scheduler-react-v2`. This is intentionally separate from the legacy version's storage key. Export the old schedule to JSON before migrating; this initial React version does not yet include an automatic legacy-data migration.

## Important limitations of this experimental build
This is a first functional React foundation, not yet a feature-for-feature port of every legacy utility. Advanced lunch-window automation, smart open-slot filling, search highlighting, undo/redo, and repository ZIP packaging remain future work. Review and test all workflows before merging or publishing.

## License
MIT.
