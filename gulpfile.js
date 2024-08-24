const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    html: {
        src: '**/*.html',
        dest: '.'
    }
};

function style() {
    return gulp.src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function copyHtml() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });

    gulp.watch(paths.scss.src, style);
    gulp.watch(paths.html.src, copyHtml);
}

const build = gulp.series(gulp.parallel(style, copyHtml), serve);

exports.style = style;
exports.copyHtml = copyHtml;
exports.serve = serve;
exports.build = build;
exports.default = build;
