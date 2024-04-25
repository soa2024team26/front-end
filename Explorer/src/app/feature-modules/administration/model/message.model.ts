export interface Message {
    id: number;
    senderId: string;
    receiverId: string;
    messageContent: string;
    status: MessageStatus
}

enum MessageStatus
{
    NotRead,
    Read
}