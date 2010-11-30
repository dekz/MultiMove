//GrooveShark - TinySong Player Javascript
//Created by GrooveShark

function jsPlayer(hostname,callbacks){var self=this;var swf;var eiAttempts=0;this.songID=0;this.callbacks=callbacks
this.init=function()
{hostname="cowbell.grooveshark.com";var vars={hostname:hostname};var params={allowScriptAccess:"always"};var attributes={id:'jsPlayerEmbed',name:'jsPlayerEmbed'};var swfWrapper='swfWrapper';if(!document.getElementById('swfWrapper')){$(document.body).append('<div id="swfWrapper"></div>');}
swfobject.embedSWF("http://listen.grooveshark.com/JSPlayer.swf","swfWrapper","1","1","9.0.0",null,vars,params,attributes);setTimeout(this.getFlash,500);}
this.setErrorCallback=function(functionName)
{if(swf&&swf.setErrorCallback){swf.setErrorCallback(functionName);}}
this.setStatusCallback=function(functionName)
{if(swf&&swf.setStatusCallback){swf.setStatusCallback(functionName);}}
this.setSongCompleteCallback=function(functionName)
{if(swf&&swf.setSongCompleteCallback){swf.setSongCompleteCallback(functionName);}}
this.getCallback=function(status)
{debug(status);}
this.setCallbacks=function()
{if(self.callbacks&&self.callbacks.errorCallback){self.setErrorCallback(self.callbacks.errorCallback);}else{self.setErrorCallback('player.playerError');}
if(self.callbacks&&self.callbacks.statusCallback){self.setStatusCallback(self.callbacks.statusCallback);}else{self.setStatusCallback('player.playerStatus');}
if(self.callbacks&&self.callbacks.songCompleteCallback){self.setSongCompleteCallback(self.callbacks.songCompleteCallback);}else{self.setSongCompleteCallback('player.playerSongComplete');}}
this.playerError=function(msg)
{$("#searchError").html(msg);if($('#searchError').is(':visible')){}else{$('#searchError').fadeIn();}}
this.playerStatus=function(msg)
{debug('player status CALLBACK',msg);switch(msg){case'playing':debug('i play');$('#sr-'+this.songID).addClass('pause').removeClass('loading').removeClass('play');break;case'loading':case'buffering':debug('i '+msg);$('#sr-'+this.songID).addClass('loading').removeClass('play').removeClass('pause');break;case'completed':case'paused':case'failed':default:debug('i '+msg,this.songID);$('#sr-'+this.songID).addClass('play').removeClass('loading').removeClass('pause');break;}}
this.playerSongComplete=function(msg)
{debug('player song complete CALLBACK',msg);this.setSongAsPaused('#sr-'+this.songID);this.setSongAsPaused('#pl-'+this.songID);}
this.getPlayerFromObj=function(obj)
{return(gs.util.isObject(obj))?obj:$(obj).find('a.player');}
this.setSongAsPlaying=function(obj)
{debug('play obj',obj,$(obj));obj=this.getPlayerFromObj(obj);$(obj).addClass('pause').removeClass('play').removeClass('loading');}
this.setSongAsLoading=function(obj)
{debug('loading obj',obj,$(obj));obj=this.getPlayerFromObj(obj);$(obj).addClass('loading').removeClass('pause').removeClass('play');}
this.setSongAsPaused=function(obj)
{debug('pause obj',obj,$(obj));obj=this.getPlayerFromObj(obj);$(obj).addClass('play').removeClass('pause').removeClass('loading');}
this.toggleSong=function(obj,songID)
{var className=obj.className.replace('player','');if(className.match('play')){if(this.songID==songID){this.resumeStream();}else{this.playSong(songID);if(this.songID){}}}else{this.pauseStream();}
this.songID=songID;}
this.playSong=function(songID)
{if(swf&&swf.playSong){swf.playSong(songID);}}
this.playFile=function(fileID)
{if(swf&&swf.playFile){swf.playFile(fileID);}}
this.pauseStream=function()
{if(swf&&swf.pauseStream){swf.pauseStream();}}
this.resumeStream=function()
{if(swf&&swf.resumeStream){swf.resumeStream();}}
this.stopStream=function()
{if(swf&&swf.stopStream){swf.stopStream();}}
this.getFlash=function()
{if(eiAttempts<10){try{var flash=null;if(window.jsPlayerEmbed){flash=window.jsPlayerEmbed;}else if(document.jsPlayerEmbed){flash=document.jsPlayerEmbed;}
flash=flash||document.getElementBy('jsPlayerEmbed');}catch(e){eiAttempts++;setTimeout(this.getFlash,500);}
if(flash!=null){swf=flash;setTimeout(self.setCallbacks,1000);}else{eiAttempts++;setTimeout(self.getFlash,500);}}else{debug("ExternalInterface failed to load after "+eiAttempts+" attempts.");}}
this.init();return this;}