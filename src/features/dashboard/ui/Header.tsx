import { Button } from "@nextui-org/react";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../../auth/model/store/auth.store";
import { useAuth } from "../../auth/model/useAuth";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-16 bg-foreground/90 px-6 shadow-md backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-background tracking-tight">
        Аугментация изображений
      </h1>
      <div className="flex items-center gap-5">
        <p className="text-background/90 font-medium">
          {user && user?.email}
        </p>
        {user && (
          <Button 
            isIconOnly
            variant="flat" 
            color="default" 
            onClick={logout}
            className="bg-background/90 hover:bg-background/60 transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
