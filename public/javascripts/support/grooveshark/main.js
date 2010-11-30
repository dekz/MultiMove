
(function(){var gs=window.gs={player:null,DEBUG:false,fakeConsole:null,fakeConsoleBox:null,rootUrl:location.protocol+"//"+location.host,pageUrl:location.protocol+"//"+location.host+location.pathname,scriptUrl:location.href};gs.debug=function()
{if(gs.DEBUG||gs.is_dev){if(!(typeof window.console=='undefined')){for(var i=0;i<arguments.length;i++){console.log(arguments[i]);}}else{if(!gs.fakeConsole){$(document.body).append("<div id='fakeConsole' style='display:none'><div class='close' onclick='$(this).click(function(){$(this).parent().hide()})'>X</div><div class='msg'></div></div>");gs.fakeConsole=document.getElementById("fakeConsole");gs.fakeConsoleBox=gs.fakeConsole.childNodes[1];$.hotkeys.add('ctrl+shift+z',function(event){$(gs.fakeConsole).toggle();});}
for(var i=0;i<arguments.length;i++){$(gs.fakeConsoleBox).append(arguments[i]+"<br><br>");}}}};window.debug=gs.debug;gs.util={isUndefined:function(a){return typeof a=='undefined';},isNull:function(a){return typeof a=='object'&&!a;},isIEObject:function(a){return gs.util.isObject(a)&&typeof a.constructor!='function';},isObject:function(a)
{if(a==null||a==undefined)return false;return(typeof a=='object'&&!!a)||gs.util.isFunction(a);},isFunction:function(a){return typeof a=='function';},isArray:function(a){return gs.util.isObject(a)&&a.constructor==Array;},isEmpty:function(o){if(gs.util.isObject(o)){for(var i in o){return false;}}
return true;},isNumber:function(a){return typeof a=='number'&&isFinite(a);},isString:function(a){return typeof a=='string';},isBoolean:function(a){return typeof a=='boolean';},shuffle:function(myArray)
{var i=myArray.length;if(i==0)return false;while(--i){var j=Math.floor(Math.random()*(i+1));var tempi=myArray[i];var tempj=myArray[j];myArray[i]=tempj;myArray[j]=tempi;}
return myArray;},arrayEnsure:function(arr)
{return(isArray(arr))?arr:[arr];},strReplace:function(search_arr,replace_str,subject)
{if(subject=="")return subject;search_arr=arrayEnsure(search_arr);replace_str=arrayEnsure(replace_str);var length=search_arr.length;for(var i=0;i<length;i++){subject=subject.replace(search_arr[i],replace_str[i]);}
return subject;},removeChildren:function(element)
{if(!element)return;var node;while((node=element.lastChild)){element.removeChild(node);}},objRedraw:function(obj)
{obj=obj||document.body;var t=obj.style.display;obj.style.display='none';obj.style.display=t;obj.className+="";},get_position:function(doc_obj)
{var left=0;var top=0;while(doc_obj.offsetParent){left+=doc_obj.offsetLeft;top+=doc_obj.offsetTop;doc_obj=doc_obj.offsetParent;}
left+=doc_obj.offsetLeft;top+=doc_obj.offsetTop;return{x:left,y:top};},purge:function(d)
{var a=d.attributes,i,l,n;if(a){l=a.length;for(i=0;i<l;i+=1){n=a[i].name;if(typeof d[n]==='function'){d[n]=null;}}}
a=d.childNodes;if(a){l=a.length;for(i=0;i<l;i+=1){purge(d.childNodes[i]);}}},getMouse:function(e)
{var posx=posy=0;if(e.pageX||e.pageY){posx=e.pageX;posy=e.pageY;}else if(e.clientX||e.clientY){posx=e.clientX+document.body.scrollLeft
+document.documentElement.scrollLeft;posy=e.clientY+document.body.scrollTop
+document.documentElement.scrollTop;}
return{x:posx,y:posy};}};gs.frameLinkHandler=function(event){event=event||window.event;var target=event.srcElement||event.target;if(target.href&&target.href!="#"){var url=escape(gs.getUrl(target.href));window.top.location.hash=url;event.cancelBubble=true;event.returnValue=false;if(event.stopPropagation)event.stopPropagation();if(event.preventDefault)event.preventDefault();return false;}}
gs.getUrl=function(href){if(typeof href!="string"){return'';}
var link_href=href.replace(gs.rootUrl,"");if(link_href.substring(0,1)=="/"){link_href=link_href.replace("/","");}
gs.debug("getUrl: page_ref: "+link_href,", orig href: "+href,"gs.rootUrl: "+gs.rootUrl);if(link_href=="#"){return'';}
return link_href;}
gs.collapseModule=function(href){href.blur();$(href).toggleClass('closed');$(href).parent().next('.collapseable').slideToggle('slow').toggleClass('closed');return false;}
gs.createImageHover=function(find){$(find).css('opacity',0.01);$(find).hover(function(){$(this).animate({opacity:0.5,borderWidth:"5px"},300);},function(){$(this).animate({opacity:0.01,borderWidth:"0px"},300);});}
gs.copy=function(inElement){if(inElement.createTextRange){var range=inElement.createTextRange();if(range&&range.execCommand){range.execCommand('Copy');}}else{var flashcopier='flashcopier';if(!document.getElementById(flashcopier)){var divholder=document.createElement('div');divholder.id=flashcopier;document.body.appendChild(divholder);}
document.getElementById(flashcopier).innerHTML='';var divinfo='<embed src="/_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(inElement.value)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';document.getElementById(flashcopier).innerHTML=divinfo;}}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(val){for(var n=0;n<this.length;n++){if(this[n]==val){return n;}}
return-1;}}
if(!Array.prototype.inArray){Array.prototype.inArray=function(value){for(var i=0;i<this.length;i++){if(this[i]===value){return true;}}
return false;}}
jQuery.fn.extend({postJSON:function(url,data,callback){return $.post(url,data,callback,"json");},showMessages:function()
{var text=$("p#messages_text").html();if(text!=''){$("div#messages").show();}
return this;},showAlert:function()
{var text=$("p#alert_text").html();if(text!=''){$("div#alert").show();}
return this;},dom:function(getAll){getAll=getAll||false;if(getAll){var d=[];$(this).each(function(){d.push(this);});return d;}
return this[0];},fixDrag:function(){var dragtype=($(this).attr("id")).split("_")[0];if(dragtype=="sid"||dragtype=="lib"||dragtype=="ssid"){if(isIE){var ieobj=document.getElementById($(this).attr("id"));var helper=document.getElementById("dragHelper");helper.innerHTML="<table><tr>"+ieobj.innerHTML+"</tr></table>";var arr=$("td",helper).children();}else{var arr=$("td",this).children();}
var arr_length=arr.length;$(arr[1]).width(180+"px");$(arr[2]).width(180+"px");$(arr[3]).width(180+"px");$(arr[0]).remove();$(arr[arr_length-1]).remove();$(arr[arr_length-2]).remove();$("#dragHelper").width(540+"px").css("opacity",.75);$(this).children().children().children(".ellipses").remove();$(this).css("background","#FFFFFF").css("color","#294251");}
return this;}});if(isIE6){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}
$(document).ready(function(){window.tinysong.init();});})();function reportShit(a){console.log(a);}
