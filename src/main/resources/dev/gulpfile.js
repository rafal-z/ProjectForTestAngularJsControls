var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var del = require('del');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var appDistDir = './../../webapp/app/';

gulp.task('watch', function () {
    watch(["app/**/*.html", "app/**/*.js", "app/**/*.css"], batch(function (events, done) {
        gulp.start('build-debug', done);
    }));
});

gulp.task('clean', function (callback) {
    return del([
        appDistDir + '**/*'
    ], {force: true});
});

gulp.task('create-js', function () {
    return gulp.src('app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(appDistDir));
});

gulp.task('copy-resources', function () {
    var appHtml = gulp.src(['app/**/*.html']).pipe(gulp.dest(appDistDir));
    var cssHtml = gulp.src(['app/**/*.css']).pipe(gulp.dest(appDistDir));
    return merge(appHtml, cssHtml);
});

gulp.task('build-debug', [
    // 'clean',
    'copy-resources',
    'create-js'
]);