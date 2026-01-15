import styled from '@emotion/styled';

export const SpinnerComponent = styled.div<{
  size?: number;
  color?: string;
}>`
  width: ${({ size }) => size ?? 24}px;
  height: ${({ size }) => size ?? 24}px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ color }) => color ?? '#1c086a'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
