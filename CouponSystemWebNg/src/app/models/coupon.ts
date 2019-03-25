export class coupon{

    public id:number ;
    public amount : number;
	public compID:number ;
    public category : string;
    public title:String;
    public description:string;
    public image:string;
    public startDates:string;
	public endDates:string;
	public price:number;
    
    public constructor(id:number,amount : number,compID:number,category
        ,title:String,description:string,image:string,startDates:string,endDates:string,price:number){
        this.id=id;
        this.amount=amount;
        this.compID=compID;
        this.category=category;
        this.title=title;
        this.description=description;
        this.image = image;
        this.startDates = startDates;
        this.endDates = endDates;
        this.price = price;
    }
}

