import styled from "@emotion/styled";

interface MainButtonStyledProps {
  danger?: boolean;
  variant?: "primary" | "secondary";
}

export const MainButton = styled.button<MainButtonStyledProps>`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  font-size: 26px;
  cursor: pointer;

  background: ${({ variant, danger }) => {
    if (danger) return "rgb(176, 44, 11)";
    if (variant === "secondary") return "transparent";
    return "rgb(17, 48, 127)";
  }};

  color: ${({ variant }) =>
    variant === "secondary" ? "rgb(17, 48, 127)" : "white"};

  border: ${({ variant }) =>
    variant === "secondary" ? "2px solid rgb(17, 48, 127)" : "none"};

  &:disabled {
    background-color: rgb(202, 200, 200);
    cursor: not-allowed;
  }
`;
