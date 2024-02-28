function calculateDaysExcludingFridays(start, end) {
    let count = 0;
    let date = new Date(start);
    let endDate = new Date(end);
  
    while (date <= endDate) {
      if (date.getDay() !== 5) { // 5 represents Friday
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
    return count;
  }
  
  function calculateDaysInMonthExcludingFridays(date) {
    let yearMonth = new Date(date);
    let firstDayOfMonth = new Date(yearMonth.getFullYear(), yearMonth.getMonth(), 1);
    let lastDayOfMonth = new Date(yearMonth.getFullYear(), yearMonth.getMonth() + 1, 0);
    let fridaysCount = 0;
  
    for (let current = new Date(firstDayOfMonth); current <= lastDayOfMonth; current.setDate(current.getDate() + 1)) {
      if (current.getDay() === 5) { // 5 represents Friday
        fridaysCount++;
      }
    }
    return lastDayOfMonth.getDate() - fridaysCount;
  }
  
  function calculatePeriodTarget(startDate, totalAnnualTarget, daysWorkedExcludingFridays) {
    let start = new Date(startDate);
    let workingDaysInYear = start.getFullYear() % 4 === 0 ? 366 - 52 : 365 - 52; // Adjusting for leap years
  
    let dailyTarget = totalAnnualTarget / workingDaysInYear;
    return dailyTarget * daysWorkedExcludingFridays;
  }
  
  function main(startDate, endDate, totalAnnualTarget) {
    let daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(startDate);
    let daysWorkedExcludingFridays = calculateDaysExcludingFridays(startDate, endDate);
    let periodTarget = calculatePeriodTarget(startDate, totalAnnualTarget, daysWorkedExcludingFridays);
  
    console.log("Days in the month excluding Fridays: " + daysInMonthExcludingFridays);
    console.log("Days worked in the period excluding Fridays: " + daysWorkedExcludingFridays);
    console.log("monthlyTargets: " + periodTarget);
    console.log("totalTarget: " + periodTarget);
  }
  
  // Example usage:
  main('2024-01-01', '2024-0-06', 5220);
  