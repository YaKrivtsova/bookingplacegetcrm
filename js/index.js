$('#login-button').click(function(){
  $('#login-button').fadeOut("slow",function(){
    $("#container").fadeIn();
    TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
  });
});

$(".close-btn").click(function(){
  TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
  TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
  $("#container, #forgotten-container").fadeOut(800, function(){
    $("#login-button").fadeIn(800);
  });
});

/* Forgotten Password */
$('#forgotten').click(function(){
  $("#container").fadeOut(function(){
    $("#forgotten-container").fadeIn();
  });
});
$('#checklog').click(function(){
	if($('#password-input')[0].value==""&&$('#login-input')[0].value==""){
		alert("Login и Пароль не может быть пустым!")
	}
	else if($('#login-input')[0].value=="")
	{
		alert("Login не может быть пустым!")
		console.log("error");
	}
	else if($('#password-input')[0].value=="")
	{
		alert("Пароль не может быть пустым!")
		console.log("error");
	}
	else if($('#password-input')[0].value=="test"&&$('#login-input')[0].value=="test"){
		
		let name = $('#login-input')[0].value;
		//document.cookie = encodeURIComponent(name)
		console.log(document.cookie);
		//window.location.href = 'frontbook.html';
	}
	else{alert("Проверьте правильность введенных данных!")}
	
	
});