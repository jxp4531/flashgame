
// ブラウザのバージョン判定
function versionCheck( )
{
	var flag = ( ( OPERA && getBrowserVersion( ).substr( 0, 1 ) >= 6 ) || ( NN4 && getBrowserVersion( ).substr( 0, 3 ).toString( ) != '4.0' ) || IE5 || NN6 ) ? true : false ;

	return flag ;
}

// FLASH のバージョン判定
function getFlashVersion( )
{
	var flashVersion ;

	if ( WIN && document.all && !OPERA )
	{
		flashVersion = getVBFlashVersion( ) ;
	}
	else
	{
		flashVersion = getJSFlashVersion( ) ;
	}

	return flashVersion ;
}

// WIN + MSIE 以外のブラウザは JS で判定する
function getJSFlashVersion( )
{
	var PLUGIN = navigator.plugins ;
	var PLUGIN_LENGTH = PLUGIN.length ;
	var myPlugin ;
	var myName ;
	var myDesc ;
	var flashVersion ;
	var versionDemilita = " r" ;
	var demilitaPos ;
	var majorVersion ;
	var minorVersion ;

	for ( var i=0; i < PLUGIN_LENGTH; i++ )
	{
		myPlugin = PLUGIN[ i ] ;
		myName = myPlugin.name ;
		myDesc = myPlugin.description ;

		if ( myName.indexOf( "Shockwave" ) != -1 && myName.indexOf( "Flash" ) != -1 )
		{
			flashVersion = myDesc.substring( myDesc.indexOf("Flash ") + 6 ) ;
			demilitaPos = flashVersion.indexOf( versionDemilita ) ;

			if ( demilitaPos != -1 )
			{
				majorVersion = flashVersion.substring( 0, demilitaPos ) ;
				minorVersion = parseInt( flashVersion.substring( demilitaPos + 2 ) ) ;

				if ( minorVersion < 10 )
				{
					minorVersion = "0" + minorVersion ;
				}

				return parseFloat( majorVersion + minorVersion ) ;
			}
			else
			{
				return parseFloat( flashVersion ) ;
			}
		}
	}

	return Number( 0 ) ;
}

// WIN + MSIE の場合、VBScript にて判定する
function getVBFlashVersion( )
{
	var COUNT_MAX = 8 ; // 最初に調べるバージョン
	var flashVersion ;
	var majorVersion ;
	var minorVersion ;

	for ( var i=COUNT_MAX; i>0; i-- )
	{
		flashVersion = getFlashControlVersion( i ) ;

		if ( flashVersion != 0 )
		{
			majorVersion = flashVersion >> 16 ;
			minorVersion = flashVersion & 0x0000ffff ;

			return parseFloat( majorVersion + "." + minorVersion ) ;
		}
	}

	return Number( 0 ) ;
}



/* ------------------------------------------------------------------------------------
   FlashPlayerのプラグインを調べ、問題無いときはSWFを書き出し、NGの時は静止画を表示する
------------------------------------------------------------------------------------ */
function FlashDispatcher( requestVersion, swfFile, altImage, width, height, bgColor, FlashVars, JumpURL, JumpTarget )
{
	this.requestVersion = requestVersion ;
	this.swfFile = swfFile ;
	this.altImage = altImage ;
	this.width = width ;
	this.height = height ;
	this.bgColor = ( ! bgColor ) ? "#FFFFFF" : bgColor ;
	this.FlashVars = FlashVars ;

	if ( JumpURL )
	{
		if ( JumpTarget )
		{
			this.pageJump( JumpURL, JumpTarget ) ;
		}
		else
		{
			this.pageJump( JumpURL, null ) ;
		}
	}
}

// ジャンプ先が指定してあった場合、ページを切り替える
FlashDispatcher.prototype.pageJump = function( JumpURL, JumpTarget )
{
	var targetBrowser = versionCheck( ) ;
	var flashVersion  = getFlashVersion( ) ;

	if ( !targetBrowser || flashVersion < this.requestVersion )
	{
		// window名が指定されていない場合、もしくは _self の場合
		// 自分のページを切り替える
		if ( JumpTarget == null || JumpTarget == "_self" )
		{
			location.href = JumpURL ;
		}
		// window名が指定されている場合、新規ページを表示する
		else
		{
			openWindow( JumpURL,JumpTarget,null,null,800,600,"yes","yes","yes","yes","yes","yes","yes","yes","no" ) ;
		}
	}
}

// ブラウザか、プラグインがこちらの要求以下だった場合は静止画像を書き出す
// ※thisPageVisited にtrue を渡すと、静止画像を表示する
//  （cookieで二度目以降は静止画を表示したい時に用いる）
FlashDispatcher.prototype.writeContents = function( thisPageVisited, isFlash )
{
	var targetBrowser = versionCheck( ) ;
	var flashVersion  = getFlashVersion( ) ;

	document.open( ) ;

	if ( targetBrowser )
	{
		if ( flashVersion < this.requestVersion || ( thisPageVisited && ! isFlash ) )
		{
			document.write( '<img src="' +this.altImage+ '" width="' +this.width+ '" height="' +this.height+ '" alt="" border="0">' ) ;
		}
		else
		{
			document.write( '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' +this.width+ '" height="' +this.height+ '" id="externalInterface" align="">' ) ;
			document.write( '<param name="movie" value="' +this.swfFile+ '">' ) ;
			document.write( '<param name="quality" value="high">' ) ;
			document.write( '<param name="menu" value="false">' ) ;
			document.write( '<param name="bgcolor" value="' + this.bgColor + '">' ) ;
			document.write( '<param name="allowScriptAccess" value="sameDomain" />' ) ;
			document.write( '<param name="allowFullScreen" value="true" />' ) ;

			if ( thisPageVisited && isFlash )
			{
				if ( this.FlashVars == null )
				{
					this.FlashVars = "goEndFrame=1" ;
				}
				else
				{
					this.FlashVars += "&goEndFrame=1" ;
				}
			}

			if ( this.FlashVars != null )
			{
				document.write( '<param name="FlashVars" value="' +this.FlashVars+ '">' ) ;
				document.write( '<embed src="' +this.swfFile+ '" allowFullScreen="true" FlashVars="' +this.FlashVars+ '" quality="high" menu="false" bgcolor="' + this.bgColor + '"  width="' +this.width+ '" height="' +this.height+ '" name="externalInterface" align="" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="https://www.macromedia.com/go/getflashplayer"></embed>' ) ;
			}
			else
			{
				document.write( '<embed src="' +this.swfFile+ '" allowFullScreen="true" quality="high" menu="false" bgcolor="' + this.bgColor + '"  width="' +this.width+ '" height="' +this.height+ '" name="externalInterface" align="" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="https://www.macromedia.com/go/getflashplayer"></embed>' ) ;
			}
			document.write( '</object>' ) ;
		}
	}
	else
	{
		document.write( '<img src="' +this.altImage+ '" width="' +this.width+ '" height="' +this.height+ '" alt="" border="0">' ) ;
	}

	document.close( ) ;
}