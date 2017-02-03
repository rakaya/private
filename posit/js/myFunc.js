//JSHintでの警告回避
/*global location*/
/*jshint -W014, -W030, -W082*/
/**
queries ::トレース関数
@param  ::コンソールに書き出す文
@return ::no
*/
//--デバックフラグ変数
var DEBUG_MODE = true;
function trace(s) {
    if (DEBUG_MODE && this.console && typeof console.log != "undefined"){
        console.log(s);
    }
 }
/**
queries ::GETパラメータ獲得処理即時関数
@param
@return ::獲得パラメータ([対応文字:内容],....)
*/
var queries = (function(){
    var url = location.search.replace("?", "");//[htttp://www.~~/~]?[*=* &*=*]
    var query = {};
    var queries =  url.split('&');//[*=*,*=*]

    if(!url) {return null;}

    for(var i=0; i < queries.length; i ++) {
        var t = queries[i].split("=");
        query[t[0]] = t[1];
    }
    return query;
})();
/**
queryParameter ::GETパラメータ獲得確認処理関数
@param
key     ::Get取得時の対応ワード
def     ::デフォルト引数。nullの代わりに変える。
@return ::keyに対応したgetパラメータ
        ::null(対応なし時のreturn) or def
*/
var queryParameter = function(key,def) {
    def = arguments.length < 2 ? null : def;
    return (queries === null ? def : queries[key] ? queries[key] : def);
};
//$().trace('文字列');
//(function($) {
//    //--デバックフラグ変数
//    var DEBUG_MODE = true;
//    fn.trace = function(s) {
//        if (DEBUG_MODE && window.console && typeof console.log != "undefined"){
//            console.log(s);
//        }
//    };
//})(jQuery);
