var selected_date = get_current_date();
var selected_menu = "";
$(function() {
	selected_menu = $("#calendar_list li")[0].id;
	init_calendar();
	click_calendars();
	get_events();
	hide_loader();
});

function get_current_date() {
	var currentDate = new Date();
	var year  = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1;
	var day   = currentDate.getDate() ;
	return  year + "-" + month + "-" + day;
}

function init_calendar() {	
  	// Handler for .ready() called.
	$('#calendar').datepicker({
	    daysOfWeekDisabled: "0,6",
	    //daysOfWeekHighlighted: "1,2,3,4,5",
		format: "yyyy-mm-dd",
		todayHighlight: true
	}).on("changeDate", function(e) {		        
        selected_date = e.format(0,"yyyy-mm-dd");   
        console.log(selected_date);
        console.log(selected_menu); 
		get_events();
    });
}

function show_loader() {
	$("#fade").show();
	$("#modal").show();
}

function hide_loader() {
	$("#fade").hide();
	$("#modal").hide();
}

function click_calendars(){
	$("#calendar_list").on('click', 'li', function() {
	    $("#current-calendar").text($(this).text());
	    $('#calendar_list li.active').removeClass('active');
	    $(this).addClass('active');
		selected_menu = $(this).attr("id");
		get_events();
	});
}

function get_events(){
	show_loader();  	
  	var data_url = "example-data.txt";
  	$.post( data_url, { date: selected_date, menu_id: selected_menu })
	  .done(function( data ) {
	    var cards = JSON.parse(data);
    	render_cards(cards);
	  });
	hide_loader();
}

function render_cards(cards) {
	var targetContainer = $(".events-container"),
    template = $("#messages-template").html();

	var html = Mustache.to_html(template, cards);

	$(targetContainer).html(html);
}