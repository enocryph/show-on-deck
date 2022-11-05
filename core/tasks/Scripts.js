import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import vinylSource from 'vinyl-source-stream';
import glob from 'glob';
import path from 'path';
import mergeStream from 'merge-stream';

export default class Scripts {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.init();
  }

  init() {
    gulp.task('scripts', this.compile.bind(this, this.config.src, this.config.tmp));
    gulp.task('scripts:build', this.compile.bind(this, this.config.src, this.config.dest));
  }

  compile(source, dest) {
    let scripts = glob.sync(`${source}/scripts/*.js`);
    let streams = mergeStream();
    scripts.forEach((filepath) => {
      let stream = browserify({
        entries: filepath,
        debug: this.config.scriptsSourceMaps,
        transform: [
          babelify.configure({presets: ['@babel/preset-env']}),
        ],
      }).bundle()
        .pipe(vinylSource(path.basename(filepath)))
        .pipe(gulp.dest(`${dest}/scripts`))
        .pipe(this.browserSync.reload());

      streams.add(stream);
    })

    return streams;
  }
}
