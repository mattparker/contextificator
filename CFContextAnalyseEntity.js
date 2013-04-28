YUI.add('CFContextAnalyseEntity', function (Y) {

    /**
     @class CFContextAnalyseEntity
     Parses responses from Content Analysis API into a list of Models and Views
     */

    Y.CFContextAnalyseEntity = Y.Base.create('CFContextAnalyseEntity', Y.Model, [], {

        _parser: null,


        initializer: function () {
            this._parser = null;
        },


        setParser: function (oParser) {
            this._parser = oParser;
        },


        /**
         Uses the services in the parser to try and find some more interesting 
         stuff about this entity.
         */
        findDetail: function (renderers, container) {

            this._findDetailWikipedia(renderers, container);
            this._findDetailBoss(renderers, container);
        },



        /**
         Searches BOSS for some text
         */
        _findDetailBoss: function (renderers, container) {

            var q = this.get("text").content,
                service  = this._parser._services.boss;

            service.on("results", function (ev) {
                console.log("boss results", ev);
            });

            service.text(q);

        }


        /**
         Gets wikipedia abstract text from API - most recent revision
         */
        _findDetailWikipedia: function (renderers, container) {
            var wiki_url = this.get("wiki_url"),
                wikip,
                wikiEv;

            if (wiki_url) {
                // load up some wikipedia data and render it when it comes
                wikip = this._parser._services.wikipedia;
                
                wikiEv = wikip.on("results", function (ev) {

                    renderers.wikipedia.setAttrs({
                        "container": container,
                        "wiki_url": wiki_url,
                        "abstract": ev.abstract
                    });
                    renderers.wikipedia.render();
                    wikiEv.detach();
                }, this);

                wikip.url(wiki_url);
            }

        }

    }, {
        ATTRS: {
            text: {},
            metadata_list: {},
            wiki_url: {}
        }
    });



}, '0.0.1', {
    requires: ['model', 'node']
});