var gulp = require('gulp');
var builder = require('nw-builder');
// var del = require('del');

gulp.task('nw', function () {
	var src_path = [
		'./*',
		'!./gulpfile.js',
		'./js/*',
		'./styles/*',
		'./node_modules/jquery/**',
		'./node_modules/underscore/*'
	];
	var nw = new builder({
		version: 'v0.12.3',
	    files: src_path,
	    // platforms: ['win64'],
	    platforms: ['linux64'],
	    cacheDir: 'cache',
	    buildDir: 'build'
	});

	nw.on('log',  console.log);

	nw.build().then(function () {
	   console.log('Собрал, епта!');
	}).catch(function (error) {
	    console.error(error);
	});
});

// gulp.task('clean', function() {
// 	del('../build', {force: true})
// });

gulp.task('default', ['nw']);