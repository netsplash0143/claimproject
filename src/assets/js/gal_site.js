$(document).ready(function(){

	var alterClass = function() {
    var ww = $(window).width();
    if (ww >= 768) {
    	$(".mob_contain_hide").addClass("container");
    	$(".mob_contain_hide").removeClass("container-fluid");

    	$(window).scroll(function(){
			if( $(this).scrollTop() > 143 ){
                $(".navbar-dark .navbar-brand").css("visibility","visible");
				$(".navbar").addClass("solid");
                $(".navbar").addClass("fixed-top");
			}
			else{
                $(".navbar-dark .navbar-brand").css("visibility","hidden");
				$(".navbar").removeClass("solid");
                $(".navbar").removeClass("fixed-top");
			}
		});
    }
    else if (ww <= 767) {
    	$(".mob_contain_hide").addClass("container-fluid");
        $(".mob_contain_hide").removeClass("container");

    	$(window).scroll(function(){
			if( $(this).scrollTop() >90 ){
                $(".navbar-dark .navbar-brand").css("visibility","visible");
				$(".navbar").addClass("solid");
                // $(".navbar").addClass("fixed-top");
			}
			else{
                $(".navbar-dark .navbar-brand").css("visibility","hidden");
				$(".navbar").removeClass("solid");
                // $(".navbar").removeClass("fixed-top");
			}
		});
    } 
    };
    $(window).resize(function(){
    alterClass();
    });
    //Fire it when the page first loads:
    alterClass();

	$(".carousel").swipe({

  	swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');

  	},
  	allowPageScroll:"vertical"

	});

	// $('.navbar-nav>li>a').click(function(){
    // $('html, body').animate({
    //     scrollTop: $( $(this).attr('href') ).offset().top
    // }, 1000);
    // return false;
	// }); 

     $(function() {
  
    //show new panel function
    function ShowNewPanel(theLink, theTab, thePane) {
    //activate new pane
    theTab.find('.tab-pane.active').fadeOut(200, function() {
        $(this).removeClass('active');
        $(thePane).fadeIn(200, function() {
            $(this).addClass('active');
          });
        });
        
        //activate new link
        theTab.find('.tab-nav li').removeClass('active');
        theTab.find('.tab-nav a[href="'+thePane+'"]').parent('li').addClass('active');
        }
      
        //Using Tab Links
        $('.tab .tab-nav ul li a, a.tab-anchor').on('click', function() {
            var $theLink = $(this);
            var $theTab = $theLink.closest('.tab');
            var $thePane = $theLink.attr('href');
            ShowNewPanel($theLink, $theTab, $thePane)
        });
      
      
    });

});