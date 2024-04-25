export interface ClubRequestWithUser {
    id?: number,
    clubId?: string,
    accountId: string,
    requestStatus: number,
    requestType: number,
    account: import("src/app/infrastructure/auth/model/user.model").User;
}