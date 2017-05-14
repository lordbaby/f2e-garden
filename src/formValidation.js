//策略模式，模拟表单验证


/*************************策略对象******************************/
var strategies = {
	isNotEmpty: function(val, errorMsg) {
		if (val == '') {
			return errorMsg;
		}
	},
	minLength: function (val, length, errorMsg) {
		if (val.length < length) {
			return errorMsg;
		}
	},
	isMobile: function(val, errorMsg) {
		if (!/^1[3|5|7|8][0-9]{d}$/.test(val)) {
			return errorMsg;
		}
	}
}

/**************************验证类********************************/
var Validator = function () {
	this.cache = [];
}

//将验证策略函数 添加到cache数组
Validator.prototype.add = function(dom, rules) {
	var self = this;
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		(function(rule) {
			var strategArr = rule.strategy.split(':');
			var errorMsg = rule.errorMsg;
			self.cache.push(function() {
				var strategy = strategArr.shift();
				strategArr.unshift(dom.value);
				strategArr.push(errorMsg);
				return strategies[strategy].apply(dom, strategArr)
			})
		})(rule)
	}
};
//批量执行验证函数
Validator.prototype.start = function() {
	for (var i = 0; i < this.cache.length; i++) {
		var fn = this.cache[i]
		var errorMsg = fn();
		if (errorMsg) {
			return errorMsg;
		}
	}
};


/************************客户端代码********************************/
var form = document.getElementById('registerForm');

//表单验证函数
var validateFunc = function() {
	var validator = new Validator();

	validator.add(form.username, [{
		strategy: 'isNotEmpty',
		errorMsg: '用户名不能为空'
	}, {
		strategy: 'minLength:6',
		errorMsg: '用户名长度不能小于6位'
	}]);
	validator.add(form.password, [{
		strategy: 'minLength:8',
		errorMsg: '密码长度不能小于8位'
	}]);
	validator.add(form.phone, [{
		strategy: 'isMobile',
		errorMsg: '手机号码格式不正确'
	}])

	var errorMsg = validator.start();

	return errorMsg;
}


form.onsubmit = function() {
	var errorMsg = validateFunc()
	if (errorMsg) {
		alert(errorMsg)
		return false;
	}
}
//1 .
