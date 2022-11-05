import gulp from 'gulp';
import fs from 'fs';

export default class Clean {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    gulp.task('clean', (done) => {
      fs.rmSync(this.config.tmp, {recursive: true, force: true});
      fs.rmSync(this.config.dest, {recursive: true, force: true});
      done();
    });
  }
}
