var gulp 	= require("gulp");
stylus 		= require("gulp-stylus"),
rename 		= require("gulp-rename"),
notify 		= require("gulp-notify");

gulp.task("stylus", function () {
  return gulp.src("app/stylus/style.styl")
    .pipe(stylus({
      compress: true
    }))
	.pipe(rename({suffix: ".min",}))
    .pipe(gulp.dest("app/css/"))
	.pipe(notify("Task stylus complete."));
});