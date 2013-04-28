// Main context thing
"use strict";

var CONTEXTIFICATOR = {};


YUI({
        //filter:"raw",
        modules: {
            'CFContextAnalyse': {
                requires: ['yql', 'base'],
                fullpath: 'http://localhost/yh2013/ContextAnalyse.js'
            },
            'CFDataWikipedia': {
                requires: ['jsonp', 'jsonp-url', 'node'],
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
            'CFDataBossWebView': {
                requires: ['view'],
                fullpath: 'http://localhost/yh2013/CFDataBossWebView.js'
            },
            'CFDataBossImagesView': {
                requires: ['view'],
                fullpath: 'http://localhost/yh2013/CFDataBossImagesView.js'                
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
            },
            'CFDataMapView': {
                requires: ['view'],
                fullpath: 'http://localhost/yh2013/CFDataMapView.js'
            }
        }
    }).use("node", "CFContextAnalyse", 
        'CFContextAnalyseEntity', 'CFContextAnalyseEntityView',
        'CFDataBoss', 'CFDataBossWebView', 'CFDataBossImagesView',
        'CFDataWikipedia', 'CFDataWikipediaView',
        'CFDataMapView',
        'CFContextAnalyseParser', 
        'gallery-accordion-horiz-vert', 
        'gallery-twitter-widget', function (iY) {

    // iY is the iframe Y instance
    




    // Now this one is bound to the parent window/document - 
    // the one we actually want to get text from.
    YUI({
        win: iY.config.win.parent,
        doc: iY.config.win.parent.document,
    }).use("node",'gallery-get-selection', function (pY) {

        
        var contextAnalyser = new iY.CFContextAnalyse(),
            contextResponse,
            firstResponse,
            accord,
            mainContainer = iY.one('#contxt-container'),
            contextResponseParser = new iY.CFContextAnalyseParser({
                container: mainContainer
            }),
            searchServices = {
                "boss": new iY.CFDataBoss(),
                "wikipedia": new iY.CFDataWikipedia()
            },
            renderers = {
                "boss": {
                    "web": new iY.CFDataBossWebView(),
                    "images": new iY.CFDataBossImagesView()
                },
                "wikipedia": new iY.CFDataWikipediaView(),
                "map": new iY.CFDataMapView()
            }


        contextAnalyser.on("results", function (ev) {


            if (ev.results === null) {
                // Context Analysis didn't help... need to do something else...
            } else {

                // this is an array list of Models of the right kind,
                // with a View attached
                contextResponseParser.reset();
                if (accord) {

                    accord.destroy();
                    accord = null;
                }
                mainContainer.setContent('');

                // these will be available to Models that want to do more lookups
                contextResponseParser.provideServices(searchServices);
                contextResponseParser.parse(ev.results);

                contextResponseParser.render();

                // accordian
                accord = new iY.Accordion({
                    //srcNode: mainContainer,
                    titles: iY.all(".entity h3"),
                    sections: iY.all(".entity .detail"),
                    replaceTitleContainer:   false,
                    replaceSectionContainer: false,
                    allowAllClosed:true                   
                });
                accord.render(mainContainer);
                accord.get("titles").each(function(n){
                    n.ancestor().ancestor().addClass("entity");
                });
                accord.get("sections").addClass("detail");

                mainContainer.delegate("click", function (ev, a) {
                    
                    var t = ev.target,
                        resp,
                        i = a.findSection(t);
                   
                    if (i >= 0) {
                        
                        resp = contextResponseParser.item(i);

                        resp.findDetail(renderers, accord.getSection(i).one(".detail"));//iY.one("#detailContainer_" + resp.get("clientId")));
                        a.toggleSection(i);
                    }
                }, "h3", null, accord);




                firstResponse = contextResponseParser.item(0);
                firstResponse.findDetail(renderers, accord.getSection(0).one(".detail"));//iY.one("#detailContainer_" + firstResponse.get("clientId")));
                accord.toggleSection(0);

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

          //  iY.one("#contxt-container").setContent("<span id='loadingindicator'>Loading...</span>");

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
            //contextAnalyser.text("The Rolling Stones are the worlds greatest rock and roll band led by Mick Jagger");

        };

        CONTEXTIFICATOR.run();

    });



});