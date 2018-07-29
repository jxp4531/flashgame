
// ブラウザ情報の取得
function getOsName( )
{
	var userOs      = "" ;
	var regexResult = "" ;
	var moreInfo    = true ;
	var usrAgent    = navigator.userAgent.toUpperCase( ) ;

	if ( usrAgent.indexOf("WIN") != -1 ) userOs = "Windows" ;
	if ( usrAgent.indexOf("MAC") != -1 ) userOs = "MacOS" ;
	if ( usrAgent.indexOf("X11") != -1 ) userOs = "UNIX" ;

	return userOs ;
}

function getBrowserName( )
{
	var userBrowser = "" ;
	var appName     = navigator.appName.toUpperCase( ) ;
	var usrAgent    = navigator.userAgent.toUpperCase( ) ;

	if ( appName.indexOf("NETSCAPE")  != -1 ) userBrowser = "Netscape" ;
	if ( appName.indexOf("MICROSOFT") != -1 ) userBrowser = "Explorer" ;
	if ( usrAgent.indexOf("OPERA") != -1 ) userBrowser = "Opera" ;
	if ( usrAgent.indexOf("SAFARI") != -1 ) userBrowser = "Safari" ;

	return userBrowser ;
}

function getBrowserVersion( )
{
	var version    = "" ;
	var start      = 0  ;
	var end        = 0  ;
	var usrBrowser = getBrowserName( ) ;
	var usrAgent   = navigator.userAgent.toUpperCase( ) ;
	var appVersion = navigator.appVersion ;

	if ( usrBrowser == "Netscape" )
	{
		start   = appVersion.indexOf(" ",0) ;
		version = appVersion.substring(0,start) ;
	}
	if ( usrBrowser == "Explorer" )
	{
		start   = appVersion.indexOf("MSIE ",0) + 5 ;
		end     = appVersion.indexOf(";",start) ;
		version = appVersion.substring(start,end) ;
	}
	if ( usrBrowser == "Opera" )
	{
		start   = usrAgent.indexOf("OPERA ",0) + 6 ;
		end     = usrAgent.indexOf(" ",start) ;
		version = usrAgent.substring(start,end) ;
	}

	return version ;
}

