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
            }
        }
    }).use("node", "CFContextAnalyse", function (pY) {

        console.log("Is this the parent ", pY.config.doc, pY.config.win.location);
        console.log(pY.one("div.txt").getContent());
        console.log(pY);
        var ContextAnalyser = new pY.ContextAnalyse();
        ContextAnalyser.text("John Major");
    })



});