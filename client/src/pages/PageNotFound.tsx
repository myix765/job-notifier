import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { PRIVATE_ROUTES } from "@/routes/constants";

const PageNotFound = () => {
  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <Button className="mt-6" asChild>
          <Link to={PRIVATE_ROUTES.DASHBOARD}>Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;