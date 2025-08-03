import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";
import { supabase } from "@/lib/supabaseClient";
import type { Alert } from "@/components/dashboardContainer/types";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  console.log(JSON.stringify(user, null, 2));

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!user) return;

      const res = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user?.id)

      if (res.error) {
        console.error("Error fetching alerts:", res.error);
        return;
      }
      setAlerts(res.data);
    }

    fetchAlerts();
    console.log("Fetched alerts:", alerts);
  }, [user])

  return (
    <>
      <div className="w-full self-start">
        <div className="mb-11">
          <h1 className="mb-1">Alert Dashboard</h1>
          <h3>Manage your alerts</h3>
        </div>
        <DashboardContainer alerts={[]} />
      </div>
    </>
  )
}

export default Dashboard;