import gulp from 'gulp';

export default class Images {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    gulp.task('images', this.move.bind(this, this.config.src, this.config.tmp));
    gulp.task('images:build', this.move.bind(this, this.config.src, this.config.dest));
  }

  move(source, dest) {
    return gulp.src(
      [
        `${source}/assets/**/*`,
        `!${source}/assets/png-sprite/**/*`,
        `!${source}/assets/svg-sprite/**/*`,
        `!${source}/assets/svg-sprite-inline/**/*`,
      ]
    )
      .pipe(gulp.dest(`${dest}/assets/`))
      .pipe(this.browserSync.reload())
  }
}
