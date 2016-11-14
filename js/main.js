var currentDate = new Date();

$(function() {
	init_calendar();
	click_calendars();
});

function get_current_date() {
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
        console.log(e.format(0,"yyyy-mm-dd"));       
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
	});
}