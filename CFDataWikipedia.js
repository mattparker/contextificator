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
                frag,
                pageFrag,
                firstImg,
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
                    

                        

                        // we need to process this a bit first
                        pageFrag = Y.Node.create(text);


                        // this is what we'll use for the abstract
                        frag = Y.Node.create("<p></p>").appendChild(pageFrag.one("p"));

                        firstImg = pageFrag.one("img");
                        if (!firstImg.ancestor('p')) {
                            frag.appendChild(firstImg);
                        }

                        // remove references
                        frag.all("sup.reference").remove();
                        
                        // make links absolute
                        frag.all("a").each(function (n) {
                            var h = n.get("href");
                            n.set("href", h.replace(Y.config.win.location.origin, 'http://en.wikipedia.org'));
                        });

                        // Images seem to be OK because they're from a different
                        // wikimedia subdomain...

                        abstract = frag.getContent();


                        this.fire("results", {results: o.query, abstract: abstract});
                        // there should only be one anyway
                        return;

                    } catch (e) {
                        this.fire("error", {results: o, exception: e});
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
    requires: ['jsonp', 'jsonp-url', 'node']
});