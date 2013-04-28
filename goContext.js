// Main context thing
"use strict";

var CONTEXTIFICATOR = {};


YUI({modules: {
            'CFContextAnalyse': {
                requires: ['yql', 'base'],
                fullpath: 'http://localhost/yh2013/ContextAnalyse.js'
            },
            'CFDataWikipedia': {
                requires: ['jsonp', 'jsonp-url'],
                fullpath: 'http://localhost/yh2013/CFDataWikipedia.js'
            },
            'CFDataWikipediaView': {
                requires: ['view'],
                fullpath: 'http://localhost/yh2013/CFDataWikipediaView.js'
            },
            'CFDataBoss': {
                requires: ['yql'],
                fullpath: 'http://localhost/yh2013/CFDataBoss.js'
            },
            'CFContextAnalyseParser': {
                requires: ['arraylist', 'array', 'base'],
                fullpath: 'http://localhost/yh2013/CFContextAnalyseParser.js'
            },
            'CFContextAnalyseEntity': {
                requires: ['model', 'node'],
                fullpath: 'http://localhost/yh2013/CFContextAnalyseEntity.js'
            },
            'CFContextAnalyseEntityView': {
                requires: ['view'],
                fullpath: 'http://localhost/yh2013/CFContextAnalyseEntityView.js'
            }
        }
    }).use("node", "CFContextAnalyse", 
        'CFContextAnalyseEntity', 'CFContextAnalyseEntityView',
        'CFDataBoss', 
        'CFDataWikipedia', 'CFDataWikipediaView',
        'CFContextAnalyseParser', function (iY) {

    // iY is the iframe Y instance
    


    console.log(YUI.version);


    // Now this one is bound to the parent window/document - 
    // the one we actually want to get text from.
    YUI({
        win: iY.config.win.parent,
        doc: iY.config.win.parent.document,
    }).use("node",'gallery-get-selection', function (pY) {

        
        var contextAnalyser = new iY.CFContextAnalyse(),
            contextResponse,
            firstResponse,
            contextResponseParser = new iY.CFContextAnalyseParser({
                container: iY.one('#contxt-container')
            }),
            searchServices = {
                "boss": new iY.CFDataBoss(),
                "wikipedia": new iY.CFDataWikipedia()
            },
            renderers = {
                "boss": '',
                "wikipedia": new iY.CFDataWikipediaView()
            }


        contextAnalyser.on("results", function (ev) {
            console.log("Ooh did this work", ev.results);

            if (ev.results === null) {
                // Context Analysis didn't help... need to do something else...
            } else {

                // this is an array list of Models of the right kind,
                // with a View attached
                contextResponseParser.reset();

                // these will be available to Models that want to do more lookups
                contextResponseParser.provideServices(searchServices);
                contextResponseParser.parse(ev.results);

                contextResponseParser.render();

                firstResponse = contextResponseParser.item(0);
                firstResponse.findDetail(renderers, iY.one("#detailContainer_" + firstResponse.get("clientId")));
                //contextResponse = new pY.CFContextResponseModel(ev.results);
                //contextResponse.provideServices(searchServices);

                //contextView = new pYCFContextView({model: contextResponse});
                //contextView.render("#res");
            }
        });



        // This is in the global scope of the iframe so that if the button 
        // is pressed twice we can re-use everything.
        CONTEXTIFICATOR.run = function () {

            var selectedText = pY.getSelection();

            iY.one("#contxt-container").setContent("Loading...");

            // Now run context analysis on the selectedText (if there is any)
            // or on the whole page if not
            /*if (selectedText && selectedText.get("innerText")) {

                // We could switch here: if it's one word maybe include dictionary up front;
                // if it's (say) < 5 words, go straight to BOSS
                // if it's more then carry on with ContextAnalyser
                contextAnalyser.text(selectedText.get("innerText"));
            } else {
                contextAnalyser.url(pY.config.win.location.toString());
            }*/
            contextAnalyser.text("The Rolling Stones are the worlds greatest rock and roll band led by Mick Jagger");

        };

        CONTEXTIFICATOR.run();

    });



});