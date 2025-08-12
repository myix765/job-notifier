import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <>
      <div className="w-full self-start">
        <div className="mb-11 flex justify-between">
          <div>
            <h1 className="mb-1">Alert Dashboard</h1>
            <h3>Manage your alerts</h3>
          </div>
          <Button onClick={handleSignOut}>Logout</Button>
        </div>
        <DashboardContainer />
      </div>
    </>
  )
}

export default Dashboard;