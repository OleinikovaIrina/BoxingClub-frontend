import React, { useState } from "react";

type PasswordInputProps = {
    name: string;
    label?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
};
export function PasswordInput({
    name,
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    error,
    disabled = false,
}: PasswordInputProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={isVisible ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full pr-10 border rounded px-3 py-2"
                />

                <button
                    type="button"
                    onClick={() => setIsVisible(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    👁️
                </button>
            </div>


            {error && <p className="text-sm text-red-500">{error}</p>}


        </div>

    )
}