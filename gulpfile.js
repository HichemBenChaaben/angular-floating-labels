var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    htmlmin = require('gulp-html-minifier'),
    ngmin = require('gulp-ngmin');

// Paths of the app
var sassSrc = './styles/sass/**/*.sass';
var cssDest = './styles/css/';
var jsDist = './scripts';
var htmlSrc = './src/**/*.html';


gulp.task('ngmin', function () {
    return gulp.src('./src/**/*.js')
        .pipe(ngmin({dynamic: true}))
        .pipe(gulp.dest(jsDist));
});

gulp.task('browser-sync', function() {
    var files = [
        './src/views/**/*.html',
        './src/styles/css/**/*.css',
        './src/**/*.js'
    ];
    browserSync.init(files, {
        server: {
            proxy: 'http://127.0.0.1',
            port: '9000'
        }
    });
});

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
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('jshint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('compress:js', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(jsDist));
});

gulp.task('minify:html', function() {
  gulp.src(htmlSrc)
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('./scripts'))
});

gulp.task('build', ['styles', 'autoprefixer', 'jshint'], function() {
    // build task copy files to the build folder as min and src
    console.log('The build was created successfully xD');
});

gulp.task('watch', ['styles', 'autoprefixer', 'jshint', 'browser-sync'], function() {
    gulp.watch('./styles/sass/**/*.sass', ['styles', 'autoprefixer']);
    gulp.watch('./src/**/*.js', ['jshint', 'build']);
});

gulp.task('default', ['styles', 'autoprefixer', 'jshint', 'watch']);
