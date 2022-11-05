import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

export default class SvgSpriteInline {
    constructor(config, browserSync) {
        this.config = config;
        this.browserSync = browserSync;
        this.init();
    }

    init() {
        gulp.task('svg-sprite-inline', this.sprite.bind(this, this.config.src, this.config.tmp));
        gulp.task('svg-sprite-inline:build', this.sprite.bind(this, this.config.src, this.config.dest));
    }

    sprite(source, dest) {
        return gulp.src(`${source}/assets/svg-sprite-inline/**/*.svg`)
          .pipe(svgSprite({
              mode: {
                  symbol: {
                      dest: '.',
                      example: false,
                      bust: false,
                      sprite: `${dest}/assets/sprite/inline.svg`,
                      inline: false,
                      render: {
                          scss: {
                              dest: `${source}/css/sprites/svg-sprite-inline.scss`,
                              template: "./core/config/svg-sprite-inline.txt"
                          }
                      }
                  }
              }
          }))
          .pipe(gulp.dest(`./`))
          .pipe(this.browserSync.reload())
    }
}
