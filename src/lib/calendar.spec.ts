import test from 'ava';

import {
  getAllDates,
  getAllDatesMatrix,
  getDays,
  getMonthAndYear,
  getNextMonth,
  getPrevMonth,
} from './calendar';

test('getPrevMonth', (t) => {
  t.deepEqual(getPrevMonth(new Date(2012, 2, 1)), new Date(2012, 1, 1));
});

test('getNextMonth', (t) => {
  t.deepEqual(getNextMonth(new Date(2021, 10, 10)), new Date(2021, 11, 10));
});

test('getMonthAndYear', (t) => {
  t.is(getMonthAndYear(new Date(2021, 2, 20)), 'March 2021');
});

test('getMonthAndYear different format', (t) => {
  t.is(getMonthAndYear(new Date(2021, 11, 1), 'MMMM'), 'December');
});

test('getDays', (t) => {
  t.deepEqual(getDays(), ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
});

test('getAllDates', (t) => {
  const allDates = getAllDates(new Date(2021, 0, 1));
  t.deepEqual(allDates, [
    new Date(2020, 11, 27),
    new Date(2020, 11, 28),
    new Date(2020, 11, 29),
    new Date(2020, 11, 30),
    new Date(2020, 11, 31),
    new Date(2021, 0, 1),
    new Date(2021, 0, 2),
    new Date(2021, 0, 3),
    new Date(2021, 0, 4),
    new Date(2021, 0, 5),
    new Date(2021, 0, 6),
    new Date(2021, 0, 7),
    new Date(2021, 0, 8),
    new Date(2021, 0, 9),
    new Date(2021, 0, 10),
    new Date(2021, 0, 11),
    new Date(2021, 0, 12),
    new Date(2021, 0, 13),
    new Date(2021, 0, 14),
    new Date(2021, 0, 15),
    new Date(2021, 0, 16),
    new Date(2021, 0, 17),
    new Date(2021, 0, 18),
    new Date(2021, 0, 19),
    new Date(2021, 0, 20),
    new Date(2021, 0, 21),
    new Date(2021, 0, 22),
    new Date(2021, 0, 23),
    new Date(2021, 0, 24),
    new Date(2021, 0, 25),
    new Date(2021, 0, 26),
    new Date(2021, 0, 27),
    new Date(2021, 0, 28),
    new Date(2021, 0, 29),
    new Date(2021, 0, 30),
    new Date(2021, 0, 31),
    new Date(2021, 1, 1),
    new Date(2021, 1, 2),
    new Date(2021, 1, 3),
    new Date(2021, 1, 4),
    new Date(2021, 1, 5),
    new Date(2021, 1, 6),
  ]);
});

test('getAllDatesMatrix', (t) => {
  const datesMatrix = getAllDatesMatrix(new Date(2021, 0, 1));
  t.deepEqual(datesMatrix, [
    [
      new Date(2020, 11, 27),
      new Date(2020, 11, 28),
      new Date(2020, 11, 29),
      new Date(2020, 11, 30),
      new Date(2020, 11, 31),
      new Date(2021, 0, 1),
      new Date(2021, 0, 2),
    ],
    [
      new Date(2021, 0, 3),
      new Date(2021, 0, 4),
      new Date(2021, 0, 5),
      new Date(2021, 0, 6),
      new Date(2021, 0, 7),
      new Date(2021, 0, 8),
      new Date(2021, 0, 9),
    ],
    [
      new Date(2021, 0, 10),
      new Date(2021, 0, 11),
      new Date(2021, 0, 12),
      new Date(2021, 0, 13),
      new Date(2021, 0, 14),
      new Date(2021, 0, 15),
      new Date(2021, 0, 16),
    ],
    [
      new Date(2021, 0, 17),
      new Date(2021, 0, 18),
      new Date(2021, 0, 19),
      new Date(2021, 0, 20),
      new Date(2021, 0, 21),
      new Date(2021, 0, 22),
      new Date(2021, 0, 23),
    ],
    [
      new Date(2021, 0, 24),
      new Date(2021, 0, 25),
      new Date(2021, 0, 26),
      new Date(2021, 0, 27),
      new Date(2021, 0, 28),
      new Date(2021, 0, 29),
      new Date(2021, 0, 30),
    ],
    [
      new Date(2021, 0, 31),
      new Date(2021, 1, 1),
      new Date(2021, 1, 2),
      new Date(2021, 1, 3),
      new Date(2021, 1, 4),
      new Date(2021, 1, 5),
      new Date(2021, 1, 6),
    ],
  ]);
});
