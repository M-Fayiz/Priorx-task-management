import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header"; 

export const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-kosma-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 bg-kosma-white">
          {children}
        </main>
      </div>
    </div>
  );
};
