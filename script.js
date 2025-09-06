let age_Para = document.querySelector(".sec2Age");
let year_Month_Day_Para = document.querySelector("#y_m_d_para");
let month_Day_Para = document.querySelector("#m_d_para");
let week_Day_Para = document.querySelector("#w_d_para");
let day_Para = document.querySelector("#d_para");
let li_Para = document.querySelectorAll(".liPara");

// By default fill "Find Age On" inputs with today's date 
function setTodayDate() {
  let today = new Date();
  document.querySelector("#onDay").value = today.getDate();
  document.querySelector("#onMonth").value = today.getMonth() + 1; // +1 is for js months are 0-based
  document.querySelector("#onYear").value = today.getFullYear();
}

// Call this when page loads
window.onload = setTodayDate;


function isValidDate(year, month, day) {
  let testDate = new Date(year, month, day);
  return testDate.getFullYear() === year &&
         testDate.getMonth() === month &&
         testDate.getDate() === day;
}

function calculateAge() {
  // Get inputs once
  let dayOfBirth = parseInt(document.querySelector("#dayOfBirth").value);
  let monthInput = parseInt(document.querySelector("#monthOfBirth").value);
  let monthOfBirth = monthInput - 1; // For Date object (0-11)
  let yearOfBirth = parseInt(document.querySelector("#yearOfBirth").value);
  let onDay = parseInt(document.querySelector("#onDay").value);
  let onMonthInput = parseInt(document.querySelector("#onMonth").value);
  let onMonth = onMonthInput - 1; // For Date object
  let onYear = parseInt(document.querySelector("#onYear").value);

  // Clear previous outputs and hide list items at the start
  age_Para.innerText = "";
  year_Month_Day_Para.innerText = "";
  month_Day_Para.innerText = "";
  week_Day_Para.innerText = "";
  day_Para.innerText = "";
  li_Para.forEach(item => item.classList.add("hide"));

  // Check months (1-12)
  if (monthInput < 1 || monthInput > 12 || onMonthInput < 1 || onMonthInput > 12) {
    year_Month_Day_Para.innerText = "⚠️ Months must be between 1 and 12.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }

  // Check invalid inputs (NaN)
  if (isNaN(dayOfBirth) || isNaN(monthInput) || isNaN(yearOfBirth) ||
      isNaN(onDay) || isNaN(onMonthInput) || isNaN(onYear)) {
    year_Month_Day_Para.innerText = "⚠️ Please enter all values.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }

  // Check positive numbers
  if (dayOfBirth <= 0 || monthInput <= 0 || yearOfBirth <= 0 ||
      onDay <= 0 || onMonthInput <= 0 || onYear <= 0) {
    year_Month_Day_Para.innerText = "⚠️ Values must be positive numbers.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }

  // Check valid dates
  if (!isValidDate(yearOfBirth, monthOfBirth, dayOfBirth)) {
    year_Month_Day_Para.innerText = "⚠️ Birth date is invalid.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }
  if (!isValidDate(onYear, onMonth, onDay)) {
    year_Month_Day_Para.innerText = "⚠️ 'Find age on' date is invalid.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }

  // Check if birth date is after 'on' date
  if (yearOfBirth > onYear ||
     (yearOfBirth === onYear && monthOfBirth > onMonth) ||
     (yearOfBirth === onYear && monthOfBirth === onMonth && dayOfBirth > onDay)) {
    year_Month_Day_Para.innerText = "⚠️ Birth date cannot be after 'find age on' date.";
    li_Para.forEach(item => item.classList.remove("hide"));
    return;
  }

  // Correct age calculation using borrowing method
  let years = onYear - yearOfBirth;
  let months = onMonth - monthOfBirth;
  let days = onDay - dayOfBirth;

  if (days < 0) {
    months--;
    let prevMonthDays = new Date(onYear, onMonth, 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days and weeks using ms 
  let birthMs = Date.UTC(yearOfBirth, monthOfBirth, dayOfBirth);
  let currentMs = Date.UTC(onYear, onMonth, onDay);
  let ageInMs = currentMs - birthMs;
  let totalDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
  let totalWeeks = Math.floor(totalDays / 7);
  let weekDays = totalDays % 7;

  // Calculate total months from corrected years/months
  let totalMonths = (years * 12) + months;

  // Unhide outputs and display with proper singular/plural
  li_Para.forEach(item => item.classList.remove("hide"));
  age_Para.innerText = `Age = ${years} ${years === 1 ? 'year' : 'years'}`;
  year_Month_Day_Para.innerText = `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'} ${days} ${days === 1 ? 'day' : 'days'}`;
  month_Day_Para.innerText = `${totalMonths} ${totalMonths === 1 ? 'month' : 'months'} ${days} ${days === 1 ? 'day' : 'days'}`;
  week_Day_Para.innerText = `${totalWeeks} ${totalWeeks === 1 ? 'week' : 'weeks'} ${weekDays} ${weekDays === 1 ? 'day' : 'days'}`;
  day_Para.innerText = `${totalDays} ${totalDays === 1 ? 'day' : 'days'}`;
};


function clearAll(){
   let inputs = document.querySelectorAll(".inputs");
   inputs.forEach(input => input.value = "");
   age_Para.innerText = "";
   year_Month_Day_Para.innerText = "";
   month_Day_Para.innerText = "";
   week_Day_Para.innerText = "";
   day_Para.innerText = "";
   li_Para.forEach(item => item.classList.add("hide"));
};