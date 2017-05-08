/**
 * 函数节流
 */
export function throttle (fn, delay) {
  var self = fn;
  var timer;
  var fisrt = true;

  return function () {
    var args = arguments;
    var me = this;
    if (fisrt) {
      self.apply(me, args)
      return fisrt = false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      self.apply(me, args)
    }, delay || 500)
  }
}
