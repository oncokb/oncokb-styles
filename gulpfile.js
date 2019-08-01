var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var del = require('del');

var config = {
  dist: 'dist/',
  src: './',
  imgin: 'images/**/*.{jpg,jpeg,png,gif,svg}',
  scssin: 'scss/**/*.scss',
  cssout: 'dist/css/',
  imgout: 'dist/images/',
  scssout: 'dist/',
};
gulp.task('sass', function() {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssout));
});

gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build',
    gulp.series('clean',
        gulp.parallel('sass', 'img')
    )
);