// 来自 https://github.com/amfe/lib-flexible/blob/2.0/index.js
(function flexible(window, document) {
	var docEl = document.documentElement;
	// 获取当前显示设备的物理像素分辨率与CSS像素分辨率之比;
	var dpr = window.devicePixelRatio || 1;

	//根据分辨率调整全局字体大小
	function setBodyFontSize() {
		// html已完成加载，则立即调整字体大小，否则等待html加载完成再调整字体大小
		if (document.body) {
			document.body.style.fontSize = 12 * dpr + "px";
		} else {
			// 监听DOMContentLoaded 事件——当初始的 HTML 文档被完全加载和解析完成之后触发，无需等待样式表
			document.addEventListener("DOMContentLoaded", setBodyFontSize);
		}
	}
	setBodyFontSize();

	// 根据屏幕宽度，重置1px的长度为当前屏幕宽度的1/24
	function setpxUnit() {
		var px = docEl.clientWidth / 24;
		// 1px的值永远为根元素的字体大小，所以此处通过调整全局字体大小来重置px
		docEl.style.fontSize = px + "px";
	}

	setpxUnit();

	// 监听resize事件——屏幕大小发生变化时触发
	window.addEventListener("resize", setpxUnit);
	// 监听pageshow事件——显示页面时触发
	window.addEventListener("pageshow", function (e) {
		// 若是浏览器中点击后退时显示页面，则重置px
		if (e.persisted) {
			setpxUnit();
		}
	});

	// 检测是否支持0.5px
	if (dpr >= 2) {
		var fakeBody = document.createElement("body");
		var testElement = document.createElement("div");
		testElement.style.border = ".5px solid transparent";
		fakeBody.appendChild(testElement);
		docEl.appendChild(fakeBody);
		if (testElement.offsetHeight === 1) {
			docEl.classList.add("hairlines");
		}
		docEl.pxoveChild(fakeBody);
	}
})(window, document);
