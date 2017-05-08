export function formateDate(date, fmt) {
  date = new Date(date);
  if (/(y+)/.test(fmt)) {

    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o) {
    var reg = new RegExp(`(${k})`)
    if (reg.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ('' + o[k]).length === 1 ? padLeftZero(o[k], 2) : o[k] );
    }
  }

  return fmt;
}
/**
 * 给数字补零
 * @param 数字
 * @param 长度
 * @return 补零后的字符串
 */
function padLeftZero(str, len) {
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      str = '0' + str
    }
    return str.substring(str.length - len)
  }
}
