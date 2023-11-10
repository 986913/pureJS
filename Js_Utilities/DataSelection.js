/************************ mergeData变形题 ************************************/

/*
A data set of gym sessions looks like this:
[
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];

Each session has the following fields:
  user: User ID of the session's user.
  duration: Duration of the session, in minutes.
  equipment: Array of equipment used during the sessions, in alphabetical order.

Implement a method selectData, which is used to return sessions from the data. 
It has the interface selectData(sessions [, options]). The options available should include:
  user: Select only sessions with this id.
  minDuration: Select only sessions with duration equal to or greater than this value.
  equipment: Select only sessions where at least one of the specified equipments were used.
  merge: If set to true
    Sessions from the same user should be merged into one object. When merging:
      Sum up the duration fields.
      Combine all the equipment used, de-duplicating the values and sort alphabetically.
    The other filter options should be applied to the merged data.


The order of the results should always remain unchanged from the original set, 
and in the case of merging sessions with duplicate users, 
the row should take the place of the latest occurrence of that user. 
The input objects should not be modified.

*/

/* --------------------- 用例测试 ----------------------- */
selectData(sessions);
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { user: 2 });
// [
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 200 });
// [
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { minDuration: 400 });
// [];

selectData(sessions, { equipment: ['bike', 'dumbbell'] });
// [
//   { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

selectData(sessions, { merge: true });
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 1, duration: 10, equipment: ['dumbbell'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];

selectData(sessions, { merge: true, minDuration: 400 });
// [
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];

/* ------------------------------------- Code solution -------------------------------------------- */
function setHasOverlap(setA, setB) {
  // Bundler doesn't transpile properly when doing for-of for sets.
  for (const val of Array.from(setA)) {
    if (setB.has(val)) {
      return true;
    }
  }
  return false;
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */

function selectData(sessions, options = {}) {
  const reversedSessions = sessions.slice().reverse(); // Make a copy and reverse.
  const userSessions = {};
  const sessionsProcessed = [];

  reversedSessions.forEach((session) => {
    if (options.merge && Object.hasOwn(userSessions, session.user)) {
      const userSession = userSessions[session.user];
      userSession.duration += session.duration;
      session.equipment.forEach((equipment) => {
        userSession.equipment.add(equipment);
      });
    } else {
      const clonedSession = {
        ...session,
        equipment: new Set(session.equipment),
      };

      if (options.merge) {
        userSessions[session.user] = clonedSession;
      }

      sessionsProcessed.push(clonedSession);
    }
  });

  sessionsProcessed.reverse();

  const results = [];
  const optionEquipments = new Set(options.equipment);
  sessionsProcessed.forEach((session) => {
    if (
      (options.user != null && options.user !== session.user) ||
      (optionEquipments.size > 0 &&
        !setHasOverlap(optionEquipments, session.equipment)) ||
      (options.minDuration != null && options.minDuration > session.duration)
    ) {
      return;
    }

    results.push({
      ...session,
      equipment: Array.from(session.equipment).sort(),
    });
  });

  return results;
}
