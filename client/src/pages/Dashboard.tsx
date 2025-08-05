import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";
import { supabase } from "@/lib/supabaseClient";
import type { Alert } from "@/components/dashboardContainer/types";

const Dashboard = () => {
  const { session } = useContext(AuthContext);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const user = session?.user;
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
  }, [session])

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