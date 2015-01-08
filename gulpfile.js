var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = rquire('gulp-uglify'),
    cssmin = rquire('gulp-cssmin');

// Paths of the app
var sassSrc = './styles/sass/*.sass';
var cssDest = './styles/css';

// Sass task with
gulp.task('styles', function () {
    return gulp.src(sassSrc)
        .pipe(sass({sourcemap: true, sourcemapPath: sassSrc}))
        .on('error', function (err) {
          console.log(err.message);
        })
        .pipe(gulp.dest(cssDest));
});

// autoprefix the css output
gulp.task('autoprefixer', function () {
    return gulp.src(cssDest)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssDest));
});


gulp.task('jshint', function() {
  return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compress:js', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .dest(gulp.dest('dist')); // save the stream into dist folder
});

gulp.task('compress:css', function() {
  gulp.src('styles/css/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('styles/css'));
});

gulp.task('watch', ['styles', 'autoprefixer', 'cssmin', 'jshint', 'compress:js'], function() {
  gulp.watch('./styles/sass/*.sass', ['styles', 'autoprefixer', 'cssmin']);
  gulp.watch('./src/*.js', ['jshint', 'compress:js']);
});

gulp.task('default', function() {
  console.log('default task here');
});
