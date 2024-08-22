import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("user-id");

        if (!isLoggedIn) {
            router.push("/"); // Redirect to login page if not logged in
        }
    }, [router]);
};

export default useAuth;
