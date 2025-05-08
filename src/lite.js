// 定义并导出一个名为 clsx 的函数，用于合并多个 className 字符串
export function clsx() {
	// 初始化变量 i（循环索引），tmp（临时变量），str（最终拼接结果），len（参数个数）
	var i=0, tmp, str='', len=arguments.length;

	// 遍历所有传入的参数
	for (; i < len; i++) {

		// 将当前参数赋值给 tmp，并检查它是否为真值（非空字符串）
		if (tmp = arguments[i]) {

			// 检查当前参数是否为字符串类型
			if (typeof tmp === 'string') {
				// 如果 str 不为空，则在当前结果和新字符串之间加一个空格，然后再拼接当前字符串
				str += (str && ' ') + tmp;
			}
		}
	}

	// 返回拼接完成的 className 字符串
	return str;
}


// 默认导出 clsx 函数，以便可以直接导入使用
export default clsx;
