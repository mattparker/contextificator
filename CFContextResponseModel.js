YUI.add('CFContextResponseModel', function (Y) {

    /**
     @class CFContextAnalyse
     Analyses text or page using Yahoo! Context Analysis API
     */

    Y.CFContextResponseModel = Y.Base.create('CFContextResponseModel', Y.Model, [], {


        /**
         A set of data services that might be useful...
         */
        provideServices: function (oServ) {
            this._services = oServ;
        },


    }, {
        ATTRS: {
        }
    })


}, '0.0.1', {
    requires: ['model']
});