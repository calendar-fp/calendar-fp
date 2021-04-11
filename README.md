# Calendar FP

[![calendar-fp](https://circleci.com/gh/calendar-fp/calendar-fp.svg?style=svg)](https://circleci.com/gh/calendar-fp/calendar-fp)
[![npm version](https://badge.fury.io/js/calendar-fp.svg)](https://badge.fury.io/js/calendar-fp)
[![codecov](https://codecov.io/gh/calendar-fp/calendar-fp/branch/master/graph/badge.svg?token=md910beGWr)](https://codecov.io/gh/calendar-fp/calendar-fp)

Framework agnostic calendar helper functions.

### Features
* All functional style coding
* Small codebase
* It uses `date-fns` library for date manipulations.

Docs: https://calendar-fp.github.io/calendar-fp/globals.html

### Example
```js
import {
  getAllDates,
  getAllDatesGroupedByWeek,
  getDays,
  getMonthAndYear,
  getNextMonth,
  getPrevMonth
} from "calendar-fp";


console.log(getAllDates(new Date(2021, 0, 1)));
// [new Date(2020, 11, 27), new Date(2020, 11, 28), new Date(2020, 11, 29), ...]

console.log(getDays());
// ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

```

Code Sandbox: https://codesandbox.io/s/bold-dawn-h2ohv?file=/src/index.js
