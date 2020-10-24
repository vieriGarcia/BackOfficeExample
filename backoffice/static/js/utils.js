class Card{
    constructor(card_id,contener_id,noHeader){
       this.card_id=card_id
       this.contener_id=contener_id
       this.noHeader=noHeader
       this.render();
       $("#"+this.card_id).fadeIn(500);
          
    }
    removeHeader(bool){
       this.noHeader=bool
       this.render();
    }
    addContent(part,body_content){
        $("#"+this.card_id+"-"+part).append(body_content);
    }
    setCardStyle(style){
       $("#"+this.card_id).css(style);
    }
    setCardPartStyle(part,style){
       $("#"+this.card_id+"-"+part).css(style);
    }
    addCardClass(classes){
       $("#"+this.card_id).addClass(classes);
    }
    removeCardClass(classes){
       $("#"+this.card_id).removeClass(classes);
    }
    addCardPartClass(part,classes){
       $("#"+this.card_id+"-"+part).addClass(classes);
    }
    removeCardPartClass(part,classes){
       $("#"+this.card_id+"-"+part).removeClass(classes);
    }
    render(){
       $(this.contener_id).find("#"+this.card_id).remove();
       let card=this.getHTML()
        $(this.contener_id).append(card)  
    }
    getHTML(){
       let card;
       if(this.noHeader){
          card='<div id="'+this.card_id+'" class= "card" style="display:none;" >'+
                   '<div id="'+this.card_id+'-body"class= "card-body ">'+'</div>'+
                   '</div>' 
       }else{
          card='<div id="'+this.card_id+'" class= "card" style="display:none;" >'+
                   '<div id="'+this.card_id+'-header" class= "card-header row">'+'</div>'+
                   '<div id="'+this.card_id+'-body"class= "card-body ">'+'</div>'+
                   '</div>'
       }
       return card;
    }
    deleteCard(time, fade_time){
      card= $(this.contener_id).find("#"+this.card_id)   
      card.fadeOut(fade_time)  
      setTimeout(function(){card.remove()},time);
      
    }
 }
 function toast_crud(cabecera,mensaje,tipo){
    /*
    crearAlert("toast",200,350,tipo);
    setCabecera("toast",cabecera)
    setMensaje("toast",mensaje)
    autoClose("toast",1500)  */
    color="";
    icon="";

    if(tipo==1){
      color="#2CEA77" //Éxito
      //icon='<span style="font-size: 1em;"><i class="fas fa-thumbs-up"></i></span>';
    }else if (tipo==2){
      color="#EA2C32" //Error
      icon='<span style="font-size: 1em;"><i class="fas fa-times"></i></i></span>';
    }else if (tipo==3){
      color="#EAE12C" //Warming
      icon='<span style="font-size: 1em;"><i class="fas fa-exclamation-triangle"></i></span>';
    }else if (tipo==4){
      color="#2C9CEA" //Info
      icon='<span style="font-size: 1em;"><i class="fas fa-info"></i></span>';
    }
    card= new Card("example","body",false);
    card.setCardStyle({'max-width':'350px','max-heigth':'200px','position':'absolute','top':'0','right':'0','box-shadow':' 10px 10px 100px 0px rgba(0,0,0,0.75)'})
    card.addContent("header",'<div class="col-11" style="display:inline"><div class="row"><div class=" d-flex" style="text-align: center;width:30px;height:28px;background-color:'+color+';border-radius: 5px;margin-right:2%">'+icon+'</div><strong>'+cabecera+'</strong></div></div>'+'<button type="button" class="close ml-auto" data-dismiss="alert" aria-label="Close" style="float:right">'+
    '<span aria-hidden="true">&times;</span></div>');
    card.addContent("body",mensaje);
    card.addCardClass("pos-f-t fixed-right")
    card.setCardStyle({'z-index':'5'})
    setTimeout(function(){card.deleteCard(2000,2000)},1000);
  }
  function sumarryCard(id,id_padre,titulo,contenido,color,height,width,tipo,icono_class){
   if(tipo==1){
       unidad='px'
   }else{
       unidad='%'
   }
   icon='<span id ="'+id+'-icon" class="sumary-card-icon"><i class="'+icono_class+'"></i></span>';
   content='<div  sumary-card-content" style="width:100%;">'
           +'<strong id="'+id+'-title"  class="sumary-card-title">'+titulo+'</strong>'
           +'</div>'
           +'<div class="sumary-card-info-contener">'
           +'<div id="'+id+'-content" class="sumary-card-info">'+contenido+'</div>'
           +'</div>'
  card= new Card(id,id_padre,true);
  card.addCardClass("sumary-card border-light")
  //card.addCardClass("border-light")
  //card.addCardPartClass("body","row")
  card.setCardPartStyle("body",{"width":"100%","display":"inline-block"})
  card.addContent("body",'<div id="'+id+'-color-bar" style="float:left;height:100%;width:2%;margin-right:1%;margin-left:1%;" ><div style="background-color:'+color+';height:100%;width:8px;"></div></div>'+
                           '<div style="float:left;height:100%;width:20%;display: table;text-align: center;margin-right:1%;margin-left:1%;" >'+icon+'</div>'+
                           '<div style="float:left;height:100%;width:69%;margin-right:1%;margin-left:1%;" >'+content+'</div>');
    return card;
 }
  