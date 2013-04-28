YUI.add('CFContextAnalyseEntity', function (Y) {

    /**
     @class CFContextAnalyseEntity
     Parses responses from Content Analysis API into a list of Models and Views
     */

    Y.CFContextAnalyseEntity = Y.Base.create('CFContextAnalyseEntity', Y.Model, [], {

        _parser: null,

        _results: {},


        initializer: function () {
            this._parser = null;
            this._results = {};
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
            if (!this._results.boss) {
                this._findDetailBoss(renderers, container);
            }
            this._findDetailGeo(renderers, container);
        },


        /**
         Looks for geo data and tries to do a map
         */
        _findDetailGeo: function (renderers, container) {

            var meta = this.get("metadata_list"),
                ll,
                lat,
                lng;

            if (meta && meta.metadata && meta.metadata.geo_location) {
                // we have some coords,
                // in brackets with a ,
                ll = meta.metadata.geo_location.replace(")","").replace("(","").split(",");
                lat = ll[0];
                lng = ll[1];

                renderers.map.setAttrs({
                    "Lat": lat,
                    "Lng": lng,
                    renderTo: container
                });
                renderers.map.render();
            }
        },



        /**
         Searches BOSS for some text
         */
        _findDetailBoss: function (renderers, container) {

            var q = this.get("text").content,
                service  = this._parser._services.boss,
                webEv,
                imEv;

            webEv = service.on("webresults", function (ev) {

                this._results.boss = this._results.boss || {};
                this._results.boss.web = ev.results.results;

                renderers.boss.web.setAttrs({
                    "results": ev.results.results,
                    "renderTo": container
                });
                renderers.boss.web.render();

                webEv.detach();

            
            }, this);
            
            imEv = service.on("imagesresults", function (ev) {
                this._results.boss = this._results.boss || {};
                this._results.boss.images = ev.results.results;

                renderers.boss.images.setAttrs({
                    "results": ev.results.results,
                    "renderTo": container
                });
                renderers.boss.images.render();

                webEv.detach();

            }, this);

            // web results
            service.text(q, {count: 2, service: "web"});
            // image results
            service.text(q, {count: 2, service: "images"});

        },


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