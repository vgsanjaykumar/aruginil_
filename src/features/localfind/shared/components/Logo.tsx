interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={` ${className}`}>
      <img
        src="/assets/localfind/logo/logo-with-bg.png"
        alt="Aruginil-logo"
        width="64"
        height="64"
        className="w-[64px] h-[64px] object-contain"
      />

      </div>
  );
}
