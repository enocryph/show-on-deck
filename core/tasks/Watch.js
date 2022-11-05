import gulp from 'gulp';

export default class Watch {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    gulp.task('watch', () => {
      gulp.watch(`${this.config.src}/views/**/*.twig`, {usePolling: true}, gulp.series('twig'))
      gulp.watch(`${this.config.src}/mocks/**/*.json`, gulp.series('twig'))
      gulp.watch(`${this.config.src}/css/**/*.scss`, {usePolling: true}, gulp.series('scss'))
      gulp.watch(`${this.config.src}/scripts/**/*.js`, gulp.series('scripts'))
      gulp.watch(`${this.config.src}/assets/svg-sprite/**/*.svg`, gulp.series('svg-sprite'))
      gulp.watch(`${this.config.src}/assets/svg-sprite-inline/**/*.svg`, gulp.series('svg-sprite-inline'))
      gulp.watch(`${this.config.src}/assets/png-sprite/**/*.png`, gulp.series('png-sprite'))

      gulp.watch([
        `${this.config.src}/assets/**/*`,
        `!${this.config.src}/assets/png-sprite/**/*`,
        `!${this.config.src}/assets/svg-sprite/**/*`,
        `!${this.config.src}/assets/svg-sprite-inline/**/*`,
      ], gulp.series('images'))
    });
  }
}
