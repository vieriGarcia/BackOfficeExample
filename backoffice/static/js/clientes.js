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
            url: "/api/v1/client/",
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
   
    
} );

