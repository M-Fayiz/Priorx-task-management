
type SpinnerSize = "small" | "medium" | "large" | "xlarge";
type SpinnerVariant = "theme" | "white" | "tech";

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  fullScreen?: boolean;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  variant = "theme",
  fullScreen = false,
  className = "",
}) => {
  const sizeClasses: Record<SpinnerSize, string> = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-12 w-12",
    xlarge: "h-16 w-16",
  };

  const variantClasses: Record<
    SpinnerVariant,
    { track: string; arc: string; core: string; text: string; panel: string }
  > = {
    theme: {
      track: "border-black/10",
      arc: "border-t-black border-r-black/70",
      core: "bg-black/80",
      text: "text-kosma-dgray",
      panel: "bg-kosma-white/80",
    },
    white: {
      track: "border-white/20",
      arc: "border-t-white border-r-white/70",
      core: "bg-white",
      text: "text-white/80",
      panel: "bg-black/35",
    },
    tech: {
      track: "border-kosma-gray/20",
      arc: "border-t-kosma-black border-r-kosma-gray",
      core: "bg-kosma-black",
      text: "text-kosma-dgray",
      panel: "bg-kosma-white/80",
    },
  };

  const spinnerElement = (
    <div
      className={`inline-flex shrink-0 items-center justify-center align-middle ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`relative h-full w-full rounded-full border ${variantClasses[variant].track}`}
      >
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent ${variantClasses[variant].arc} animate-spin`}
          style={{ animationDuration: "0.9s" }}
        />
        <div
          className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${variantClasses[variant].core}`}
        />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-kosma-white/72 backdrop-blur-sm">
        <div
          className={`flex min-w-44 flex-col items-center gap-4 rounded-2xl border border-black/8 px-8 py-7 shadow-[0_18px_45px_rgba(15,15,15,0.08)] ${variantClasses[variant].panel}`}
        >
          <Spinner size={size} variant={variant} />
          <p className={`text-sm font-medium tracking-[0.18em] uppercase ${variantClasses[variant].text}`}>
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return spinnerElement;
};
