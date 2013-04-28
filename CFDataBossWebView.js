YUI.add('CFDataBossWebView', function (Y) {

    /**
     @class CFDataBossWebView
     View for boss web search results
     */

    Y.CFDataBossWebView = Y.Base.create('CFDataBossWebView', Y.View, [], {

        template: '<div class="boss_outer"><h2>From the web</h2><h4>From <a href="http://search.yahoo.com/" target="_blank" title="Yahoo! Search">' +
            'Yahoo! Search</a></h4><div class="boss web">{content}</div></div>',

        _itemTemplate: '<div class="boss-item"><a href="{url}" target="_blank">' +
            '<span class="boss-title">{title}</span> ' + 
            '<span class="boss-dispurl">{dispurl}</span></a>' +
            '<span class="boss-abstract boss-abstract-{i}">{abstract}</span>' + 
            '</div>',


        render: function () {
            var cont = this.get("renderTo"),
                res = this.get("results"),
                r,
                d,
                content = '',
                i = 0;

            for (i = 0; i < res.result.length; i = i + 1) {

                r = res.result[i];
                d = {
                    "i": i,
                    dispurl: r.dispurl.content,
                    abstract: r.abstract.content,
                    url: r.url,
                    clickurl: r.clickurl,
                    title: r.title.content
                };

                content += Y.Lang.sub(this._itemTemplate, d);
            
            }

           
            cont.appendChild(Y.Lang.sub(this.template, {content: content}));

            return this;

        }


    }, {
        ATTRS: {
            results: {},
            container: {},
            renderTo: {}
            
        }
    });



}, '0.0.1', {
    requires: ['view']
});