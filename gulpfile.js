var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
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
	sass_src         : 'assets/scss/**/*.scss',  // Ruta todos mis archivos sass
	sass_dest        : 'scss/public',  // Ruta destino después de procesarse sass
	sass_seblod      : '../../seb_minima/positions/**/*.scss',
	sass_dest_seblod : 'scss/public',
	back_src         : 'scss/back_end/custom.scss', //Ruta archivos Sass isis
	back_dest        : '../../../administrator/templates/isis/css' //Ruta archivos Sass isis
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
	jsDir + '/picture_ini.js',
    assetsDir + '/bower/picturefill/dist/picturefill.min.js',
    jsDir + '/simple.js'
];


// ///////////////////////////////////////////////
// RUTAS CONCATENAR CSS EN UN ARCHIVO
// ///////////////////////////////////////////////
var fileCSS = [
    assetsDir + '/bower/animate.css/animate.min.css',
	assetsDir + '/bower/rrssb/css/rrssb.css',
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
// Tarea Scss  SEBLOD
// ///////////////////////////////////////////////
gulp.task('seblod', function() {
  gulp.src(target.sass_seblod)
	  .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        ' ERROR EN SASS, FERNAN!' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
      .pipe(gulp.dest(target.sass_dest_seblod))
	  .pipe(reload({stream:true}));    
});


// ////////////////////////////////////////////////
// Tarea Scss Assets
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
gulp.task('back', function() {
  gulp.src(target.back_src)
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
    .pipe(gulp.dest(target.back_dest))
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
gulp.task('browserSync', function() {
    browserSync({
        proxy:"localhost:8888/joomla1",
        port: 8000,
        open: false,
        notify: false,
		//injectChanges: true
    });
});



// ////////////////////////////////////////////////
// Tarea Reloj escucha
// ////////////////////////////////////////////////
gulp.task('watch', function() {
	
   gulp.watch(target.sass_src, ['styles']);
   gulp.watch('scss/custom.scss').on('change', function () {browserSync.reload();});
   //gulp.watch('css-compiled/*.css').on('change', function () {browserSync.reload();});
   gulp.watch(target.sass_seblod, ['seblod']);
   gulp.watch('scss/back_end/**/*.scss', ['back']);
   gulp.watch('../../**/*.php').on('change', function () {browserSync.reload();});
   gulp.watch(jsDir + '/**/*.js', ['mergeScripts']);
   //gulp.watch(jsDir + '/**/*.js').on('change', function () {browserSync.reload();});
   gulp.watch(CssDir + '/**/*.css', ['mergeCSS']);
   //gulp.watch(CssDir + '/**/*.css').on('change', function () {browserSync.reload();});

});


gulp.task('default', ['clean', 'mergeScripts', 'mergeCSS', 'styles', 'seblod', 'back', 'browserSync', 'watch']);

