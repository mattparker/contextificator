YUI.add('CFContextAnalyseEntityView', function (Y) {

    /**
     @class CFContextAnalyseEntityView
     View for entity
     */

    Y.CFContextAnalyseEntityView = Y.Base.create('CFContextAnalyseEntityView', Y.View, [], {

        template: '<h3>{content}</h3><div id="detailContainer_{id}" class="detail"></div>',

        render: function () {
            var m = this.get("model"),
                cont = this.get("container"),
                d = {
                    content: m.get("text").content,
                    id: m.get("clientId")
                };

            cont.setHTML(Y.Lang.sub(this.template, d));

            return this;

        }


    }, {
        ATTRS: {
        }
    });



}, '0.0.1', {
    requires: ['view']
});