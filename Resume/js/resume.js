	//	githubcursor
		window.onload=function(){
	var github=document.getElementById("github");
	var hand=document.querySelector(".worksdisplay .title #github .icon");
	github.onmousemove = function(e){
		var x=e.pageX-this.offsetLeft-15;
		var y = e.pageY-this.offsetTop-15;
		x = x<0?-10:x;
		y = y<0?-10:y;
				
		x = x>180?180:x;
		y = y>40?40:y;
				
		hand.style.left = x+'px';
		hand.style.top = y+'px';
	}
	
		//swiper

  var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      observer:true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });

		}





$(document).ready(function() {
//	eduarea
	$(".mainbody .title>img").hover(function(){
		$(this).removeClass();
		$(this).addClass("active1");
	},function(){
		$(this).addClass("active2");
	})
	
//works display
    $(".worksdisplay .btns .btn").click(function(){
    	var num=$(this).index();
    	$(this).addClass("activ4").siblings("button").removeClass("activ4")
    	$(".worksdisplay .worksbox>div").eq(num).show().siblings("div").hide()
    })
//jsbox
    var index=0;
    var images=$(".jsbox .banner1 ul li");
    var count=images.length
    for(var i=0;i<count;i++){
    	$(".points").append("<span>"+(i+1)+"</span>");
    }
    $(".points").css("margin-left",-15*count+"px").children().eq(0).addClass("active3");
    function showImage(i){
    	images.fadeOut(500);
    	images.eq(i).fadeIn(500);
    	$(".points span").removeClass("active3").eq(i).addClass("active3");
    }
      //下一页图片
      function swiper(){
      	index=(index+1)%count;
      	showImage(index);
      }
    //轮播定时器
    var t=setInterval(swiper,3000);
    //上一页
    $(".jsbox .prev").click(function(){
    	index=(index-1+count)%count;
    	showImage(index)
    })
    //下一页
    $(".jsbox .next").click(swiper);
    //鼠标悬停轮播暂停
    $(".banner1").hover(function(){
    	clearInterval(t);
    },function(){
    	t=setInterval(swiper,3000);
    })
    //分页点的hover事件
    $(".banner1 .points span").hover(function(){
    	var i=$(this).index();
    	$(this).addClass("active3").siblings("span").removeClass("active3");
		images.eq(i).fadeIn().siblings("li").fadeOut();
    })
})
	