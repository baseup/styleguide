var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var yargs       = require('yargs');
var path        = require('path');
var rename      = require('gulp-rename');
var template    = require('gulp-template');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        port: 4000
    });

    gulp.watch(["stylesheets/*.scss"], ['sass']);
    gulp.watch(["*.html", "js/*.js", "templates/*.mst"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(["stylesheets/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("css/"))
        .pipe(browserSync.stream());
});

gulp.task('page', function() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  var name = yargs.argv.name;

  return gulp.src(path.join(__dirname, 'generator', 'page/**/*.**'))
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(__dirname));
});

gulp.task('default', ['serve']);
