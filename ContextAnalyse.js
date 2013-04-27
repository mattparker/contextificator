YUI.add('CFContextAnalyse', function (Y) {

    /**
     @class CFContextAnalyse
     Analyses text or page using Yahoo! Context Analysis API
     */

    Y.CFContextAnalyse = Y.Base.create('CFContextAnalyse', Y.Base, [], {


        /**
         Will run Content Analysis on string passed
         @param {String} str
         */
        text: function (str) {

        },

        /**
         Will run Content Analysis on url passed
         @param {String} url
         */
        url: function (url) {

        },

        /**
         Runs the YQL query
         @param {Object}  Keys 'text' or 'url'
         */
        _getContentAnalysis: function (oCfg) {

            var q = "select * from contentanalysis.analyze where ";
            if (oCfg.text) {
                q += "text='" + oCfg.text + "'";
            } else if (oCfg.url) {
                q += "url='" + oCfg.url + "'";
            } else {
                return null;
            }


            Y.YQL(q, this._parse);
        },

        /**
         Parses the YQL return data
         @param {Object} o Response object
         */
        _parse: function (o) {
            console.log("Got some text)", o);
        }


    }, {
        ATTRS: {

        }
    })


}, '0.0.1', {
    requires: ['yql']
});