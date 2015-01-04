var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

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

gulp.task('watch', ['styles', 'autoprefixer', 'jshint'], function() {
  gulp.watch('./styles/sass/*.sass', ['styles', 'autoprefixer']);
  gulp.watch('./src/*.js', ['jshint']);
});

gulp.task('default', function() {
  console.log('default task here');
});
