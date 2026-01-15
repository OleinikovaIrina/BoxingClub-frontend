import { MainButton } from "./styles"
import Spinner from "../spinner"
import type { ButtonProps } from "./types"

function Button({
    name,
    onClick,
    disabled = false,
    loading = false,
    type = "submit",
    danger
}: ButtonProps) {

    return (
        <MainButton
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
            danger={danger}
        >

            {loading ? < Spinner size={18} color="white" /> : name}
        </MainButton >
    );
}
export default Button;