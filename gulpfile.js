'use strict'

var gulp = require('gulp');
var autoprefixer = require( 'autoprefixer-stylus' );
var browserSync = require( 'browser-sync' );
var clean = require( 'gulp-clean' );
var concat = require( 'gulp-concat' );
var karma = require( 'gulp-karma-runner' );
var koutoSwiss = require( 'kouto-swiss' );
var jade = require( 'gulp-jade' );
var jeet = require( 'jeet' );
var jsHint = require( 'gulp-jshint' );
var plumber = require( 'gulp-plumber' );
var map = require( 'map-stream' );
var rename = require( 'gulp-rename' );
var rupture = require( 'rupture' );
var sourceMaps = require( 'gulp-sourcemaps' );
var stylus = require ( 'gulp-stylus' );
var uglify = require( 'gulp-uglify' );

var jadeForest = {
    css: 'dev/stylesheet/**/*.styl',
    cssStylus: 'dev/stylesheet/style.styl',
    img: 'dev/img/**/*',
    html: 'dist/index.html',
    jade: 'dev/**/*.jade',
    js: 'dev/javascript/**/*.js',
    angular: './node_modules/angular/angular.min.js',
    angularRoute: './node_modules/angular-route/angular-route.min.js',
    destAngular: 'dev/lib/',
    devLib: 'dev/lib/**/*.js',
    buildAngular: 'dist/lib/'
};

var eternalBlossoms = {
    css: 'dist/stylesheet/',
    img: 'dist/img/',
    js: 'dist/javascript/',
    angular: 'dist/lib',
    dist: 'dist/'
};

var myReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        console.log('JSHINT fail in '+file.path);
        file.jshint.results.forEach(function (err) {
            if (err) {
                console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
            }
        });
    }
    cb(null, file);
});

//
// Clear folder dist
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'clean', function() {
    return gulp.src( eternalBlossoms.dist )
        .pipe( clean() );
} );

//
// compiler css with Stylus
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'css', function() {
    gulp.src( jadeForest.cssStylus )
        .pipe( plumber() )
        .pipe( sourceMaps.init() )
        .pipe( stylus( {
            use: [koutoSwiss(), autoprefixer('> 0%'), jeet(), rupture()],
            compress: true
        } ) )
        .pipe( sourceMaps.write( './' ) )
        .pipe( plumber.stop() )
        .pipe( gulp.dest( eternalBlossoms.css ) )
        .pipe( browserSync.stream() );
} );

//
// compiler jade
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'jade', function() {
    gulp.src( jadeForest.jade )
        .pipe( plumber() )
        .pipe( jade( {
            pretty: true
        } ) )
        .pipe( plumber.stop() )
        .pipe( gulp.dest( eternalBlossoms.dist ) )
        .pipe( browserSync.stream() );
} );

//
// Compress JS
//////////////////////////////////////////////////////////////////////////////////////

gulp.task('compress', function() {
    return gulp.src( jadeForest.js )
        .pipe( plumber() )
        .pipe( uglify( {
            mangle: false
        } ) )
        .pipe( concat('app.js') )
        .pipe( plumber.stop() )
        .pipe(gulp.dest( eternalBlossoms.js ) )
        .pipe( browserSync.stream() );
} );

//
// lint javascript
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'lint', function() {
    return gulp.src( jadeForest.js )
        .pipe( jsHint() )
        .pipe( myReporter );
} );

//
// browserSync
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'browserSync', function() {
    browserSync( {
        server: {
            baseDir: eternalBlossoms.dist
        }
    } )
} );

//
// Watch files... PULL THE BOSS!!
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'pullTheBoss', [ 'browserSync' ], function() {
    gulp.watch ( jadeForest.css, ['css'] );
    gulp.watch ( jadeForest.js, ['compress'] );
    gulp.watch ( jadeForest.jade, ['jade'] );
    gulp.watch ( [ 'dev/**/*.js', 'tests/**/*.js' ], [ 'runnerKarma' ] );
    gulp.watch ( jadeForest.html, browserSync.reload );
} );

//
// Copy angular
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'copyAngular', function() {
    gulp.src( [ jadeForest.angular, jadeForest.angularRoute ] )
        .pipe( concat('angular.js') )
        .pipe( gulp.dest( jadeForest.destAngular ) );
} );

gulp.task('buildAngular', function() {
    gulp.src( jadeForest.devLib )
        .pipe( gulp.dest( jadeForest.buildAngular ) );
} );

//
// Test Jasmine
//////////////////////////////////////////////////////////////////////////////////////

gulp.task( 'serverKarma', function () {
    gulp.src( [
       'dist/**/*.js',
       'tests/**/*.js'
    ], { 'read': false } )
        .pipe( karma.server( {
            "configFile": './karma.conf.js',
            "singleRun": false,
            "quiet": true,
            "frameworks": [ 'jasmine' ],
            "browsers": ['Chrome']
        } ) );
} );

gulp.task( 'runnerKarma', function () {
    gulp.src( [
            'dist/**/*.js',
            'tests/**/*.js'
        ], { 'read': false } )
        .pipe( plumber() )
        .pipe( karma.runner( {
            "singleRun": false,
            "frameworks": [ 'jasmine' ],
            "browsers": ['Chrome']
        } ) )
        .pipe( plumber.stop() );
} );
