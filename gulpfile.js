var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

// Paths of the app
var sassSrc = './styles/sass/**/*.sass';
var cssDest = './styles/css/';
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
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress:js', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .dest(gulp.dest(jsDist)); // save the stream into dist folder
});

gulp.task('uglify:build', function() {
  // uglify task for the build
});

gulp.task('build', ['compress:js:build'], function() {
  // build task copy files to the build folder as min and src
});

gulp.task('watch', ['styles', 'autoprefixer', 'jshint'], function() {
  gulp.watch('./styles/sass/*.sass', ['styles', 'autoprefixer']);
  gulp.watch('./src/*.js', ['jshint']);
});

gulp.task('default', ['styles', 'autoprefixer', 'watch']);
