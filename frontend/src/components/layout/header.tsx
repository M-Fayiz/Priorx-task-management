import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import AuthService from "@/service/auth.service";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
    const navigate=useNavigate()
    const logOut=async()=>{
        await AuthService.logOut()
        navigate('/auth/login')
    }
  return (
    <header className="h-16 px-6 justify-between flex items-center gap-4
                       border-b border-kosma-lgray
                       bg-kosma-white">
      {/* Mobile menu button */}
      
      <button
        onClick={onMenuClick}
        className="md:hidden text-kosma-black"
      >
        <Menu size={22} />
      </button>
        

      <h3 className="text-lg font-semibold text-kosma-black">
        Task Management
      </h3>

      <div>
        <Button onClick={logOut} variant={"destructive"}>Logout</Button>
      </div>
      
    </header>
  );
};
