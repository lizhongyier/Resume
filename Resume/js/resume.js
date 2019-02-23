//	githubcursor
window.onload = function() {
	var github = document.getElementById("github");
	var hand = document.querySelector(".worksdisplay .title #github .icon");
	github.onmousemove = function(e) {
		var x = e.pageX - this.offsetLeft - 15;
		var y = e.pageY - this.offsetTop - 15;
		x = x < 0 ? -10 : x;
		y = y < 0 ? -10 : y;

		x = x > 180 ? 180 : x;
		y = y > 40 ? 40 : y;

		hand.style.left = x + 'px';
		hand.style.top = y + 'px';
	}

	//swiper

	var swiper = new Swiper('.swiper-container', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		loop: true,
		autoplay: 2000,
		coverflowEffect: {
			rotate: 50,
			stretch: 10,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		pagination: {
			el: '.swiper-pagination',
		},
	});

	//标签云

	var ball = document.querySelector(".ball");
	var tags = document.querySelectorAll(".ball a");
	var all = [];
	var RX = 0.1;
	var RY = 0.1;
	var startX = 0;
	var startY = 0;

	class tag {

		constructor(a, num, count, r) {
			this.a = a;
			this.r = r;
			// 计算角度
			let b = Math.acos(((2 * num) - 1) / count - 1);
			let c = b * Math.sqrt(count * Math.PI);

			// 坐标 x,y,z
			this.x = r * Math.sin(b) * Math.cos(c);
			this.y = r * Math.sin(b) * Math.sin(c);
			this.z = r * Math.cos(b);

			let R = Math.floor(Math.random() * 255);
			let G = Math.floor(Math.random() * 255)
			let B = Math.floor(Math.random() * 255)
			this.a.style.color = `rgb(${R},${G},${B})`
			this.setPosition(this.x, this.y, this.z)
		}
		setPosition(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.a.style.top = this.y + this.r - this.a.offsetHeight / 2 + "px";
			this.a.style.left = this.x + this.r - this.a.offsetWidth / 2 + "px";
			this.a.style.fontSize = ((this.z + this.r) / (2 * this.r) + 1) * 12 + "px"
			this.a.style.zIndex = Math.ceil(this.z)
		}

		rotateX(d) {
			let x1 = this.x;
			let z1 = this.y * Math.sin(Math.PI / 180 * d) + this.z * Math.cos(Math.PI / 180 * d);
			let y1 = this.y * Math.cos(Math.PI / 180 * d) - this.z * Math.sin(Math.PI / 180 * d);

			this.setPosition(x1, y1, z1)
		}
		rotateY(d) {
			let x1 = this.z * Math.sin(Math.PI / 180 * d) + this.x * Math.cos(Math.PI / 180 * d);
			let y1 = this.y;
			let z1 = this.z * Math.cos(Math.PI / 180 * d) - this.x * Math.sin(Math.PI / 180 * d);
			this.setPosition(x1, y1, z1)
		}
		rotateZ(d) {
			let x1 = this.x * Math.cos(d / 180 * Math.PI) - this.y * Math.sin(d / 180 * Math.PI)
			let y1 = this.x * Math.sin(d / 180 * Math.PI) + this.y * Math.cos(d / 180 * Math.PI)
			let z1 = this.z;
			this.setPosition(x1, y1, z1)
		}

	}

	for(let i = 0; i < tags.length; i++) {
		let a = new tag(tags[i], i + 1, tags.length, 300);
		all.push(a);
	}

	var t = setInterval(function() {
		for(let i = 0; i < all.length; i++) {
			all[i].rotateX(RX);
			all[i].rotateY(RY);
			all[i].rotateZ(0);
		}

	}, 50)

	ball.onmouseenter = function(e) {
		startX = e.clientX;
		startY = e.clientY;
	}
	ball.onmousemove = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		if(x > startX) {
			RY += 0.3
		} else {
			RY -= 0.3
		}
		if(y < startY) {
			RX += 0.3
		} else {
			RX -= 0.3
		}
		RX = RX > 1.5 ? 1.5 : RX;
		RY = RY > 1.5 ? 1.5 : RY;

		RX = RX < -1.5 ? -1.5 : RX;
		RY = RY < -1.5 ? -1.5 : RY;

		startX = x;
		startY = y;

	}

}

$(document).ready(function() {
	//	eduarea
	$(".mainbody .title>img").hover(function() {
		$(this).removeClass();
		$(this).addClass("active1");
	}, function() {
		$(this).addClass("active2");
	})

	//works display
	$(".worksdisplay .btns .btn").click(function() {
		var num = $(this).index();
		$(this).addClass("activ4").siblings("button").removeClass("activ4")
		$(".worksdisplay .worksbox>div").eq(num).show().siblings("div").hide()
	})
	//jsbox
	var index = 0;
	var images = $(".jsbox .banner1 ul li");
	var count = images.length
	for(var i = 0; i < count; i++) {
		$(".points").append("<span>" + (i + 1) + "</span>");
	}
	$(".points").css("margin-left", -15 * count + "px").children().eq(0).addClass("active3");

	function showImage(i) {
		images.fadeOut(500);
		images.eq(i).fadeIn(500);
		$(".points span").removeClass("active3").eq(i).addClass("active3");
	}
	//下一页图片
	function swiper() {
		index = (index + 1) % count;
		showImage(index);
	}
	//轮播定时器
	var t = setInterval(swiper, 3000);
	//上一页
	$(".jsbox .prev").click(function() {
		index = (index - 1 + count) % count;
		showImage(index)
	})
	//下一页
	$(".jsbox .next").click(swiper);
	//鼠标悬停轮播暂停
	$(".banner1").hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval(swiper, 3000);
	})
	//分页点的hover事件
	$(".banner1 .points span").hover(function() {
		var i = $(this).index();
		$(this).addClass("active3").siblings("span").removeClass("active3");
		images.eq(i).fadeIn().siblings("li").fadeOut();
	})
	$(".webmp").click(function() {
		$("#ups-banner").css("display", "block");
	})
	$(".btna").click(function() {
		$("#ups-banner").css("display", "none");

	})

	//others
	function aaa() {
		$(".here3").animate({
			left: "250px"
		}, 500, "easeInOutQuart", function() {
			console.log("动画完成");
			$(".here2").animate({
				left: "180px"
			}, 1000, "easeInOutQuart", function() {
				$(".here1").animate({
					left: "125px"
				}, 1200, "easeOutBounce", function() {
					$(".here3").css("left", 95 + "px");
					$(".here2").css("left", 40 + "px");
					$(".here1").css("left", 0);

				})
			})
		})
	};
	var q = setInterval(aaa, 3000);
	//lucky-box

	$(".rungo").click(function() {
		$(".luckbox").css("top", -99 + "px");
		$(".guess").css("background-image","url(img/guess.png)");
		$(".luckbox").show();
		$(".luckbox").text("");
		var r = Math.random() * 360
		$(".plate").rotate({
			// 起始角度
			angle: 0,
			// 目标角度
			animateTo: 1440 + r,
			// 动画时长
			duration: 6000 + 10 * r,
			// 动画效果
			easing: $.easing.easeOutBounce,
			// 回调函数
			callback: function() {
				if(r >= 0 && r <= 45) {
					$(".luckbox").animate({
						top: "210px"
					}, 1500, "easeOutBounce", function() {
						$(".guess").css("background-image","url(img/soga.png)");
						$(".luckbox").text("智");
						
					})
				} else if(r > 45 && r <= 135) {
					$(".luckbox").animate({
						top: "210px"
					}, 1500, "easeOutBounce", function() {
						$(".guess").css("background-image","url(img/soga.png)");
						$(".luckbox").text("健");
					})
				} else if(r > 135 && r <= 225) {
					$(".luckbox").animate({
						top: "210px"
					}, 1500, "easeOutBounce", function() {
						$(".guess").css("background-image","url(img/soga.png)");
						$(".luckbox").text("达");
					})
				} else if(r > 225 && r <= 315) {
					$(".luckbox").animate({
						top: "210px"
					}, 1500, "easeOutBounce", function() {
						$(".guess").css("background-image","url(img/soga.png)");
						$(".luckbox").text("俊");
					})
				} else if(r > 315 && r <= 360) {
					$(".luckbox").animate({
						top: "210px"
					}, 1500, "easeOutBounce", function() {
						$(".guess").css("background-image","url(img/soga.png)");
						$(".luckbox").text("智");
					})
				}
			},
			// 选中中心
			center: ['50%', '50%']
		});
	})

	//panel
	$(".panel1 .list1 dd").show();
	$(".panel1 .list2 dd").hide();
	$(".panel1 .list3 dd").hide();


	$(".panel1 dl dt").click(function() {
		if($(this).siblings("dd").is(":visible")) {
			$(this).siblings("dd").slideUp("slow");
			$(this).find(".imagee").attr("src", "img/panel/jia.png");
			$(this).css("border-radius", "10px");
			//	                $(this).parent("dl").siblings("dl").children("dd").slideUp("slow");
			$(this).parent("dl").siblings("dl").children("dt").css("border-radius", "10px ");
			$(this).parent("dl").siblings("dl").children("dt").find(".imagee").attr("src", "img/panel/jia.png");
		} else {
			$(this).siblings("dd").slideDown("slow");
			$(this).find(".imagee").attr("src", "img/panel/jian.png");
			$(this).css("border-radius", "10px 10px 0px 0px");
			$(this).parent("dl").siblings("dl").children("dd").slideUp("slow");
			$(this).parent("dl").siblings("dl").children("dt").css("border-radius", "10px");
			$(this).parent("dl").siblings("dl").children("dt").find(".imagee").attr("src", "img/panel/jia.png");

		}
	})
	//panel2
	$(".btnss b").eq(0).addClass("change");
				$(".box2 ul").eq(0).show().siblings("ul").hide();
				$(".btnss b").click(function(){
					num=$(this).index();
					$(this).addClass("change").siblings("b").removeClass("change");
					$(".box2 ul").eq(num).show().siblings("ul").hide();
				})


})