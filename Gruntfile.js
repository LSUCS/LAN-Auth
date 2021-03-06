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
      clientsrc: {
        files: ["public/js/**/*.js", "public/js/**/*.jsx", "public/less/**/*.less", "public/static/**/*.html"],
        tasks: ["build"],
        options: {
          livereload: {
            port: 9000
          }
        }
      },
      appsrc: {
        files: ["./app/**/*.js", "./test/**/*.js", "./task/**/*.js"],
        tasks: ["jshint:app"]
      }
    },
    nodemon: {
      dev: {
        script: "app/app.js",
        options: {
          ignore: [
            "node_modules/**",
            "public/**"
          ] 
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ["serve", "lan-api", "nodemon", "watch:clientsrc", "watch:appsrc"],
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
      options: {
        safe: true
      },
      dev: {
        src: "public/build/styles.css",
        dest: "public/build/styles.css"
      }
    },
    serve: {
      port: 8000,
      appRoot: "http://localhost:3000",
      livereload: 9000
    },
    jshint: {
      app: ["../app/**/*.js", "../test/**/*.js", "../task/**/*.js"]
    },
    lanApi: {
      port: 8002
    },
    env: {
      dev: {
        NODE_ENV: "development"
      }
    },
    symlink: {
      policy: {
        src: "node_modules/lu-internet-usage-policy",
        dest: "public/build/policy"
      }
    }
  });

  require("load-grunt-tasks")(grunt);
  grunt.loadTasks("tasks");

  grunt.registerTask("build", ["clean:build", "symlink:policy", "browserify:dev", "less:dev", "copy:build"]);
  grunt.registerTask("default", ["env:dev", "concurrent:dev"]);


};