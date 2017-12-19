var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();


// Browser-sync setup

gulp.task('server', function(){
    browserSync.init({
        server: {
            port: 3000,
            baseDir: 'build'
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});

// PUG setup
gulp.task('pug', function(){
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});


// SASS setup
gulp.task('sass', function(){
    return gulp.src('source/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
        })).on('error', sass.logError)
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('images', function(){
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
})

// Delete build
gulp.task('delete', function(rf){
    rimraf('build', rf);
});

gulp.task('data', function(){
    return gulp.src('data/items.json')
        .pipe(gulp.dest('build/data'));
});


gulp.task('watch', function(){
    gulp.watch('source/template/**/*.pug', ['pug']);
    gulp.watch('source/styles/**/*.scss', ['sass']);
    gulp.watch('source/js/**/*.js', ['js'])
    gulp.watch('source/images/**/*.*', ['images']);
    gulp.watch('data/**/*.*', ['data']);
});

gulp.task('js', function(){
    return gulp.src(['source/js/module.js', 'source/js/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('build/js'));
})

gulp.task('default', [
    'delete',
    'js',
    'data',
    'images',
    'pug',
    'sass',
    'watch',
    'server'
]);