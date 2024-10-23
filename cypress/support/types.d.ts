import { Schema } from 'mongoose'; 

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    _id: Schema.Types.ObjectId;
    question: string;
    answers: Answer[];
}

export type { Answer, Question };