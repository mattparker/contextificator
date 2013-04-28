YUI.add('CFContextAnalyseParser', function (Y) {

    /**
     @class CFContextAnalyseParser
     Parses responses from Content Analysis API into a list of Models and Views
     */

    Y.CFContextAnalyseParser = Y.Base.create('CFContextAnalyseParser', Y.Base, [], {

        _items: [],

        _services: {},

        _views: [],

        _itemTextContents: [],


        initializer: function () {
            this._items = [];
            this._services = {};
            this._views = [];
            this._itemTextContents = [];
        },


        /**
         Go through results from the Content API and process them
         */
        parse: function (res) {

            
            if (!Y.Lang.isArray(res)) {
                res = [res];
            }


            Y.Array.each(res, function (r) {
                if (r.entities) {
                    this._parseEntities(r.entities);
                }
            }, this);
        },



        /**
         Create new Entity Models 
         */
        _parseEntities: function (res) {

            /*if (!Y.Lang.isArray(res)) {
                res = [res];
            }*/

            Y.Array.each(res.entity || res, function (r) {
            
                var ent = r.entity || r,
                    rMod,
                    rView;

                if (ent.text && ent.text.content && this._itemTextContents.indexOf(ent.text.content) === -1) {

                    this._itemTextContents.push(ent.text.content);

                    rMod = new Y.CFContextAnalyseEntity(ent);
                    rView = new Y.CFContextAnalyseEntityView({model: rMod});

                    rMod.setParser(this);

                    this._items.push(rMod);
                    this._views.push(rView);

                }
            
            }, this);
        },


        /**
         Renders all the views
         */
        render: function () {

            Y.Array.each(this._views, function (v) {
                var con = Y.Node.create("<div class='entity'></div>");
                this.get("container").appendChild(con);
                v.set("container", con);
                v.render();
            }, this);

            return this;
        },


        provideServices: function (oServ) {
            this._services = oServ;
        },



        /**
         Destroys all the views and models currently in the Parser
         */
        reset: function () {
            Y.Array.each(this._items, function (n) {
                n.destroy();
            });
            Y.Array.each(this._views, function (v) {
                v.destroy();
            });
            this._itemTextContents = [];
            this.initializer();
        }

    }, {
        ATTRS: {
            container: {}
        }
    });



    Y.augment(Y.CFContextAnalyseParser, Y.ArrayList);


}, '0.0.1', {
    requires: ['array', 'array-list', 'base']
});