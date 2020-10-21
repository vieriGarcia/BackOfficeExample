var id_cuenta;
$(document).ready( function () {
    //Colocar cabeceras de filtro a la tabla
    $('#tabla-cliente thead tr').clone(true).appendTo( '#tabla-cliente thead' );
    $('#tabla-cliente thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        if (title!="Acciones"){
            $(this).html( '<input type="text" class="form-control" style="width:80%;height:60%;"placeholder="'+title+'" />' );
            $( 'input', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
        }else{
            $(this).html( 'Actualizar-Eliminar' );
        }
    } );
   //Definir la tabla
    var table = $('#tabla-cliente').DataTable({
        //"paging": true,
        //orderCellsTop: true,
        //fixedHeader: true,
        //"processing": true,
        //"serverSide": true,
        "ajax":{
            url: "/api/v1/client/?format=datatables",
            method: 'GET',
            dataType:'json',
            data: function(args) { 
                console.log(args)
             return {
                "args": JSON.stringify(args)
                };
            }
        },
        "columns":[     
            {data:'id'},
            {data:'first_name'},
            {data:'last_name'},
            {data:'phone_number'}
        ]
    });
   
    //Cerrar el modal Agregar y Actualizar
    $('#modal-cuenta').on('hidden.bs.modal', function (event) {
        var modal = $(this)
        modal.find('#descripcion').val("") 
        modal.find('#tipo_cuenta').val("")    
        modal.find('#saldo_cuenta').val(0)    
    })
    //Abrir el modal Agregar y Actualizar
    $('#modal-cuenta').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var operacion = button.data('whatever') 
        var modal = $(this)  
        modal.find('.modal-title').text( operacion+' Cuenta')
        // Llenar Combo tipo de cuenta
        $("#tipo_cuenta").load("/multitabdet/1/all", function(result, statusTxt, xhr){
            $("#tipo_cuenta").append('<option selected value="0">Elija una opcion</option>')
            if(statusTxt == "success")
             array=JSON.parse(result).data;
             for(i=0;i<array.length;i++){
                 option='<option value="'+array[i].id_det+'">'+array[i].descripcion+'</option>'
                $("#tipo_cuenta").append(option)
             }         
            if(statusTxt == "error")
              alert("Error: " + xhr.status + ": " + xhr.statusText);
          });
        //Ajustar caracteristicas  del modal
        if (operacion =="Agregar"){
            modal.find('#submit_modal_cuenta').text('Agregar')
            modal.find('#saldo_cuenta').prop('disabled',false)     
        }else if(operacion == "Actualizar"){ 
            id_cuenta=(button.parents("tr").find("td")[0].innerHTML)
            $.ajax({url: "/cuenta/getId/"+id_cuenta, success: function(result){
                element=result.data[0];
                modal.find('#descripcion').val(element.descripcion) 
                modal.find('#tipo_cuenta').val(element.tipo_cuenta[0])   
                modal.find('#saldo_cuenta').val(element.saldo_cuenta)             
              }});     
            modal.find('#saldo_cuenta').prop('disabled',true)
            modal.find('#submit_modal_cuenta').text('Actualizar')  
        }
      });
      // Abrir modal eliminar
    $('#modal-cuenta-delete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this)
        id_cuenta=(button.parents("tr").find("td")[0].innerHTML)
        var descripcion=(button.parents("tr").find("td")[1].innerHTML)
        modal.find('.modal-title').text('Eliminar Cuenta')
        modal.find('.modal-body').text('¿Desea eliminar la cuenta '+id_cuenta+'-'+descripcion+'?');   
    });
      //Boton Submit modal actualizar y agregar
    $('#submit_modal_cuenta').on('click', function (event) {
        if ($("#form-cuenta").valid()) {
			var boton = $(this)
            var operacion=boton.text();
            var modal=$('#modal-cuenta')
            var descripcion=modal.find('#descripcion').val() 
            var tipo_cuenta=modal.find('#tipo_cuenta').val() 
            var saldo_cuenta=modal.find('#saldo_cuenta').val()  
            if(operacion=="Agregar"){
                $.ajax({
                    url: '/cuenta/add/0',
                    method: 'POST',
                    data: "descripcion="+descripcion+"&tipo_cuenta="+tipo_cuenta+"&saldo_cuenta="+saldo_cuenta,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Registro Exitoso","Cuenta agregada exitosamente",1);
                    }
                });

            }else if (operacion=="Actualizar"){
                $.ajax({
                    url: '/cuenta/edit/'+id_cuenta,
                    method: 'POST',
                    data: "descripcion="+descripcion+"&tipo_cuenta="+tipo_cuenta+"&saldo_cuenta="+saldo_cuenta,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Actualización Exitosa","Cuenta actualizada exitosamente",1);
                    }
                });
            }
	    }
        
    })
    //Boton Submit modal eliminar
    $('#submit-delete-cuenta').on('click', function (event) {
        var boton = $(this)
        var operacion=boton.text();
        var modal=$('#modal-cuenta-delete')
        $.ajax({
            url: '/cuenta/delete/'+id_cuenta,
            method: 'POST',
            data: "",
            success: function(data) {
              modal.modal("hide");
              table.ajax.reload();
              toast_crud("Eliminación Exitosa","Cuenta eliminada exitosamente",1);
            }
          }).fail( function() {
            modal.modal("hide");
            toast_crud("Eliminación Fallida","Existen movimientos asociados a este registro.",2);        
        });
    
        
    })
} );

