import addDays from 'date-fns/fp/addDays';
import addMonths from 'date-fns/fp/addMonths';
import format from 'date-fns/fp/format';
import getWeek from 'date-fns/fp/getWeek';
import startOfMonth from 'date-fns/fp/startOfMonth';
import startOfWeek from 'date-fns/fp/startOfWeek';
import subMonths from 'date-fns/fp/subMonths';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';

const NUM_DAYS_WEEK = 7;
const NUM_ROWS_CALENDAR = 5;
const TOTAL_DAYS_CALENDAR = NUM_DAYS_WEEK * NUM_ROWS_CALENDAR;

// replacement for lodash fp methods that didn't work as expected
const fill = (total: number) => (data: Date | null | undefined) => {
  return new Array(total).fill(data);
};

// lodash/fp/map didn't provide index in it's iterator function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const map = (iterator: (item: any, index: number) => any) => (
  data: readonly Date[]
) => {
  return data.map(iterator);
};

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
 * @param startDay - Current month as a Date object.
 * @param dayFormat - Optional day formatting
 * @returns string[]
 */
export function getDays(startDay = 0, dayFormat = 'EEE'): readonly string[] {
  const startDate = startOfWeek(new Date());

  const dayFormatMapper = (_: Date, index: number) => {
    const dayName = flow(
      addDays(index + startDay),
      format(dayFormat)
    )(startDate);

    return dayName;
  };

  const dayNames = flow(fill(NUM_DAYS_WEEK), map(dayFormatMapper))(null);
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
 * param startDay - Optional Day to start calendar on
 * @param dateFormat - Optional date formatting
 * @returns string[] | Date[]
 */
export function getAllDates(
  currentMonth: Date,
  startDay = 0,
  dateFormat?: string
): readonly Date[] | readonly string[] {
  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);

  const addDaysToDate = (currentDate: Date, index: number) => {
    const date = addDays(index + startDay)(currentDate);
    if (dateFormat) return format(dateFormat)(date);
    return date;
  };

  const allDatesInMonth = flow(
    fill(TOTAL_DAYS_CALENDAR),
    map(addDaysToDate)
  )(startDate);

  return allDatesInMonth;
}

/**
 * Get all dates from a month and some previous and next month dates for covering
 * start and end of the week, grouped by week
 *
 * ### Example
 * ```js
 * import { getAllDates } from '@calendar-fp/calendar-fp'
 * console.log(getAllDatesGroupedByWeek(new Date(2021, 0, 1)))
 * {
 *   1: [
 *     new Date(2020, 11, 27),
 *     new Date(2020, 11, 28),
 *     new Date(2020, 11, 29),
 *     ...
 *   ],
 *   2: [
 *     ...
 *   ]
 *   ...
 * }
 * ```
 *
 * @param startDay - Current month as a Date object.
 * @returns Date[]
 */
export function getAllDatesGroupedByWeek(currentMonth: Date) {
  const allDatesInMonth = getAllDates(currentMonth);
  const groupDateByWeek = (date: Date) => getWeek(date);

  const datesGroupedByRow = groupBy(groupDateByWeek)(allDatesInMonth);

  return datesGroupedByRow;
}
