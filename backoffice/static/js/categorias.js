var id_categoria;
$(document).ready( function () {
    //Colocar cabeceras de filtro a la tabla
    $('#tabla-categoria thead tr').clone(true).appendTo( '#tabla-categoria thead' );
    $('#tabla-categoria thead tr:eq(1) th').each( function (i) {
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
    var table = $('#tabla-categoria').DataTable({
        //"paging": true,
        //orderCellsTop: true,
        //fixedHeader: true,
        //"processing": true,
        //"serverSide": true,
        "ajax":{
            url: "/api/v1/category/",
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
            {
                data: null,
                className: "center",
                "render": function ( data, type, row ) {
                    checked=''
                    if (data.display){
                        checked='checked'
                    }
                    estado='<div class="form-check"><input type="checkbox" class="form-control" '+checked+' disabled></div>'
                    return estado;
                },
                
            },            
            {
                data: null,
                className: "center",
                "render": function ( data, type, row ) {
                    checked=''
                    if (data.display_in_home){
                        checked='checked'
                    }

                    estado='<div class="form-check"><input type="checkbox" class="form-control" '+checked+' disabled></div>'
                    return estado;
                },
                
            }, 
            {data:'order'},
            {
                data: null,
                className: "center",
                defaultContent: '<button type="button" class="btn btn-info" style="width:40%;height:80%; margin:5px;" data-toggle="modal" data-target="#modal-categoria" data-whatever="Actualizar"><span style="font-size: 1em;"><i class="fas fa-edit"></i></span></button>'+
                                '<button type="button" class="btn btn-danger" style="width:40%;height:80%;margin:5px;" data-toggle="modal" data-target="#modal-categoria-delete"><span style="font-size: 1em;"><i class="fas fa-trash-alt"></i></span></button>'
                
            }
        ]
    });
   
    //Cerrar el modal Agregar y Actualizar
    $('#modal-categoria').on('hidden.bs.modal', function (event) {
        var modal = $(this)
        modal.find('#name').val("") 
        modal.find('#display').prop('checked',false)      
        modal.find('#display_in_home').prop('checked',false)   
        modal.find('#order').val("")    
    })
    //Abrir el modal Agregar y Actualizar
    $('#modal-categoria').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var operacion = button.data('whatever') 
        var modal = $(this)  
        modal.find('.modal-title').text( operacion+' Categoria')
        //Ajustar caracteristicas  del modal
        modal.find('#form-name').prop('hidden',false)  
        modal.find('#form-display').prop('hidden',false)      
        modal.find('#form-display_in_home').prop('hidden',false)    
        modal.find('#form-order').prop('hidden',false)
        modal.find('#form-reorder').prop('hidden',true)
    
        if (operacion =="Agregar"){
            modal.find('#submit_modal_categoria').text('Agregar') 
        }else if(operacion == "Actualizar"){ 
            id_categoria=(button.parents("tr").find("td")[0].innerHTML)
            $.ajax({url: "/api/v1/category/"+id_categoria, success: function(result){
                element=result;
                modal.find('#name').val(element.name) 
                modal.find('#display').prop('checked',element.display)      
                modal.find('#display_in_home').prop('checked',element.display_in_home)   
                modal.find('#order').val(element.order)       
              }});     
            modal.find('#submit_modal_categoria').text('Actualizar')
        }else if(operacion == "Reordenar"){ 
            modal.find('#form-name').prop('hidden',true)  
            modal.find('#form-display').prop('hidden',true)      
            modal.find('#form-display_in_home').prop('hidden',true)    
            modal.find('#form-order').prop('hidden',true) 
            modal.find('#form-reorder').prop('hidden',false)
            modal.find('#submit_modal_categoria').text('Reordenar')


        }
      });
      // Abrir modal eliminar
    $('#modal-categoria-delete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this)
        id_categoria=(button.parents("tr").find("td")[0].innerHTML)
        var name=(button.parents("tr").find("td")[1].innerHTML)
        modal.find('.modal-title').text('Eliminar Cuenta')
        modal.find('.modal-body').text('¿Desea eliminar la cuenta '+id_categoria+'-'+name+'?');   
    });
      //Boton Submit modal actualizar y agregar
    $('#submit_modal_categoria').on('click', function (event) {
			var boton = $(this)
            var operacion=boton.text();
            var modal=$('#modal-categoria')
            var name=modal.find('#name').val() 
            var display=modal.find('#display').is(':checked')
            var display_in_home=modal.find('#display_in_home').is(':checked')
            var order=modal.find('#order').val() 
            var reorder=modal.find('#reorder').val() 
           if(operacion=="Agregar"){
                $.ajax({
                    url: '/api/v1/category/',
                    method: 'POST',
                    data: "name="+name+"&display="+display+"&display_in_home="+display_in_home+"&order="+order,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Registro Exitoso","Categoria agregada exitosamente",1);
                    }
                });

            }else if (operacion=="Actualizar"){
                $.ajax({
                    url: '/api/v1/category/'+id_categoria,
                    method: 'PATCH',
                    data: "name="+name+"&display="+display+"&display_in_home="+display_in_home+"&order="+order,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Actualización Exitosa","Categoria actualizada exitosamente",1);
                    }
                });
            } else if (operacion=="Reordenar"){
                array=reorder
                number=''
                categories_order_ids=[]
                form_data = new FormData();
                for (i=0;i<array.length;i++ ){      
                    if(array[i]!=',' ){
                        number=number+array[i]
                        if (i==array.length-1)form_data.append( 'categories_order_ids',parseInt(number, 10)  );//categories_order_ids.push(parseInt(number, 10))
                    }else{
                        //categories_order_ids.push(parseInt(number, 10))
                        form_data.append( 'categories_order_ids',parseInt(number, 10)  );
                        number=''

                    }   
                           
                }               
                
                $.ajax({
                    url: '/api/v1/category/order/',
                    method: 'POST',
                    processData: false,
                    contentType: false,
                    data: form_data,
                    success: function(data) {
                    modal.modal("hide");
                    table.ajax.reload();
                    toast_crud("Reordenamiento Exitoso","Categorias reordenadas exitosamente",1);
                    }
                });

            }
        
    })
    //Boton Submit modal eliminar
    $('#submit-delete-categoria').on('click', function (event) {
        var boton = $(this)
        var operacion=boton.text();
        var modal=$('#modal-categoria-delete')
        $.ajax({
            url: '/api/v1/category/'+id_categoria,
            method: 'DELETE',
            data: "",
            success: function(data) {
              modal.modal("hide");
              table.ajax.reload();
              toast_crud("Eliminación Exitosa","Categoria eliminado exitosamente",1);
            }
          }).fail( function() {
            modal.modal("hide");
            toast_crud("Eliminación Fallida","Este registro está en uso.",2);        
        });
        
    })
} );

