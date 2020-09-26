var gulp = require('gulp');

var terser = require('gulp-terser'); // https://github.com/duan602728596/gulp-terser

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

var postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
var sourcemaps = require('gulp-sourcemaps'); // https://github.com/gulp-sourcemaps/gulp-sourcemaps
var autoprefixer = require('autoprefixer'); // https://github.com/postcss/autoprefixer#gulp
var cssnano = require('cssnano'); // https://github.com/cssnano/cssnano





// compile sass --> css
gulp.task('sass', function() {
    return gulp.src('src/style/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style/css/'))
});


// add vendor prefix, sourcemap, and minify css
gulp.task('css', function() {
    // use postcss

    var plugins = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('src/style/css/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('netlify/style/css/'))
});


// minify js
gulp.task('js', function() {
    // use terser

    return gulp.src('src/js/main.js')
        .pipe(terser())
        .pipe(gulp.dest('netlify/js'))
});


// build js and css for production
gulp.task('build', gulp.series(['js', 'css']), function() {
    console.log('Building filezz');
});


// build js only for production
gulp.task('build-js', gulp.series(['js']), function() {
    console.log('Building js');
});


// build css only for production
gulp.task('build-css', gulp.series(['css']), function() {
    console.log('Building css');
});


// watch sass files to compile on save
gulp.task('watch', function() {
    gulp.watch('src/style/sass/*.sass', gulp.series(['sass']));
});