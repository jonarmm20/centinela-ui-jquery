
/*
	Iniciar la conexion a la base de datos local
	creando la base de datos en caso de no existe y todas la tablas necesarias para un buen funcionamiento
	ademas de functiones que realizan peticiones a la base de datos local para la corroboracion de los datos
*/
$(document).ready(function(){ 
	init(); 
	
	if (empty_user()){
		$.mobile.changePage( "#registro", {
    		transition: "pop",
    		reverse: false,
	  	    changeHash: false
		});
	}else{
		$.mobile.changePage( "#inicio", {
    		transition: "pop",
    		reverse: false,
	  	    changeHash: false
		});
		display_user();
		display_rastreo()
	}
});


var db = openDatabase('dbcentinela', '1.0', 'Base de Datos local Centinela', 5*1024*1024);

function init(){
	create_tb_user()
	create_tb_rastreo()
	
}


function create_tb_user(){
	db.transaction(function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuario(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre TEXT, telefono TEXT, email TEXT)');
	});
}

function crear_user(nombre, telefono, email){
	if(empty_user()){
		db.transaction(function(tx){
			tx.executeSql('insert into usuario(nombre, telefono, email) values (?, ?, ?)', [nombre, telefono, email], successMJS());
		})	
	}

}

function delete_user(){
	db.transaction(function(tx){
		tx.executeSql('delete from usuario');
	})	
}

function updata_user(id, nombre, telefono, email){
	db.transaction(function(tx){
		tx.executeSql('update usuario set nombre = ?, telefono = ?, email = ? where id = ?', [id, nombre, telefono, email], updateMJS());
	})	
}

function display_user(){
	db.transaction(function (tx){
		tx.executeSql('select * from usuario', [], function(tx, result){
			var user = result.rows.item(0);
			$("#nameUser").text(user.nombre);
			 // array = {"id" : user.ID ,"nombre" : user.nombre, "telefono" : user.telefono, "correo" : user.email};
			// return array;
			// console.log(array);
		})	
	})
}

function empty_user(){
	db.transaction(function(tx){
		tx.executeSql('select * from usuario', [], function(tx, result){
			var n = result.rows.length;
			if (n == 0) {return true;}else{return false;}
		});
	});
}

function create_tb_rastreo(){
	db.transaction(function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS rastreo(ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estado TEXT)');
		default_rastreo()
	});
}

function default_rastreo(){
	if(empty_rastreo()){
		db.transaction(function(tx){
			tx.executeSql('insert into rastreo(estado) values ("off")', []);
		})
	}
}

function display_rastreo(){
	db.transaction(function (tx){
		tx.executeSql('select * from rastreo', [], function(tx, result){
			var rastreo = result.rows.item(0);
			if(rastreo.estado == "on"){	
				$("#rastreo").text("Rastreo Activado");
				$("#panelRastreo").removeClass( "apiDesactivada" )
				$("#panelRastreo").addClass( "apiActivada" )
			}else if (rastreo.estado == "off") {
				$("#rastreo").text("Rastreo Desactivado");
				$("#panelRastreo").removeClass( "apiActivada" )				
				$("#panelRastreo").addClass( "apiDesactivada" )
			}
			
			 
		})	
	})
}

function switch_rastreo(){
	db.transaction(function (tx){
			tx.executeSql('select * from rastreo', [], function(tx, result){
				var rastreo = result.rows.item(0);
				if(rastreo.estado == "on"){	
					 desactivar_rastreo()
				}else if (rastreo.estado == "off") {
					 activar_rastreo()
				}				 
			})	
		})
}



function activar_rastreo(){
	db.transaction(function(tx){
		tx.executeSql('update rastreo set estado = "on"', [], display_rastreo());
	})	
	
	navigator.geolocation.getCurrentPosition(success, error, options);


}

function desactivar_rastreo(){
	db.transaction(function(tx){
		tx.executeSql('update rastreo set estado = "off"', [], display_rastreo());
	})	
}

function empty_rastreo(){
	db.transaction(function(tx){
		tx.executeSql('select * from rastreo', [], function(tx, result){
			var n = result.rows.length;
			if (n == 0) {return true;}else{return false;}
		});
	});
}

function successMJS(){
	alert("Exito");
}
function updatesMJS(){
	alert("Actualizado");
}