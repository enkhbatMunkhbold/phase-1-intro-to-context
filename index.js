function createEmployeeRecord([fName, lName, tit, pay]) {
  return {
    firstName: fName,
    familyName: lName,
    title: tit,
    payPerHour: pay,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(records) {
  return records.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(employeeData, time) {
  employeeData.timeInEvents.push({
    type: 'TimeIn',
    hour: +time.split(' ')[1],
    date: time.split(' ')[0]
  })
  return employeeData
}

function createTimeOutEvent(employeeData, time) {
  employeeData.timeOutEvents.push({
    type: 'TimeOut',
    hour: +time.split(' ')[1],
    date: time.split(' ')[0]
  })
  return employeeData
}

function hoursWorkedOnDate(employeeData, date) {
  const timeIn = employeeData.timeInEvents.find(obj => obj.date === date)
  const timeOut = employeeData.timeOutEvents.find(obj => obj.date === date)
  const hours = (timeOut.hour - timeIn.hour) / 100
  return hours
}

function wagesEarnedOnDate(employeeData, date) {
  return hoursWorkedOnDate(employeeData, date) * employeeData.payPerHour
}

function allWagesFor(employeeData) {  
  return employeeData.timeInEvents.reduce((total, day) => {
    return total += wagesEarnedOnDate(employeeData, day.date)
  }, 0)
}

function calculatePayroll(records) {
  return records.reduce((total, record) => {
    return total += allWagesFor(record)
  }, 0)
}