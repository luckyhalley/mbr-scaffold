/**
 * 获取Url参数;
 * @param {String} key
 * @return {String}
 */
export function GetUrlParameter(key) {
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) { return r[2];}
    return null;
}

/**
 * COOKIE类
 */
export const Cookie = {
    /**
     * 获取Cookie项
     * @param {String} sKey Cookie键值
     * @return {String} 健值的Cookie值
     */
    getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    /**
     * 设置Cookie项
     * @param {String} sKey 键值
     * @param {String} sValue 值
     * @param {Number} vEnd 过期时间（秒）Infinity 永不过期，不设置则会话关闭后过期
     * @param {String} sPath 路径
     * @param {String} sDomain 域名
     * @param {Boolean} bSecure 是否只通过https传输
     * @return {Boolean} 是否操作成功
     */
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
                case String:
                sExpires = "; expires=" + vEnd;
                break;
                case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    /**
     * 移除Cookie项
     * @param {String} sKey 键值
     * @param {String} sPath 路径
     * @param {String} sDomain 域名
     * @return {Boolean} 是否操作成功
     */
    removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
    },
    /**
     * 是否存在Cookie项
     * @param {String} sKey 键值
     * @return {Boolean} 是否存在
     */
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    /**
     * 当前Cookie所有键值
     * @return {Array} Cookie键
     */
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
}