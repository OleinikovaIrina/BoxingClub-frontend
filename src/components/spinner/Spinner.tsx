import { SpinnerComponent } from './styles';

type SpinnerProps = {
    size?: number;
    color?: string;
};


const Spinner = ({ size, color }: SpinnerProps) => {
  return <SpinnerComponent size={size} color={color} />;
};

export default Spinner;
