import { Button } from "@nextui-org/react";
import { useAuth } from "../../../features/auth/model/useAuth";
import { useAuthStore } from "../../../features/auth/model/store/auth.store";
import Header from "../../../features/dashboard/ui/Header";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Header />
      <div className="h-full bg-background p-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">Dashboard</h1>
        {user && (
        <div className="mb-4">
          <p>Welcome, {user.email}</p>
        </div>
      )}
      <div className="flex gap-4">
        <Button onClick={logout} color="primary">
          Logout
        </Button>
      </div>
    </div>
    </>
  );
};
