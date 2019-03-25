export class userdetails {
    
    public email : string;
    public password : string;
    public clienttype : string;
    public id : number;
    public comeback:number;

    constructor(comeback:number,email : string,password : string,clienttype : string,id : number){
     this.comeback= comeback;
     this.email= email;
     this.password= password;
     this.clienttype= clienttype;
     this.id = id;
    }
}