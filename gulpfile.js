var gulp = require('gulp'),
    jhinst
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jscs = require('gulp-jscs');


// Paths of the app
var sassSrc = './styles/sass/*.sass';
var cssDest = './styles/css';
var jsDist = './scripts';



// Sass task with
gulp.task('styles', function() {
  return gulp.src(sassSrc)
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest(cssDest));
});

// autoprefix the css output
gulp.task('autoprefixer', function() {
  return gulp.src(cssDest)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(cssDest));
});


gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compress:js', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .dest(gulp.dest(jsDist)); // save the stream into dist folder
});

gulp.task('watch', ['styles', 'autoprefixer', 'jshint'], function() {
  gulp.watch('./styles/sass/*.sass', ['styles', 'autoprefixer']);
  gulp.watch('./src/*.js', ['jshint']);
});

gulp.task('watch:js', ['jshint'], function() {
  gulp.watch('./src/*.js');
});

gulp.task('jslint', ['jshint', 'watch:js']);
gulp.task('default', function() {
  console.log('default task here');
});
