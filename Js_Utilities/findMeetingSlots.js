/**


 */
/* -------------------用例测试--------------------*/
findMeetingSlots([[[0, 23]]]); // [[23,24]]
findMeetingSlots([[[0, 24]]]); // []
findMeetingSlots([[]]); // [[0,24]]
findMeetingSlots([]); // [[0,24]]
findMeetingSlots([
  [
    [1, 2],
    [2, 3],
  ],
]); // [[0,1],[3,24]]
findMeetingSlots([
  [
    [13, 15],
    [11, 12],
    [10, 13],
  ], //schedule for member 1
  [[8, 9]], // schedule for member 2
  [[13, 18]], // schedule for member 3
]); //[[0,8],[9,10],[18,24]]

/* -------------------------- Code Solution: -------------------------------- */
/**
  type Interval = [number, number]
 * @param {Interval[][]} schedules
 * @return {Interval[]}
 */
function findMeetingSlots(schedules) {
  // flattern schedules inputs then sort it
  const intervals = schedules.flat().sort((a, b) => a[0] - b[0]);

  let result = [];
  let prevEnd = 0; // 重点：define a variable hold previous end value

  // loop through intervals
  intervals.forEach((i) => {
    let [start, end] = i;
    if (prevEnd < start) {
      result.push([prevEnd, start]); // result放入valid slot
    }

    prevEnd = Math.max(end, prevEnd); // 更新prevEnd
  });

  if (prevEnd !== 24) {
    result.push([prevEnd, 24]);
  }

  return result;
}
