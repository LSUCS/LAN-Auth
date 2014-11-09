var makeTelnetServer = require("./test/lib/make-telnet-server");
var connect          = require("connect");
var httpProxy        = require("http-proxy");
var serveStatic      = require("serve-static");
var liveReload       = require("connect-livereload");

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
        tasks: ["serve", "nodemon", "watch:src"],
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
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.registerTask("serve", function () {
    this.async();
    var server = connect();
    var proxy  = httpProxy.createProxyServer({ target: "http://localhost:3000" });
    proxy.on("error", function (err) {
      grunt.log.error(err);
    });
    server.use(serveStatic("public/build"));
    server.use("/", function (req, res) {
      proxy.web(req, res);
    });
    server.use(liveReload({ port: 9000 }));
    server.listen(8000);
  });

  grunt.registerTask("build", ["clean:build", "browserify:dev", "less:dev", "autoprefixer:dev", "copy:build"]);
  grunt.registerTask("default", ["concurrent:dev"]);

  grunt.registerTask("telnet", function () {
    this.async();
    makeTelnetServer().then(function (server) {
      console.log("Telnet server started at", server.address().address + ":" + server.address().port);
    });
  });

};