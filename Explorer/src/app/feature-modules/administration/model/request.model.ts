export interface Request {
    id: number;
    profileId?: string;
    status: RequestStatus
}

export enum RequestStatus
{
    UnderReview,
    Approved,
    Declined
}