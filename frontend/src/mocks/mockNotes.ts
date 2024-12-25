// src/mocks/mockNotes.ts

import { Note } from "@/types/notes.types";

export const mockNotes: Note[] = [
    {
        id: "1",
        title: "Meeting Notes",
        content: "Discuss the roadmap for Q4 and set priorities for the team.",
        createdAt: new Date('2024-08-01').toISOString(),
        userId: "user123",
    },
    {
        id: "2",
        title: "Project Plan",
        content: "Outline steps for the upcoming product launch and marketing campaign.",
        createdAt: new Date('2024-08-10').toISOString(),
        userId: "user123",
    },
    {
        id: "3",
        title: "Shopping List",
        content: "Milk, Bread, Eggs, Coffee, and Vegetables.",
        createdAt: new Date('2024-08-15').toISOString(),
        userId: "user123",
    },
    {
        id: "4",
        title: "Ideas for Blog",
        content: "Write about productivity tips and time management hacks.",
        createdAt: new Date('2024-08-20').toISOString(),
        userId: "user123",
    },
    {
        id: "5",
        title: "Workout Routine",
        content: "Include cardio, strength training, and flexibility exercises.",
        createdAt: new Date('2024-08-25').toISOString(),
        userId: "user123",
    }
];
