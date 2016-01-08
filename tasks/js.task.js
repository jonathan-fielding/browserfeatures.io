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
    browserifyBundleApp: function(){
        return browserifyBundle({
            watch: false, 
            src: './script/app.js',
            dest: 'app.min.js'
        });
    },
    watchifyBundleEmbed: function(){
        return browserifyBundle({
            watch: true, 
            src: './script/iframe-embed.js',
            dest: 'iframe-embed.min.js'
        });
    },
    watchifyBundleApp: function(){
        return browserifyBundle({
            watch: true, 
            src: './script/app.js',
            dest: 'app.min.js'
        });
    }
};

function browserifyBundle(settings) {
    var watch = settings.watch;

    var opts = assign({}, watchify.args, {
        entries: [settings.src],
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

    return bundle(b, settings.dest);
}

function bundle(b, dest) {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(dest))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(closure())
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./script'));
}
