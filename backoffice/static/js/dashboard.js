$(document).ready( function () {
    var logout_op=$("#logout-op");

    //Cerrar Sesión
    logout_op.click(function(){
        $.ajax({
                url: '/api/v1/logout/',
                method: 'POST',
                success: function(data,status) {
                    if(status=="success"){
                        window.location.replace ("/backoffice/login/");
                    }else{
                        alert('Mal ... :c ')
                    }  
                }
            });
          
    });



});

