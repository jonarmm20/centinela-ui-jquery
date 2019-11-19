$("#registrar").on("click", function(event){
	event.preventDefault(); //evitar que recarge la pagina
	nombre  = space("nombre")
	telefono  = space("telefono")
	email  = space("correo")

	if (empty(nombre) || empty(telefono) || empty(email)) {
		alert("todos los campos deben ser registrado")
	}else{
		crear_user(nombre, telefono, email)	
		alert("creado")
	}

	if (!empty_user()){
			$.mobile.changePage( "#inicio", {
	    		transition: "pop",
	    		reverse: false,
		  	    changeHash: false
			});
		}
})

function space(input){
	return $("#"+input).val().trim();
}

function empty(valor){
	if (valor == "") {
		return true;
	}else{
		return false;
	}
}

function MSJ(text = ""){
	alert(text); 
}

