const gulp = require('gulp')
const browserSync = require('browser-sync')
const useref = require('gulp-useref')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')


gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: 'build'
		}
	})
})

gulp.task('watch', [ 'browser-sync'],  function() {
	return gulp.watch('./src/**/*', [ 'build'])
})

gulp.task('build', function() {
	return gulp.src('./src/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cleanCSS()))
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({
			stream: true
		}))
})