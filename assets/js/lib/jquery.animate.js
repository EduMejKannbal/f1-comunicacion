/// <reference path="jquery.js" />
/*
 jQuery extra animations Plugin
 Version 0.2 - 12/2/2016
 © 2016 Safayat Jamil
 safjammed.tk
 Licensed under MIT License
 */
(function(b,g){b.fn.doAnim=function(d,e){var c={animation:null,times:1,duration:null,delay:null};if(d&&1==b.isPlainObject(d)){b.extend(c,d);var a=c.animation;b.trim(a);var f=a="animated "+a;"infinite"==c.times&&(f=a+" infinite");c.duration&&(b.trim(c.duration),a=c.duration+"s",this.css({"-webkit-animation-duration":a,"-moz-animation-duration":a,"-o-animation-duration":a,"-MS-animation-duration":a,"animation-duration":a}));c.delay&&(b.trim(c.delay),a=c.delay+"s",this.css({"-webkit-animation-delay":a,
"-moz-animation-delay":a,"-o-animation-delay":a,"-MS-animation-delay":a,"animation-delay":a}));c.times&&(b.trim(c.times),a=c.times,this.css({"-webkit-animation-iteration-count":a,"-moz-animation-iteration-count":a,"-o-animation-iteration-count":a,"-MS-animation-iteration-count":a,"animation-iteration-count":a}));b(this).addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){b(this).removeClass(f);e&&(e.call(this),console.log(e))})}if(d&&0==b.isPlainObject(d))b(this).addClass("animated "+
d).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){b(this).removeClass(d);e&&(e.call(this),console.log(e))})}})(jQuery);