"use strict";

module.exports = function(options) {
    // Remove C runner
    delete options.runners['C (simple)'];
    
    var config = require("./client-default")(options);
    
    var includes = [
    ];
    
    var excludes = {
        "plugins/c9.ide.run/gui": true,
        "plugins/c9.ide.run/output": true
    };
    
    config = config.concat(includes).map(function(p) {
        if (typeof p == "string")
            p = { packagePath: p };
        return p;
    }).filter(function (p) {
        if (p.packagePath == "plugins/c9.ide.layout.classic/preload") {
            p.defaultTheme = "flat-light"; // set flat theme as default
        }
        else if (p.packagePath == "plugins/c9.core/settings") {
            if (p.settings)
                p.settings.user = {}; // reset user settings
        }
        return !excludes[p.packagePath];
    });
    
    return config;
};