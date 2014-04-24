module.exports = function(grunt){
    // Load all our grunt dependencies in one shot
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        demoTask : {
            options : {
                server : 'example.com'
            },
            test : {
                options : {
                    server : 'test.example.com'
                },
                files : [
                    { src: [ 'demoTask/**/test*.js'], dest: 'dest/scripts.js' },
                    { src: [ 'demoTask/**/test*.css'], dest: 'dest/styles.css' }
                ]
            },
            prod : {
                files : [
                    { src: [ 'demoTask/**/prod*.js'], dest: 'dest/scripts.js' },
                    { src: [ 'demoTask/**/prod*.css'], dest: 'dest/styles.css' }
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: 'jshint.json'
            },
            all: [
                'app/assets/scripts/{,*/}*.js'
            ]
        },
        watch: {
            css: {
                files: ['app/assets/styles/{,*/}*.css'],
                options: { livereload: true }
            },
            html: {
                files: [
                    'app/{,*/}*.html'
                ],
                options: { livereload: true }
            },
            images: {
                files: [ 'app/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}' ],
                options: { livereload: true }
            },
            scripts: {
                files: ['app/assets/scripts/**/*.js' ],
                tasks: ['jshint'],
                options: { livereload: true }
            }
        },
        connect: {
            options: {
                hostname: 'localhost',
                port: 9000
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static(require('path').resolve('app'))
                        ];
                    },
                    livereload: true,
                    open: true
                }
            }
        },
    });

    grunt.registerMultiTask('demoTask', 'This is a demo task.', function(){
        var done = this.async(),
            options = this.options({
                port : 9999   
            });

            grunt.log.writelns('task   : ' + this.name);
            grunt.log.writelns('target : ' + this.target);
            grunt.log.writelns('args   : ' + this.args.toString());

            grunt.log.writelns();
            grunt.log.writelns('server : ' + options.server);
            grunt.log.writelns('port   : ' + options.port);
            grunt.log.writelns();

            grunt.log.writelns(JSON.stringify(this.files,null,3));

            grunt.log.writelns();
            grunt.log.writelns('It is now ' + grunt.template.today('HH:MM:ss'));
            setTimeout(function(){
                grunt.log.writelns('It is now ' + grunt.template.today('HH:MM:ss'));
                done(true);
            },2000);

    });
    
    grunt.registerTask('server', [ 'connect:livereload', 'watch' ]);

    grunt.registerTask('default',['demoTask']);
};
