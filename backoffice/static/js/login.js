$(document).ready( function () {
    var signin_button=$("#signin-button");
    var forgot_pass=$("#forgot-pass");
    var username=$("#username");
    var password=$("#password");
    var user=$("#form-user");
    var pass=$("#form-pass");
    var email_form=$("#form-email");
    forgot_pass.click(function(){
        signin_button.text("Recuperar contraseña")
        user.attr("hidden",true);
        pass.attr("hidden",true);
        email_form.attr("hidden",false);
    });
    signin_button.click(function(){
        if (signin_button.text()=="Ingresar"){
            $(function() {
                $.ajax({
                url: '/api/v1/login/employee/',
                method: 'POST',
                data: JSON.stringify({ "username":username.val(),"password":password.val()}),
                success: function(data,status) {
                    if(status=="success"){
                        window.location.replace ("/backoffice/dashboard/productos/productos");
                    } 
                },
                error: function(e) {
                   mensaje='Asegurese de ingresar o de que sea correcto lo siguiente:'
                   for (x in e.responseJSON){
                    if (x=="non_field_errors"){
                        mensaje=x[0]
                    }
                    mensaje=mensaje+' '+x
                   }
                    toast_crud("Inicio de Sesión Fallido",mensaje,2);
                  },

            })

            })
            ;
        }else if (signin_button.text()=="Recuperar contraseña"){
        
        }
       
    });



});

