

var usrAgent = navigator.userAgent.toUpperCase( ) ;

var WIN	= ( usrAgent.indexOf("WIN") != -1 ) ? true : false ;
var MAC	= ( usrAgent.indexOf("MAC") != -1 ) ? true : false ;

var OPERA = ( usrAgent.indexOf("OPERA") != -1 ) ? true : false ;
var NN4	= ( document.layers ? true : false ) ;
var NN6	= ( document.getElementById && !document.all ? true : false ) ;
var IE4	= ( !OPERA && document.all && !document.getElementById ? true : false ) ;
var IE5	= ( !OPERA && document.all && document.getElementById ? true : false ) ;

var _createLayerNo = 0 ;



//	JS
function setJsLink( which, URL )
{
	eval( which ).location = URL ;
}

//	HTML
function setHyperLink( linkName, which, URL )
{
	document.links[ linkName ].target = which ;
	document.links[ linkName ].href = URL ;
}



function refLayer( layerName, d )
{
	var i,x;
	
	if( !d )
	{
		d = document ;
	}

	if ( IE5 || NN6 )
	{
		x = d.getElementById( layerName ) ;
	}
	else if ( IE4 )
	{
		x = d.all[ layerName ] ;
	}
	else if ( NN4 )
	{
		x = d[ layerName ] ;

		for( i=0; !x && i<d.layers.length; i++ )
		{
			x = refLayer( layerName, d.layers[i].document ) ;
		}
	}

	return x;
}



function getFormObj( formName, d )
{
	var temp = null ;

	if ( d == null )
	{
		d = document ;
	}

	if ( !NN4 )
	{
		return d.forms[ formName ] ;
	}

	for ( var i=0 ; i<d.forms.length ; i++ )
	{
		if ( d.forms[ i ].name == formName )
			return d.forms[ i ] ;
	}

	for ( var i=0; i<d.layers.length; i++ )
	{
		temp = getFormObj( formName, d.layers[ i ].document ) ;

		if ( temp )
		{
			return temp ;
		}
	}
}



// http://www.din.or.jp/~hagi3/ で紹介されている関数です
function createLayer( left, top, width, height, parentDiv )
{
	var s = '' ;
	if ( arguments.length > 5 )
	{
		for ( var i=5; i<arguments.length; i++ )
		{
			s += arguments[ i ] ;
		}
	}
	if ( NN6 )
	{
		var divName= '_js_layer_'+_createLayerNo;
		_createLayerNo++ ;
		var pDiv = parentDiv ? parentDiv : document.body ;
		var div = document.createElement( 'DIV' ) ;
		div.id = divName ;
		div.setAttribute( 'style',
			'position:absolute;left:'+left+';top:'+top
			+(width >0?(';width:' +width ):'')
			+(height>0?(';height:'+height):'')
			+';visibility:hidden') ;
		var range = document.createRange( ) ;
		range.selectNodeContents( div ) ;
		range.collapse( true ) ;
		var cf = range.createContextualFragment( s ) ;
		div.appendChild( cf ) ;
		pDiv.appendChild( div ) ;
		return div ;
	}
	if ( IE4 || IE5 )
	{
		var adj = ( MAC && IE5 ) ? ' ' : '' ;
		var divName = '_js_layer_'+_createLayerNo ;
		_createLayerNo++ ;
		var ha = ( height>0 ) ? (';height:'+height) : '' ;
		var pDiv = parentDiv ? parentDiv : document.body ;
		pDiv.insertAdjacentHTML('BeforeEnd',
			'<div id="'+divName
			+'" style="position:absolute;left:'+left+';top:'+top
			+(width >0?(';width:' +width ):';width:1')
			+(height>0?(';height:'+height):'')
			+';visibility:hidden;">'+s+'<\/div>'+adj) ;
		return document.all( divName ) ;
	}
	if ( NN4 )
	{
		var div = parentDiv ? (new Layer(width,parentDiv)) : (new Layer(width)) ;
		if ( height>0 ) div.resizeTo( width, height ) ;
		div.moveTo( left, top ) ;
		if ( s != '' )
		{
			div.document.open( 'text/html', 'replace' ) ;
			div.document.write( s ) ;
			div.document.close( ) ;
		}
		return div;
	}
	return null;
}

// http://www.din.or.jp/~hagi3/ で紹介されている関数です
function createExLayer( url, left, top, width, height, parentDiv )
{
	if ( NN6 )
	{
		var divName = '_js_layer_'+_createLayerNo ;
		 _createLayerNo++ ;
		var pDiv = parentDiv ? parentDiv : document.body ;
		var div = document.createElement( 'IFRAME' ) ;
		div.id = divName ;
		div.name = divName ;
		div.setAttribute( 'style',
			'position:absolute;left:'+left+';top:'+top
			+';width:'+width+(height>0?(';height:'+height):'')
			+';visibility:hidden') ;
		div.setAttribute( 'src', url ) ;
		div.setAttribute( 'frameborder', 0 ) ;
		div.setAttribute( 'scrolling', 'auto' ) ;
		pDiv.appendChild( div ) ;
		return div ;
	}
	if ( IE4 || IE5 )
	{
		var adj = ( MAC && IE5 ) ? ' ' : '' ;
		var bd, divName ='_js_layer_'+_createLayerNo ;
		_createLayerNo++ ;
		var ha = (height>0) ? (';height:'+height) : '' ;
		if( arguments.length > 5 && parentDiv )
			bd = parentDiv ;
		else
			bd = document.body ;
		bd.insertAdjacentHTML( 'BeforeEnd',
			'<div id="'+divName
			+'" style="position:absolute;left:'+left+';top:'+top
			+';width:'+width+ha+';visibility:hidden;">'
			+'<iframe src="'+url+'" name="'+divName+'_if" '
			+'width='+width+' height='+height
			+'marginwidth=0 marginheight=0 '
			+'scrolling="auto" frameborder="no">'
			+'<\/iframe>'
			+'<\/div>'+adj);
		return document.all(divName);
	}
	if ( NN4 )
	{
		
		var div = parentDiv ? (new Layer(width,parentDiv)) : (new Layer(width)) ;
		if ( height > 0 )
			div.resizeTo( width, height ) ;
		div.moveTo( left, top ) ;
		div.load( url, width ) ;
		return div ;
	}
	return null;
}



function initLayer( layerObj )
{
	if ( NN6 )
	{
		layerObj.style.width = layerObj.offsetWidth ;
		layerObj.style.height = layerObj.offsetHeight ;
	}
	else if( IE4 || IE5 )
	{
		layerObj.style.pixelLeft   = layerObj.offsetLeft ;
		layerObj.style.pixelTop    = layerObj.offsetTop ;
		layerObj.style.pixelWidth  = layerObj.offsetWidth ;
		layerObj.style.pixelHeight = layerObj.offsetHeight ;
	}
}



function setZindex( layerObj, zOrder )
{
	if ( NN4 )
	{
		layerObj.zIndex = zOrder ;
	}
	else
	{
		layerObj.style.zIndex = zOrder ;
	}
}



function getZindex( layerObj )
{
	if ( NN4 )
	{
		return layerObj.zIndex;
	}
	else
	{
		return layerObj.style.zIndex ;
	}
}



function getLayerVisibility( layerObj )
{
	if ( NN4 )
	{
		return ( layerObj.visibility == "show" ) ;
	}
	else
	{
		return ( layerObj.style.visibility == "visible" ) ;
	}
}

function hideLayer( layerObj )
{
	if ( NN4 )
	{
		layerObj.visibility = "hide" ;
	}
	else
	{
		layerObj.style.visibility = "hidden" ;
	}
}

function showLayer( layerObj )
{
	if ( NN4 )
	{
		layerObj.visibility = "show" ;
	}
	else
	{
		layerObj.style.visibility = "visible" ;
	}
}



function shiftLayerTo( layerObj, x, y )
{
	if ( NN4 )
	{
		layerObj.moveTo( x, y ) ;
	}
	else if ( NN6 )
	{
		layerObj.style.left = x + 'px' ;
		layerObj.style.top  = y + 'px' ;
	}
	else
	{
		layerObj.style.pixelLeft = x ;
		layerObj.style.pixelTop  = y ;
	}
}

function shiftLayerBy( layerObj, x, y )
{
	if ( NN4 )
	{
		layerObj.moveBy( x, y ) ;
	}
	else if ( NN6 )
	{
		layerObj.style.left = ( getLayerPosition( layerObj, 'left' ) + x ) + 'px' ;
		layerObj.style.top  = ( getLayerPosition( layerObj, 'top' ) + y ) + 'px' ;
	}
	else if ( IE4 || (MAC && IE5) )
	{
		layerObj.style.pixelLeft += x ;
		layerObj.style.pixelTop  += y ;
	}
	else
	{
		layerObj.style.pixelLeft = layerObj.offsetLeft + x ;
		layerObj.style.pixelTop  = layerObj.offsetTop  + y ;
	}
}



function resizeLayerTo( layerObj, width, height )
{
	if ( NN4 )
	{
		layerObj.resizeTo( width, height ) ;
	}
	else if ( NN6 )
	{
		layerObj.style.width = width ;
		layerObj.style.height = height ;
	}
	else
	{
		layerObj.style.pixelWidth  = width ;
		layerObj.style.pixelHeight = height ;
	}
}



function getLayerSize( layerObj, value )
{
	if( value == "width" )
	{
		if ( NN4 )
		{
			return layerObj.document.width ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.width ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelWidth ;
		}
		else
		{
			return layerObj.offsetWidth ;
		}
	}
	if( value == "height" )
	{
		if ( NN4 )
		{
			return layerObj.document.height ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.height ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelHeight ;
		}
		else
		{
			return layerObj.offsetHeight ;
		}
	}
}



function getLayerPosition( layerObj, value )
{
	if( value == "top" )
	{
		if ( NN4 )
		{
			return layerObj.top ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.top ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelTop ;
		}
		else
		{
			return layerObj.offsetTop ;
		}
	}
	if( value == "right" )
	{
		if ( NN4 )
		{
			return layerObj.left + getLayerSize( layerObj, "width" ) ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.left + getLayerSize( layerObj, "width" )  ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelLeft + getLayerSize( layerObj, "width" ) ;
		}
		else
		{
			return layerObj.offsetLeft + getLayerSize( layerObj, "width" ) ;
		}
	}
	if( value == "bottom" )
	{
		if ( NN4 )
		{
			return layerObj.top + getLayerSize( layerObj, "height" ) ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.top + getLayerSize( layerObj, "height" ) ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelTop + getLayerSize( layerObj, "height" ) ;
		}
		else
		{
			return layerObj.offsetTop + getLayerSize( layerObj, "height" ) ;
		}
	}
	if( value == "left" )
	{
		if ( NN4 )
		{
			return layerObj.left ;
		}
		else if ( NN6 )
		{
			return parseInt( layerObj.style.left ) ;
		}
		else if ( IE4 )
		{
			return layerObj.style.pixelLeft ;
		}
		else
		{
			return layerObj.offsetLeft ;
		}
	}
}



function getEventX( evt )
{
	if ( NN4 )
	{
		return evt.pageX ;
	}
	else if ( NN6 )
	{
		return ( window.scrollX + evt.clientX ) ;
	}
	else if ( IE4 || IE5 )
	{
		return ( document.body.scrollLeft + event.clientX ) ;
	}
}

function getEventY( evt )
{
	if ( NN4 )
	{
		return evt.pageY ;
	}
	else if ( NN6 )
	{
		return ( window.scrollY + evt.clientY ) ;
	}
	else if ( IE4 || IE5 )
	{
		return ( document.body.scrollTop + event.clientY ) ;
	}
}



function getPageX( evt )
{
	if ( NN4 || NN6)
	{
		return evt.pageX ;
	}
	else if ( IE4 || IE5 )
	{
		return event.x ;
		//return ( document.body.scrollLeft + event.clientX ) ;
	}
}

function getPageY( evt )
{
	if ( NN4 || NN6 )
	{
		return evt.pageY ;
	}
	else if ( IE4 || IE5 )
	{
		return event.y ;
		// return ( document.body.scrollTop + event.clientY ) ;
	}
}



function getCenterSize( layerObj, which )
{
	return ( getWinSize( which ) - getLayerSize( layerObj, which ) ) / 2 ;
}



function replaceContent( layerObj, txt )
{
	if ( NN4 )
	{
		layerObj.document.open( "text/html" ) ;
		layerObj.document.write( txt ) ;
		layerObj.document.close( ) ;
	}
	else
	{
		layerObj.innerHTML = txt ;
	}
}



function getPageOffset( which )
{
	if ( which == "left" )
	{
		if ( NN4 )
		{
			return self.pageXOffset ;
		}
		else if ( NN6 )
		{
			return window.scrollX ;
		}
		else
		{
			return document.body.scrollLeft ;
		}
	}
	if ( which == "top" )
	{
		if ( NN4 )
		{
			return self.pageYOffset ;
		}
		else if ( NN6 )
		{
			return window.scrollY ;
		}
		else
		{
			return document.body.scrollTop ;
		}
	}
}



function getClipValue( layerObj, value )
{
	if( IE4 || IE5 || NN6 )
	{
		var cp = layerObj.style.clip.split(" ") ;
		cp[0] = cp[0].slice(5) ;

		switch ( value )
		{
			case "top" :
				return parseInt( cp[0] ) ;
			case "right" :
				return parseInt( cp[1] ) ;
			case "bottom" :
				return parseInt( cp[2] ) ;
			case "left" :
				return parseInt( cp[3] ) ;
		}
	}
	else
	{
		switch ( value )
		{
			case "top" :
				return ( layerObj.clip.top ) ;
			case "right" :
				return ( layerObj.clip.right ) ;
			case "bottom" :
				return ( layerObj.clip.bottom ) ;
			case "left" :
				return ( layerObj.clip.left ) ;
		}
	}
}

function clipLayerTo( layerObj, t, r, b, l )
{
	if ( NN4 )
	{
		layerObj.clip.top    = t ;
		layerObj.clip.right  = r ;
		layerObj.clip.bottom = b ;
		layerObj.clip.left   = l ;
	}
	else
	{
		layerObj.style.clip = "rect("+t+" "+r+" "+b+" "+l+")" ;
	}
}

function clipLayerBy( layerObj, t, r, b, l )
{
	var nextClipValue_top    = getClipValue( layerObj,'top'   ) + t ;
	var nextClipValue_right  = getClipValue( layerObj,'right' ) + r ;
	var nextClipValue_bottom = getClipValue( layerObj,'bottom') + b ;
	var nextClipValue_left   = getClipValue( layerObj,'left'  ) + l ;

	if ( NN4 )
	{
		layerObj.clip.top    = nextClipValue_top ;
		layerObj.clip.right  = nextClipValue_right ;
		layerObj.clip.bottom = nextClipValue_bottom ;
		layerObj.clip.left   = nextClipValue_left ;
	}
	else
	{
		layerObj.style.clip = "rect("+ nextClipValue_top    + "px "
										+ nextClipValue_right  + "px "
										+ nextClipValue_bottom + "px "
										+ nextClipValue_left   + "px)" ;
	}
}



function getWinSize( which )
{
	if ( which == "width" )
	{
		if ( NN4 || NN6 )
		{
			return window.innerWidth ;
		}
		else
		{
			return document.body.clientWidth ;
		}
	}
	if ( which == "height" )
	{
		if ( NN4 || NN6 )
		{
			return window.innerHeight ;
		}
		else
		{
			return document.body.clientHeight ;
		}
	}
}



function openWin( url, w, h, winName )
{
	var startWinX = ( screen.availWidth  - w ) / 2 ;
	var startWinY = ( screen.availHeight - h ) / 2 ;

	if ( arguments[4] == "no" )
		winOption = "directories=no,status=no,scrollbars=no,toolbar=no,location=no,menubar=no,resizable=yes,width=" + w + ",height=" + h + ",left=" + startWinX + ",top=" + startWinY ;

	if ( arguments[4] == "yes" )
		winOption = "directories=yes,status=yes,scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,width=" + w + ",height=" + h + ",left=" + startWinX + ",top=" + startWinY ;

	winName = window.open( url, winName, winOption ) ;
	winName.focus( ) ;
}



function delayWin( url, winOption )
{
	var submenu = window.open ( url, "subwin", winOption ) ;

	if ( closetime )
		setTimeout("submenu.close( );", closetime * 1000 ) ;
}

function openSubWin( url,w,h,st,sc,t,l,m,r,x,y,ct,delay )
{
	closetime	= ct ;

	var winOption = "status=" + st + ",toolbar=" + t + ",location=" + l + ",menubar=" + m + ",scrollbars=" + sc + ",resizable=" + r + ",left=" + x + ",top=" + y + ",width=" + w + ",height=" + h ;

	setTimeout("delayWin( '" +url+ "','" +winOption+ "' )", delay * 1000 );
}





function intToHex( Integer )
{
	var hexValue = Integer.toString( 16 ) ;

	if ( hexValue.length == 1 ) hexValue = "0"+hexValue ;

	return hexValue ;
}

function hexToInt( hex )
{
	return parseInt( hex, 16 ) ;
}





function viewSource( fileName )
{
	var file     = ( fileName ) ? fileName : location.href ;
	var filePath = 'view-source:' + file ;

	location.href = filePath ;
}





