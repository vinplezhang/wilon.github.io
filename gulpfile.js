'use strict'

// 引入 gulp
const gulp = require('gulp');

// 引入组件
const del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
// 压缩合并图片组件
const spritesmith = require('gulp.spritesmith'),
    buffer = require('vinyl-buffer'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),
    imageResize = require('gulp-image-resize');
// wilon md
const wilonBlogdata = require('gulp-concat-blogdata');
// server
const sync = require('browser-sync').create(),
     path   = require('path');

// 合并，压缩 js 文件
gulp.task('js', function() {
    del('./static/wilonblog-*.min.js');
    return gulp.src('./blog/javascripts/*.js')
        .pipe(concat('wilonblog.min.js'))    // 合并
        .pipe(uglify())    // 压缩
        .pipe(rev())    // 重命名hash
        .pipe(gulp.dest('./static/'))    // 保存
        .pipe(rev.manifest('js.json'))    // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
});

// 缩放图片
gulp.task('imageresize', function() {
    return gulp.src('blog/images/*.png')
        .pipe(imageResize({
            width : 18,
            height : 18,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest('cache/'))
});

// 合并、压缩图片
gulp.task('sprite', ['imageresize'], function () {
    // Generate our spritesheet
    var spriteData = gulp.src(['blog/images/logo.png', 'cache/*.png', "!cache/logo.png"])
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('static/'));
    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('cache'));
    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

// 合并，压缩 css 文件
gulp.task('css', ['sprite'], function () {
    del('./static/wilonblog-*.min.css');
    return gulp.src(['./blog/stylesheets/*.css', 'cache/sprite.css'])
        .pipe(concat('wilonblog.min.css'))    // 合并
        .pipe(minifyCSS())    // 压缩
        .pipe(rev())    // 重命名hash
        .pipe(gulp.dest('./static/'))    // 保存
        .pipe(rev.manifest('css.json'))    // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
});


// 合并md
gulp.task('md', function() {
    del('./static/wilonblog-*.min.json');
    return gulp.src('./data/*.md')
        .pipe(wilonBlogdata('wilonblog.min.json'))
        .pipe(rev())    // 重命名hash
        .pipe(gulp.dest('./static/'))    // 保存
        .pipe(rev.manifest('data.json'))    // 生成一个重命名用json
        .pipe(gulp.dest('./cache/'));
});

// 替换模板文件内字符串
gulp.task('rev', ['js', 'css', 'md'], function() {
    gulp.src(['./cache/*.json', './blog/*.html'])    // 读取需要进行替换的文件
        .pipe(revCollector())    // 执行文件内js、css名的替换
        .pipe(gulp.dest('./'));    // 替换后的文件输出的目录
});
gulp.task('revjs', ['js'], function() {
    gulp.src(['./cache/*.json', './blog/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./'));
});
gulp.task('revcss', ['css'], function() {
    gulp.src(['./cache/*.json', './blog/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./'));
});
gulp.task('revmd', ['md'], function() {
    gulp.src(['./cache/*.json', './blog/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./'));
});
gulp.task('revhtml', function() {
    gulp.src(['./cache/*.json', './blog/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./'));
});

gulp.task('server', ['default'], function(done) {
    let watchOptions = {
        cwd: './',
        ignoreInitial: true,
        ignored: [
            '.DS_Store', 'nohup.out', 'npm-debug.log'
            ]
    };

    sync.watch('**', watchOptions, function (event, file) {
        return sync.reload(path.basename(file));
    });
    sync.init({
        server: './',
        watchOptions: watchOptions,
        reloadOnRestart: true,
        open: false
    }, function () {
        if (done) {
            done();
        }
    });
});

// 默认任务
gulp.task('default', ['rev'], function () {
    gulp.watch('data/*.md', ['revmd']);
    gulp.watch('blog/javascripts/*.js', ['revjs']);
    gulp.watch(['blog/stylesheets/*.css','blog/images/*.png'], ['revcss']);
    gulp.watch('blog/index.html', ['revhtml']);
});