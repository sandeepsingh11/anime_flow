var gulp = require('gulp');

var terser = require('gulp-terser'); // https://github.com/duan602728596/gulp-terser

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

var postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
var sourcemaps = require('gulp-sourcemaps'); // https://github.com/gulp-sourcemaps/gulp-sourcemaps
var autoprefixer = require('autoprefixer'); // https://github.com/postcss/autoprefixer#gulp
var cssnano = require('cssnano'); // https://github.com/cssnano/cssnano

var changed = require('gulp-changed'); // https://github.com/sindresorhus/gulp-changed





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


// update html file in production
gulp.task('html', function() {
    // use gulp-changed

    return gulp.src('src/index.html')
        .pipe(changed('netlify/index.html'))
        .pipe(gulp.dest('netlify/'))
});


// update assets in production
gulp.task('ass', function() {
    // use gulp-changed

    return gulp.src('src/assets/')
        .pipe(changed('netlify/assets/'))
        .pipe(gulp.dest('netlify/assets/'))
});


// update flowchart_mapping in production
gulp.task('flowchart', function() {
    // use gulp-changed

    return gulp.src('src/flowchart_mapping.json')
        .pipe(changed('netlify/flowchart_mapping.json'))
        .pipe(gulp.dest('netlify/flowchart_mapping.json'))
});



// build js and css for production
gulp.task('build', gulp.series(['js', 'css', 'html', 'ass', 'flowchart']), function() {
    console.log('Building filezz :pog:');
});


// build js only for production
gulp.task('build-js', gulp.series(['js']), function() {
    console.log('Building js');
});


// build css only for production
gulp.task('build-css', gulp.series(['css']), function() {
    console.log('Building css');
});

// build html only for production
gulp.task('build-html', gulp.series(['html']), function() {
    console.log('Building html');
});

// build assets only for production
gulp.task('build-ass', gulp.series(['ass']), function() {
    console.log('Building ass');
});

// build flowchart only for production
gulp.task('build-flowchart', gulp.series(['flowchart']), function() {
    console.log('Building flowchart');
});



// watch sass files to compile on save
gulp.task('watch', function() {
    gulp.watch('src/style/sass/*.sass', gulp.series(['sass']));
});