/**
  Given a time string in format `HH:mm`, please return the **angle between hour hand and minute hand**.
  You should return rounded integer representing the smaller angle in degrees.
 */

/* --------------------- 用例测试 ----------------------- */
angle('12:00'); // 0
angle('23:30'); // 165

/* --------------------- Code solution ------------------ */
/**
 * @param {string} time
 * @returns {number}
 */
function angle(time) {
  const [hours, mins] = time.split(':');

  // We have total 12 hour hands, 360 deegrees in round clock. so 1 hour hand will be 360 / 12, 30 deg.
  // we multiply that by `hours` but before that we take modulus

  // we want to make sure that we treat 24 hours as 12 hours format for our calculation. that's why the modulus.
  const hoursAngle = (360 / 12) * (hours % 12);

  // We have total 60 mins hands, 360 deegrees in round clock. so 1 minute hand will be 360 / 60, 6 deg.
  // we multiply that by `mins` to get angle for mins.
  const minutesAngle = (360 / 60) * mins;

  const extra = (mins / 60) * (360 / 12);

  const angleBetween = Math.abs(hoursAngle - minutesAngle + extra);

  // In order to return smaller angle, we need to see if angleBetween crosses 180 deg.
  // because till 180 the angle values are same.
  const result = angleBetween > 180 ? 360 - angleBetween : angleBetween;

  // as per problem statement, round the integer
  return Math.round(result);
}
