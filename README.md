# 📅 Easy Scheduler — Timetable & Smart Slot Planner

A single-page, client-side interactive timetable builder designed for **students, professors, researchers, and academic staff**. Create your custom college or research schedule, automatically detect and manage free slots for deep study or relaxation, and export your timetable to **Excel (.xlsx 2D Grid)**, **Landscape PDF (.pdf)**, **High-Res Image (.png)**, or **JSON backups**.

---
[Click here to make your own scheduler](https://elvismartis.github.io/Easy_Scheduler/)

---

## ✨ Key Features

1. **Unified, Non-Tech Friendly Schedule Setup**
   - All user-defined settings (Schedule Title, Department, Active Days, Daily Hours, Slot Duration, Lunch Break, and Subject Categories) are placed together in one intuitive, prominently visible card.
   - Large, high-contrast entry boxes and comfortable typography designed specifically for ease of use.
2. **Mobile Browser Compatibility**
   - **Dual Viewing Modes:** Switch seamlessly between **Weekly Grid** (with sticky time column and smooth horizontal swipe) and **Day-by-Day View** (vertical slot cards optimized for phones).
   - **Touch Target Friendly:** Generous tap targets (minimum 44px) and mobile inputs styled (16px minimum font) to prevent annoying auto-zooming on iOS Safari and mobile Chrome.
   - **Mobile Quick Action FAB:** Floating "+ Add Activity" button for convenient one-thumb scheduling on the go.
3. **User-Defined Timetable Grid & Granularity**
   - Customize active days of the week (`Monday` through `Sunday`) with 1-click presets (`Mon–Fri`, `Mon–Sat`, `All 7 Days`).
   - Define custom daily start and end times (e.g., `08:30 AM` to `05:30 PM`).
   - Choose slot intervals (`15m`, `30m`, `45m`, `60m`, `90m`, or `Custom...`).
4. **Mandatory Daily Lunch Break Builder**
   - Enforces a minimum **30-minute** lunch break window.
   - Apply your lunch break across all active days with a single click.
5. **Custom Academic & Relaxation Categories**
   - Pre-configured with *Classes & Labs, Quiet Time, Research Time, Lecture Prep, Lunch Break, Relax Time,* and *Open Slot*.
   - Create unlimited custom categories with your own color palette.
6. **Smart Slot Finder (`Fill Empty Slots`)**
   - Automatically scans your timetable for unassigned gaps and converts them into editable **Open Slots**.
   - Calculates exact **Free Hours Available** per day and across the entire week.
   - Click any Open Slot to convert all or part of it into Quiet Time, Research, or Lecture Prep with 1-tap quick buttons.
7. **Multi-Format Exports & Offline Persistence**
   - **Excel 2D Grid (`.xlsx`):** Replicates the visual 2D weekly timetable grid along with a category hours summary table.
   - **Landscape PDF (`.pdf`):** Formatted for A4 landscape printing.
   - **High-Res Image (`.png`):** Clean snapshot for sharing or mobile reference.
   - **Save/Load Template (`.json`) & Auto-Save:** Automatically saves changes in browser `localStorage` and supports `.json` file backups.

---

## 🚀 How to Use & Enter Your Schedule Details

### Step 1: Open Schedule Setup
- All settings are unified directly inside the **Schedule Setup & Timing** card at the top of the page.
- You can minimize or open this card at any time using the **`Schedule Setup`** button in the top navigation bar.

### Step 2: Set Your Timetable Header
- Enter your **Timetable Title** (e.g. *"Fall Semester — Academic & Research Timetable"*) and **Department / Subtitle / Batch** (e.g. *"Faculty Schedule • Dept. of Computer Science"*).
- These appear on your timetable header and on all exported documents.

### Step 3: Configure Working Days & Daily Hours
- Tap the **Active Days** pills to choose your schedule days (or use the *Mon–Fri*, *Mon–Sat*, *All 7 Days* quick buttons).
- Select your **Daily Start Time** (e.g. `08:30`) and **Daily End Time** (e.g. `17:30`).
- Choose your **Slot Interval** (`15m`, `30m`, `45m`, `60m`, or `Custom...`).

### Step 4: Configure Daily Lunch Break
- Set your **Lunch Start Time** and **Lunch End Time** (minimum 30 minutes).
- Check the option to overwrite conflicting slots if desired, and click **`Apply Lunch Window Only`** or include it when saving settings.

### Step 5: Save & Apply Settings
- Click the big primary button **`Apply & Save Schedule Settings`**. Your timetable grid and time ranges update immediately!

### Step 6: Enter Classes, Labs & Commitments
- Tap any empty slot in the grid or day view, **OR** tap the prominent **`+ Add Activity`** button (or the mobile floating action button).
- Enter:
  - **Activity Title / Subject Name** (or tap one of the quick preset pills).
  - **Category** (e.g., *Classes & Labs*, *Research Time*).
  - **Assign to Day(s)** (select multiple days for recurring classes!).
  - **Start Time & End Time** (or tap 1h, 2h, 3h, 4h duration chips).
  - **Room / Location** & **Notes / Instructor** (optional).
- Tap **`Save Slot`**.

### Step 7: Fill Remaining Gaps with Open Slots
- Once your fixed classes are entered, tap **`Fill Empty`** in the top navigation bar.
- All unassigned gaps are marked as **Open Slots** with 1-tap buttons to assign study or research time.

### Step 8: View & Export on Mobile or Desktop
- **Mobile Browsing:** Switch between **`Weekly Grid`** (swipe horizontally across days with a sticky time column) and **`Day View`** (vertical card stack by day).
- **Exporting:** Tap **`Export`** in the top bar to download **Excel (.xlsx)**, **Landscape PDF (.pdf)**, **High-Res PNG image**, or **JSON template**.

---

## 🛠️ Tech Stack
- **HTML5 & Tailwind CSS** (Responsive Mobile-First UI & Print Styling)
- **SheetJS (`xlsx`)** (2D Visual Grid Spreadsheet Export)
- **html2canvas & jsPDF** (High-DPI PNG & Landscape A4 PDF Generation)
- **JSZip** (One-Click GitHub Repository `.zip` Bundler)
- **FontAwesome 6 & Google Fonts (`Inter`)**

---

## 📄 License
Licensed under the **MIT License** — free to use, modify, and share for personal, academic, or institutional use.
