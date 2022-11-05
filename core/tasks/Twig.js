import gulp from 'gulp';
import twig from 'gulp-twig';
import Mock from './Mock';
import TwigFunctions from "../helpers/TwigFunctions";
import TwigFilters from "../helpers/TwigFilters";

export default class Twig {
  constructor(config, browserSync) {
    this.config = config;
    this.browserSync = browserSync;
    this.mock = new Mock();
    this.init();
  }

  init() {
    gulp.task('twig', this.render.bind(this, this.config.src, this.config.tmp));
    gulp.task('twig:build', this.render.bind(this, this.config.src, this.config.dest));
    gulp.task('twig:copy', this.copy.bind(this, this.config.src, this.config.dest));
  }

  render(source, dest) {
    return gulp.src(`${source}/views/*.twig`)
      .pipe(twig({
        debug: false,
        data: this.getData(),
        errorLogToConsole: true,
        functions: this.getClassFunctions((new TwigFunctions())),
        filters: this.getClassFunctions((new TwigFilters())),
      }))
      .pipe(gulp.dest(dest))
      .pipe(this.browserSync.reload());
  }

  copy(source, dest) {
    return gulp.src(`${source}/views/**/*`)
      .pipe(gulp.dest(`${dest}/views/`));
  }

  getData() {
    return this.mock.getData(`${this.config.src}/mocks`);
  }

  getClassFunctions(object) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(item => item !== 'constructor')
      .map(name => ({name: name, func: object[name]}));
  }
}
