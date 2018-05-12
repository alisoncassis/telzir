const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const clean = require('gulp-clean')
const uglify = require('gulp-uglify')
const usemin = require('gulp-usemin')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')

gulp.task('default', ['copy'], () => gulp.start('build-img', 'usemin'))

gulp.task('copy', ['clean'], () => gulp.src('src/**/*')
    .pipe(gulp.dest('dist')))

gulp.task('clean', ()  => gulp.src('dist')
    .pipe(clean()))

gulp.task('build-img', () => gulp.src('dist/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img')))

gulp.task('usemin', () => gulp.src('dist/**/**/*.html')
    .pipe(usemin({
        css: [autoprefixer, cssmin],
        html: [ () => htmlmin({ collapseWhitespace: true }) ],
        js: [uglify],
        inlinejs: [uglify]
    }))
    .pipe(gulp.dest('dist')))
