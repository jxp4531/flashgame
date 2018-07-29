Function getFlashControlVersion( i )

	' エラーが発生した場合にダイアログを表示させない
	on error resume next

	Dim flaControl, flaVersion

	flaVersion = 0

	' オブジェクトが存在したら True を返す
	' ※無い場合はエラーになる
	set flaControl = CreateObject( "ShockwaveFlash.ShockwaveFlash." + CStr( i ) )

	' オブジェクトが存在したらバージョンを取得する
	if ( IsObject( flaControl ) ) then
		flaVersion = flaControl.FlashVersion( )
		' MsgBox( flaVersion )
	end if

	getFlashControlVersion = flaVersion

End Function