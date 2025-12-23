import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useEffect } from "react";

const Premium =() => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(()=> {
        verifyPremiumUser();
    }, []);

    const verifyPremiumUser = async () => {
        const res = await axios.get(BASE_URL + "/premium/verify", {withCredentials: true,});
        if (res.data.isPremium) {
         setIsUserPremium(true);
        }
    };

    const handleBuyClick = async (type) => {
       const order = await axios.post(BASE_URL + "/payment/create", { membershipType: type,}, {withCredentials: true });
       const {amount, keyId, currency, notes, orderId} = order.data;

    //    it should open the Razorpay Dialog Box
    const options = {
        key: keyId,
        amount,
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId,
        prefill: {
            name: notes.firstName + " " + notes.lastName ,
            email: notes.emailId,
            contact: '9999999999',
        },
        theme: {
            color: '#f37254'
        },
        handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    };

    return   isUserPremium ?  (
        "You're  already a premium user"
    ) : (
   <div className=" min-h-screen bg-[url('https://images.unsplash.com/photo-1734277659521-2985326528d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzYwfHxsYXJnZSUyMGhlaWdodCUyMGFuZCUyMHdpZHRoJTIwaGQlMjBiYWNrZ3JvdW5kJTIwaW1hZ2UlMjBmb3IlMjBzaWx2ZXIlMjBvciUyMGdvbGQlMjBtZW1iZXJzaGlwJTIwcGFnZXxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center pt-8 flex justify-center items-center">
        <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center mx-30">
    <h1 className="font-bold text-3xl">Silver Membership</h1>
    <ul>
        <li> - Chat with other people</li>
        <li> - 100 connection Requests per day</li>
        <li> - Blue Tick</li>
        <li> - 3 months</li>
    </ul>
    <button  onClick={() =>handleBuyClick("silver")} className="btn btn-secondary">Buy Silver</button>
    </div>
  <div className="divider lg:divider-horizontal before:bg-white after:bg-white before:h-1 after:h-1">OR</div>
  <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center mx-30">
    <h1 className="font-bold text-3xl">Gold Membership</h1>
    <ul>
        <li> - Chat with other people</li>
        <li> - Infinite connection Requests per day</li>
        <li> - Blue Tick</li>
        <li> - 6 months</li>
    </ul>
    <button  onClick={() =>handleBuyClick("gold")} className="btn btn-primary">Buy Gold</button>
    </div>
</div>
</div> 
    
 
    );
};
export default Premium;