/*
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
*/

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
