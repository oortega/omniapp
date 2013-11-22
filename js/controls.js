/***********************************************
*	Creación: Martes 12 de Junio de 2012 5:57 pm
*	Termino: 
*	Autor: Julian Tun
*	Actualización: Alan Orlaineta 03 de Julio de 2013
************************************************/
/*VARIABLES*/
var MsjAirport,altMsjAirport,altMsjAirportr,altMsjDate,NFOrigen,NFDestino,PosadaAllIclusive,FalseHotel,FormatO,MsjAllInclusive,MsjHotel,Msj45Days,MsjMinTimeCar,MsjMaxTimeCar,IDioMA,MsjDestinO = {};
var cachePQ = {};
var cacheDH = {};
var cacheD = {};
var cacheT = {};
/*FUNCIONES*/
function DefVar(obj)
{
	if(jQuery(obj+" input[name=ln]").val().toUpperCase()=="ESP")
	{
		MsjDestinO="Especifique una ciudad";
		AltMsjDestinO="Por favor especifique una ciudad";
		MsjAirport="Escriba el nombre de la ciudad";
		altMsjAirport="Por favor seleccione un aeropuerto de origen.";
		altMsjAirportr="Por favor seleccione un aeropuerto de llegada.";
		altMsjDate="Debe Seleccionar una";
		NFOrigen="Por favor seleccione un aeropuerto de origen.";
		NFDestino="Por favor seleccione un aeropuerto de destino."
		PosadaAllIclusive="Puede seleccionar como m\u00E1ximo 4 personas por habitaci\u00F3n.";
		FormatO="dd/mm/yyyy";
		FormatDatejs="dd/MM/yyyy";
		MsjAllInclusive="M\u00E1ximo 4 personas por habitaci\u00F3n, incluyendo ni\u00F1os.";
		FalseHotel="Nombre del hotel";
		MsjHotel="Especifique un hotel por favor.";
		Msj45Days="No se pueden reservar m\u00E1s de 45 d\u00edas.";
		
		MsjMaxPeoplePack="El n\u00famero m\u00e1ximo permitido por reservaci\u00f3n es de 8 personas, por favor corrija e intente nuevamente su b\u00fasqueda";
		IDioMA="esp";
	}
	
}
//Función de cambio de pestaña
function CambiaPestanas(objeto,clase,contenedores){
	jQuery(objeto).click(function(){
		jQuery(objeto).removeClass(clase);
		jQuery(this).addClass(clase);
		jQuery(contenedores).hide();
		jQuery(contenedores+":nth-child("+(jQuery(this).index()+1)+")").show();
	});
}


//validación de Fechas
function onSelectDate() {
	var formId=jQuery(this).parents("form").attr('id');
	var dtClass=jQuery(this).attr('class');
	var dateFromInput=jQuery("#"+formId+" .EtDateFromGN");
	var dateToInput=jQuery("#"+formId+" .EtDateToGN");
	var dateFrom = Date.parseExact( dateFromInput.val(), FormatDatejs);
	var dateTo = Date.parseExact(dateToInput.val(), FormatDatejs);
	var	fromPicker = dateFromInput.pickadate('picker');
	var toPicker = dateToInput.pickadate('picker');

//ESTA SECCIÓN IDENTIFICA A QUE CALENDARIO SE LE DA CLICK
	if (dtClass.indexOf('EtDateFromGN')>=0){
		var date = dateFrom.add({days: 1}); 
		if (dateFrom>=dateTo) {
			dateToInput.val(date.toString(FormatDatejs));
			toPicker.stop();
			toPicker.start();
		}
	}
	else
	{
		var date = dateTo.add({days: -1}); 
		if (dateTo<=dateFrom) {
			dateFromInput.val(date.toString(FormatDatejs));
			fromPicker.stop();
			fromPicker.start();
		}
	}
}
//Fechas default
function DefaultDate()
{
	//Fechas Default en Calendarios
	defaultDate = new Date();		// La fecha actual
	defaultDate = defaultDate.add({days: 7});		// Le suma 7 días
	jQuery(".EtDateFromGN").val(defaultDate.toString(FormatDatejs));		//	Asigna la hora default FROM
	defaultDate = defaultDate.add({days: 1});		// Le suma 1 día
	jQuery(".EtDateToGN").val(defaultDate.toString(FormatDatejs));		// Asigna la hora default TO
}
//Modificar el foco
function changeFocus(obj,text)
{
	jQuery(obj).focus(function(){
		if(jQuery(this).val()==text)
		{
			jQuery(this).val("");
		}
		jQuery(this).blur(function(){
			if(jQuery(this).val()=="")
			{
				jQuery(this).val(text);
			}
		}); 
	});
}
//reinicia edad de los niños
function restarAge(cuarto,suf)
{
	jQuery("#Room"+suf+cuarto+' select[name=ch'+cuarto+']').val(0);
	jQuery("#Room"+suf+cuarto+' span.childs').text(0);


	jQuery("#Age"+suf+cuarto).hide();
	jQuery("#Age"+suf+cuarto+' select').val(0);
	jQuery("#Age"+suf+cuarto+' span').text(0);

	jQuery("#Et"+suf+"NumAges"+cuarto).val("0,0,0");
	if(jQuery("#Room"+suf+'1 select[name=ch1]').val()==0&&jQuery("#Room"+suf+'2 select[name=ch2]').val()==0&&jQuery("#Room"+suf+'3 select[name=ch3]').val()==0){
		jQuery("#Age"+suf+"C").hide();
	}
}
//Reinicia configuración de cuartos
function restartRoom(forma,cuarto,suf)
{
	jQuery("#Room"+suf+cuarto).hide();
	restarAge(cuarto,suf);
}
//muestra cuartos
function showRoom(forma,cuarto,suf)
{
	jQuery("#Room"+suf+cuarto).show();
}
//Funcion cambio cuartos
function changeRoom(forma,suf){
	if(jQuery(forma+ ' .rm').val()==1)
	{
		showRoom(forma,1,suf);
		restartRoom(forma,2,suf);
		restartRoom(forma,3,suf);
	}
	if(jQuery(forma+ ' .rm').val()==2)
	{
		showRoom(forma,1,suf);
		showRoom(forma,2,suf);
		restartRoom(forma,3,suf);
	}
	if(jQuery(forma+ ' .rm').val()==3)
	{
		showRoom(forma,1,suf);
		showRoom(forma,2,suf);
		showRoom(forma,3,suf);
	}
}

//Validar Fechas
function restrict45Days(forma) {
	var dateFrom = Date.parseExact($('#'+forma+' .EtDateFromGN').val(),FormatDatejs);
	var dateTo = Date.parseExact($('#'+forma+' .EtDateToGN').val(),FormatDatejs);
	var daysDiff = parseInt((dateTo.getTime()-dateFrom.getTime())/(24*3600*1000));
	if( daysDiff > 44 )
	{
		alert(Msj45Days);
		return(false);
	}			
}

function restrictPack8People() {
	var rooms = parseInt($("#formapackage .rm").val());
	var ad1 = parseInt($("#formapackage select[name=ad1]").val());
	var ad2 = parseInt($("#formapackage select[name=ad2]").val());
	var ad3 = parseInt($("#formapackage select[name=ad3]").val());
	var ch1 = parseInt($("#formapackage select[name=ch1]").val());
	var ch2 = parseInt($("#formapackage select[name=ch2]").val());
	var ch3 = parseInt($("#formapackage select[name=ch3]").val());
	var sum = ad1 + ch1;
	if ( rooms > 1 ) {sum += ad2 + ch2}
	if ( rooms > 2 ) {sum += ad3 + ch3}
	if ( sum > 8 )	{
		alert(MsjMaxPeoplePack);
		return false;
	}
}

function ValidateDate(forma){
	if(jQuery('#'+forma+' .EtDateFromGN').val()==""||jQuery('#'+forma+' .EtDateToGN').val()=="")
	{
		alert(altMsjDate);
		return(false);
	}
}
//Validar vuelos y paquetes
function ValidateFLPK(forma,objdestino){
	if(jQuery("#"+forma+ " input[name=no]").val()==""||jQuery("#"+forma+ " input[name=no]").val()==MsjAirport)
	{
		alert(altMsjAirport);
		return(false);
	}
	if(jQuery("#"+forma+ " input[name="+objdestino+"]").val()==""||jQuery("#"+forma+ " input[name="+objdestino+"]").val()==MsjAirport)
	{
		alert(altMsjAirportr);
		return(false);
	}
	if(ValidateDate(forma)==false){ return(false); }
}
//Valida hotel
function ValidateHotel(forma,objdest,msjobjdest,altmsjobjdest){
	if(jQuery('#'+objdest).val()==''||jQuery('#'+objdest).val()==msjobjdest)
	{
		alert(altmsjobjdest);
		return(false);
	}
	if(ValidateDate(forma)==false){ return(false); }
}
/*ACCIONES*/
jQuery(document).ready(function(){
// Config generales
	DefVar("#formahotel");
	DefaultDate();
	CambiaPestanas('.etWContainer .etWtabs a','active','.etWContainer .etWforms .form');
//	NewControlsCalendar('.cal');
	//Modificar el foco
	changeFocus("#EtDestinyHtl",MsjDestinO);
	changeFocus("#EtHotel",FalseHotel);
	changeFocus("#EtCityOrig,#EtDestinyPkl",MsjAirport);
// Config de form hoteles
	jQuery('#formahotel').submit(function(){ return(ValidateHotel('formahotel','EtDestinyHtl',MsjDestinO,AltMsjDestinO)); });		
	jQuery('#formahotel').submit(function(){ return(restrict45Days('formahotel')); });	
	jQuery("#formahotel .rm").change(function(){changeRoom('#formahotel','')});
	//Calendarios
	jQuery("#formahotel .EtDateFromGN").pickadate({
		today: '',
		clear: '',
		format: FormatO,
		min: true,
		max: 365,
	});
	jQuery("#formahotel .EtDateToGN").pickadate({
		today: '',
		clear: '',
		format: FormatO,
		min: 1,
		max: 366,
	});	
	jQuery("#formahotel .EtDateFromGN").change(onSelectDate);
	jQuery("#formahotel .EtDateToGN").change(onSelectDate);
	
// Config de form paquetes
	jQuery("#formapackage").submit(function(){ return(ValidateFLPK('formapackage','dn')); });		
	jQuery("#formapackage").submit(function(){ return(restrict45Days('formapackage')); });	
	jQuery("#formapackage").submit(function(){ return(restrictPack8People()); });	
	jQuery("#formapackage .rm").change(function(){changeRoom('#formapackage','Pk')});



	jQuery("#EtCityOrig").autocomplete({
			minLength: 2,
			delay: 1000,
			source: function(request, response) {
				if (request.term in cachePQ) {
					response(cachePQ[request.term]);
					return;
				}
				jQuery.ajax({
					url: "http://partners.clickhotels.com/AJAX/AirportsJSONP?idioma="+IDioMA,
					dataType: "jsonp",
					data: request,
					success: function(data) {
						cachePQ[request.term] = data;
						response(data);
					}
				});
			},
			select: function(event, ui) {
				jQuery("#EtCityOrig").val(ui.item.desc);
				jQuery("#EtIATAob").val(ui.item.id);
				return false;
			}
		}).data("ui-autocomplete")._renderItem = function(ul, item) {
			return jQuery("<li></li>")
				.data("item.autocomplete", item)
				.append(jQuery("<a></a>, ").text(item.desc))
				.appendTo(ul);
		};
		

	//Calendarios
	jQuery("#formapackage .EtDateFromGN").pickadate({
		today: '',
		clear: '',
		format: FormatO,
		min: true,
		max: 365,
	});
	jQuery("#formapackage .EtDateToGN").pickadate({
		today: '',
		clear: '',
		format: FormatO,
		min: 1,
		max: 366,
	});	
	jQuery("#formapackage .EtDateFromGN").change(onSelectDate);
	jQuery("#formapackage .EtDateToGN").change(onSelectDate);

 

	jQuery(".etWContainer").find('select').change(function(){

		jQuery(this).next('span').html('').append(jQuery(this).find('option:selected').text());

		
	});
});