YUI.add('CFDataMapView', function (Y) {

    /**
     @class CFDataBossImagesView
     View for boss web search results
     */

    Y.CFDataMapView = Y.Base.create('CFDataMapView', Y.View, [], {

        template: '<div class="boss_outer"><h2>Where is this?</h2><h4>From <a href="http://search.yahoo.com/" target="_blank" title="Yahoo! Search">' +
            'Yahoo! Search</a></h4><div class="boss images">{content}</div></div>',




        render: function () {


            var lat = this.get("Lat"),
                lng = this.get("Lng"),
                renderTo = this.get("renderTo"),
                mapEl = Y.Node.create("<div></div>"),
                mapOptions,
                map;

            if (!(lat && lng)) {
                return;
            }

            mapEl.setStyle("height", "200px");
            renderTo.appendChild(mapEl);

            mapOptions = {
                      center: new google.maps.LatLng(lng, lat),
                      zoom: 5,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
            map = new google.maps.Map(mapEl.getDOMNode(), mapOptions);            

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