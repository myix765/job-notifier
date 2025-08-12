import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";
import { AUTH_ROUTES } from "@/routes/constants";
import { useAuth } from "@/hooks/useAuth";

const ConfirmEmail = () => {
  const { confirmEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;

  useEffect(() => {
    if (!email) {
      navigate(AUTH_ROUTES.SIGNIN)
    };
  }, [navigate, email]);

  const handleResendConfirmation = async () => {
    await confirmEmail(email);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Confirm Email</CardTitle>
        <CardDescription>
          A confirmation link has been sent to your email. Click the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Didn't receive an email?</p>
        <Button
          className="mt-2 w-full"
          onClick={handleResendConfirmation}
        >Resend Email</Button>
      </CardContent>
    </Card>
  )
};

export default ConfirmEmail;
