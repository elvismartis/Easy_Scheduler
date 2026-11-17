# Easy Scheduler — Academic Timetable & Smart Slot Planner

Easy Scheduler is a browser-based timetable planner for students, professors, researchers, and academic staff. Build a weekly schedule, organise activities with your own categories and colours, identify unassigned time, detect scheduling conflicts, and export the timetable.

## Live site

**[Open Easy Scheduler](https://elvismartis.github.io/Easy_Scheduler/)**

The application runs in the browser. Your timetable is saved in the browser's local storage; use the JSON export to create a backup or move a schedule to another browser or device.

---

## Features

### Flexible timetable setup

- Set the timetable title and subtitle.
- Choose active days from Monday to Sunday, with weekday and full-week shortcuts.
- Configure daily start and end times.
- Choose a 15-, 30-, 45-, 60-, or 90-minute slot interval, or define a custom interval.
- Configure a daily lunch window and apply it to the timetable.

### Blank schedule when you start

- A new installation opens with an empty timetable; no sample activities are inserted automatically.
- No subject categories or category colours are preloaded.
- The initial configuration uses Monday to Saturday, 08:30–17:30, and a 60-minute slot interval. You can change these settings in **Schedule Setup**.

### User-defined categories and colours

- Create the categories you need; the application does not impose a preset category list.
- Choose a colour for each category and adjust it later.
- Edit or remove categories from **Subject Categories & Colors**.
- Assign a category to an activity when adding or editing a timetable slot.

### Activity management and conflict detection

- Add activities from the **Add Activity** button or by selecting a timetable slot.
- Record the activity title, category, day or days, start and end times, location, tag, and notes.
- Assign recurring activities to multiple days.
- When a new or edited activity overlaps an existing scheduled activity on the same day, Easy Scheduler displays a conflict warning with the existing activity and overlapping time interval.
- Choose **Go back and edit** to cancel the pending save, or **Save anyway** to proceed.
- When you choose to save despite a conflict, the new activity takes the overlapping time; any non-overlapping portion of the existing activity is retained.
- Availability placeholders such as Open Slots are excluded from clash warnings so that free time can be assigned normally.

### Find and manage free time

- Use **Fill Empty** to mark unassigned gaps as editable Open Slots.
- Review free time in the weekly grid and day view.
- Use the free-time summaries to understand how much of the timetable remains unassigned.

### Weekly and mobile views

- **Weekly Grid:** See the week in a table with a sticky time column and horizontal scrolling when needed.
- **Day View:** Review one day as a vertical list of activity cards.
- The layout includes mobile-friendly controls and touch targets.

### Export and backup

- **Excel (`.xlsx`):** Export a two-dimensional weekly timetable and schedule summary.
- **PDF (`.pdf`):** Export a landscape A4 timetable. The PDF is generated with jsPDF and can span multiple pages when required. If the PDF library is unavailable or PDF generation fails, the application falls back to the browser print dialog.
- **PNG (`.png`):** Export a high-resolution image of the timetable.
- **JSON (`.json`):** Export or import a schedule template for backup and transfer.
- **Repository ZIP (`.zip`):** Download a ZIP package of the project from the Export menu.

---

## Getting started

1. Open the [live scheduler](https://elvismartis.github.io/Easy_Scheduler/).
2. Open **Schedule Setup** and enter a timetable title and subtitle.
3. Select active days, daily start and end times, and the slot interval.
4. Add the subject categories you want under **Subject Categories & Colors**, selecting a colour for each one.
5. Click **Apply & Save Schedule Settings**.
6. Add activities using **Add Activity** or by selecting an empty slot in the timetable. Enter the title, category, day or days, start and end times, and any optional location or notes.
7. Use **Fill Empty** to mark the remaining unassigned gaps as Open Slots.
8. Use **Export** to download an Excel workbook, PDF, PNG image, or JSON backup.

## Schedule conflict behaviour

Conflict detection compares the proposed activity's time interval with existing activities on each selected day. Two activities that meet exactly at an endpoint—for example, 09:00–10:00 and 10:00–11:00—are not treated as overlapping. If an overlap is found, the application pauses the save and asks the user to choose whether to return to editing or save anyway.

## Technology

- HTML, CSS, and JavaScript
- Tailwind CSS utility styling (bundled in the page)
- [SheetJS](https://sheetjs.com/) for Excel export
- [jsPDF](https://github.com/parallax/jsPDF) for landscape PDF export
- [html2canvas](https://html2canvas.hertzen.com/) for PNG export
- [JSZip](https://stuk.github.io/jszip/) for repository ZIP packaging
- Font Awesome icons and the Inter typeface

## Deployment with GitHub Pages

1. Keep `index.html` in the root of the GitHub repository.
2. Commit and push the updated file to the branch used by GitHub Pages.
3. In the repository settings, open **Pages** and confirm the publishing branch and root folder.
4. Open the live site link above. After a deployment, refresh the page; if an older version remains cached, perform a hard refresh.

## Data and privacy

The timetable is stored in the browser's `localStorage` on the device and browser where it was created. It is not automatically synchronised across devices. Export a JSON template regularly if you need a portable backup. Clearing browser site data can remove the locally stored timetable.

## License

This project is distributed under the **MIT License**. See the repository's `LICENSE` file for the full license text.
