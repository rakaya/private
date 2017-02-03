//JSHintでの警告回避
/*global $,window,document*/
/*jshint -W014, -W030, -W082,-W117*/
/**
ready   ::dom読み込み完了時呼び出されるjQueryメソッド
@param  ::no
@return ::no
*/
window.jQuery(document).ready(function () {   
    //--スプライト読み込み
    $.get('../img/sprite0202.svg', function(data){
        //
        //svgスプライト追加処理
        //
        $('body').prepend($(data).find('svg'));
    })
    //--取得失敗時の処理
        .fail(function(){
        alert('test取得失敗。');
    });
    //--ヘッダー読み込み    
    $.get('header.html', function(data){
        //
        //header追加処理
        //
        $('header').html(data);
    })
    //--取得失敗時の処理
        .fail(function(){
        alert('header取得失敗。');
    });
    //--フッター読み込み    
    $.get('footer.html', function(data){
        //
        //footer追加処理
        //
        $('footer').html(data);
    })
    //--取得失敗時の処理
        .fail(function(){
        alert('footer取得失敗。');
    });   
});