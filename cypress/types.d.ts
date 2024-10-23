import { Schema } from 'mongoose'; // remove?

interface Question {
    question: string;
    answers: Answer[];
}

interface Answer {
    text: string;
    isCorrect: boolean;
}