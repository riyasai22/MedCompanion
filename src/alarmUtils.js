export function setRecurringAlarm(
  reminder,
  days,

  alarmCallback
) {
  // console.log("reached");
  const currentDate = new Date();
  const currentDayName = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // Format the time with leading zeros if needed
  const formattedTime = `${currentHours
    .toString()
    .padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;
  const firstTwoCharsOfDay = currentDayName.slice(0, 2);

  days.forEach((item) => {
    if (item == firstTwoCharsOfDay && formattedTime == reminder) {
      if (typeof alarmCallback === "function") {
        alarmCallback();
      }
    }
    //   console.log("Alarm scheduled for:", item, formattedTime, reminder);
  });
}

// export function setRecurringAlarm(
//   reminder,
//   days,
//   name,
//   instruction,
//   alarmSound,
//   alarmCallback
// ) {
//   console.log("reached");
//   const currentDate = new Date();
//   const currentDayName = currentDate.toLocaleDateString("en-US", {
//     weekday: "short",
//   });
//   const currentHours = currentDate.getHours();
//   const currentMinutes = currentDate.getMinutes();

//   // Format the time with leading zeros if needed
//   const formattedTime = `${currentHours
//     .toString()
//     .padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;
//   const firstTwoCharsOfDay = currentDayName.slice(0, 2);

//   days.map(
//     (item) =>
//       item == firstTwoCharsOfDay &&
//       formattedTime == reminder &&
//       setTimeout(() => {
//         alarmCallback(name, instruction);
//         console.log("yesss");
//       }, 3000) &&
//       console.log(
//         item + " " + firstTwoCharsOfDay + " " + formattedTime + " " + reminder
//       )
//   );
// }

//   const calculateAndSetAlarms = () => {
//     const [hours, minutes] = reminder.split(":");
//     const reminderTime = new Date();
//     reminderTime.setHours(parseInt(hours, 10));
//     reminderTime.setMinutes(parseInt(minutes, 10));

//     let nextAlarmDate = new Date();
//     nextAlarmDate.setHours(reminderTime.getHours());
//     nextAlarmDate.setMinutes(reminderTime.getMinutes());
//     nextAlarmDate.setSeconds(0);

//     while (
//       !days.includes(
//         nextAlarmDate.toLocaleDateString("en-US", { weekday: "short" })
//       )
//     ) {
//       nextAlarmDate.setDate(nextAlarmDate.getDate() + 1);
//     }
//     if (nextAlarmDate <= new Date()) {
//       nextAlarmDate.setDate(nextAlarmDate.getDate() + 7);
//     }
//     console.log(nextAlarmDate);

//     // const timeUntilNextAlarm = nextAlarmDate - new Date();
//     setTimeout(() => {
//       alarmCallback(name, instruction, alarmSound);
//       calculateAndSetAlarms();
//     }, 3000);
//   };

//   calculateAndSetAlarms();
