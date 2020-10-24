var id_color;
$(document).ready( function () {
    //Colocar cabeceras de filtro a la tabla
    $('#tabla-color thead tr').clone(true).appendTo( '#tabla-color thead' );
    $('#tabla-color thead tr:eq(1) th').each( function (i) {
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
    var table = $('#tabla-color').DataTable({
        //"paging": true,
        //orderCellsTop: true,
        //fixedHeader: true,
        //"processing": true,
        //"serverSide": true,
        "ajax":{
            url: "/api/v1/color/",
            method: 'GET',
            dataType:'json',
            data: function(args) { 
               return {
                "args": JSON.stringify(args)
                };
            }
        },
        "columns":[     
            {data:'id'},
            {data:'name'},
            {data:'hex_code'},
            {
                data: null,
                className: "center",
                "render": function ( data, type, row ) {
                    estado='<button class="btn" style="background-color:'+data.hex_code+';width:auto;height:auto;"></button>'
                    return estado;
                },
                
            },
            {
                data: null,
                className: "center",
                defaultContent: '<button type="button" class="btn btn-info" style="width:40%;height:80%; margin:5px;" data-toggle="modal" data-target="#modal-color" data-whatever="Actualizar"><span style="font-size: 1em;"><i class="fas fa-edit"></i></span></button>'+
                                '<button type="button" class="btn btn-danger" style="width:40%;height:80%;margin:5px;" data-toggle="modal" data-target="#modal-color-delete"><span style="font-size: 1em;"><i class="fas fa-trash-alt"></i></span></button>'
                
            }
        ]
    });
   
    //Cerrar el modal Agregar y Actualizar
    $('#modal-color').on('hidden.bs.modal', function (event) {
        var modal = $(this)
        modal.find('#name').val("") 
        modal.find('#hex_code').val("")    
    })
    //Abrir el modal Agregar y Actualizar
    $('#modal-color').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var operacion = button.data('whatever') 
        var modal = $(this)  
        modal.find('.modal-title').text( operacion+' Color')
        //Ajustar caracteristicas  del modal
        if (operacion =="Agregar"){
            modal.find('#submit_modal_color').text('Agregar') 
            modal.find('#hex_code').val("#") 
        }else if(operacion == "Actualizar"){ 
            id_color=(button.parents("tr").find("td")[0].innerHTML)
            $.ajax({url: "/api/v1/color/"+id_color, success: function(result){
                console.log(result.name)
                element=result;
                modal.find('#name').val(element.name) 
                modal.find('#hex_code').val(element.hex_code)              
              }});     
            modal.find('#submit_modal_color').text('Actualizar')
        }
      });
      // Abrir modal eliminar
    $('#modal-color-delete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this)
        id_color=(button.parents("tr").find("td")[0].innerHTML)
        var name=(button.parents("tr").find("td")[1].innerHTML)
        modal.find('.modal-title').text('Eliminar Cuenta')
        modal.find('.modal-body').text('¿Desea eliminar la cuenta '+id_color+'-'+name+'?');   
    });
      //Boton Submit modal actualizar y agregar
    $('#submit_modal_color').on('click', function (event) {
			var boton = $(this)
            var operacion=boton.text();
            var modal=$('#modal-color')
            var name=modal.find('#name').val() 
            var hex_code=modal.find('#hex_code').val() 
           if(operacion=="Agregar"){
                $.ajax({
                    url: '/api/v1/color/',
                    method: 'POST',
                    data: "name="+name+"&hex_code="+hex_code,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Registro Exitoso","Color agregada exitosamente",1);
                    }
                });

            }else if (operacion=="Actualizar"){
                $.ajax({
                    url: '/api/v1/color/'+id_color,
                    method: 'PATCH',
                    data: "name="+name+"&hex_code="+hex_code,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Actualización Exitosa","Color actualizada exitosamente",1);
                    }
                });
            }
        
    })
    //Boton Submit modal eliminar
    $('#submit-delete-color').on('click', function (event) {
        var boton = $(this)
        var operacion=boton.text();
        var modal=$('#modal-color-delete')
        $.ajax({
            url: '/api/v1/color/'+id_color,
            method: 'DELETE',
            data: "",
            success: function(data) {
              modal.modal("hide");
              table.ajax.reload();
              toast_crud("Eliminación Exitosa","Color eliminado exitosamente",1);
            }
          }).fail( function() {
            modal.modal("hide");
            toast_crud("Eliminación Fallida","Este registro está en uso.",2);        
        });
        
    })
} );

