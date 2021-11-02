const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const fileinclude = require('gulp-file-include');
const browsersync = require("browser-sync");

const build = "./build";

gulp.task("copy-html", () => {
  return gulp.src("./src/index.html")
              .pipe(fileinclude({
                  prefix: '@@',
                  basepath: '@file'
              }))
              .pipe(gulp.dest(build))
              .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/assets/js/index.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                    },
                    module: {
                      rules: [
                        {
                          test: /\.css$/i,
                          use: ["style-loader", "css-loader"],
                        },
                      ],
                    },
                }))
                .pipe(gulp.dest(build + '/assets/js'))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src("./src/assets/scss/**/*.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(build + '/assets/css'))
                .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    gulp.src("./src/assets/icons/**/*.*")
      .pipe(gulp.dest(build + "/assets/icons"));
    gulp.src("./src/assets/fonts/**/*.*")
      .pipe(gulp.dest(build + "/assets/fonts"));

    return gulp.src("./src/assets/img/**/*.*")
                .pipe(gulp.dest(build + "/assets/img"))
                .pipe(browsersync.stream());
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./build/",
		port: 4000,
		notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/icons/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/assets/img/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/assets/scss/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/assets/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js"));

gulp.task("prod", () => {
  gulp.src("./src/index.html")
        .pipe(fileinclude({
                  prefix: '@@',
                  basepath: '@file'
              }))
        .pipe(gulp.dest(build));
    gulp.src("./src/assets/img/**/*.*")
        .pipe(gulp.dest(build + "/assets/img"));
    gulp.src("./src/assets/icons/**/*.*")
      .pipe(gulp.dest(build + "/assets/icons"));
    gulp.src("./src/assets/fonts/**/*.*")
      .pipe(gulp.dest(build + "/assets/fonts"));

    gulp.src("./src/assets/js/index.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [['@babel/preset-env', {
                            debug: false,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                      }
                    }
                  }
                ]
            },
            module: {
              rules: [
                {
                  test: /\.css$/i,
                  use: ["style-loader", "css-loader"],
                },
              ],
            },
              
        }))
        .pipe(gulp.dest(build + '/assets/js'));
    
    return gulp.src("./src/assets/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(build + '/assets/css'));
});

gulp.task("default", gulp.parallel("watch", "build"));