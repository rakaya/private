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
        /*
        // 
        //変数初期化 
        //
        var pageLength = data.length;       //記事数
        //
        //ページング変数初期化
        //
        var limit = Math.ceil(pageLength/MAX_DISP);     //ページ数
        var disp  = 3;                                  //ページャ数字表示数
        //
        //ページャー処理(ページ数少ないのでしばらく停止)
        //
        $("#pager").paging({
            totalPage:limit,
            pagerMax :disp,
            articleData:data,
            articleDisp:MAX_DISP
        });
        */
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