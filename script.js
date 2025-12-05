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
		}
	];
	
	carousels.forEach(carousel_config=>{
		var container=document.querySelector(carousel_config.container);
		if(!container) return;
		
		var slides=container.querySelectorAll("."+carousel_config.slide_class);
		var indicators=container.querySelectorAll("."+carousel_config.indicator_class);
		var current=0;
		var interval;
		
		if(slides.length===0) return;
		
		function show_slide(index){
			slides.forEach(slide=>slide.classList.remove("active"));
			indicators.forEach(indicator=>indicator.classList.remove("active"));
			
			current=index;
			slides[current].classList.add("active");
			if(indicators[current]) indicators[current].classList.add("active");
		}
		
		function next(){
			show_slide((current+1)%slides.length);
		}
		
		interval=setInterval(next,5000);
		
		container.addEventListener("mouseenter",()=>clearInterval(interval));
		container.addEventListener("mouseleave",()=>{
			clearInterval(interval);
			interval=setInterval(next,5000);
		});
		
		indicators.forEach((indicator,index)=>{
			indicator.addEventListener("click",()=>{
				show_slide(index);
				clearInterval(interval);
				interval=setInterval(next,5000);
			});
		});
	});
}

document.addEventListener("DOMContentLoaded",init_all_carousels);