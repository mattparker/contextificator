YUI.add('CFDataTwitterView', function (Y) {

    /**
     @class CFDataBossImagesView
     View for boss web search results
     */

    Y.CFDataMapView = Y.Base.create('CFDataTwitterView', Y.View, [], {

        template: '<div class="boss_outer"><h2>Where is this?</h2><h4>From <a href="http://search.yahoo.com/" target="_blank" title="Yahoo! Search">' +
            'Yahoo! Search</a></h4><div class="boss images">{content}</div></div>',




        render: function () {
            
                    new A.Twitter.Status({
                boundingBox     : '#options',
            isQuery         : true,
                key                     : '#freelas',
            showHandle      : false,
            strings         : {title:'Search for:'},
                count                   : 5,
                refreshSeconds  : 10
            }).render();
        });

        }


    }, {
        ATTRS: {
            Lat: {},
            Lng: {},
            renderTo: {}
            
        }
    });



}, '0.0.1', {
    requires: ['view']
});