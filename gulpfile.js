var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    htmlreplace = require('gulp-html-replace'),
    less = require('gulp-less'),
    path = require("path"),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith');

// Configuration
config = {
  version: 'v0.11.22',
  distDir: 'dist'
}

// error handler 
var handleError = function (err) {  
  gutil.beep();
  console.log(err);
};

// stage
gulp.task('stage-sprites', function () {
  var dataDir = path.join('data', config.version)
  var spriteData = gulp.src(path.join(dataDir, 'img', '*.png'))
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: 'sprites.css',
    }));
  spriteData.pipe(gulp.dest(dataDir));
});

// html watch
gulp.task('html', function() {
  gulp.src('*.html')
  .pipe(connect.reload());
});
 
// css watch
gulp.task('css', function() {
  gulp.src('./static/css/*.less')
  .pipe(plumber(handleError))
  .pipe(less())
  .pipe(gulp.dest('./static/css'))
  .pipe(connect.reload());
});

//js task
gulp.task('js', function() {
  gulp.src('./app/**/*.js')
  .pipe(plumber(handleError))
  .pipe(connect.reload());
});

// watch aggregate
gulp.task('watch', function(){
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['./static/css/*.less'], ['css']);
  gulp.watch(['./app/**/*.js'], ['js']);
});
 
// serve local
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

// build
gulp.task('build-sprites', function () {
  var dataDir = path.join('data', config.version, 'img', '*.png')
  var spriteData = gulp.src(dataDir)
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: 'sprites.css',
      imgPath: '../img/sprites.png'
    }));
  spriteData.img
    .pipe(gulp.dest('./dist/assets/img'));
  spriteData.css
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('build-css', function() {
  gulp.src('./static/css/*.less')
  .pipe(plumber(handleError))
  .pipe(less())
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('build-js', function() {
  var builder = require('systemjs-builder');
  b = new builder('./config.js');
  b.buildSFX('app/app', './dist/assets/js/main.min.js', {minify: true})
  .then(function() { console.log('Build complete'); })
  .catch(function(err) {
    console.log('Build error');
    console.log(err);
  });
});

gulp.task('build-html', function() {
  gulp.src('*.html')
    .pipe(plumber(handleError))
    .pipe(htmlreplace({
      css: ['assets/css/sprites.css', 'assets/css/main.min.css'],
      js: 'assets/js/main.min.js'
    }))
    .pipe(gulp.dest(config.distDir));
});
 
// Start the tasks
gulp.task('dist', ['build-sprites', 'build-css', 'build-js', 'build-html']);
gulp.task('default', ['connect','watch']);