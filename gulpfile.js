var gulp = require('gulp');
var jsTasks = require('./tasks/js.task');

// JavaScript Tasks
gulp.task('browserify', jsTasks.browserifyBundle); // so you can run `gulp js` to build the file
gulp.task('watchify', jsTasks.watchifyBundle); // so you can run `gulp js` to build the file

gulp.task('watch', ['watchify']);
