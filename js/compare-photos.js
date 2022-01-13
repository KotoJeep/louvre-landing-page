let sliderAlreadyAdded = false;
let slider;

function initComparisons() {
	const x = document.getElementsByClassName('compare-photos__photo_overlay'),
		y = document.getElementsByClassName('compare-photos__photo-down');
	compareImages(x[0], y[0]);

	function compareImages(img, imgDown) {
		var img,
			imgDown,
			clicked = 0,
			w,
			h;

		w = imgDown.offsetWidth;
		h = img.offsetHeight;

		img.style.width = w / 1.6363 + 'px';
		if (!sliderAlreadyAdded) {
			slider = document.createElement('div');
			slider.setAttribute('class', 'compare-photos__slider');
			img.parentElement.insertBefore(slider, img);
			sliderAlreadyAdded = true;
		}

		slider.style.top = 0 + 'px';
		slider.style.left = w / 1.6363 - slider.offsetWidth / 2 + 'px';

		slider.addEventListener('mousedown', slideReady);
		window.addEventListener('mouseup', slideFinish);
		slider.addEventListener('touchstart', slideReady);
		window.addEventListener('touchstop', slideFinish);

		function slideReady(e) {
			e.preventDefault();
			clicked = 1;
			window.addEventListener('mousemove', slideMove);
			window.addEventListener('touchmove', slideMove);
		}
		function slideFinish() {
			clicked = 0;
		}
		function slideMove(e) {
			var pos;
			if (clicked == 0) return false;
			pos = getCursorPos(e);
			if (pos < 0) pos = 0;
			if (pos > w) pos = w;
			slide(pos);
		}
		function getCursorPos(e) {
			var a,
				x = 0;
			e = e || window.event;
			a = img.getBoundingClientRect();
			x = e.pageX - a.left;
			x = x - window.pageXOffset;
			return x;
		}
		function slide(x) {
			img.style.width = x + 'px';
			slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
		}
	}
}

window.addEventListener('resize', initComparisons);

initComparisons();
