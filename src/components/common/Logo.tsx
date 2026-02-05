import logoWhite from '../../assets/images/logo-white.svg';
import logoDark from '../../assets/images/logo-dark.svg';

export const Logo = ({ className = "", variant = "default", height = 40 }: { className?: string; variant?: "default" | "white" | "dark"; height?: number }) => {
  const logoSrc = variant === "dark" ? logoDark : logoWhite;
  
  return (
    <img 
      src={logoSrc} 
      alt="Softlane IT" 
      className={className}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
};
