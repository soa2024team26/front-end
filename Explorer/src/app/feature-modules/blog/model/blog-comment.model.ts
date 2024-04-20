export interface BlogComment {
    id?: string;
    userId : string;
    username: string;
    blogId : string;
    text: string;
    creationTime : Date;
    lastModification : Date;
}