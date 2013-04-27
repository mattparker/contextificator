(function (parentWin, parentDoc) {

    var iframe = parentDoc.createElement('iframe'),
        ifrDoc,
        html = '<html><head><title>Welcome to the Contextificator</title>' + 
            '<script src="http://yui.yahooapis.com/3.9.1/build/yui/yui-min.js"></script>' +
            '</head><body><div id="contxt-container"></div>' +
            '<script src="http://localhost/yh2013/goContext.js"></script>' + 
            '</body></html>';

    parentDoc.body.appendChild(iframe);

    ifrDoc = iframe.contentWindow.document;
    ifrDoc.open();
    ifrDoc.write(html);
    ifrDoc.close();


        
}(window, window.document));