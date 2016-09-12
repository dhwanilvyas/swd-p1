var gulp    =  require('gulp');
var connect =  require('gulp-connect');
var uglify  =  require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var cssmin  =  require('gulp-cssmin');

gulp.task('scripts', function() {
  gulp.src(['app/modules/**/*.js'])
      .pipe(uglify())
      .pipe(gulp.dest('dist/modules'))
  gulp.src(['assets/js/style.js'])
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/js'))
});

gulp.task('views', function() {
  gulp.src(['app/modules/**/*.html'])
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/modules'))
  gulp.src(['index.tpl.html'])
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./'))
});

gulp.task('styles', function() {
  gulp.src('assets/css/style.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', ['scripts','views','styles'], function() {
  gulp.watch(['script.js', 'app/modules/**/*.js'],['scripts']);
  gulp.watch(['index.tpl.html', 'app/modules/**/*.html'], ['views']);
  gulp.watch(['assets/css/*.css'], ['styles']);
});

gulp.task('serve', function() {
  connect.server({
    livereload: true,
    port: 4000
  });
});

gulp.task('default', function() {
  gulp.run(['watch', 'serve']);
});
