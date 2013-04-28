YUI.add('CFDataWikipediaView', function (Y) {

    /**
     @class CFDataWikipediaView
     View for entity
     */

    Y.CFDataWikipediaView = Y.Base.create('CFDataWikipediaView', Y.View, [], {

        template: '<h4>From <a href="{wiki_url}" target="_blank" title="View full wikipedia article in a new window">' +
            'Wikipedia</a></h4><div class="wiki">{content}</div>',

        render: function () {
            var cont = this.get("container"),
                d = {
                    content: this.get("abstract")
                    
                };

            cont.appendChild(Y.Lang.sub(this.template, d));

            return this;

        }


    }, {
        ATTRS: {
            container:{},
            wiki_url: {},
            abstract: {},
            
        }
    });



}, '0.0.1', {
    requires: ['view']
});