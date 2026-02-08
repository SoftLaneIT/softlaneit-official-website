import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import '../common/Button.css';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ padding: 'var(--space-2)' }}
        >
            {theme === 'dark' ? (
                <Sun size={20} className="text-secondary" />
            ) : (
                <Moon size={20} className="text-secondary" />
            )}
        </button>
    );
};
