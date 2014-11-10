module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
      build: ["build"]
    },
    copy: {
      build: {
        files: [
          { expand: true, cwd: "public/static", src: ["**"], dest: "public/build" }
        ]
      }
    },
    browserify: {
      dev: {
        files: {
          "public/build/app.js": ["public/js/main.jsx"]
        },
        options: {
          transform: ["reactify"]
        }
      }
    },
    watch: {
      src: {
        files: ["public/js/**/*.js", "public/js/**/*.jsx", "public/less/**/*.less", "public/static/**/*.html"],
        tasks: ["build"],
        options: {
          livereload: {
            port: 9000
          }
        }
      }
    },
    nodemon: {
      dev: {
        script: "app/app.js"
      }
    },
    concurrent: {
      dev: {
        tasks: ["serve", "lan-api", "nodemon", "watch:src"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    less: {
      dev: {
        files: {
          "public/build/styles.css": "public/less/main.less"
        }
      }
    },
    autoprefixer: {
      dev: {
        src: "public/build/styles.css",
        dest: "public/build/styles.css"
      }
    },
    lanApi: {
      port: 8001
    },
    serve: {
      port: 8000,
      appRoot: "http://localhost:3000",
      livereload: 9000
    }
  });

  require("load-grunt-tasks")(grunt);
  grunt.loadTasks("tasks");

  grunt.registerTask("build", ["clean:build", "browserify:dev", "less:dev", "autoprefixer:dev", "copy:build"]);
  grunt.registerTask("default", ["concurrent:dev"]);


};