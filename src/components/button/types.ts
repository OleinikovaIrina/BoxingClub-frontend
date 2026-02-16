export interface ButtonProps {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
  variant?: "primary" | "secondary";
  danger?: boolean;
}