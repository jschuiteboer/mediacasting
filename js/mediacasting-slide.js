var animations = {
	slideFromLeft: {
		before: { 'left': '-100%' },
		after:  { 'left': 0 },
	},
	
	slideFromRight: {
		before: { 'left': '100%' },
		after:  { 'left': 0 },
	},
	
	slideFromTop: {
		before: { 'top': '-100%' },
		after:  { 'top': 0 },
	},
	
	slideFromBottom: {
		before: { 'top': '100%' },
		after:  { 'top': 0 },
	},
	
	fadeIn: {
		before: { 'opacity': 0 },
		after:  { 'opacity': 1 },
	},
}

jQuery.fn.slide = function(args) {
	var waitTime = args.waitTime;
	if(!waitTime) waitTime = 5000;
	
	var animationTime = args.animationTime;
	if(!animationTime) animationTime = 2000;
	
	var animation = args.animation;
	if(!animation) animation = animations.slideFromLeft;
	
	if(animationTime > waitTime) animationTime = waitTime;
	
	animation.prototype = {
		before: {},
		after: {},
		easing: 'easeInOutQuart',
	};
	
	var slides = $(this).children();
	var currentSlide = slides.last();
	
	var nextSlide = function() {
		currentSlide = (currentSlide.next().length > 0) ? currentSlide.next() : slides.first();
		
		return currentSlide;
	};
	
	var animateSlide = function() {
		// reset all slides to the back
		slides.css('z-index', -1);
		
		// move previous slide to the middle
		currentSlide.css('z-index', 0);
		
		// set state for next slide
		nextSlide();
		
		// move the current slide to the front
		currentSlide.css('z-index', 1);
		
		// do the animation
		currentSlide.css(animation.before);
		currentSlide.animate(animation.after, animationTime, animation.easing);
		
		// get the timeout from the slide-duration attribute or waitTime
		timeout = currentSlide.attr('slide-waitTime');
		if(!timeout) timeout = waitTime;
		
		// loop
		setTimeout(animateSlide, timeout);
	}
	
	// init all slides with the before style
	slides.css(animation.before);
	
	animateSlide();
};