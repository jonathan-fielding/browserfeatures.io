var gulp = require('gulp');
var jsTasks = require('./tasks/js.task');

// JavaScript Tasks
gulp.task('browserifyApp', jsTasks.browserifyBundleApp); // so you can run `gulp js` to build the file
gulp.task('browserifyEmbed', jsTasks.browserifyBundleEmbed); // so you can run `gulp js` to build the file
gulp.task('watchifyApp', jsTasks.watchifyBundleApp); // so you can run `gulp js` to build the file
gulp.task('watchifyEmbed', jsTasks.watchifyBundleEmbed); // so you can run `gulp js` to build the file

gulp.task('default', ['browserifyApp', 'browserifyEmbed']);
gulp.task('watch', ['watchifyApp', 'watchifyEmbed']);
