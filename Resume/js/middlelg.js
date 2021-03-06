var upsSwiper = new Swiper('.swiper-containera', {
	observer:true,
    observeParents:true,
	speed: 1000,
	longSwipes: false,
	loop: true,
	autoplay: {
		disableOnInteraction: false,
	},
	
	
	navigation: {
		nextEl: '.swiper-button-nexta',
		prevEl: '.swiper-button-preva',
	},
	pagination: {
		el: '.swiper-paginationa',
		clickable: true,
	},
	on: {
		autoplayStop: function() {
			this.$el.find(".ups-icon-videoplaya").addClass('stop-status');
		},
		autoplayStart: function() {
			this.$el.find(".ups-icon-videoplaya").removeClass('stop-status');
		},

	}
});

upsSwiper.$el.find(".ups-icon-videoplay").on('click', function() {
	if (upsSwiper.autoplay.running) {
		upsSwiper.autoplay.stop();
	} else {
		upsSwiper.autoplay.start();
	}
});

swiperHeight = upsSwiper.height

window.onscroll = function scroll() {
	if (window.pageYOffset / upsSwiper.height < 1) {
		scrollScale = window.pageYOffset / swiperHeight;
	} else {
		scrollScale = 1;
	}

	upsSwiper.slides.find(".img").transform('translateY(-' + 18 * scrollScale + '%)') //滚动一屏swiper高度则图片向上18%（范围0-40）

}