// https://gruntjs.com/getting-started

// https://github.com/gruntjs/grunt-contrib-watch

// https://www.npmjs.com/package/grunt-contrib-uglify - no
// https://github.com/adascal/grunt-terser

// https://www.npmjs.com/package/grunt-contrib-sass

// https://www.npmjs.com/package/grunt-postcss - no
// https://github.com/C-Lodder/grunt-postcss



module.exports = function(grunt) {

    // project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['src/style/sass/*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
        },
        terser: {
            // options: {
            //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            // },
            build: {
                src: 'src/js/main.js',
                dest: 'netlify/js/main.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'src/style/css/main.css': 'src/style/sass/main.sass'
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'netlify/style/css'
                },
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')(), // add vendor prefixes | *** KEEP CURRENT VERSION AS v10 BREAKS THIS SCRIPT ***
                    require('cssnano')(), // minify the result
                ]
            },
            build: {
                src: 'src/style/css/main.css',
                dest: 'netlify/style/css/main.min.css'
            }
        }
    });



    // load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch'); // watch file changes
    grunt.loadNpmTasks('grunt-terser'); // min js files
    grunt.loadNpmTasks('grunt-contrib-sass'); // compile sass --> css
    grunt.loadNpmTasks('@lodder/grunt-postcss'); // post css functions


    // define tasks
    grunt.registerTask('default', ['watch']); // compile sass --watch

    grunt.registerTask('sassy', ['watch']); // compile sass
    grunt.registerTask('sass', ['sass']); // compile sass --watch
    
    grunt.registerTask('build', ['terser', 'postcss']); // build js, css
    grunt.registerTask('build-js', ['terser']); // build js
    grunt.registerTask('build-css', ['postcss']); // build css
}