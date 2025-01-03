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
}

export interface IUserCredentials {
    name: string;
    token: string;
  }