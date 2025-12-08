function init_all_carousels(){
	var carousels=[
		{
			container:".hero_carousel",
			slide_class:"carousel_slide",
			indicator_class:"indicator"
		},
		{
			container:".products_carousel_container",
			slide_class:"product_slide",
			indicator_class:"product_indicator"
		},
		{
			container:".categories_container",
			slide_class:"category_card",
			prev_btn:".categories_nav_prev",
			next_btn:".categories_nav_next"
		}
	];
	
	carousels.forEach(function(carousel_config){
		var container=document.querySelector(carousel_config.container);
		if(!container){
			return;
		}
		
		var slides=container.querySelectorAll("."+carousel_config.slide_class);
		var indicators=container.querySelectorAll("."+carousel_config.indicator_class);
		var prevBtn=carousel_config.prev_btn?container.querySelector(carousel_config.prev_btn):null;
		var nextBtn=carousel_config.next_btn?container.querySelector(carousel_config.next_btn):null;
		var current=0;
		var interval;
		
		if(slides.length===0){
			return;
		}
		
		function show_slide(index){
			slides.forEach(function(slide){
				slide.classList.remove("active");
			});
			indicators.forEach(function(indicator){
				indicator.classList.remove("active");
			});
			
			current=index;
			slides[current].classList.add("active");
			if(indicators[current]){
				indicators[current].classList.add("active");
			}
		}
		
		function next(){
			show_slide((current+1)%slides.length);
		}
		
		function prev(){
			show_slide((current-1+slides.length)%slides.length);
		}
		
		if(prevBtn&&nextBtn){
			prevBtn.addEventListener("click",function(){
				prev();
				reset_interval();
			});
			
			nextBtn.addEventListener("click",function(){
				next();
				reset_interval();
			});
		}
		
		if(indicators.length>0){
			interval=setInterval(next,5000);
			
			container.addEventListener("mouseenter",function(){
				clearInterval(interval);
			});
			
			container.addEventListener("mouseleave",function(){
				reset_interval();
			});
			
			indicators.forEach(function(indicator,index){
				indicator.addEventListener("click",function(){
					show_slide(index);
					reset_interval();
				});
			});
		}
		
		function reset_interval(){
			if(interval){
				clearInterval(interval);
			}
			interval=setInterval(next,5000);
		}
		
		show_slide(0);
	});
}

document.addEventListener("DOMContentLoaded",init_all_carousels);