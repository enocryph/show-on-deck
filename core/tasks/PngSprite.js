import gulp from 'gulp';
import pngSprite from 'gulp.spritesmith';
import mergeStream from 'merge-stream';

export default class PngSprite {
    constructor(config, browserSync) {
        this.config = config;
        this.browserSync = browserSync;
        this.init();
    }

    init() {
      gulp.task('png-sprite', this.sprite.bind(this, this.config.src, this.config.tmp));
      gulp.task('png-sprite:build', this.sprite.bind(this, this.config.src, this.config.dest));
    }

    sprite(source, dest) {
      const sprite = gulp.src(`${source}/assets/png-sprite/**/*.png`)
        .pipe(pngSprite({
          imgName: 'sprite.png',
          cssName: 'png-sprite.scss',
          cssFormat: 'scss',
          algorithm: 'binary-tree',
          cssTemplate: './core/config/png-sprite.txt',
        }));

      const imgStream = sprite.img.pipe(gulp.dest(`${dest}/assets/sprite/`));
      const cssStream = sprite.css.pipe(gulp.dest(`${source}/css/sprites/`));
      return mergeStream(imgStream, cssStream);
    }
}
