export enum BlogStatus {
    Draft = 0,
    Published = 1,
    Closed = 2
}

export interface Blog {
    id? : number;
    userId : number;
    title : string;
    description : string;
    creationTime: Date;
    status : BlogStatus;
    image: string | "";
}

export function numberToBlogStatus(value: number): BlogStatus {
    switch (value) {
      case 0: return BlogStatus.Draft;
      case 1: return BlogStatus.Published;
      case 2: return BlogStatus.Closed;
      default: return BlogStatus.Draft; // Po potrebi, postavite podrazumevanu vrednost.
    }
  }
  
  export function blogStatusToNumber(status: BlogStatus): number {
    switch (status) {
      case BlogStatus.Draft: return 0;
      case BlogStatus.Published: return 1;
      case BlogStatus.Closed: return 2;
      default: return 0; // Po potrebi, postavite podrazumevanu vrednost.
    }
  }
  