var watchify      = require('watchify');
var browserify    = require('browserify');
var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var gutil         = require('gulp-util');
var babelify      = require('babelify');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var assign        = require('lodash.assign');
var php           = require('gulp-connect-php');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require("gulp-rename");
var concat        = require('gulp-concat');

// ///////////////////////////////////////////////
// RUTAS DE LOS ARCHIVOS
// ///////////////////////////////////////////////
var target = {
	sass_src        : 'scss/src/**/*.scss',  // Ruta todos mis archivos sass
	sass_dest       : 'scss/public',  // Ruta destino después de procesarse sass
	sass_seblod     : '../../seb_minima/positions/**/*.scss', //Ruta Sass en template minima de Seblod
	isis_src        : 'scss/panel_admin/custom.scss', //Ruta archivos Sass isis
	isis_dest       : '../../../administrator/templates/isis/css', //Ruta archivos Sass isis
	bower_ruta       : './bower_components/' //Ruta Bower
}


// ////////////////////////////////////////////////
// Tarea Scss
// ///////////////////////////////////////////////
gulp.task('styles', function() {
  gulp.src(target.sass_src)
	  .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        ' ERROR EN SASS, FERNAN!' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
      .pipe(gulp.dest(target.sass_dest))
	  .pipe(browserSync.reload({stream:true}));
    
});



// ////////////////////////////////////////////////
// Panel Admin Isis
// ///////////////////////////////////////////////
var sass_Compresion = 'nested'; // nested  -  compressed
gulp.task('isis', function() {
  gulp.src(target.isis_src)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: sass_Compresion}))
      // .on('error', errorlog)
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'FERNAN! ERROR EN SASS:' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          })) 
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(target.isis_dest))
	.pipe(browserSync.reload({stream:true}));
    
});




// ////////////////////////////////////////////////
// Javascript Browserify, Watchify, Babel, React
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// ////////////////////////////////////////////////

// add custom browserify options here
var customOpts = {
  entries: ['./js/custom.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

// add transformations here
b.transform(babelify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(source('custom.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./js-compliled/js'))
    .pipe(browserSync.reload({stream:true}));
}





// ////////////////////////////////////////////////
// Tarea sincronizar el navegador
// ////////////////////////////////////////////////
gulp.task('php', function() {
    php.server({ base: '../../', port: 8010, keepalive: true});
});

gulp.task('browserSync', function() {
    browserSync({
        proxy:"localhost:8888/joomla1/",
        port: 8080,
        open: false,
        notify: false
    });
});



// ////////////////////////////////////////////////
// Tarea Reloj escucha
// ////////////////////////////////////////////////
gulp.task('watch', function() {
  gulp.watch('scss/src/**/*.scss', ['styles']);
  gulp.watch('scss/public').on('change', function () {browserSync.reload();});
  gulp.watch('css-compiled/*.css').on('change', function () {browserSync.reload();});
  gulp.watch(target.sass_seblod, ['styles']);
  gulp.watch('scss/panel_admin/**/*.scss', ['isis']);
  gulp.watch('../../**/*.php').on('change', function () {browserSync.reload();});
});


gulp.task('default', ['styles', 'isis', 'js', 'php', 'browserSync', 'watch']);

