//JSHintでの警告回避
/*global $,window,document*/
/*jshint -W014, -W030, -W082,-W117*/
/**
ready   ::dom読み込み完了時呼び出されるjQueryメソッド
@param  ::no
@return ::no
*/
window.jQuery(document).ready(function () {   
    //const
    var MAX_DISP = 3;   //最大記事表示数
    //--json読込
    $.getJSON('../json/topic.json', function(data){
        //
        //article追加処理
        //
        $('#topic').addTopic({
            current     : 0,
            topicData : data,
            topicDisp : MAX_DISP
        });
    })
    //--取得失敗時の処理
    .fail(function(){
        alert('json取得失敗。');
    });   
});