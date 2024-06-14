# Movieland 

## Code Review Notes:

### - General:
  - Folder structure: Adding components in folders helps keep projects organized and easier to navigate.
  - Icons: replace text icons width SVGs Icons

### - Nice to Have:
  - Comments
  - Prettier
  - Typescript

### - File: constants.js: 
  - Move API_KEY and ENDPOINT to an env file
  - Use string interpolation, provides a more readable and concise way to combine static and dynamic values in strings.

### - File: App.js, 
  - line 16: Object Destructuring. Useful feature to extract multiple properties in a single statement, can access properties from nested objects, and can set a default value
  - line 27: The closeCard function is defined but not used.
  - line 31: Refactor conditional.
  - Line 41: The getSearchResults and searchMovies functions can be combined to reduce redundancy.
  - line 54: Remove redundant setOpen(true);
  - line 60: Move viewTrailer and getMovie into Movie component.
  - line 77: Remove all logic from App file. Create Layout file and move logic to every component
  - line 87: Avoid inline styling

### - File: Movie.js
  - line 6: 'closeCard' is declared but its value is never read.
  - line 9: Object Destructuring.
  - line 16: Remove conditional and call e.stopPropagation();
  - line 30 and 47: Use index in .map(). Indexes can be used as keys to uniquely identify each element in a list. This is important because it allows React to keep track of each element and its state, even when the order of the list changes or elements are added or removed.

### - File: Movies.js
  - line 8: Use index in .map(). Indexes can be used as keys to uniquely identify each element in a list. This is important because it allows React to keep track of each element and its state, even when the order of the list changes or elements are added or removed.
