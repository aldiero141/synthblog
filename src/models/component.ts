import type { IPost } from "./post";

export interface IConfirmationProps {
    open: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
   children?: React.ReactNode;
}

export interface ICreatePostProps {
    open: boolean;
    type: string;
    onConfirm: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
    details?: IPost;
}

export interface IUserCredentials {
    name: string;
    email: string;
    gender: string
    status: string
    token: string;
  }