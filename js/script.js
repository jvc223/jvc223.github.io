/* script.js 
   Author: Joe Calabrese
   Date: Jan. 27, 2025
*/


$(document).ready(function(){ // begin document.ready block

	$(".joepic").click(function(){

		$(".statsbox").fadeToggle();
		console.log("buryme")
	});

	$(".user").click(function(){

		$(".statsbox").fadeToggle();
	});

	// $("#reel").waypoint(function(direction){

	// 	if (direction == "down"){
	// 		$('.reelvid').fadeTo("slow", 1);
	// 	}

	// 	if (direction == "up"){
	// 		$('.reelvid').fadeTo("slow", 0);
	// 	}


	// },{offset: 100});


	$(".card").mouseenter(function(){

		console.log("hoverrrr");

		$(this).find('.cardvid').get(0).play();

	});

	$(".card").mouseleave(function(){

		$(this).find(".cardvid").get(0).pause();
	});


}); //end document.ready block
