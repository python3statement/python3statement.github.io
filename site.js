
$.extend($.easing,
{
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

(function( $ ) {

    var settings;
    var disableScrollFn = false;
    var navItems;
    var navs = {}, sections = {};

    $.fn.navScroller = function(options) {
        settings = $.extend({
            scrollToOffset: 170,
            scrollSpeed: 800,
            activateParentNode: true,
        }, options );
        navItems = this;

        //attatch click listeners
    	navItems.on('click', function(event){
    		event.preventDefault();
            var navID = $(this).attr("href").substring(1);
            disableScrollFn = true;
            activateNav(navID);
            populateDestinations(); //recalculate these!
        	$('html,body').animate({scrollTop: sections[navID] - settings.scrollToOffset},
                settings.scrollSpeed, "easeInOutExpo", function(){
                    disableScrollFn = false;
                }
            );
    	});

        //populate lookup of clicable elements and destination sections
        populateDestinations(); //should also be run on browser resize, btw

        // setup scroll listener
        $(document).scroll(function(){
            if (disableScrollFn) { return; }
            var page_height = $(window).height();
            var pos = $(this).scrollTop();
            for (i in sections) {
                if ((pos + settings.scrollToOffset >= sections[i]) && sections[i] < pos + page_height){
                    activateNav(i);
                }
            }
        });
    };

    function populateDestinations() {
        navItems.each(function(){
            var scrollID = $(this).attr('href').substring(1);
            navs[scrollID] = (settings.activateParentNode)? this.parentNode : this;
            sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
        });
    }

    function activateNav(navID) {
        for (nav in navs) { $(navs[nav]).removeClass('active'); }
        $(navs[navID]).addClass('active');
    }
})( jQuery );


$(document).ready(function (){

    $('nav li a').navScroller();

    //section divider icon click gently scrolls to reveal the section
	$(".sectiondivider").on('click', function(event) {
    	$('html,body').animate({scrollTop: $(event.target.parentNode).offset().top - 50}, 400, "linear");
	});

    //links going to other sections nicely scroll
	$(".container a").each(function(){
        if ($(this).attr("href").charAt(0) == '#'){
            $(this).on('click', function(event) {
        		event.preventDefault();
                var target = $(event.target).closest("a");
                var targetHight =  $(target.attr("href")).offset().top
            	$('html,body').animate({scrollTop: targetHight - 170}, 800, "easeInOutExpo");
            });
        }
	});

  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');

  // add your project here with the following format
  //
  // '<groupname> : [
  //    { content:'<text>', start: <date>, end: <date>, py2:<true|false>},
  //    ...
  // ]
  var data = {
    'CPython':[
      {content:'Python 2.7', start: '2010-07-03', end: '2020-01-01', py2:true},
      // EOL for Python 3.3 - 3.6 not announced yet; project 5 years from initial release to follow CPython policy.
      {content:'Python 3.3', start: '2012-09-29', end: '2017-09-29'},
      {content:'Python 3.4', start: '2014-03-14', end: '2019-03-14'},
      {content:'Python 3.5', start: '2015-09-13', end: '2020-09-13'},
      {content:'Python 3.6', start: '2016-12-23', end: '2021-12-23'},
    ],
    'Django':[
      {content: '1.11 LTS', start: '2017-04-04', end:'2017-04-12', py2:true},
      {content: '2.x', start: '2017-12-02', end:'2022-04-31'},
    ],
    'IPython':[
      {content: '1.x', start: '2013-08-08', end:'2014-03-31', py2:true},
      {content: '2.x', start: '2014-04-01', end:'2015-02-26', py2:true},
      {content: '3.x', start: '2015-02-27', end:'2015-08-10', py2:true},
      {content: '4.x', start: '2015-08-11', end:'2016-07-07', py2:true},
      {content: 'IPython 5.x LTS', start: '2016-07-08', end:'2019-06-01', py2:true},
      {content: '6.x', start: '2017-04-19', end:'2018-01-01'},
      {content: '7.x', start: '2018-01-01', end:'2019-06-12'},
      {content: '8.x', start: '2019-06-12', end:'2020-06-01'},
    ],
    'Xonsh':[
      {content: '0.x series – Python 3.4+', start: '2015-03-09', end: '2021-12-16'},
    ],
    'scikit-bio':[
      {content: '0.1.1 - 0.4.2', start: '2014-05-16', end: '2016-05-30', py2:true},
      {content: '0.5.0+', start: '2016-05-31', end: '2021-12-16'},
    ],
    'QIIME':[
      {content: '1.x', start: '2010-04-09', end: '2017-12-31', py2:true},
      {content: '2.x+', start: '2016-07-11', end: '2021-12-16'},
    ],
    'SunPy':[
      {content: '0.7', start: '2016-05-24', end: '2017-06-01', py2:true},
      {content: '0.8', start: '2016-12-01', end: '2017-12-01', py2:true},
      {content: '0.9', start: '2017-06-01', end: '2018-06-01', py2:true},
      {content: '0.10', start: '2017-12-01', end: '2018-12-01'},
    ],
    'Astropy':[
      {content: '1.0 LTS', start: '2015-02-19', end: '2017-06-01', py2:true},
      {content: '1.1', start: '2015-12-11', end: '2016-06-23', py2:true},
      {content: '1.2', start: '2016-06-23', end: '2016-12-16', py2:true},
      {content: '1.3', start: '2016-12-16', end: '2017-06-01', py2:true},
      {content: '2.0 LTS', start: '2017-06-01', end: '2019-12-31', py2:true},
      {content: '3.0', start: '2017-12-01', end: '2018-06-01'},
      {content: '3.1', start: '2018-06-01', end: '2018-12-01'},
      {content: '3.2', start: '2018-12-01', end: '2019-06-01'},
      {content: '3.3', start: '2019-06-01', end: '2019-12-01'},
      {content: '4.0 LTS', start: '2019-12-01', end: '2021-12-01'},
    ],
    'osBrain':[
      {content: '0.x', start: '2016-07-01', end: '2021-12-16'},
    ],
    'PyMeasure':[
      {content: '0.2', start: '2015-12-16', end: '2016-04-08'},
      {content: '0.3', start: '2016-04-08', end: '2016-07-29'},
      {content: '0.4', start: '2016-07-29', end: '2017-07-29'},
    ],
    'rpy2':[
      {content: '2.8.x', start: '2016-12-21', end:'2018-12-21', py2:true},
      {content: '2.9.x', start: '2017-07-14', end:'2018-07-14'},
    ],
    'FEniCS':[
	    {content: '2017.1.0', start: '2017-05-12', end: '2017-12-31', py2:true},
	    {content: '2018.1.0', start: '2018-01-01', end: '2018-06-01'}
    ],
    'RDKit':[
	    {content: '2014.9.1 - 2019.03.1', start: '2014-09-1', end: '2019-09-1', py2:true},
	    {content: '2019.9.1 -' , start: '2019-09-01', end: '2021-03-01'}
	],
    'music21':[
        {content: 'v3', start: '2016-08-22', end: '2017-08-06', py2:true},
        {content: 'v4', start: '2017-08-22', end: '2019-06-01', py2:true},
        {content: 'v5', start: '2018-08-01', end: '2019-08-01'},
        {content: 'v6', start: '2019-08-01', end: '2020-08-01'},
    ],

    // for tests, rando example
    //'matplotlib':[
    //  {content: 'matplotlib 2.x', start: '2015-06-01', end:'2018-06-01', py2:true},
    //  {content: 'matplotlib 3.x', start: '2018-6-12', end:'2019-12-01'},
    //],
    //'scikit-bio':[
    //  {content: '0.18', start: '2016-05-01', end:'2016-11-01', py2:true},
    //  {content: '0.19', start: '2016-11-02', end:'2017-12-01'},
    //]


  }

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
  ]);



  var groups = new vis.DataSet();
  var g=0;
  var i=0;
  for (var gname  in data) {
    g++;
    groups.add({id: g, content: gname});
    gr = data[gname];
    for(var k in gr){
      i++;
      gr[k].id = i;
      gr[k].group = g;
      if(gr[k].py2) gr[k].className ='py2'
      items.add(gr[k])
    }
  }

  // Configuration for the Timeline
  var options = {};

  var options = {
    clickToUse: true,
    groupOrder: 'group'
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
  timeline.setGroups(groups);
  timeline.setItems(items);
  timeline.addCustomTime(Date.parse('2020-01-01'))

});
