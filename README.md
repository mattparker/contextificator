# Contextificator

Contextificator was my entry to 
[Yahoo Hack Europe 2013](http://developer.yahoo.com/events/hack_europe_london/).  
It's currently a 
javascript bookmarklet that adds a side panel to the page you're viewing,
showing additional context.  It uses the Yahoo! Content Analysis API,
YUI, YQL, Yahoo BOSS, Google Maps, the Wikipedia API, and is entirely 
client-side.

## Use

It's not really good for actual use at the moment.  For one thing, 
everything is served from github via rawgithub, and you shouldn't use 
those for anything more than testing.  For another, some of the APIs 
used won't work beyond the hack weekend (time limited keys) so
you won't get too much data.

Because this is under 24 hours work (I went to bed) from a hack weekend
it's also very inefficient (in terms of network requests), probably
badly structured (though not complete spaghetti), and lightly tested.
Comments and docblocks are mostly present but fairly brief.


## Code 

This is mainly intended as a note-to-self for when I come back to it...


### Starting up

- [inlinejs.js](https://github.com/mattparker/contextificator/blob/master/inline.js) 
    contains the javascript that goes in the bookmarklet.
- [bookmarklet.js](https://github.com/mattparker/contextificator/blob/master/bookmarklet.js) 
    is the first page that's loaded.  It injects the
    iframe into the parent page, which contains the requests for YUI
    and goContext.js (and Google maps).  Everything happens in the
    iframe so we don't mess with the parent page, especially if it
    has YUI (potentially a different version) on it already.
- [goContext.js](https://github.com/mattparker/contextificator/blob/master/goContext.js) 
    is the main 'application'.  It sets up the YUI instances
    (one bound to the parent window, one to the iframe) and loads 
    the modules which request data, parse responses, and render it.


### Content analysis

The main classes for the first stage of content analysis is 
CFContextAnalyseParser.js which receives the results from the Content
Analysis API and creates a set of `CFContextAnalyseEntity` instances.
`CFContextAnalyseEntity` extends Model, but the Parser does not
extend ModelList - I wasn't sure that all the Models I'd end up
with were going to be of the same type, and I wasn't sure 
whether there'd be any issues with ModelList if that was the case.

Each 'Entity' is a detected person, place, concept etc that comes
from the Content Analysis.  The `CFContextAnalyseEntity` class
has a `findDetail` method.

Now the `CFContextAnalyseParser` holds an object which contains 
'data services' - classes described below that request data from
particular places.

Each Entity has a reference to the parent Parser, so can use these
services to request data about itself.  So the `findDetail` method
accesses the services provided by the parser, and renders them 
using the 'static' renderers object passed to the method.

This is almost certainly sub-optimal.  However once it was set up
it seemed pretty quick and easy to add data sources: create a
'service' class, a 'view' to render it, provide them via the 
parser and consume them in the Entity.


### 'Additional data' classes - services and views

The rest are extensions of `Base`, `Model`, or `View`.  

Things like 
CFDataBoss.js have a one or two public methods (`text(str)` or 
`url(address)`), make a YQL or jsonp request and parse the results,
firing an event when they're available.

Things like CFDataBossWebView.js extend `View` but perhaps shouldn't.
They're really used as static rendering functions, and would probably
be better as such unless there's going to be DOM events to deal with
(which I suppose there might in the future).  Anyway, they generally
have just one public method `render()` which renders the data parsed
by the relevant data-getter-parser (e.g. CFDataBoss.js).  Because they
are essentially static at the moment, they use a `renderTo` attribute
because `container` is writeOnce, which is no good because I want to 
be able to render to different places with the same `View`.  That's
also why I think they probably shouldn't be `View`s.
