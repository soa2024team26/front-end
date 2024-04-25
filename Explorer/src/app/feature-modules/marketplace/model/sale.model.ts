export interface Sale {
    id?: number;
    tourIds:Array<number>,
    authorId:string,
    startDate:Date,
    endDate:Date,
    discount:number
}