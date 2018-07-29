// 스킨정보 기록
var skin_name     = "styx_wmp9_royalblue2";
var skin_by       = "styx";
var skin_email    = "aquamp (at) bystyx.com";
var skin_homepage = "http://bystyx.com";

/* 수정하지 마세요 */
document.writeln('<script language="javascript" type="text/javascript" src="../player.config.js"></script>');
document.writeln('<script language="javascript" type="text/javascript" src="../player.js"></script>');

// 볼륨컨트롤 액션
function afmObj_volume(val) {
	if(typeof(vSlider) != "undefined") {
		vSlider.setValue(val);
		showTextEvent("Volume - "+val);
	}
}

var showTextEventsT;
function showTextEvent(val) {
	clearTimeout(showTextEventsT);
	if(val) {
		text_title.style.display = "none";
		text_event.style.display = "block";
		text_event.innerHTML = val;
		showTextEventsT = window.setTimeout("showTextEvent()",1200);
	}	else {
		text_title.style.display = "block";
		text_event.style.display = "none";
	}
}

// 플레이 버튼과 일시정지 버튼 이미지 액션
function afmObj_play(a) {
	if(a == 1) {
		img_play.style.display = "none";
		img_pause.style.display = "block";
	} else {
		img_play.style.display = "block";
		img_pause.style.display = "none";
	}
}

// Shuffle 버튼 이미지 액션
function afmObj_shuffle(a) {
	if(a == 1) {
		showTextEvent("Shuffle - On");
		img_shuffle.src = "images/btn_shuffle_on.gif";
	} else {
		showTextEvent("Shuffle - Off");
		img_shuffle.src = "images/btn_shuffle_off.gif";
	}
}

// Loop 버튼 이미지 액션
function afmObj_loop(a) {
	if(a == 1) {
		showTextEvent("Loop - On");
		img_loop.src = "images/btn_loop_on.gif";
	} else {
		showTextEvent("Loop - Off");
		img_loop.src = "images/btn_loop_off.gif";
	}
}

// 음소거 버튼 이미지 액션
function afmObj_mute(a) {
	if(a == 1) {
		showTextEvent("Mute - On");
		img_mute_off.style.display = "none";
		img_mute_on.style.display = "block";
	} else {
		showTextEvent("Mute - Off");
		img_mute_off.style.display = "block";
		img_mute_on.style.display = "none";
	}
}

// Macromedia Javascript Libraries
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}