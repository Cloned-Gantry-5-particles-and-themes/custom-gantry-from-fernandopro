var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
var php           = require('gulp-connect-php');
var sass          = require('gulp-sass');
var rename        = require("gulp-rename");
var gutil         = require('gulp-util');
var concat        = require('gulp-concat');
var clean         = require('gulp-rimraf');
var minifycss     = require('gulp-minify-css');
var autoprefixer  = require('gulp-autoprefixer');
var uglify        = require('gulp-uglify');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

// ///////////////////////////////////////////////
// RUTAS DE LOS ARCHIVOS
// ///////////////////////////////////////////////
var target = {
	sass_src        : 'assets/scss/**/*.scss',  // Ruta todos mis archivos sass
	sass_dest       : 'scss/public',  // Ruta destino después de procesarse sass
	sass_seblod     : '../../seb_minima/positions/**/*.scss', //Ruta Sass en template minima de Seblod
	isis_src        : 'scss/back_end/custom.scss', //Ruta archivos Sass isis
	isis_dest       : '../../../administrator/templates/isis/css' //Ruta archivos Sass isis
}

var assetsDir = 'assets';
var jsDir = assetsDir + '/js';
var CssDir = assetsDir + '/css';
var targetJs = 'js';
var targetCss = 'css';


// ///////////////////////////////////////////////
// RUTAS CONCATENAR JS EN UN ARCHIVO
// ///////////////////////////////////////////////
var scripts = [
	assetsDir + '/bower/wow/dist/wow.min.js',
	jsDir + '/wowIni.js',
    assetsDir + '/bower/picturefill/dist/picturefill.min.js',
    jsDir + '/simple.js'
];


// ///////////////////////////////////////////////
// RUTAS CONCATENAR CSS EN UN ARCHIVO
// ///////////////////////////////////////////////
var fileCSS = [
    assetsDir + '/bower/animate.css/animate.min.css',
    CssDir + '/simple.css'
];


// ///////////////////////////////////////////////
// TAREA  CONCATENAR JAVASCRIPT
// ///////////////////////////////////////////////
gulp.task('mergeScripts', function() {
gulp.src(scripts)
.pipe(concat('simple.js'))
.pipe(uglify())
.pipe(gulp.dest(targetJs));
});

// ///////////////////////////////////////////////
// TAREA  CONCATENAR CSS
// ///////////////////////////////////////////////
gulp.task('mergeCSS', function() {
gulp.src(fileCSS)
.pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
.pipe(concat('simple.css'))
.pipe(minifycss())
.pipe(gulp.dest(targetCss));
});






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
	  .pipe(reload({stream:true}));
    
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
              browsers: ['last 2 versions'],
              cascade: false
          })) 
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(target.isis_dest))
	.pipe(reload({stream:true}));
    
});




// ///////////////////////////////////////////////
// TAREA  LIMPIAR NUESTRAS CARPETAS DESTINO
// ///////////////////////////////////////////////
gulp.task('clean', function() {
gulp.src(['scss/public/**/*.scss', targetJs + '/**/*.js', targetCss + '/**/*.css'], {read:false})
.pipe(clean());
});



// ////////////////////////////////////////////////
// Tarea sincronizar el navegador
// ////////////////////////////////////////////////
gulp.task('php', function() {
    php.server({ base: '../../', port: 3002, keepalive: true});
});

gulp.task('browserSync', function() {
    browserSync({
        proxy:"localhost:8888/joomla4",
        port: 3000,
        open: true,
        notify: false,
		//injectChanges: true
    });
});

// ///////////////////////////////////////////////
// TAREA  WATCH
// ///////////////////////////////////////////////
//gulp.task('watch', ['browserSync'], function() {
//gulp.watch(jsDir + '/**/*.js', ['mergescripts']);
//});



// ////////////////////////////////////////////////
// Tarea Reloj escucha
// ////////////////////////////////////////////////
gulp.task('watch', function() {
	
   gulp.watch(target.sass_src, ['styles']);
   gulp.watch('scss/custom.scss').on('change', function () {browserSync.reload();});
   gulp.watch('css-compiled/*.css').on('change', function () {browserSync.reload();});
   gulp.watch(target.sass_seblod, ['isis']);
   gulp.watch('scss/back_end/**/*.scss', ['isis']);
   gulp.watch('../../**/*.php').on('change', function () {browserSync.reload();});
   gulp.watch(jsDir + '/**/*.js', ['mergeScripts']);
   gulp.watch(jsDir + '/**/*.js').on('change', function () {browserSync.reload();});
   gulp.watch(CssDir + '/**/*.css', ['mergeCSS']);
   gulp.watch(CssDir + '/**/*.css').on('change', function () {browserSync.reload();});

});


gulp.task('default', ['clean', 'mergeScripts', 'mergeCSS', 'styles', 'isis', 'php', 'browserSync', 'watch']);

