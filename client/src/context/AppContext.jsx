import { createContext, useState} from "react";
import {useAuth} from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useUser , useClerk} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { getToken } = useAuth();
    const [credit, setCredit] = useState(false);
    const [image, setImage] = useState(false);
    const [resultImage, setResultImage] = useState(false);
    const {isSignedIn} = useUser();
    const {openSignIn} = useClerk();
    const navigate = useNavigate();

    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + "/api/user/credits", { headers: { token } });
            if (data.success) {
                setCredit(data.credits);
                console.log(data.credits);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error loading credits");
        }
    }


    const removeBg = async(image) => {
        try {
            if(!isSignedIn){
                return openSignIn();
            }
            console.log(image);
            setImage(image);
            setResultImage(false);
            navigate('/result');

            const token = await getToken();  //await was missing 
            const formdata = new FormData();

            image && formdata.append('image', image);

            const data = await axios.post(backendUrl + '/api/image/remove-bg', formdata, {
                headers : {token}
            })

            if(data.success){
                setResultImage(data.resultImage);
                data.creditBalance && setCredit(data.creditBalance);
            }else{
                toast.error(data.message);
                data.creditBalance && setCredit(data.creditBalance);
                if(data.creditBalance === 0){
                    navigate('/buy');
                }
            }

        } catch (error) {
            console.log(error.message);
            toast.error("Error removing background");
        }
    }

    const value = {
        credit, setCredit, loadCreditsData, backendUrl, image, setImage, removeBg, resultImage, setResultImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;