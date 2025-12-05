var current_slide=0;
var interval=null;
var slides=document.querySelectorAll(".carousel_slide");
var indicators=document.querySelectorAll(".indicator");

function go_to_slide(index){
    slides.forEach(slide=>{
		slide.classList.remove("active");
	});

	indicators.forEach(indicator=>{
		indicator.classList.remove("active");
	});

	current_slide=index;
	slides[current_slide].classList.add("active");
	indicators[current_slide].classList.add("active");
}

function next_slide(){
	var next=(current_slide+1)%slides.length;
	go_to_slide(next);
}

function start_autoplay(){
	if(interval){
		clearInterval(interval);
	}
	interval=setInterval(next_slide,5000);
}

function stop_autoplay(){
	if(interval){
		clearInterval(interval);
		interval=null;
	}
}

document.addEventListener("DOMContentLoaded",()=>{
	start_autoplay();

	var carousel=document.querySelector(".hero_carousel");
	if(carousel){
		carousel.addEventListener("mouseenter",stop_autoplay);
		carousel.addEventListener("mouseleave",start_autoplay);
	}
});