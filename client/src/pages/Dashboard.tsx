import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(JSON.stringify(user, null, 2));

  return (
    <>
      <div className="w-full self-start">
        <div className="mb-11">
          <h1 className="mb-1">Alert Dashboard</h1>
          <h3>Manage your alerts</h3>
        </div>
        <DashboardContainer />
      </div>
    </>
  )
}

export default Dashboard;