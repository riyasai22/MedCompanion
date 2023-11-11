const events = [
  { title: "Panadol", start: getDate("YEAR-MONTH-01") },
  {
    title: "Cetrizine",
    start: getDate("YEAR-MONTH-07"),
    end: getDate("YEAR-MONTH-10"),
  },
  {
    groupId: "999",
    title: "Medication",
    start: getDate("YEAR-MONTH-09T16:00:00+00:00"),
  },
  {
    groupId: "999",
    title: "Medication",
    start: getDate("YEAR-MONTH-16T16:00:00+00:00"),
  },
  {
    title: "Conference",
    start: "YEAR-MONTH-17",
    end: getDate("YEAR-MONTH-19"),
  },
  {
    title: "DFO Gel",
    start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
    end: getDate("YEAR-MONTH-18T12:30:00+00:00"),
  },
  { title: "Flucanazol", start: getDate("YEAR-MONTH-18T12:00:00+00:00") },
  { title: "Optamol", start: getDate("YEAR-MONTH-19T07:00:00+00:00") },
  { title: "Thyrazoin", start: getDate("YEAR-MONTH-18T14:30:00+00:00") },
  { title: "Petramorphin", start: getDate("YEAR-MONTH-18T17:30:00+00:00") },
  { title: "Antihistamitic", start: getDate("YEAR-MONTH-18T20:00:00+00:00") },
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
