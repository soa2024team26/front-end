export interface PublicRequest {
    id?: number,
    entityId: number,
    authorId: string,
    comment: string,
    isCheckPoint: boolean,
    isNotified: boolean,
    isApproved: boolean
}