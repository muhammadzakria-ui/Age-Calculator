🧩 What each part does (simple explanation)
HTML (index.html)

Two forms:

Date of Birth — inputs with IDs #dayOfBirth, #monthOfBirth, #yearOfBirth.

Find Age on — inputs with IDs #onDay, #onMonth, #onYear.

Buttons:

Calculate — calls calculateAge() to compute and show results.

Clear — calls clearAll() to remove inputs and hide outputs.

Output area (section2):

.sec2Age — shows a short age string (e.g., Age = 25 years).

#y_m_d_para — shows years months days.

#m_d_para — shows total months days.

#w_d_para — shows weeks days.

#d_para — shows total days.

Some list items are hidden by default with the .hide class; they appear only after a successful calculation or when showing errors.

CSS (style.css)

Layout: .container holds two sections — input (left) and result (right).

Visual: gradient background, rounded cards, and responsive rules.

.hide class: display: none; used to hide outputs until ready.

Media queries make the UI adapt to tablets and phones.

JavaScript (script.js) — main logic

Key parts:

Selectors (get DOM nodes)

let age_Para = document.querySelector(".sec2Age");
let year_Month_Day_Para = document.querySelector("#y_m_d_para");
let month_Day_Para = document.querySelector("#m_d_para");
let week_Day_Para = document.querySelector("#w_d_para");
let day_Para = document.querySelector("#d_para");
let li_Para = document.querySelectorAll(".liPara");


Auto-fill today’s date

function setTodayDate() {
  let today = new Date();
  document.querySelector("#onDay").value = today.getDate();
  document.querySelector("#onMonth").value = today.getMonth() + 1; // JS months are 0-based
  document.querySelector("#onYear").value = today.getFullYear();
}
window.onload = setTodayDate;


This runs when page loads so users get a default "find age on" date.

Date validation

function isValidDate(year, month, day) {
  let testDate = new Date(year, month, day);
  return testDate.getFullYear() === year &&
         testDate.getMonth() === month &&
         testDate.getDate() === day;
}


This makes sure the numbers form a real calendar date (handles leap years and month lengths).

calculateAge() — main function
Steps it performs:

Read all six inputs (birth day/month/year and on-day/month/year).

Clear previous outputs and hide list items.

Validate months (1–12).

Validate missing numbers.

Validate positive numbers.

Validate that each date is a real calendar date using isValidDate.

Ensure the birth date is not after the "find age on" date.

Compute age using a borrowing method:

Subtract years, months, days.

If days negative: borrow from previous month (correctly use previous month day count).

If months negative: borrow a year.

Compute totals:

totalDays and totalWeeks using milliseconds (UTC) difference.

totalMonths = years * 12 + months.

Show outputs (unhide the list items) and use correct singular/plural words like 1 year vs 2 years.

clearAll()
Clears all inputs and outputs and hides the result items.

▶️ How to use — step-by-step

Open index.html in a web browser (see How to run below).

In Date of Birth:

Type the day, month (1–12), and year of birth.

In Find Age on:

By default this shows today’s date. Change it if you want the age on a different date.

Click Calculate:

If inputs are valid, you will see:

Age = X years

X years Y months Z days

Total months and days

Total weeks and days

Total days

If inputs are invalid, you will see a clear error message in the output area.

Click Clear to remove input and hide results and errors.

✅ Validation rules (quick summary)

Months must be between 1 and 12.

All fields must be numbers (not empty).

Values must be positive (> 0).

Dates must be valid calendar dates (e.g., not 31 Feb).

Birth date cannot be after the "find age on" date.

🛠 Technologies used

HTML — structure of the page.

CSS — styles, layout, responsive design.

JavaScript — logic, validation and DOM updates.

Simple image asset for profile (optional).

🏃 How to run (simple)
 Open locally

Put index.html, style.css, script.js, and profile.png (if present) in one folder.

Double-click index.html to open it in your browser.


✍️ Credits / Author

Made  by Me (Muhammad Zakria).
Great job building a clear and useful age calculator — perfect for learning date math and DOM manipulation!
