var bower = require('gulp-bower');
var gulp    = require('gulp');

gulp.task('bower', function() {
    bower()
        .pipe(gulp.dest('lib/'))
});

