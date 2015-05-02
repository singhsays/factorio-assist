var gulp = require('gulp'),
    connect = require('gulp-connect')
    less = require('gulp-less');
 
// Html task
gulp.task('html', function() {
  gulp.src('*.html')
  .pipe(connect.reload());
});
 
// CSS task
gulp.task('css', function() {
  gulp.src('./static/css/*.less')
  .pipe(less())
  .pipe(gulp.dest('./static/css'))
  .pipe(connect.reload());
});

//Js task
gulp.task('js', function() {
  gulp.src('./app/**/*.js')
  .pipe(connect.reload());
});
 
// Watch our changes
gulp.task('watch', function(){
  //html
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['./static/css/*.less'], ['css']);
  gulp.watch(['./app/**/*.js'], ['js']);
});
 
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});
 
// Start the tasks
gulp.task('default', ['connect','watch']);