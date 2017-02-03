(function($) {
    //
    //変数
    //
    var MaxDisp = 3;
    /**
    TEMPLETE::挿入するhtml
    */
    /*
    var TEMPLETE = '' +
        '<div class="articleContainer">' +
        '<div class="article clearfix">' +
        '<div class="articleDate">' +
        '<time datetime="{time}">{days}</time>' +
        '</div>'+
        '<div class="articleRight">' +
        '<h2 class="articleTitle">' +
        '<a href="{link}" title="{title}">{title}</a>' +
        '</h2>' +
        '<a href="{link}" title="{title}" class="articleSentence">' +
        '<p>{sentence1}</p>' +
        '<p>{sentence2}</p>' +
        '<p>{sentence3}</p>' +
        '<p>{sentence4}</p>' +
        '<p>{sentence5}</p>' +
        '</a>' +
        '<div class="articleRead">' +
        '<a href="{link}" title= "{title}">' +
        '<img src="{readSrc}" alt="readmore">' +
        '</a>' +
        '</div>' +
        '</div>' +
        '<div class="articleLeft">' +
        '<div class="articleImage">' +
        '<a href="{link}" title="{title}">' +
        '<img src="{thumbSrc}" alt="サムネ画像">' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    */
    //
    //メソッド
    //
    $.fn.addTopic = function(options){
        //
        //デフォルト引数処理(プラグインの標準処理)
        //
        var o = $.extend({
            current     : 0,
            topicData : null,     //記事項目データ
            topicDisp : MaxDisp   //１ページの記事表示数宇
        },options);
        //
        //変数宣言
        //
        var $this     = $(this);           //blogタグ
        var current   = o.current;        //現在のページ数
        var topicData = o.topicData;    //articleデータ
        var topicDisp = o.topicDisp;    //article表示数
//        var json = JSON.parse(topicData);
        if(topicDisp > topicData.length){
            topicDisp = topicData.length;
        }
        $.when(
            $.get("../txt/temp.txt")
        )
        .done(function(data){
            var tmp = data;
            //
            //表示
            //
            for(var i=0;i<topicDisp;i++){
                var index = (current * topicDisp) + i;
                if(topicData[index] !== undefined){
                    $($this).append(sprintf(tmp,topicData[index]));
                }
            }    
        }).
        fail(function(){
            alert('text取得失敗。');
        });           
    };
    /**
    sprintf ::文字列変換関数
    @param
    str     ::検索対象文字列
    format  ::変換文字列分
    @return ::変換後の文字列
    //--replace引数特別メモ
    all(マッチした文字列全体{time}など)
    group(()グループ化指定文字列が順に入る)
    */
    var sprintf = function(str, format){
        //--文字列(参照渡し)、TEMP上書きなし。そもそもreplaceがコピー返しなので、問題なし。
        return str.replace(/{([a-z][a-zA-Z0-9]+)}/g, function(all, group){
            return format[group];
        });
    };    
})(jQuery);

/*
//::決まり文句
[]::括弧内の1文字
+ ::1回イオ上の繰り返し
g ::繰り返し操作を実行する。
*/