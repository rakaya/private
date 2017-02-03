//覚え書きメモ(20170116)
//配列によるページャ機能。
//カレントを元に前後走査していき、移動量がなくなると終了、配列を返還する。
//内容を再度精査すること。
(function($) {
    $.fn.paging = function(options){
        //
        //デフォルト引数処理(プラグインの標準処理)
        //
        var o = $.extend({
            //--ページャ関連データ
            totalPage : 0, //総ページ数
            pagerMax  : 3,  //ページャー番号表示数
            //--article関連データ
            articleData: null,  //記事項目データ
            articleDisp: 3      //１ページの記事表示数宇
        },options);
        //
        //ページャー変数宣言
        //
        var $pager          = $(this);      //ページャ
        var $pagerNum       = null;              
        var currentIndex    = 0;            //現在のページ番号
        var totalPage       = o.totalPage;  //ページ総数
        var pagerMax        = o.pagerMax;   //表示ページ数。
        //
        //article変数
        var articleDisp = o.articleDisp;
        var articleData = o.articleData;
        //
        //
        //ページャーパーツ追加
        //
        //--[|<][<][…]追加
        $('<li class="first" />').text('|<').appendTo($pager);
        $('<li class="prev" />').text('<').appendTo($pager);
        $('<li class="ellipPrev" />').text('…').appendTo($pager);
        //--数字追加 
        for(var i=0;i<o.totalPage;i++){
            $('<li class="number"/>').text(i+1).appendTo($pager);
        }
        //--[…][>][>|]追加
        $('<li class="ellipNext" />').text('…').appendTo($pager);
        $('<li class="next" />').text('>').appendTo($pager);
        $('<li class="last" />').text('>|').appendTo($pager);
        //--番号liを取得.☝で追加しているので、場所がここでとなる。
        $pagerNum = $pager.find('.number');          
        //
        //ページャー初期配置処理（０番目)
        //
        //--番号非表示
        $pagerNum.hide();
        //--|<,<,…非表示。
        $pager.find('.first,.prev,.ellipPrev').hide();
        //--番号表示
        for(var i=0;i<pagerMax;i++){
            $($pagerNum[i]).show();
        }
        //--[…]ellipNextの表示判断
        if(totalPage - pagerMax < 1){
            $pager.find('.ellipNext').hide();
        }
        //--1番にカレントクラスを追加
        $($pagerNum[0]).addClass('current');
        //
        //クリック登録
        //
        //--最初、前へクリック処理
        $pager.find('.first,.prev').on('click', function(e){
            e.stopPropagation();//パブリング阻止
            trace($(this));
            if(currentIndex === 0){
                return false;
            }
            var current = ($(this).hasClass('first')) ? 0 : currentIndex - 1;
            change(current);
        });
        //--次へ、最後クリック処理
        $pager.find('.next,.last').on('click', function(e){
            e.stopPropagation();
            trace(this);
            if(currentIndex === totalPage - 1){
                return false;
            }
            var current = ($(this).hasClass('last')) ? totalPage - 1 : currentIndex + 1;
            change(current);
        });
        //--番号クリック
        $pagerNum.each(function(index){
            $(this).on('click',function(e){
                e.stopPropagation();
                trace(this);
                if($(this).hasClass('current')){
                    return false;
                }
                //--each回し、0開始で、そのまま使用。
                var current = index;
                change(current);
            });               
        });
        /**
        change  ::ページャ切り替え関数
        @param
        current ::切り替えページャ番号
        @return ::no
        */
        var change = function (current) {
            trace(current);
            //
            //ページャー初期化
            //
            //--ページャー項目をすべて表示。
            $pager.find('li').hide();
            //--ページャ番号hide 
            $pagerNum.hide();
            //--articleContainer部分削除(あとで追加)
            $('.articleContainer').remove();
            //
            //ページャ番号計算、表示(再帰関数入れる。)
            //   
            //--表示判断配列を取得
            var dispNumArray  = getDispNumArray(totalPage,pagerMax,current);
            //--配列を元に表示。 
            for(var i=0;i<totalPage;i++){
               if(dispNumArray[i]){
                   $($pagerNum[i]).show();
               }
            } 
            //
            //その他記号表示判断
            //
            //--[|<,<]の表示判断
            if(current !== 0){
                $pager.find('.prev,.first').show();
            }
            //--[>,>|]の表示判断
            if(current !== totalPage-1){
                $pager.find('.next,.last').show();
            }
            //--[…](Prev)の表示判断
            if(dispNumArray[0] === false){
                $pager.find('.ellipPrev').show();
            }
            //--[…](Prev)の表示判断
            if(dispNumArray[totalPage-1] === false){
                $pager.find('.ellipNext').show();
            }
            //
            //カレント情報更新
            //
            //--カレント番号更新
            currentIndex = current;
            //--カレントクラス削除
            $pagerNum.removeClass('current');
            //--カレントクラス追加
            $($pagerNum[current]).addClass('current');
            //
            //article更新処理
            //
            $('#blog').articleAdd({
                current     : current,
                articleData : articleData,
                articleDisp : articleDisp
            });
        };   
        /**
        getDispNumArray ::ページャ切り替え関数
        @param
        length  ::表示するページャーの長さ
        disp    ::表示するページャー番号の数
        pso     ::ページャのポジション
        @return ::再帰関数で計算した表示有無配列
        */
        var getDispNumArray = function(length,disp,pos){
            //--長さ文の配列を確保 
            var array = new Array(totalPage);
            //--初期化
            for(var i=0;i<totalPage;i++){
                array[i] = false;
            }
            //--dipsが一の場合当該箇所のみtrue
            if(disp === 1){
                array[pos] = true;
            }
            //--上記以外は計算
            else{
                recCall(array,disp,pos,1);
            }
            return array;
        };
        /**
        recCall ::再帰計算によるページャ番号割り出し関数
        @param
        array   ::結果を格納する配列
        disp    ::表示するページャー番号の数
        pos     ::ページャのポジション
        slide   ::posからの検査位置スライド量
        @return ::no
        */
        var recCall = function(array,disp,pos,slide){            
            var cnt = 2;
            var s = slide;
            while(cnt--){
                s = -s;
                if(array[pos+s] === false){
                    array[pos+s] = true;
                    disp--;
                }   
                if(disp === 1){
                    array[pos] = true;
                    return;
                }
            }
            recCall(array,disp,pos,slide+1);
        };
        return (this);
    };
})(jQuery);