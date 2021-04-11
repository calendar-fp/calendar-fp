import test from 'ava';

import {
  getAllDates,
  getAllDatesGroupedByWeek,
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

test('getDays starting from Monday', (t) => {
  t.deepEqual(getDays(1), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
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
  ]);
});

test('getAllDates custom start day as monday', (t) => {
  const allDates = getAllDates(new Date(2021, 0, 1), 1, 'd');
  t.deepEqual(allDates, [
    '28',
    '29',
    '30',
    '31',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]);
});

test('getAllDates customFormat', (t) => {
  const allDates = getAllDates(new Date(2021, 0, 1), 0, 'd');
  t.deepEqual(allDates, [
    '27',
    '28',
    '29',
    '30',
    '31',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ]);
});

test('getAllDatesGroupedByWeek', (t) => {
  const allDates = getAllDatesGroupedByWeek(new Date(2021, 0, 1));
  t.deepEqual(allDates, {
    1: [
      new Date(2020, 11, 27),
      new Date(2020, 11, 28),
      new Date(2020, 11, 29),
      new Date(2020, 11, 30),
      new Date(2020, 11, 31),
      new Date(2021, 0, 1),
      new Date(2021, 0, 2),
    ],
    2: [
      new Date(2021, 0, 3),
      new Date(2021, 0, 4),
      new Date(2021, 0, 5),
      new Date(2021, 0, 6),
      new Date(2021, 0, 7),
      new Date(2021, 0, 8),
      new Date(2021, 0, 9),
    ],
    3: [
      new Date(2021, 0, 10),
      new Date(2021, 0, 11),
      new Date(2021, 0, 12),
      new Date(2021, 0, 13),
      new Date(2021, 0, 14),
      new Date(2021, 0, 15),
      new Date(2021, 0, 16),
    ],
    4: [
      new Date(2021, 0, 17),
      new Date(2021, 0, 18),
      new Date(2021, 0, 19),
      new Date(2021, 0, 20),
      new Date(2021, 0, 21),
      new Date(2021, 0, 22),
      new Date(2021, 0, 23),
    ],
    5: [
      new Date(2021, 0, 24),
      new Date(2021, 0, 25),
      new Date(2021, 0, 26),
      new Date(2021, 0, 27),
      new Date(2021, 0, 28),
      new Date(2021, 0, 29),
      new Date(2021, 0, 30),
    ],
  });
});
