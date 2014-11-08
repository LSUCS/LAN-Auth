var makeTelnetServer = require("./test/lib/make-telnet-server");

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
    connect: {
      dev: {
        options: {
          port: 8000,
          base: "./public/build",
          livereload: 9000
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
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-autoprefixer");

  grunt.registerTask("build", ["clean:build", "browserify:dev", "less:dev", "autoprefixer:dev", "copy:build"]);
  grunt.registerTask("default", ["connect:dev", "watch:src"]);

  grunt.registerTask("telnet", function () {
    this.async();
    makeTelnetServer().then(function (server) {
      console.log("Telnet server started at", server.address().address + ":" + server.address().port);
    });
  });

};