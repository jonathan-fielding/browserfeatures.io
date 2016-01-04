'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babel = require('babelify');
var hogan = require('browserify-hogan');
var rfolderify = require('rfolderify');
var closure = require('gulp-closure');
var es = require('event-stream');

module.exports = {
    browserifyBundleEmbed: function(){
        return browserifyBundle({
            watch: false, 
            src: './script/iframe-embed.js',
            dest: 'iframe-embed.min.js'
        });
    },
    browserifyBundle: function(){
        return browserifyBundle(false)
    },
    watchifyBundle: function(){
        return browserifyBundle(true)
    }
};

function browserifyBundle(watch) {

    var opts = assign({}, watchify.args, {
        entries: ['./script/iframe-embed.js'],
        minify: true
    });

    var b;

    if (watch) {
        opts.debug = true;
        opts.fullPaths = true;

        b = watchify(browserify(opts));
        b.on('update', function(){
            return bundle(b);
        }); // on any dep update, runs the bundler
    }
    else {
        b = browserify(opts);
    }

    b.transform(babel);
    b.transform(hogan);
    b.transform(rfolderify);

    b.on('log', gutil.log); // output build logs to terminal

    return bundle(b);
}

function bundle(b) {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('iframe-embed.min.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(closure())
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./script'));
}
