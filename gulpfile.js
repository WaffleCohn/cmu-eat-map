var gulp = require('gulp')
var browserify = require('browserify')
var uglify = require('gulp-uglify') //minifies js
var sass = require('gulp-sass') // compiles the .scss to .css
var plumber = require('gulp-plumber') // prevents gulp from crashing if the pipes break hence the name plumber
var tap = require('gulp-tap') //used with browserify
var gutil = require('gulp-util') //used with plumber
var gulpif = require('gulp-if') //I use this to change the pipes based on if debug is true or not
var streamify = require('gulp-streamify') //used to allow gulp pipes after using browserify
var stripDebug = require('gulp-strip-debug') // removes "console.log" when in production

var srcDir = './src'
var destDir = './build'

// dirs
var imagesGlob = `${srcDir}/**/*.+(ico|mpeg4|jpeg|png|jpg|gif|webm|bmp|tif|tiff|gifv)`
var cssGlob = `${srcDir}/**/*.css`
var vendorsGlob = `${srcDir}/vendors/*`
var sassGlob = [`${srcDir}/**/*.scss`, `!${srcDir}/**/dep/**/*.scss`]
var indexGlob = `${srcDir}/**/*index.+(html|ejs)`
var htmlGlob = [`${srcDir}/**/*.+(html|ejs)`, `!${indexGlob}`]
var othersGlob = `${srcDir}/others/*`

var debug = true

gulp.task('vendors', () => {
  return gulp.src(vendorsGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}/vendors`))
})

gulp.task('browserify', () => {
  return gulp.src(`${srcDir}/js/main.js`)
    .pipe(plumber())
    .pipe(tap(
      (file) => {
        var d = require('domain').create();
        d.on('error', (err) => {
          gutil.log(
            gutil.colors.red('Browserify compile error:'),
            err.message,
            '\n\t',
            gutil.colors.cyan('in file'),
            file.path
          );
        })
        d.run( () => {
          file.contents = browserify({
            entries : file.path,
            debug :  debug
          })
          .transform('babelify', {presets : ['es2015', 'react', 'stage-0']})
          .transform('browserify-shim')
          .bundle()
        })
      }
    ))
    .pipe(gulpif(!debug, streamify(stripDebug())))
    .pipe(gulpif(!debug, streamify(uglify({
      compress: true
    }))))
    .pipe(gulp.dest(`${destDir}/js`))
})

gulp.task('css', () => {
  return gulp.src(cssGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}`))
})

gulp.task('images', () => {
  return gulp.src(imagesGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}`))
})


gulp.task('sass', () =>{
  return gulp.src(sassGlob)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${destDir}`))
})

gulp.task('html', () => {
  return gulp.src(htmlGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}`))
})

gulp.task('index', () => {
  return gulp.src(indexGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}`))
})

gulp.task('others', () => {
  return gulp.src(othersGlob)
    .pipe(plumber())
    .pipe(gulp.dest(`${destDir}/others`))
})

gulp.task('build', ['browserify', 'sass', 'vendors', 'css','html','index', 'others', 'images'], () => {
})

var watchFiles = () => {
  gulp.watch([`${srcDir}/**/*.js`], ['browserify'])
  gulp.watch(htmlGlob, ['html'])
  gulp.watch([indexGlob], ['index'])
  gulp.watch([cssGlob], ['css'])
  gulp.watch([othersGlob], ['others'])
  gulp.watch([`${srcDir}/**/*.scss`], ['sass'])
  gulp.watch([imagesGlob], ['images'])
}


gulp.task('watch', ['build'], watchFiles)

gulp.task('default', ['watch'])
