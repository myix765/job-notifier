import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // const [alerts, setAlerts] = useState<Alert[]>([]);
  const { signOut } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchAlerts = async () => {
  //     const user = session?.user;
  //     if (!user) return;

  //     const res = await supabase
  //       .from('alerts')
  //       .select('*')
  //       .eq('user_id', user?.id)

  //     if (res.error) {
  //       console.error("Error fetching alerts:", res.error);
  //       return;
  //     }
  //     setAlerts(res.data);
  //   }

  //   fetchAlerts();
  //   console.log("Fetched alerts:", alerts);
  // }, [session])

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
        <DashboardContainer alerts={[]} />
      </div>
    </>
  )
}

export default Dashboard;