# 📅 Chronos Academic — Timetable & Smart Slot Planner

A single-page, client-side interactive timetable builder designed for **students, professors, researchers, and academic staff**. Create your custom college or research schedule, automatically detect and manage free slots for deep study or relaxation, and export your timetable to **Excel (.xlsx 2D Grid)**, **Landscape PDF (.pdf)**, **High-Res Image (.png)**, or **JSON backups**.

---
[Click here to make your own scheduler](https://elvismartis.github.io/Easy_Scheduler/)

---

## ✨ Key Features

1. **User-Defined Timetable Grid & Granularity**
   - Customize active days of the week (`Monday` through `Sunday`).
   - Define custom daily start and end times (e.g., `08:00 AM` to `06:00 PM`).
   - Choose fixed or custom slot intervals (`15m`, `30m`, `45m`, `60m`, or any custom duration in minutes).
2. **Mandatory Daily Lunch Break Builder**
   - Enforces a minimum **30-minute** lunch break window.
   - Apply your lunch break across all active days with a single click.
3. **Custom Academic & Relaxation Categories**
   - Pre-configured with *Lectures, Practicals/Labs, Research Time, Study Time, Revision Time, Quiet Time, Relax Time, Lunch Break,* and *Free Slot*.
   - Create unlimited custom categories with your own color palette.
4. **Smart Slot Finder (`Fill Empty as Free Slots`)**
   - Automatically scans your timetable for unassigned gaps and converts them into editable **Free Slots**.
   - Calculates exact **Free Hours Available** per day and across the entire week.
   - Click any Free Slot to convert all or part of it into Study Time, Research, or Relaxation (automatically splits multi-hour free blocks if you only assign a partial window).
5. **Multi-Format Exports & Offline Persistence**
   - **Excel 2D Grid (`.xlsx`):** Replicates the visual 2D weekly timetable grid along with a category hours summary table.
   - **Landscape PDF (`.pdf`):** Formatted for A4 landscape printing.
   - **High-Res Image (`.png`):** Clean snapshot for sharing or mobile reference.
   - **Save/Load Template (`.json`) & Auto-Save:** Automatically saves changes in browser `localStorage` and supports `.json` file backups.

---

## 🚀 How to Use & Enter Your Schedule Details

### Step 1: Set Your Timetable Header
- At the top of the timetable card, click directly on the **Title** (*"Fall Semester — Academic & Research Timetable"*) and **Subtitle** (*"Faculty / Student Schedule"*) to type your name, semester, department, or batch.

### Step 2: Configure Days, Hours & Slot Duration
1. Click the **`Grid & Categories`** button in the top navigation bar.
2. Under **1. Timetable Grid & Granularity**:
   - Select your **Active Days of the Week**.
   - Enter your **Daily Start Time** and **Daily End Time**.
   - Select your **Slot Interval** (`15m`, `30m`, `45m`, `60m`, or `Custom...`).
   - Click **`Update Timetable Grid`**.

### Step 3: Add Your Daily Lunch Break (Min 30 Mins)
1. Inside the **`Grid & Categories`** drawer, look under **2. Daily Lunch Break**.
2. Set your **Lunch Start** and **Lunch End** times (must be at least 30 minutes).
3. Click **`Apply Lunch Break (Min 30m)`** to block out lunch across all active days.

### Step 4: Add Custom Categories (Optional)
1. Under **3. Academic & Relax Categories**, type a category name (e.g., *Office Hours*, *Thesis Writing*, *Gym/Walk*), pick a color, and click **`Add`**.

### Step 5: Enter Lectures, Labs & Fixed Commitments
- Click any empty cell in the timetable grid **OR** click the **`+ Add Activity`** button in the top bar.
- Enter:
  - **Activity Title / Subject Name** (or click one of the quick-fill preset pills).
  - **Category** (e.g., *Lectures*, *Practicals / Labs*).
  - **Assign to Day(s)** (select multiple days at once for recurring classes!).
  - **Start Time** & **End Time** (supports multi-hour blocks).
  - **Room / Lab / Location** & **Instructor / Notes** (optional).
- Click **`Save Slot`**.

### Step 6: Run the Smart Slot Finder & Assign Study/Relax Time
1. Once your fixed classes and lunch are entered, click **`Fill Empty as Free Slots`** in the top navigation bar.
2. All remaining gaps are automatically marked as **Free Slots**, and the **Free Hours Left** counter updates at the top.
3. Click any **Free Slot** card in the grid to reassign it (or a portion of it) to *Study Time*, *Research Time*, *Revision Time*, *Quiet Time*, or *Relax Time*.

### Step 7: Export & Print
- Click **`Export / Save`** in the top-right corner to download:
  - **Excel 2D Grid (`.xlsx`)**
  - **Landscape PDF (`.pdf`)**
  - **High-Res Image (`.png`)**
  - **Save Template (`.json`)** for future editing.
---

## 🛠️ Tech Stack
- **HTML5 & Tailwind CSS** (Responsive UI & Print Styling)
- **SheetJS (`xlsx`)** (2D Visual Grid Spreadsheet Export)
- **html2canvas & jsPDF** (High-DPI PNG & Landscape A4 PDF Generation)
- **JSZip** (One-Click GitHub Repository `.zip` Bundler)
- **FontAwesome 6 & Google Fonts (`Inter`)**

---

## 📄 License
Licensed under the **MIT License** — free to use, modify, and share for personal, academic, or institutional use.
