import gulp from 'gulp';
import browserSync from 'browser-sync';

export default class BrowserSync {
  constructor(config) {
    this.config = config;
    this.browserSync = browserSync.create();
    this.init();
  }

  init() {
    gulp.task('server', () => {
      this.browserSync.init(this.config)
    });
  }

  reload() {
    return this.browserSync.stream();
  }
}
