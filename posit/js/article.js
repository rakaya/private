//JSHintでの警告回避
/*global $,window,document*/
/*jshint -W014, -W030, -W082,-W117,-W018*/
/**
ready   ::dom読み込み完了時呼び出されるjQueryメソッド
@param  ::no
@return ::no
*/
window.jQuery(document).ready(function () {
    //
    //該当ファイル設定
    //
    var NO = "no";                                //対応getパラメータ
    var num = queryParameter(NO,1);               //Getパラメータ取得
    var jsonUrl = '../json/article_'+num+'.json'; //jsonファイル
    //--json読込
    $.getJSON(jsonUrl, function(data){
//        trace(data);
        //
        //変数初期化
        //
        var head = data.head;
        var body = data.body;
        //
        //ブログ、先頭設定
        //
        //--タイトル設定
        $("#blog-title").text(head.title);  
        //--日付、時間設定 
        $("#article-info time")        
        .attr({datatime:data.head.time})
        .text(head.days);
        //--メイン画像設定
        $("#main-image img")
        .attr({
            src:head.img.src,
            width:head.img.width,
            height:head.img.height
        });
        trace(body);
        //
        //ブログ、本体設定。
        //
        var articleBody = $("#article-body");
        var tmp;
        //--追加要素分繰り返す。
        $.each(body,function(index,obj){
//            trace(obj.abc);
            //--h2タグ追加設定
            if(!(obj.h2 === undefined)){
//                trace(obj.h2);
                tmp = $("<h2/>").text(obj.h2);
                articleBody.append(tmp);
            }
            //--text追加設定
            else if(!(obj.text === undefined)){
//                trace(obj.text);
                tmp = $("<p/>").html(obj.text);
                articleBody.append(tmp);
            }
            //--h3タグ追加設定
            else if(!(obj.h3 === undefined)){
//                trace(obj.h3);
                tmp = $("<h3/>").text(obj.h3);
                articleBody.append(tmp);
            }
            //--imgタグ追加設定
            else if(!(obj.img === undefined)){
                var imgDate = obj.img;
//                trace(obj.img);                
                tmp = $("<img>")
                .attr({
                    alt:"画像",
                    src:imgDate.src,
                    width:imgDate.width,
                    height:imgDate.height
                });
                articleBody.append($("<p/>").append(tmp));
            }
        });
    })
    //--取得失敗時の処理
        .fail(function(){
        alert('json取得失敗。');
    });
});