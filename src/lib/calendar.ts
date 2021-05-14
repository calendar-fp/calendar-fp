import addMonths from 'date-fns/fp/addMonths';
import eachDayOfInterval from 'date-fns/fp/eachDayOfInterval';
import endOfMonth from 'date-fns/fp/endOfMonth';
import endOfWeek from 'date-fns/fp/endOfWeek';
import format from 'date-fns/fp/format';
import startOfMonth from 'date-fns/fp/startOfMonth';
import startOfWeek from 'date-fns/fp/startOfWeek';
import subMonths from 'date-fns/fp/subMonths';
import map from 'lodash/fp/map';

const arrayToMatrix = (array: readonly Date[], columns: number) =>
  /* eslint-disable-next-line functional/immutable-data */
  Array(Math.ceil(array.length / columns))
    .fill('')
    .reduce((acc, _, index) => {
      return [...acc, [...array].splice(index * columns, columns)];
    }, []);

/**
 * Get previous month from a date
 *
 * ### Example
 * ```js
 * import { getPrevMonth } from '@calendar-fp/calendar-fp'
 * console.log(getPrevMonth(new Date(2021, 2, 1)))
 * // => new Date(2021, 1, 1)
 * ```
 *
 * @param currentMonth - Current month as a Date object.
 * @returns Date
 */
export function getPrevMonth(currentMonth: Date) {
  const subtractOneMonth = subMonths(1);
  return subtractOneMonth(currentMonth);
}

/**
 * Get next month from a date
 *
 * ### Example
 * ```js
 * import { getNextMonth } from '@calendar-fp/calendar-fp'
 * console.log(getNextMonth(new Date(2021, 2, 1)))
 * // => new Date(2021, 3, 1)
 * ```
 *
 * @param currentMonth - Current month as a Date object.
 * @returns Date
 */
export function getNextMonth(currentMonth: Date) {
  const addOneMonth = addMonths(1);
  return addOneMonth(currentMonth);
}

/**
 * Get month and year name for calendar navigation
 *
 * ### Example
 * ```js
 * import { getMonthAndYear } from '@calendar-fp/calendar-fp'
 * console.log(getMonthAndYear(new Date(2021, 2, 1)))
 * // => March, 2021
 * ```
 *
 * @param currentDate - Current month as a Date object.
 * @param dateFormat - Optional date format
 * @returns string
 */
export function getMonthAndYear(currentDate: Date, dateFormat = 'MMMM yyyy') {
  const formatForDisplay = format(dateFormat);
  return formatForDisplay(currentDate);
}

/**
 * Get days of the week
 *
 * ### Example
 * ```js
 * import { getDays } from '@calendar-fp/calendar-fp'
 * console.log(getDays())
 * // => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 * ```
 *
 * @param dayFormat - Optional day formatting
 * @returns string[]
 */
export function getDays(dayFormat = 'EEE'): readonly string[] {
  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(startDate);

  const datesInWeek = eachDayOfInterval({ start: startDate, end: endDate });

  const dayNames = map(format(dayFormat))(datesInWeek);
  return dayNames;
}

/**
 * Get all dates from a month and some previous and next month dates for covering
 * start and end of the week
 *
 * ### Example
 * ```js
 * import { getAllDates } from '@calendar-fp/calendar-fp'
 * console.log(getAllDates(new Date(2021, 0, 1)))
 * // => [new Date(2020, 11, 27),
 * //  new Date(2020, 11, 28),
 * //  new Date(2020, 11, 29), ...]
 * ```
 *
 * @param startDay - Current month as a Date object.
 * @returns string[] | Date[]
 */
export function getAllDates(currentMonth: Date): readonly Date[] {
  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const monthEnd = endOfMonth(currentMonth);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: startDate, end: endDate });
}

/**
 * Get all dates from a month and some previous and next month dates for covering
 * start and end of the week, grouped by week
 *
 * ### Example
 * ```js
 * import { getAllDatesMatrix } from '@calendar-fp/calendar-fp'
 * console.log(getAllDatesMatrix(new Date(2021, 0, 1)))
 * [
 *   [
 *     new Date(2020, 11, 27),
 *     new Date(2020, 11, 28),
 *     new Date(2020, 11, 29),
 *     ...
 *   ],
 *   [
 *     ...
 *   ]
 *   ...
 * ]
 * ```
 *
 * @param startDay - Current month as a Date object.
 * @returns Date[]
 */
export function getAllDatesMatrix(currentMonth: Date) {
  const allDatesInMonth = getAllDates(currentMonth);

  const datesGroupedByRow = arrayToMatrix(allDatesInMonth, 7);

  return datesGroupedByRow;
}
