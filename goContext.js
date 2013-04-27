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

        
        var contextAnalyser = new pY.CFContextAnalyse(),
            contextResponse,
            selectedText = pY.getSelection(),
            searchServices = {
                "boss": new CFDataBoss(),
                "wikipedia": new CFDataWikipedia()
            };


        contextAnalyser.on("results", function (ev) {
            console.log("Ooh did this work", ev.results);

            if (ev.results === null) {
                // Context Analysis didn't help... need to do something else...
            } else {
                contextResponse = new pY.CFContextResponseModel(ev.results);
                contextResponse.provideServices(searchServices);

                contextView = new pYCFContextView({model: contextResponse});
                contextView.render("#res");
            }
        });



        // Now run context analysis on the selectedText (if there is any)
        // or on the whole page if not
        if (selectedText && selectedText.get("innerText")) {

            // We could switch here: if it's one word maybe include dictionary up front;
            // if it's (say) < 5 words, go straight to BOSS
            // if it's more then carry on with ContextAnalyser
            contextAnalyser.text(selectedText.get("innerText"));
        } else {
            contextAnalyser.url(pY.config.win.location.toString());
        }

    });



});