$(function(){

	$(window).resize(function(){
		//$("svg").height($(window).height());
		//$("svg").width($(window).width());
		$("#headerTR").height(50);
		$("#footerTR").height(20);
		$("#mainTR").height($(window).height() - 110);
	});

	//$("svg").height($(window).height());
	//$("svg").width($(window).width());
	$("#headerTR").height(50);
	$("#footerTR").height(20);
	$("#mainTR").height($(window).height() - 110);
	$("#tweetsBox").height($(window).height() - 170);

	var selectedCn;
	
	var defaultColor = "#b9b9b9";
	var hoverColor = "#ffb6c1";
	var selectedColor = "#800000";
    
    var titleMsgTxt = "Thank you, World.";

	for(var c in countries)
	{
		var cd = "#" + countries[c].code2Char.toLowerCase();
		
		if(cd != "#jp"){
			$(cd).hover(
				function (event) {
					$(this).css("fill",hoverColor);
					/**
					$("#xxx").append("<circle cx='0' cy='0' r='1000' style='stroke:#ff0000; stroke-width:15; fill:none'/>");
					**/
				},
				function (event) {
					if(selectedCn == $(this).attr("id")){
						$(this).css("fill",selectedColor);
					}else{
						$(this).css("fill",defaultColor);
					}
				}
			);// $(cd).hover

			$(cd).click(function (event) {
				selectCountry($(this).attr("id"));
			});

		} // if(cd != "#jp")
	} // for(var c in countries)

	$("#tweetThanksLink").click(function(event){
		var selectedcountrycode = $('#countryCmb option:selected').val().toLowerCase();
		window.open("http://twitter.com/?status=%23thankyouworld %23" + selectedcountrycode, "_blank");
	});

	$("#countryCmb").change(function(){
		var selectedcountrycode = $('#countryCmb option:selected').val().toLowerCase();
		selectCountry(selectedcountrycode);
	});

	function selectCountry(countryCode){

		var countryname = countries[countryCode.toUpperCase()].countryNameEN;
			$("#countryname").html("Thank you <br /><b>" + countryname + "</b>");

		var cd = "#" + countryCode;
		$(cd).css("fill",selectedColor);
		$("#" + selectedCn).css("fill",defaultColor);
		selectedCn = countryCode;

		getTweets(countryCode);
	}

	var tweetBox = "<div class='tweet'><img src='${imgurl}' width='30' height='30' /><b>${userName}</b><br /><div class='tweetText'>${tweetText}</div></div>";

	function getTweets(countryCode){
		$("#tweetsBox").empty();
		$.template("tbt", tweetBox);
		$.tmpl("tbt", tweetsdata).appendTo("#tweetsBox");
	}

	$("#selectLangCmb").change(function(){
		var selectedLang = $('#selectLangCmb option:selected').val();

		google.language.translate(titleMsgTxt, "en", selectedLang, function(result) {
			if (!result.error) {
				$("#titleMsg").text(result.translation);
			} else {
				$("#titleMsg").text(titleMsgTxt + "*");
			}
		});

	});

});