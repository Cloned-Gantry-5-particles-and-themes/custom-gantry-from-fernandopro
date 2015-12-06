var gulp          = require('gulp');
var php           = require('gulp-connect-php');
var browserSync   = require('browser-sync');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require("gulp-rename");


// ///////////////////////////////////////////////
// RUTAS DE LOS ARCHIVOS
// ///////////////////////////////////////////////
var target = {
	sass_src        : 'src/scss/**/*.scss',  // Ruta todos mis archivos sass
	sass_dest       : 'public/css',  // Ruta destino después de procesarse sass
	sass_seblod     : '../seb_minima/positions/**/*.scss', //Ruta Sass en template minima de Seblod
	isis_src        : '../custom/scss/panel_admin/**/*.scss', //Ruta archivos Sass isis
	isis_dest       : '../../administrator/templates/isis/css', //Ruta archivos Sass isis
	isis_dest       : './bower_components/' //Ruta Bower
}


// ////////////////////////////////////////////////
// SASS COMPRESION
// ///////////////////////////////////////////////
var sass_Compresion = 'nested'; // nested  -  compressed



// ////////////////////////////////////////////////
// Tarea Scss
// ///////////////////////////////////////////////
gulp.task('styles', function() {
  gulp.src(target.sass_src)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: sass_Compresion}))
      // .on('error', errorlog)
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        ' ERROR EN SASS, FERNAN!' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          })) 
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(target.sass_dest))
	.pipe(browserSync.reload({stream:true}));
    
});


// ////////////////////////////////////////////////
// Panel Admin Isis
// ///////////////////////////////////////////////
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
  entries: ['./src/js/main.js'],
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
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./public/js'))
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
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('../custom/scss/**/*.scss', ['styles']);
  gulp.watch(target.sass_seblod, ['styles']);
  gulp.watch('../custom/scss/panel_admin/**/*.scss', ['isis']);
  gulp.watch('../../**/*.php').on('change', function () {browserSync.reload();});
});


gulp.task('default', ['styles', 'isis', 'js', 'php', 'browserSync', 'watch']);

