import gulp from 'gulp';
import BrowserSync from "./core/tasks/BrowserSync";
import Twig from "./core/tasks/Twig";
import Scss from "./core/tasks/Scss";
import Watch from "./core/tasks/Watch";
import Clean from "./core/tasks/Clean";
import Scripts from "./core/tasks/Scripts";
import SvgSprite from "./core/tasks/SvgSprite";
import SvgSpriteInline from "./core/tasks/SvgSpriteInline";
import PngSprite from "./core/tasks/PngSprite";
import Images from "./core/tasks/Images";

let config = require('./config.json');
let browserSync = new BrowserSync(config.browserSync);

new Twig(config, browserSync);
new Scss(config, browserSync);
new Scripts(config, browserSync);
new Watch(config);
new Clean(config);
new SvgSprite(config, browserSync);
new SvgSpriteInline(config, browserSync);
new PngSprite(config, browserSync);
new Images(config, browserSync);

gulp.task('dev', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('svg-sprite', 'svg-sprite-inline', 'png-sprite', 'images'),
  gulp.parallel('twig', 'scss', 'scripts'),
  gulp.parallel('watch', 'server'),
));

gulp.task('build', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('svg-sprite:build', 'svg-sprite-inline:build', 'png-sprite:build', 'images:build'),
  gulp.parallel('twig:build', 'scss:build', 'scripts:build', 'twig:copy'),
));
