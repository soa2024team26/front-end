export interface Answer {
    id?: number,
    touristId: string,
    adminId: string,
    text: string,
    category: AnswerCategory,
    visability: boolean,
    questionId: number,
    questionText?: string
}

export enum AnswerCategory {
    Payment = 0, 
    Tour = 1, 
    TechnicalSupport = 2, 
    Other = 3
  }