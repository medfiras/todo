
(function($) {
	$(document).ready(function(e) {
				
		$("#da-ex-datepicker, #da-ex-datepicker-inline").datepicker({showOtherMonths:true});
		
		$("#da-ex-datepicker-week").datepicker({showOtherMonths:true, showWeek: true});
		
		$("#da-ex-datepicker-months").datepicker({showOtherMonths:true, numberOfMonths: 3});
		
		$("#da-ex-datetimepicker").datetimepicker();
		
		$("#da-ex-timepicker").timepicker({});
		
					
	});
}) (jQuery);