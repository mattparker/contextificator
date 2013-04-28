YUI.add('CFDataWikipedia', function (Y) {

    /**
     @class CFContextAnalyse
     Analyses text or page using Yahoo! Context Analysis API
     */

    Y.CFDataWikipedia = Y.Base.create('CFDataWikipedia', Y.Base, [], {



        /**
         Will run Content Analysis on url passed
         @param {String} url
         */
        url: function (url) {
            var page,
                slash = url.lastIndexOf("/");

            if (slash !== -1) {
                page = url.substring(slash + 1);
                this._getContentAnalysis({page: page});
            }
            
        },

        /**
         Runs the YQL query
         @param {Object}  Keys 'text' or 'url'
         */
        _getContentAnalysis: function (oCfg) {
            
            var url = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&format=json&rvprop=content&rvlimit=1&rvdir=older&rvexpandtemplates=&rvparse=&titles={page}";
            url = Y.Lang.sub(url, oCfg);

            Y.jsonp(url, Y.bind(this._parse, this));
        
        },

        /**
         Parses the YQL return data
         @param {Object} o Response object
         */
        _parse: function (o) {
            console.log("Got wikipedia some text)", o);

            var pages = o.query ? o.query.pages : false,
                text,
                abstract,
                i;
            
            if (!pages) {
                this.fire("error", {results: o});
                return;
            }

            for (i in pages) {
                if (pages.hasOwnProperty(i)) {
                    
                    try { 
                        text = pages[i].revisions[0]["*"];
                        this.set("text", text);
                        this.set("pageid", i);
                    
                        abstract = Y.Node.create(text).one("p").getContent();
                        

                        this.fire("results", {results: o.query, abstract: abstract});
                        // there should only be one anyway
                        return;

                    } catch (e) {
                        this.fire("error", {results: o});
                    }
                }
            }

            
        }


    }, {
        ATTRS: {
            text: {},
            pageid: {}
        }
    })


}, '0.0.1', {
    requires: ['jsonp', 'jsonp-url']
});