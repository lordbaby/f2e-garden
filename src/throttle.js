/**
 * 函数节流 一开始先执行，后续每隔delay毫秒执行一次 适用于队列似的发送请求
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
/**
 * 函数节流 默认每隔delay秒执行一次，如果指定duration，则无视delay等待，直接执行
 */
export function throttle_V2 (fn, delay, duration) {
  var self = fn;
  var last_time;
  var timer;

  return function () {
    var ctx = this;
    var args = arguments;
    var cur_time = new Date()

    clearTimeout(timer)
    if (!last_time) {
      last_time = cur_time
    }
    if (duration && cur_time - last_time >= duration) {
      self.apply(ctx, args)
      last_time = cur_time
    }else {
      timer = setTimeout(function () {
        self.apply(ctx, args)
      }, delay | 500)
    }
  }
}

