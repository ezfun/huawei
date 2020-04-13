const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create(), //自动刷新
  reload = browserSync.reload;

var changed = require('gulp-changed');
var del = require('del');

var watch=require('gulp-watch');//监视

// var jshint = require("gulp-jshint");//js检查
var imagemin = require('gulp-imagemin');//压缩图片文件
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var connect=require('gulp-connect');//引入gulp-connect模块 浏览器刷新
var cache = require('gulp-cache');//压缩图片可能会占用较长时间，使用 gulp-cache 插件可以减少重复压缩。
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


//
// gulp.task('html',function(){//编译html
//   return gulp.src('src/*.html')
//     .pipe(changed('src'))
//     .pipe(gulp.dest('src'));
// })

gulp.task('css',function(){//编译scss
  return gulp.src('src/css/**/*.scss')
    .pipe(sass())//编译scss
    // .pipe(gulp.dest('app/css')) //当前对应css文件
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('src/css')) //当前对应css文件
    .pipe(connect.reload());//更新
})


gulp.task('watchs',function(){//监听变化执行任务
  //当匹配任务变化才执行相应任务
  // gulp.watch('src/*.html',gulp.series('html'));
  gulp.watch('src/css/**/*.scss',gulp.series('css'));
})

gulp.task('server', function(){
  browserSync.init({
    port:9000,
    server:{
      baseDir: 'src',
      index:'index.html'
    }
  })
  // gulp.watch('src/*.html',gulp.series('html'));
  gulp.watch('src/css/**/*.scss',gulp.series('css'));
  // gulp.watch('src/js/**/*.js',gulp.series('js'));
  gulp.watch('src/**/*').on('change',reload);  // 这里是刷新浏览器
})
//gulp.series|4.0 依赖顺序执行
//gulp.parallel|4.0 多个依赖嵌套'html','css','js'并行

//下面1和2分别运行

//1.自动监测文件变化并刷新浏览器

gulp.task('dev', gulp.series('css', 'server'));

// //初始生成app/dist目录
// gulp.task('init',gulp.series('clean:src/dist',gulp.parallel('html','css','fonts','images')));
//
// //启动任务connect:app服务，并监控变化
// gulp.task('run',gulp.series('init','connect:src','watchs'));
//
// //2.生成打包文件
// gulp.task('build',gulp.series('clean:dist',gulp.parallel('init')));
//
// //启动任务connect:dist服务，生成打包文件后，监控其变化
// gulp.task('serve',gulp.series('connect:dist','build','clean:src/dist','watchs'));

// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();   // 自动刷新
// var changed = require('gulp-changed');
// var reload = browserSync.reload;
// // server
// function server() {
//   browserSync.init({
//     port:9000,
//     server:{
//       baseDir: 'app',
//       index:'index.html'
//     }
//   })
//   gulp.watch('app/scss/*.scss',myCss)   // 把监听写在服务里面，这里是复制html
//   gulp.watch('app/*.html',myHtml)   // 把监听写在服务里面，这里是复制html
//   gulp.watch('dist/**/*').on('change',reload)  // 这里是刷新浏览器
// }
// // gulp.task('css',function(){//编译scss
// //   return gulp.src('src/scss/**/*.scss')
// //     .pipe(sass())//编译scss
// //     // .pipe(gulp.dest('app/css')) //当前对应css文件
// //     .pipe(gulp.dest('src/dist/css')) //当前对应css文件
// //     .pipe(connect.reload());//更新
// // })
//
// function myCss() {
//   return gulp.src('app/scss/*.scss')
//     .pipe(changed('dist/css'))
//     .pipe(gulp.dest('dist/css')) //当前对应css文件
// }
// // html
// function myHtml() {
//   return gulp.src('app/*.html')
//     .pipe(changed('dist'))
//     .pipe(gulp.dest('dist'))
// }
// gulp.task('default',gulp.series(myCss, myHtml, server))  // 不用单引号！！！
