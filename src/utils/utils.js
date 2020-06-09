import { encode } from 'iconv-lite';

const base64 = require('js-base64').Base64;
export default {
  /**
   * 格式化时间
   *
   * @param {time} 时间
   * @param {cFormat} 格式
   * @return {String} 字符串
   *
   * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
   */
  formatTime(time, cFormat) {
    if (arguments.length === 0) return null
    if ((time + '').length === 10) {
      time = +time * 1000
    }
    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
    if (typeof time === 'object') {
      date = time
    } else {
      date = new Date(time)
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      var value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },

  /*判断一个元素是否在数组或字符串中*/
  contains(ele, val) {
    return ele.indexOf(val) != -1 ? true : false;
  },

  /*获取全部url参数,并转换成json对象*/
  getUrlAllParams(url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
      _arrS = _pa.split('&'),
      _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
      var pos = _arrS[i].indexOf('=');
      if (pos == -1) {
        continue;
      }
      var name = _arrS[i].substring(0, pos),
        value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
      _rs[name] = value;
    }
    return _rs;
  },

  /**
   * base64加密解密
   */
  encode(val) {
    return base64.encode(val);
  },

  decode(val) {
    return base64.decode(val);
  }
}