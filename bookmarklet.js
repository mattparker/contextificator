(function (parentWin, parentDoc) {

    var iframe = parentDoc.createElement('iframe'),
        ifrDoc,
        html = '<!DOCTYPE html><html><head><title>Welcome to the Contextificator</title>' + 
            '<script src="http://yui.yahooapis.com/3.9.1/build/yui/yui-min.js"></script>' +
            '<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.10.0/build/cssnormalize/cssnormalize-min.css">' +
            '<link rel="stylesheet" type="text/css" href="https://rawgithub.com/mattparker/contextificator/master/css/ifr.css"/>' +
            '</head><body><div class="header">' + 
            '<img src="https://rawgithub.com/mattparker/contextificator/master/contextificator_ico.png" alt="Contextificator icon"/>' + 
            '<h1>The Contextificator</h1>' +
            '</div>' +
            '<div id="contxt-container"></div>' +
            '<script src="https://rawgithub.com/mattparker/contextificator/master/goContext.js"></script>' + 
            ' <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_NWs5yyaiFwnl-Sxpzadcl7s9zRiI4z4&sensor=false"></script>' + 
            '</body></html>';

    iframe.style.cssText = "right:0; width:25%; min-height:100%; border:0; background-color:rgba(20,20,20,0.9);top:0;position:fixed;z-index:99999";
    iframe.id = 'contextificator-' + (new Date().getTime());


    parentDoc.body.appendChild(iframe);

    ifrDoc = iframe.contentWindow.document;
    ifrDoc.open();
    ifrDoc.write(html);
    ifrDoc.close();

    parentWin.CONTEXTIFICATOR.Bookmarklet.loaded = true;
    parentWin.CONTEXTIFICATOR.Bookmarklet.iframeId = iframe.id;


        
}(window, window.document));