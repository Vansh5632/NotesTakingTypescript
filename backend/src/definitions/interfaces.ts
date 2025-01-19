import { Document } from "mongoose";
import { Request } from "express";
import mongoose from "mongoose";

export interface IUser {
    _id?: string;
    email: string;
    password?: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }



export interface INote {
    noteId: number;
    title: string;
    content: string;
    userId: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  }

