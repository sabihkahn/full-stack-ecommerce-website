import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CheckisLogined = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/userprofile`,
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            if (response.data.user.role == 0) {
                console.log(response.data.user);
                navigate('/shop')
            } else if (response.data.success && response.data.user.role == 1) {
                navigate('/admin')
            }
            else {
                console.error("Failed to fetch profile data");
                navigate('/login')
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
            ('/login')
        }
    };

    useEffect(() => {
        fetchProfileData()
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    return <>{children}</>;
};

export default CheckisLogined;
//     const fetchProfileData = async () => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_BASE_URL}/userprofile`,
//                 {
//                     headers: {
//                         Authorization: `${token}`,
//                     },
//                 }
//             );
// console.log(response)
//             if (response.data.success && response.data) {
//                 // navigate('/shop')
//             } else {
//                 console.error("Failed to fetch profile data");
//             }
//         } catch (error) {

//             console.error("Error fetching profile data:", error);

//         }
//     };
