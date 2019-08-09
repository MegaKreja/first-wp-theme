var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var rigger = require('gulp-rigger');
var util = require('gulp-util');
var reload = browserSync.reload;

// Browser sync
gulp.task('browser-sync', function(done) {
  browserSync.init({
    proxy: {
      target: 'http://localhost/first-wp-theme'
    },
    open: false
  });
  done();
});

// SASS
gulp.task('sass', function(done) {
  gulp
    .src(['./sass/*.scss'])
    .pipe(
      sass({ outputStyle: 'compressed' }).on(
        'error',
        notify.onError('Error: <%= error.message %>')
      )
    )
    .pipe(autoprefixer('last 5 versions', '> 1%', 'ie 8', 'ie 7'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('../'))
    .pipe(browserSync.stream())
    .pipe(
      util.env.env !== 'pipelines'
        ? notify('Done compiling & syncing')
        : util.noop()
    );
  done();
});

// JS scripts
gulp.task('scripts', function(done) {
  gulp
    .src(['./js/scripts.js'])
    .pipe(rigger())
    .pipe(concat('script.js'))
    .pipe(
      uglify().on('error', function(e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest('../js/'))
    .pipe(browserSync.stream())
    .pipe(
      util.env.env !== 'pipelines'
        ? notify('Done compiling & syncing JS')
        : util.noop()
    );
  done();
});

// Watch files
gulp.task('watch', function(done) {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./js/**/*.js', gulp.series('scripts'));
  gulp.watch('../*.php').on('change', reload);
  gulp.watch('../*/*.php').on('change', reload);
  done();
});

// Default task
gulp.task(
  'default',
  gulp.series(
    gulp.parallel('sass', 'scripts'),
    'browser-sync',
    'watch',
    function(done) {
      done();
    }
  )
);

// Build task
gulp.task(
  'build',
  gulp.series(gulp.parallel('sass', 'scripts'), function(done) {
    done();
  })
);
