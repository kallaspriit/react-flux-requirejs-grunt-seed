requirejs(['src/Application'], function(Application) {
    // register the app under window for easy inspection and debugging
    var app = window.app = new Application();

    app.bootstrap();
});