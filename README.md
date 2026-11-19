# Easy Scheduler — React v2

Easy Scheduler is a browser-based weekly timetable planner for students, educators, researchers, and academic staff. React v2 provides a weekly timetable grid, a focused day view, activity and category management, scheduling-conflict detection, and export/import tools.

**Live application:** https://elvismartis.github.io/Easy_Scheduler/

## Features

### Timetable setup
- Set a timetable title and subtitle.
- Choose active days from Monday to Sunday.
- Configure the timetable start time and end time.
- Choose a slot interval of 15, 30, 45, 60, 90, or 120 minutes.
- View the schedule as a weekly grid or as an individual day.

### Activities
- Add, edit, and delete activities.
- Set an activity title, category, day or days, start and end times, tag/batch, room/location, and notes.
- Schedule a recurring activity on multiple selected days.
- Detect overlaps with existing activities on the same day.
- Review the conflicting activity and overlap interval before deciding whether to edit the proposed activity or save it anyway.

### Categories
- Create custom subject or activity categories.
- Choose and change a colour for each category.
- Delete categories. Activities previously assigned to a deleted category remain in the timetable as uncategorised activities.

### Search and schedule summaries
- Search activities by title, location, or notes.
- View scheduled hours, activity count, category count, and available time.
- Review the timetable in weekly-grid and day views.

### Export and data transfer
- **Excel (`.xlsx`):** Export the timetable as a spreadsheet.
- **PDF (`.pdf`):** Export a landscape A4 timetable.
- **PNG (`.png`):** Export an image of the timetable.
- **JSON (`.json`):** Export a schedule backup or import a previously exported schedule.

## Getting started

1. Open the [live application](https://elvismartis.github.io/Easy_Scheduler/).
2. In **Schedule Setup**, enter a timetable title and subtitle.
3. Select the active days, start and end times, and slot interval.
4. Add any categories you need and choose their colours.
5. Select **Add Activity** or choose an empty timetable slot.
6. Enter the activity details and save.
7. Use the weekly grid or day view to review and manage your timetable.
8. Use **Export** to create an Excel, PDF, PNG, or JSON file. Use **Import JSON** to restore a schedule.

## Run locally

### Requirements
- Node.js (an active LTS release is recommended).
- npm.

### Install and start the development server

From the repository root:

```bash
cd easy-scheduler-react-v2
npm ci
npm run dev
```

Vite prints a local development URL in the terminal. Open that URL in a browser.

### Create and preview a production build

```bash
npm run build
npm run preview
```

The production files are generated in `easy-scheduler-react-v2/dist/`.

## GitHub Pages deployment

The React application is in the `easy-scheduler-react-v2/` subdirectory. For the repository project site:

`https://elvismartis.github.io/Easy_Scheduler/`

Vite must use the repository path as its base URL. In `easy-scheduler-react-v2/vite.config.js`, configure:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Easy_Scheduler/',
})
```

If the Vite configuration already contains other settings, retain them and add the `base` property.

### Deploy with GitHub Actions

1. In the repository, create `.github/workflows/deploy.yml`.
2. Configure the workflow to install dependencies and build from `easy-scheduler-react-v2/`.
3. Upload `easy-scheduler-react-v2/dist/` as the Pages artifact and deploy it using the GitHub Pages Actions workflow.
4. In the repository's **Settings → Pages**, set the publishing source to **GitHub Actions**.
5. Push or merge the deployment workflow to the production branch configured by the workflow.
6. Check the **Actions** tab for a successful deployment, then open the live site.

The deployment workflow should use the committed `package-lock.json` and run `npm ci` before `npm run build`. The repository currently uses a SheetJS package tarball hosted by SheetJS; if npm's remote-dependency policy blocks installation in CI, configure the installation step to permit the explicitly declared remote dependency (for example, `npm ci --allow-remote=root`) and verify that the workflow succeeds.

**Production caution:** GitHub Pages serves one production site for this repository. Deploying React v2 to the repository's Pages site replaces the currently published site, so test the build locally or in a separate test repository/site before switching production from v1 to v2.

## Data storage and privacy

The timetable is stored in the browser's `localStorage` on the device and browser where it was created. It is not automatically synchronised across browsers or devices. Export a JSON file to back up or transfer a schedule. Clearing browser site data may remove the locally stored timetable.

## Technology

- React 18
- Vite 6
- JavaScript, HTML, and CSS
- [Lucide React](https://lucide.dev/) for icons
- [SheetJS](https://sheetjs.com/) for Excel export
- [jsPDF](https://github.com/parallax/jsPDF) for PDF export
- [html2canvas](https://html2canvas.hertzen.com/) for PNG export

## Project structure

```text
Easy_Scheduler/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── easy-scheduler-react-v2/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components/
│       └── lib/
│           └── scheduler.js
├── obsolete/
├── index.html
├── LICENSE
└── README.md
```

The exact contents of the repository may evolve as development continues.

## License

This project is distributed under the **MIT License**. See the [`LICENSE`](LICENSE) file for the full license text.
