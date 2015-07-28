
;(function(jQuery){jQuery.flexslider=function(el,options){var slider=jQuery(el);jQuery.data(el,"flexslider",slider);slider.init=function(){slider.vars=jQuery.extend({},jQuery.flexslider.defaults,options);jQuery.data(el,'flexsliderInit',true);slider.container=jQuery('.slides',slider).first();slider.slides=jQuery('.slides:first > li',slider);slider.count=slider.slides.length;slider.animating=false;slider.currentSlide=slider.vars.slideToStart;slider.animatingTo=slider.currentSlide;slider.atEnd=(slider.currentSlide==0)?true:false;slider.eventType=('ontouchstart'in document.documentElement)?'touchstart':'click';slider.cloneCount=0;slider.cloneOffset=0;slider.manualPause=false;slider.vertical=(slider.vars.slideDirection=="vertical");slider.prop=(slider.vertical)?"top":"marginLeft";slider.args={};slider.transitions="webkitTransition"in document.body.style;if(slider.transitions)slider.prop="-webkit-transform";if(slider.vars.controlsContainer!=""){slider.controlsContainer=jQuery(slider.vars.controlsContainer).eq(jQuery('.slides').index(slider.container));slider.containerExists=slider.controlsContainer.length>0;}
if(slider.vars.manualControls!=""){slider.manualControls=jQuery(slider.vars.manualControls,((slider.containerExists)?slider.controlsContainer:slider));slider.manualExists=slider.manualControls.length>0;}
if(slider.vars.randomize){slider.slides.sort(function(){return(Math.round(Math.random())-0.5);});slider.container.empty().append(slider.slides);}
if(slider.vars.animation.toLowerCase()=="slide"){if(slider.transitions){slider.setTransition(0);}
slider.css({"overflow":"hidden"});if(slider.vars.animationLoop){slider.cloneCount=2;slider.cloneOffset=1;slider.container.append(slider.slides.filter(':first').clone().addClass('clone')).prepend(slider.slides.filter(':last').clone().addClass('clone'));}
slider.newSlides=jQuery('.slides:first > li',slider);var sliderOffset=(-1*(slider.currentSlide+slider.cloneOffset));if(slider.vertical){slider.newSlides.css({"display":"block","width":"100%","float":"left"});slider.container.height((slider.count+slider.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){slider.css({"position":"relative"}).height(slider.slides.filter(':first').height());slider.args[slider.prop]=(slider.transitions)?"translate3d(0,"+sliderOffset*slider.height()+"px,0)":sliderOffset*slider.height()+"px";slider.container.css(slider.args);},100);}else{slider.args[slider.prop]=(slider.transitions)?"translate3d("+sliderOffset*slider.width()+"px,0,0)":sliderOffset*slider.width()+"px";slider.container.width((slider.count+slider.cloneCount)*200+"%").css(slider.args);setTimeout(function(){slider.newSlides.width(slider.width()).css({"float":"left","display":"block"});},100);}}else{slider.transitions=false;slider.slides.css({"width":"100%","float":"left","marginRight":"-100%"}).eq(slider.currentSlide).fadeIn(slider.vars.animationDuration);}
if(slider.vars.controlNav){if(slider.manualExists){slider.controlNav=slider.manualControls;}else{var controlNavScaffold=jQuery('<ol class="flex-control-nav"></ol>');var j=1;for(var i=0;i<slider.count;i++){controlNavScaffold.append('<li><a>'+j+'</a></li>');j++;}
if(slider.containerExists){jQuery(slider.controlsContainer).append(controlNavScaffold);slider.controlNav=jQuery('.flex-control-nav li a',slider.controlsContainer);}else{slider.append(controlNavScaffold);slider.controlNav=jQuery('.flex-control-nav li a',slider);}}
slider.controlNav.eq(slider.currentSlide).addClass('active');slider.controlNav.bind(slider.eventType,function(event){event.preventDefault();if(!jQuery(this).hasClass('active')){(slider.controlNav.index(jQuery(this))>slider.currentSlide)?slider.direction="next":slider.direction="prev";slider.flexAnimate(slider.controlNav.index(jQuery(this)),slider.vars.pauseOnAction);}});}
if(slider.vars.directionNav){var directionNavScaffold=jQuery('<ul class="flex-direction-nav"><li><a class="prev" href="#">'+slider.vars.prevText+'</a></li><li><a class="next" href="#">'+slider.vars.nextText+'</a></li></ul>');if(slider.containerExists){jQuery(slider.controlsContainer).append(directionNavScaffold);slider.directionNav=jQuery('.flex-direction-nav li a',slider.controlsContainer);}else{slider.append(directionNavScaffold);slider.directionNav=jQuery('.flex-direction-nav li a',slider);}
if(!slider.vars.animationLoop){if(slider.currentSlide==0){slider.directionNav.filter('.prev').addClass('disabled');}else if(slider.currentSlide==slider.count-1){slider.directionNav.filter('.next').addClass('disabled');}}
slider.directionNav.bind(slider.eventType,function(event){event.preventDefault();var target=(jQuery(this).hasClass('next'))?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}});}
if(slider.vars.keyboardNav&&jQuery('ul.slides').length==1){function keyboardMove(event){if(slider.animating){return;}else if(event.keyCode!=39&&event.keyCode!=37){return;}else{if(event.keyCode==39){var target=slider.getTarget('next');}else if(event.keyCode==37){var target=slider.getTarget('prev');}
if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}}}
jQuery(document).bind('keyup',keyboardMove);}
if(slider.vars.mousewheel){slider.mousewheelEvent=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";slider.bind(slider.mousewheelEvent,function(e){e.preventDefault();e=e?e:window.event;var wheelData=e.detail?e.detail*-1:e.originalEvent.wheelDelta/40,target=(wheelData<0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)){slider.flexAnimate(target,slider.vars.pauseOnAction);}});}
if(slider.vars.slideshow){if(slider.vars.pauseOnHover&&slider.vars.slideshow){slider.hover(function(){slider.pause();},function(){if(!slider.manualPause){slider.resume();}});}
slider.animatedSlides=setInterval(slider.animateSlides,slider.vars.slideshowSpeed);}
if(slider.vars.pausePlay){var pausePlayScaffold=jQuery('<div class="flex-pauseplay"><span></span></div>');if(slider.containerExists){slider.controlsContainer.append(pausePlayScaffold);slider.pausePlay=jQuery('.flex-pauseplay span',slider.controlsContainer);}else{slider.append(pausePlayScaffold);slider.pausePlay=jQuery('.flex-pauseplay span',slider);}
var pausePlayState=(slider.vars.slideshow)?'pause':'play';slider.pausePlay.addClass(pausePlayState).text((pausePlayState=='pause')?slider.vars.pauseText:slider.vars.playText);slider.pausePlay.bind(slider.eventType,function(event){event.preventDefault();if(jQuery(this).hasClass('pause')){slider.pause();slider.manualPause=true;}else{slider.resume();slider.manualPause=false;}});}
if('ontouchstart'in document.documentElement){var startX,startY,offset,cwidth,dx,startT,scrolling=false;slider.each(function(){if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false);}});function onTouchStart(e){if(slider.animating){e.preventDefault();}else if(e.touches.length==1){slider.pause();cwidth=(slider.vertical)?slider.height():slider.width();startT=Number(new Date());offset=(slider.vertical)?(slider.currentSlide+slider.cloneOffset)*slider.height():(slider.currentSlide+slider.cloneOffset)*slider.width();startX=(slider.vertical)?e.touches[0].pageY:e.touches[0].pageX;startY=(slider.vertical)?e.touches[0].pageX:e.touches[0].pageY;slider.setTransition(0);this.addEventListener('touchmove',onTouchMove,false);this.addEventListener('touchend',onTouchEnd,false);}}
function onTouchMove(e){dx=(slider.vertical)?startX-e.touches[0].pageY:startX-e.touches[0].pageX;scrolling=(slider.vertical)?(Math.abs(dx)<Math.abs(e.touches[0].pageX-startY)):(Math.abs(dx)<Math.abs(e.touches[0].pageY-startY));if(!scrolling){e.preventDefault();if(slider.vars.animation=="slide"&&slider.transitions){if(!slider.vars.animationLoop){dx=dx/((slider.currentSlide==0&&dx<0||slider.currentSlide==slider.count-1&&dx>0)?(Math.abs(dx)/cwidth+2):1);}
slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+(-offset-dx)+"px,0)":"translate3d("+(-offset-dx)+"px,0,0)";slider.container.css(slider.args);}}}
function onTouchEnd(e){slider.animating=false;if(slider.animatingTo==slider.currentSlide&&!scrolling&&!(dx==null)){var target=(dx>0)?slider.getTarget('next'):slider.getTarget('prev');if(slider.canAdvance(target)&&Number(new Date())-startT<550&&Math.abs(dx)>20||Math.abs(dx)>cwidth/2){slider.flexAnimate(target,slider.vars.pauseOnAction);}else{slider.flexAnimate(slider.currentSlide,slider.vars.pauseOnAction);}}
this.removeEventListener('touchmove',onTouchMove,false);this.removeEventListener('touchend',onTouchEnd,false);startX=null;startY=null;dx=null;offset=null;}}
if(slider.vars.animation.toLowerCase()=="slide"){jQuery(window).resize(function(){if(!slider.animating&&slider.is(":visible")){if(slider.vertical){slider.height(slider.slides.filter(':first').height());slider.args[slider.prop]=(-1*(slider.currentSlide+slider.cloneOffset))*slider.slides.filter(':first').height()+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}else{slider.newSlides.width(slider.width());slider.args[slider.prop]=(-1*(slider.currentSlide+slider.cloneOffset))*slider.width()+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}}});}
slider.vars.start(slider);}
slider.flexAnimate=function(target,pause){if(!slider.animating&&slider.is(":visible")){slider.animating=true;slider.animatingTo=target;slider.vars.before(slider);if(pause){slider.pause();}
if(slider.vars.controlNav){slider.controlNav.removeClass('active').eq(target).addClass('active');}
slider.atEnd=(target==0||target==slider.count-1)?true:false;if(!slider.vars.animationLoop&&slider.vars.directionNav){if(target==0){slider.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');}else if(target==slider.count-1){slider.directionNav.removeClass('disabled').filter('.next').addClass('disabled');}else{slider.directionNav.removeClass('disabled');}}
if(!slider.vars.animationLoop&&target==slider.count-1){slider.pause();slider.vars.end(slider);}
if(slider.vars.animation.toLowerCase()=="slide"){var dimension=(slider.vertical)?slider.slides.filter(':first').height():slider.slides.filter(':first').width();if(slider.currentSlide==0&&target==slider.count-1&&slider.vars.animationLoop&&slider.direction!="next"){slider.slideString="0px";}else if(slider.currentSlide==slider.count-1&&target==0&&slider.vars.animationLoop&&slider.direction!="prev"){slider.slideString=(-1*(slider.count+1))*dimension+"px";}else{slider.slideString=(-1*(target+slider.cloneOffset))*dimension+"px";}
slider.args[slider.prop]=slider.slideString;if(slider.transitions){slider.setTransition(slider.vars.animationDuration);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.slideString+",0)":"translate3d("+slider.slideString+",0,0)";slider.container.css(slider.args).one("webkitTransitionEnd transitionend",function(){slider.wrapup(dimension);});}else{slider.container.animate(slider.args,slider.vars.animationDuration,function(){slider.wrapup(dimension);});}}else{slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationDuration);slider.slides.eq(target).fadeIn(slider.vars.animationDuration,function(){slider.wrapup();});}}}
slider.wrapup=function(dimension){if(slider.vars.animation=="slide"){if(slider.currentSlide==0&&slider.animatingTo==slider.count-1&&slider.vars.animationLoop){slider.args[slider.prop]=(-1*slider.count)*dimension+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}else if(slider.currentSlide==slider.count-1&&slider.animatingTo==0&&slider.vars.animationLoop){slider.args[slider.prop]=-1*dimension+"px";if(slider.transitions){slider.setTransition(0);slider.args[slider.prop]=(slider.vertical)?"translate3d(0,"+slider.args[slider.prop]+",0)":"translate3d("+slider.args[slider.prop]+",0,0)";}
slider.container.css(slider.args);}}
slider.animating=false;slider.currentSlide=slider.animatingTo;slider.vars.after(slider);}
slider.animateSlides=function(){if(!slider.animating){slider.flexAnimate(slider.getTarget("next"));}}
slider.pause=function(){clearInterval(slider.animatedSlides);if(slider.vars.pausePlay){slider.pausePlay.removeClass('pause').addClass('play').text(slider.vars.playText);}}
slider.resume=function(){slider.animatedSlides=setInterval(slider.animateSlides,slider.vars.slideshowSpeed);if(slider.vars.pausePlay){slider.pausePlay.removeClass('play').addClass('pause').text(slider.vars.pauseText);}}
slider.canAdvance=function(target){if(!slider.vars.animationLoop&&slider.atEnd){if(slider.currentSlide==0&&target==slider.count-1&&slider.direction!="next"){return false;}else if(slider.currentSlide==slider.count-1&&target==0&&slider.direction=="next"){return false;}else{return true;}}else{return true;}}
slider.getTarget=function(dir){slider.direction=dir;if(dir=="next"){return(slider.currentSlide==slider.count-1)?0:slider.currentSlide+1;}else{return(slider.currentSlide==0)?slider.count-1:slider.currentSlide-1;}}
slider.setTransition=function(dur){slider.container.css({'-webkit-transition-duration':(dur/1000)+"s"});}
slider.init();}
jQuery.flexslider.defaults={animation:"fade",slideDirection:"horizontal",slideshow:true,slideshowSpeed:5000,animationDuration:600,directionNav:true,controlNav:true,keyboardNav:true,mousewheel:false,prevText:"Previous",nextText:"Next",pausePlay:false,pauseText:'Pause',playText:'Play',randomize:false,slideToStart:0,animationLoop:true,pauseOnAction:true,pauseOnHover:false,controlsContainer:"",manualControls:"",start:function(){},before:function(){},after:function(){},end:function(){}}
jQuery.fn.flexslider=function(options){return this.each(function(){if(jQuery(this).find('.slides > li').length==1){jQuery(this).find('.slides > li').fadeIn(400);}
else if(jQuery(this).data('flexsliderInit')!=true){new jQuery.flexslider(this,options);}});}})(jQuery);jQuery(window).load(function(){var defaultparams={}
if(bv_sliderParams){defaultparams=jQuery.extend(defaultparams,bv_sliderParams)}
jQuery('.flexslider').flexslider(defaultparams);});jQuery('#wp-admin-bar-editGuide .ab-item').click(function(){if(!jQuery(this).hasClass('close')){var txt=jQuery(this).html();jQuery(this).html(txt.replace(/OPEN/,'CLOSE')).addClass('close');jQuery('.adminEdit').each(function(i){jQuery(this).hide();});jQuery('.edit-link').each(function(i){jQuery(this).hide();});}else{var txt2=jQuery(this).html();jQuery(this).html(txt2.replace(/CLOSE/,'OPEN')).removeClass('close');jQuery('.adminEdit').each(function(i){jQuery(this).show();});jQuery('.edit-link').each(function(i){jQuery(this).show();});}});jQuery('iframe').each(function(i){var iframeUrl=jQuery(this).attr("src");if(!iframeUrl){return;}
idx=iframeUrl.indexOf("youtube");if(idx!=-1){jQuery(this).addClass('iframeYoutube').css({"max-width":"100%"});var iframeWidth=jQuery(this).attr("width");var iframeHeight=jQuery(this).attr("height");var iframeRate=iframeHeight/iframeWidth;var nowIframeWidth=jQuery(this).width();var newIframeHeight=nowIframeWidth*iframeRate;jQuery(this).css({"max-width":"100%","height":newIframeHeight});}});likeBoxReSize();jQuery(window).resize(function(){likeBoxReSize();});function likeBoxReSize(){jQuery('.fb-like-box').each(function(){var element=jQuery(this).parent().width();if(501>element||element<280){jQuery(this).attr('data-width',element);jQuery(this).children('span:first').css({"width":element});jQuery(this).children('span iframe.fb_ltr').css({"width":element});}});}
fbCommentReSize();jQuery(window).resize(function(){fbCommentReSize();});function fbCommentReSize(){jQuery('.fb-comments').each(function(){var element=jQuery(this).parent().width();jQuery(this).attr('data-width',element);jQuery(this).children('span:first').css({"width":element});jQuery(this).children('span iframe.fb_ltr').css({"width":element});});}
var initRollovers=window.onload;window.onload=function(){if(!document.getElementById)return
var aPreLoad=new Array();var sTempSrc;var setup=function(aImages){for(var i=0;i<aImages.length;i++){if(aImages[i].className.match(/(^| )imgover( |$)/i)){var src=aImages[i].getAttribute('src');var ftype=src.substring(src.lastIndexOf('.'),src.length);var hsrc=src.replace(ftype,'_on'+ftype);aImages[i].setAttribute('hsrc',hsrc);aPreLoad[i]=new Image();aPreLoad[i].src=hsrc;aImages[i].onmouseover=function(){sTempSrc=this.getAttribute('src');this.setAttribute('src',this.getAttribute('hsrc'));}
aImages[i].onmouseout=function(){if(!sTempSrc)sTempSrc=this.getAttribute('src').replace('_on'+ftype,ftype);this.setAttribute('src',sTempSrc);}}}};var aImages=document.getElementsByTagName('img');setup(aImages);var aInputs=document.getElementsByTagName('input');setup(aInputs);if(initRollovers){initRollovers();}}
jQuery(document).ready(function(){jQuery('a[href*=#]').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var $target=jQuery(this.hash);if(!this.hash.slice(1)){return;}
$target=$target.length&&$target||jQuery('[name='+this.hash.slice(1)+']');if($target.length){var targetOffset=$target.offset().top;jQuery('html,body').animate({scrollTop:targetOffset},1200,'quart');return false;}}});});jQuery.easing.quart=function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;};new function(){var footerId="footerSection";function footerFixed(){var dh=document.getElementsByTagName("body")[0].clientHeight;document.getElementById(footerId).style.top="0px";var ft=document.getElementById(footerId).offsetTop;var fh=document.getElementById(footerId).offsetHeight;if(window.innerHeight){var wh=window.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight!=0){var wh=document.documentElement.clientHeight;}
if(ft+fh<wh){document.getElementById(footerId).style.position="relative";document.getElementById(footerId).style.top=(wh-fh-ft-1)+"px";}}
function checkFontSize(func){var e=document.createElement("div");var s=document.createTextNode("S");e.appendChild(s);e.style.visibility="hidden"
e.style.position="absolute"
e.style.top="0"
document.body.appendChild(e);var defHeight=e.offsetHeight;function checkBoxSize(){if(defHeight!=e.offsetHeight){func();defHeight=e.offsetHeight;}}
setInterval(checkBoxSize,1000)}
function addEvent(elm,listener,fn){try{elm.addEventListener(listener,fn,false);}catch(e){elm.attachEvent("on"+listener,fn);}}
addEvent(window,"load",footerFixed);addEvent(window,"load",function(){checkFontSize(footerFixed);});addEvent(window,"resize",footerFixed);}
jQuery("#btn").on("click",function(){jQuery(this).next().next().slideToggle();jQuery(this).toggleClass("active");});var breakPoint1=950;var breakPoint2=655;jQuery(function(){resVektorRun();});jQuery(document).ready(function(){resVektorRun();});jQuery(window).resize(function(){resVektorRun();});var mode;function resVektorRun(){resThumbTxtFix();var bodyWidth=jQuery(window).width();if(bodyWidth<=breakPoint2){if(mode!="mode_mobile"){showHide_mode_mobile();changeImageFile_mode_mobile();resImgTxtChange_mode_mobile();dropNavReset();dropNavFunctions();dropNavSubControlLinkDelete();mode="mode_mobile";}}
if((breakPoint2<bodyWidth)&&(bodyWidth<breakPoint1)){if(mode!="mode_tab"){showHide_mode_tab();changeImageFile_mode_tab();resImgTxtChange_mode_tab();dropNavReset();dropNavFunctions();dropNavSubControlLinkDelete();mode="mode_tab";}}
if(breakPoint1<=bodyWidth){if(mode!="mode_full"){showHide_mode_full();changeImageFile_mode_full();resImgTxtChange_mode_full();dropNavReset();dropNavSubControlLinkRedo()
mode="mode_full";}}}
function showHide_mode_full(){jQuery('.show-tab-full,.show-full-only').each(function(){jQuery(this).show();});jQuery('.show-mobile-only,.show-mobile-tab,.show-tab-only').each(function(){jQuery(this).hide();});}
function showHide_mode_tab(){jQuery('.show-mobile-tab,.show-tab-only,.show-tab-full').each(function(){jQuery(this).show();});jQuery('.show-mobile-only,.show-full-only').each(function(){jQuery(this).hide();});}
function showHide_mode_mobile(){jQuery('.show-mobile-only,.show-mobile-tab').each(function(){jQuery(this).show();});jQuery('.show-tab-only,.show-tab-full,.show-full-only').each(function(){jQuery(this).hide();});}
function changeImageFile_mode_mobile(){mobileImageChange();}
function changeImageFile_mode_tab(){mobileImageBack();}
function changeImageFile_mode_full(){mobileImageBack();}
function mobileImageChange(){jQuery('img.resImage-mobile').each(function(){if(jQuery(this).hasClass('resImgMobile')!=true){var imgPath=jQuery(this).attr('src').replace(/(\.[a-zA-Z]+)$/,"_mobile"+"$1");jQuery(this).attr('src',imgPath).addClass('resImgMobile');}});}
function mobileImageBack(){jQuery('img.resImage-mobile').each(function(){if(jQuery(this).hasClass('resImgMobile')){var imgPath=jQuery(this).attr('src').replace(/_mobile(\.[a-zA-Z]+)$/,""+"$1");jQuery(this).attr('src',imgPath).removeClass('resImgMobile');}});}
function dropNavFunctions(){jQuery('.dropNavControl').each(function(){var dropNavUnit=jQuery(this).next();jQuery(this).click(function(){if(jQuery(this).hasClass('dropNavOpen')){jQuery(this).removeClass('dropNavOpen');dropNavUnit.animate({height:"0"});}else{jQuery(this).removeClass('dropNavOpen');dropNavUnit.css({"position":"absolute","opacity":"0","height":"auto"});var subMenuHeight=dropNavUnit.height();dropNavUnit.css({"position":"relative","opacity":"1","height":"0","display":"block"});dropNavUnit.animate({height:subMenuHeight},function(){jQuery(this).css({"height":"auto"});});jQuery(this).addClass('dropNavOpen');}});});}
function dropNavReset(){jQuery('a.dropNavControl.dropNavSubControl').each(function(){jQuery(this).next().hide();});}
function dropNavSubControlLinkDelete(){jQuery('a.dropNavControl.dropNavSubControl').each(function(){if(jQuery(this).hasClass('subControlMode')!==true){jQuery(this).addClass('subControlMode');var linkUrl=jQuery(this).attr('href');jQuery(this).attr('href','#').before('<span class="subControlLinkUrl">'+linkUrl+'</span>');jQuery(this).prev().hide();}});}
function dropNavSubControlLinkRedo(){jQuery('span.subControlLinkUrl').each(function(){var linkUrl=jQuery(this).html();jQuery(this).next().attr('href',linkUrl).removeClass('subControlMode');jQuery(this).remove();});}
function resImgTxtChange_mode_mobile(){resImgTxtChange_mobile_only();resImgTxtChange_mobile_tab();}
function resImgTxtChange_mode_tab(){resImgTxtChange_mobile_tab();resImgTxtBack_mobile_only();}
function resImgTxtChange_mode_full(){resImgTxtBack_mobile_tab();}
function resImgTxtChange_mobile_only(){jQuery('img.resImgTxtChange-mobile-only').each(function(){var spanClass=jQuery(this).prev().hasClass('resTxtChange-mobile-only');if(spanClass===false){var altTxt='<span class="resTxtChange-mobile-only">'+jQuery(this).attr('alt')+'</span>';jQuery(this).before(altTxt);jQuery(this).hide();}});}
function resImgTxtChange_mobile_tab(){jQuery('img.resImgTxtChange-mobile-tab').each(function(){var spanClass=jQuery(this).prev().hasClass('resTxtChange-mobile-tab');if(spanClass===false){var altTxt='<span class="resTxtChange-mobile-tab">'+jQuery(this).attr('alt')+'</span>';jQuery(this).before(altTxt);jQuery(this).hide();}});}
function resImgTxtBack_mobile_tab(){jQuery('span.resTxtChange-mobile-tab').each(function(){jQuery(this).next().show();jQuery(this).remove();});}
function resImgTxtBack_mobile_only(){jQuery('span.resTxtChange-mobile-only').each(function(){jQuery(this).next().show();jQuery(this).remove();});}
function resThumbTxtFix(){jQuery('.ttBox').each(function(){var parentWidth=jQuery(this).width();var imgWidth=jQuery(this).children('.ttBoxThumb').width();txtWidth=parentWidth-imgWidth-15;jQuery(this).children('.ttBoxTxt').css({"width":txtWidth});});}
function showHide(targetID){if(document.getElementById(targetID)){var targetItem='#'+targetID;if(jQuery(targetItem).hasClass('itemOpen')){document.getElementById(targetID).className="itemClose";}else{document.getElementById(targetID).className="itemOpen";}}}
jQuery(document).ready(function(){jQuery("#back-top").hide();jQuery(function(){jQuery(window).scroll(function(){if(jQuery(this).scrollTop()>100){jQuery('#back-top').fadeIn();}else{jQuery('#back-top').stop().fadeOut();}});jQuery('#back-top a').click(function(){jQuery('body,html').animate({scrollTop:0},800);return false;});});});(function(factory){if(typeof define==='function'&&define.amd&&define.amd.jQuery){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function raw(s){return s;}
function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}
function converted(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
try{return config.json?JSON.parse(s):s;}catch(er){}}
var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=config.json?JSON.stringify(value):String(value);return(document.cookie=[encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var decode=config.raw?raw:decoded;var cookies=document.cookie.split('; ');var result=key?undefined:{};for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=decode(parts.join('='));if(key&&key===name){result=converted(cookie);break;}
if(!key){result[name]=converted(cookie);}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==undefined){$.cookie(key,'',$.extend(options,{expires:-1}));return true;}
return false;};}));jQuery.changeLetterSize={handlers:[],interval:1000,currentSize:0};(function($){var self=$.changeLetterSize;var ins=$('<ins>M</ins>').css({display:'block',visibility:'hidden',position:'absolute',padding:'0',top:'0'});var isChanged=function(){ins.appendTo('body');var size=ins[0].offsetHeight;ins.remove();if(self.currentSize==size)return false;self.currentSize=size;return true;};$(isChanged);var observer=function(){if(!isChanged())return;$.each(self.handlers,function(i,handler){handler();});};self.addHandler=function(func){self.handlers.push(func);if(self.handlers.length==1){setInterval(observer,self.interval);}};})(jQuery);(function($){var sets=[];var flatHeights=function(set){var maxHeight=0;set.each(function(){var height=this.offsetHeight;if(height>maxHeight)maxHeight=height;});set.css('height',maxHeight+'px');};jQuery.fn.flatHeights=function(){if(this.length>1){flatHeights(this);sets.push(this);}
return this;};var reflatting=function(){$.each(sets,function(){this.height('auto');flatHeights(this);});};$.changeLetterSize.addHandler(reflatting);$(window).resize(reflatting);})(jQuery);jQuery(document).ready(function($){jQuery('.topPrTit a').flatHeights();jQuery('.topPrDescription').flatHeights();jQuery('.child_page_block').flatHeights();jQuery('.child_page_block p').flatHeights();jQuery('#content .child_page_block h4 a').flatHeights();});