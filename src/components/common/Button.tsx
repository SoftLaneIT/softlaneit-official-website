import React from 'react';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    href,
    type = 'button',
    disabled = false,
    fullWidth = false,
    className = '',
    icon,
}) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full' : '',
        disabled ? 'btn-disabled' : '',
        className,
    ].filter(Boolean).join(' ');

    if (href) {
        return (
            <a href={href} className={classes}>
                {icon && <span className="btn-icon">{icon}</span>}
                <span className="btn-text">{children}</span>
                <span className="btn-shine"></span>
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-text">{children}</span>
            <span className="btn-shine"></span>
        </button>
    );
};

export default Button;
