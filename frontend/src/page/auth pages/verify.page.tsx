import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import  AuthService  from "../../service/auth.service";
import { Spinner } from "@/components/spinner"; 
import NotFoundPage from "../not found/not-found.page";
import { ApiError } from "../../utils/axiosError.util";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";


function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();
  const [error, setError] = useState("");
    const checkAuth = useAuthStore((s) => s.checkAuth)
    console.log('verify email')
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    async function verify() {
      if (!token || !email || hasVerifiedRef.current) return;

      hasVerifiedRef.current = true;

      try {
        await AuthService.verifyEmail(email, token);

        checkAuth();
        setTimeout(() => {
          navigate("/");
        }, 3000);

      } catch (err) {

        if (err instanceof ApiError) toast.error(err.message);
        navigate('*')
        setError("Verification failed. Try again .");
        
      }
    }

    verify();
  }, [token, email, navigate]);

  if (error) return <NotFoundPage  />;
  return <Spinner fullScreen size="large" variant="theme" />;
}

export default VerifyEmail;
