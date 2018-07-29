function openWindow( u,ta,x,y,w,h,st,sc,to,m,l,res,dir,fav,rep,fullsc )
{
	var url        = u   ; // URL
	var target     = ta  ; // ページを開くWindow名
	var left       = ( x != null ) ? x : ( screen.availWidth  - w ) / 2 ; // WindowのＸ座標
	var top        = ( y != null ) ? y : ( screen.availHeight - h ) / 2 ; // WindowのＹ座標
	var width      = w   ; // Windowの横幅
	var height     = h   ; // Windowの縦幅
	var status     = st  ; // ステータス・バーの有無
	var scrollbar  = sc  ; // スクロール・バーの有無
	var toolbar    = to  ; // ツール・バーの有無
	var menubar    = m   ; // メニュー・バーの有無
	var location   = l   ; // ロケーションの有無
	var resizable  = res ; // Windowのリサイズを可能にするか
	var directorie = dir ; // ユーザ設定ツールバーの有無
	var favorite   = fav ; // お気に入りバーの有無(Mac+IE)
	var replace    = rep ; // window.replace("") の様な機能を持たせるか

	if ( getBrowserName( ) == "Safari" )
	{
		height += 15 ;
	}

	if ( width > screen.availWidth )
	{
		width = screen.availWidth ;
	}

	if ( height > screen.availHeight )
	{
		height = screen.availHeight ;
	}

	var features = "status=" + status + ",scrollbars=" + scrollbar + ",toolbar=" + toolbar + ",location=" +location + ",menubar=" + menubar + ",resizable=" + resizable + ",left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",directories=" + directorie + ",favorites=" + favorite ;

	var winObj = new Object( ) ;
	var win = winObj[ "win" +target ]
	win = window.open ( url, target, features, replace ) ;

	if ( fullsc )
	{
		win.resizeTo( screen.width, screen.height ) ;
		//win.resizeTo( screen.availWidth, screen.availHeight ) ;
		win.moveTo( 1, 1 ) ;
		win.moveTo( 0, 0 ) ;
	}

	return win ;
}

function openNewWindow( pageURL )
{
	if ( pageURL )
	{
		openWindow( pageURL,'myNewWindow2',null,null,800,600,'yes','yes','yes','yes','yes','yes','yes','yes','yes' ) ;
	}
}

function openDialogWindow( pageURL, w, h )
{
	if ( pageURL )
	{
		var nWidth = ( !w ) ? 550 : w ;
		var nHeight = ( !h ) ? 520 : h ;
		openWindow( pageURL,'myNewWindow2',null,null,nWidth,nHeight,'no','yes','no','no','no','yes','no','no','no' ) ;
	}
}

function openFullScreen( pageURL )
{
	var width = screen.availWidth ;
	var height = screen.availHeight ;

	openWindow( pageURL,'myNewWindow',0,0,width,height,'no','no','no','no','no','no','no','no','no',true ) ;
}