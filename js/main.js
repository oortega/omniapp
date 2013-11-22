function geturlhotel(){
    var url = window.location.href.toLowerCase();
    url=url.split('/');
    url=url[url.length-1];
    if(url.indexOf('#')>0){ url=url.split('#'); url=url[0]; }
    if(url.indexOf('/')>0){ url=url.split('/'); url=url[0]; }
    if (url.indexOf('.html')>0){url=url.substring(0,url.indexOf('.html'));}
    return(url);
}
function RellenaSlide(nombre){
    var i=0,cslides='',imagen='',total=urls[nombre];
        for(i=1;i<=total;i++){
            imagen=nombre+'-'+i;
            cslides=cslides+'<div class="slides"  >	<img src="images/slide/'+imagen+'.jpg" alt="'+imagen+' Hotel Omni Cancun" title="'+imagen+' Hotel Omni Cancun" ></div>';
        }
        return(cslides);
    }

urls={
    habitaciones:4,
    restaurantes:3,
    actividades:2,
    spa:2,
    reuniones:3
}

    
jQuery(document).ready(function(){
    
	//jQuery(document).ready(function() {
	$("#navicon, #wrapperheader .menu li a").on('click',  function(e) {
	   
		//alert("hola");
		//e.preventDefault();
		if($(window).width()<701){
		$("#wrapperheader .menu").slideToggle();
		}
	});

	$("#reservar").on('click', function(e) {
		//alert("hola");
		e.preventDefault();
		$("#caja .etWContainer").slideToggle();
		$('body,html').stop(true,true).animate({
			scrollTop: $("#caja .etWContainer").offset().top
		},1000);
		 
	});
	jQuery("#phone").on('click',function(){

		window.location.href="tel:01-800-087-4451";
	});

   jQuery("#msi").fancybox({
            'width':640,
            'height':710,
            'autoScale':false,
            'transitionIn':'none',
            'transitionOut':'none',
            'type':'iframe'
        });

	urlslide=geturlhotel();
	$("#"+urlslide).addClass("activo");
	if((urlslide!="") && (urlslide!="index") && (urlslide!="contacto") ){ jQuery('#carousel .cycle-slideshow').html('').append(RellenaSlide(urlslide)); console.log("entro"); }

});