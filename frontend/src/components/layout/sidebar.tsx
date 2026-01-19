import { ClipboardList, BarChart3, Settings, X } from "lucide-react";

const navItems = [
  { label: "Tasks", icon: ClipboardList },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          h-screen w-60
          bg-kosma-black text-kosma-white
          px-6 py-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-semibold tracking-wide">
            Priorix
          </h2>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="md:hidden text-kosma-lgray hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {navItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg
                         text-kosma-lgray hover:bg-kosma-dgray
                         hover:text-kosma-white transition cursor-pointer"
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
