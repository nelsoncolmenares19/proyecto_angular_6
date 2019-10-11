export class DestinoViaje{
    selected:boolean;
    servicios:string[];
    constructor(public nombre:string,public imagenUrl:string){ 
        this.servicios=['pileta', 'desayuno'];
     }

    isSelected():boolean{
        return this.selected;
    }

    setSelected(s:boolean){
        this.selected=s;
    }
}