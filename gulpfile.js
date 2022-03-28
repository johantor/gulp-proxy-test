var gulp = require("gulp");
var bs = require("browser-sync").create();
const sass = require("gulp-sass")(require("node-sass"));

gulp.task("sass", function () {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(bs.stream());
});

gulp.task("serve", ["sass"], function () {
  bs.init({
    proxy: "https://www.agrolkortet.se/",
    serveStatic: ["app/css"],
    files: "app/css/main.css",
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return (
            '<link rel="stylesheet" type="text/css" href="/main.css"/>' +
            snippet +
            match
          );
        },
      },
    },
  });

  gulp.watch("src/scss/*.scss", ["sass"]);
  gulp.watch("src/*.html").on("change", bs.reload);
});

gulp.task("default", ["serve"]);
