const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Enter YYYY-MM-DD (start date), YYYY-MM-DD (end date), target: ', input => {
    const [startDate, endDate, totalAnnualTarget] = input.split(',').map(item => item.trim());
    const daysInMonthExcludingFridays = calculateDaysInMonthExcludingFridays(new Date(startDate));
    const daysWorkedExcludingFridays = calculateDaysExcludingFridays(new Date(startDate), new Date(endDate));
    const periodTarget = calculatePeriodTarget(new Date(startDate), parseFloat(totalAnnualTarget), daysWorkedExcludingFridays);
  
    console.log(`\n    Days in the month excluding Fridays: ${daysInMonthExcludingFridays}`);
    console.log(`    Days worked in the period excluding Fridays: ${daysWorkedExcludingFridays}`);
    console.log(`    Period Target: ${periodTarget}`);
  
    readline.close();
  });
  
  function calculateDaysExcludingFridays(start, end) {
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 5) {
        count++;
      }
    }
    return count;
  }
  
  function calculateDaysInMonthExcludingFridays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0);
    let fridaysCount = 0;
  
    for (let d = new Date(year, month, 1); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 5) {
        fridaysCount++;
      }
    }
    return lastDayOfMonth.getDate() - fridaysCount;
  }
  
  function calculatePeriodTarget(startDate, totalAnnualTarget, daysWorkedExcludingFridays) {
    const isLeapYear = new Date(startDate.getFullYear(), 1, 29).getMonth() === 1;
    const workingDaysInYear = isLeapYear ? 366 - 52 : 365 - 52;
    const dailyTarget = totalAnnualTarget / workingDaysInYear;
    return dailyTarget * daysWorkedExcludingFridays;
  }
  
  