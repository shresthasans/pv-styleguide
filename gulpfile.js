'use strict';

/* Installing Dev Dependencies
npm install gulp gulp-autoprefixer gulp-concat gulp-uglify gulp-util
gulp-htmlmin gulp-imagemin gulp-sass gulp-sourcemaps gulp-rename 
gulp-jshint browser-sync sc5-styleguide --save-dev
*/

var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
util = require('gulp-util'),
htmlmin = require('gulp-htmlmin'),
imagemin = require('gulp-imagemin'),
plumber = require('gulp-plumber'),
sourcemaps = require('gulp-sourcemaps'),
rename = require('gulp-rename'),
jshint = require('gulp-jshint'),
strip = require('gulp-strip-comments'),
fileinclude = require('gulp-file-include'),
//notify = require('gulp-notify'),
//cache = require('gulp-cache'),
//del = require('del'),
styleguide = require('sc5-styleguide'),
sass = require('gulp-sass'),
bs = require('browser-sync').create(),
outputPath = 'output';


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("dev/scss/**/*.scss")
	.pipe(plumber())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(rename({suffix: '.min'}))	
	.pipe(gulp.dest("dist/css/"))
	.pipe(bs.stream());
	/*
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write('./maps'))
	*/
});


// gulp.task('fileinclude', function() {
	// 	gulp.src('dev/*.html')
	// 	.pipe(plumber())
	// 	.pipe(fileinclude({
		// 		prefix: '@@',
		// 		basepath: '@file'
		// 		}))
		// 	.pipe(gulp.dest('dist/'))
		// 	.pipe(bs.stream());
		// 	});
		
		
		// HTML minify
		gulp.task('htmlmin', function() {
			return gulp.src('dev/*.html')
			.pipe(plumber())
			.pipe(strip({
				safe: '<!--[if'
			}))
			.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file'
			}))			
			.pipe(htmlmin({collapseWhitespace: true}))	
			.pipe(gulp.dest('dist/'))
			.pipe(bs.stream());
			/*
			.pipe(sourcemaps.init())
			.pipe(sourcemaps.write('./maps'))
			*/
		});
		
		
		// Compile Scripts and after minimizing auto-inject into browsers
		gulp.task('scripts', function() {
			return gulp.src('dev/scripts/**/*.js')
			.pipe(plumber())
			.pipe(strip())
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('default'))
			.pipe(concat('main.js'))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/scripts'))
		});
		
		// Images minify
		gulp.task('images', function() {
			return gulp.src('dev/images/**/*')
			.pipe(imagemin({ 
				interlaced: true,
				progressive: true,
				optimizationLevel: 5,
				svgoPlugins: [{removeViewBox: true}]
			}))
			.pipe(gulp.dest('dist/images'))
		});
		
		gulp.task('styleguide:generate', function() {
			return gulp.src('dev/scss/**/*.scss')
			.pipe(styleguide.generate({
				title: 'Pagevamp Styleguide',
				server: true,
				port: 3001,
				rootPath: outputPath,
				overviewPath: 'README.md'
			}))
			.pipe(gulp.dest(outputPath))
		});
		
		gulp.task('styleguide:applystyles', function() {
			return gulp.src('dist/css/styles.min.css')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(styleguide.applyStyles())
			.pipe(gulp.dest(outputPath))
		});
		
		// Static Server + watching scss/html files
		gulp.task('serve', ['sass','htmlmin','styleguide'], function() {
			// Static server
			bs.init({
				server: "dist/"
			});
			gulp.watch("dev/scss/**/*.scss", ['sass', 'styleguide']).on('change', bs.reload);
			gulp.watch("dev/images/**/*", ['images']).on('change', bs.reload);
			gulp.watch("dev/scripts/**/*.js", ['scripts']).on('change', bs.reload);
			gulp.watch("dev/**/*.html", ['htmlmin']).on('change', bs.reload);
		});
		
		
		gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
		gulp.task('default', ['serve', 'styleguide']);