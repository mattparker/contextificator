javascript:(
    function (win,doc) { 
        var C = "CONTEXTIFICATOR";
        win.C || (C={}); 
        C.Bookmarklet || (C.Bookmarklet = { 
            URL:'http://localhost/yh2013/bookmarklet.js', 
            URL_SECURE:'http://localhost/yh2013/bookmarklet.js',
            loaded: false
        }); 
        if (!C.Bookmarklet.loaded) { 
            var B=C.Bookmarklet, 
                d=doc, 
                h=d.head||d.getElementsByTagName('head')[0]||d.documentElement, 
                s=d.createElement('script'); 

            s.setAttribute('src',win.location.protocol==='https:'?B.URL_SECURE:B.URL); 
            h.appendChild(s); 
        } 
    }(this,this.document)
);