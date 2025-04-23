import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Session({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!currentUser) {
      navigate("/Kambaz/Account/Signin");
    }
    setPending(false);
  }, [currentUser]);
  
  if (!pending) {
    return children;
  }
}
