import DashboardContainer from "@/components/dashboardContainer/DashboardContainer";

const Dashboard = () => {
  return (
    <>
      <div>
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