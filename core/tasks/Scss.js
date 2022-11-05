import gulp from 'gulp';
import sass from 'gulp-sass';

export default class Scss {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    gulp.task('scss', this.compile.bind(this, this.config.src, this.config.tmp));
    gulp.task('scss:build', this.compile.bind(this, this.config.src, this.config.dest));
  }

  compile(source, dest) {
    return gulp.src(`${source}/css/*.scss`)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(`${dest}/css`))
      .pipe(this.browserSync.reload())
  }
}
