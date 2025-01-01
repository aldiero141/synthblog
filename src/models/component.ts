export interface IConfirmationProps {
    open: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
}