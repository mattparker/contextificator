// Main context thing
"use strict";


YUI().use("node", function (iY) {

    // iY is the iframe Y instance
    iY.one('body').setContent("<h1>Hello!</h1>");


    console.log(YUI.version);


    // Now this one is bound to the parent window/document - 
    // the one we actually want to get text from.
    YUI({
        win: YUI.config.win.parent,
        doc: YUI.config.win.parent.document,
        modules: {
            'CFContextAnalyse': {
                requires: ['yql', 'base'],
                fullpath: 'http://localhost/yh2013/ContextAnalyse.js'
            },
            'CFDataWikipedia': {
                requires: ['jsonp', 'jsonp-url'],
                fullpath: 'http://localhost/yh2013/CFDataWikipedia.js'
            }
        }
    }).use("node", "CFContextAnalyse", 'CFDataWikipedia', 'gallery-get-selection', function (pY) {

        console.log("Is this the parent ", pY.config.doc, pY.config.win.location);
        
        console.log(pY);

        var ContextAnalyser = new pY.CFContextAnalyse(),
            selectedText = pY.getSelection();

        ContextAnalyser.on("results", function () {
            console.log("Ooh did this work", arguments);
        });

        // Now run context analysis on the selectedText (if there is any)
        // or on the whole page if not
        if (selectedText && selectedText.get("innerText")) {
            ContextAnalyser.text(selectedText.get("innerText"));
        } else {
            ContextAnalyser.url(pY.config.win.location.toString());
        }

    });



});