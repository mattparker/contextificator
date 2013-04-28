YUI.add('CFDataBossImagesView', function (Y) {

    /**
     @class CFDataBossImagesView
     View for boss web search results
     */

    Y.CFDataBossImagesView = Y.Base.create('CFDataBossImagesView', Y.View, [], {

        template: '<div class="boss_outer"><h2>Images</h2><h4>From <a href="http://search.yahoo.com/" target="_blank" title="Yahoo! Search">' +
            'Yahoo! Search</a></h4><div class="boss images">{content}</div></div>',

        _itemTemplate: '<div class="boss-item"><a href="{clickurl}" target="_blank">' +
            '<img class="boss-img" src="{thumbnailurl}" alt="{title}"/>' +
            '<span class="boss-title">{title}</span> ' + 
            '<span class="boss-dispurl">{clickurl}</span></a>' +
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
                    thumbnailurl: r.thumbnailurl,
                    
                    url: r.url,
                    clickurl: r.clickurl,
                    title: r.title
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