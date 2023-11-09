import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../functions/newRequest.js';

const Success = () => {

    const {search} = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get('payment_intent');
    const dates = params.get('dates')


    useEffect(() => {
        const makeRequest = async () => {
          try {
            console.log("enters")
            await newRequest.put("/reserve", { payment_intent , dates});
         setTimeout(() =>{
            navigate("/");
            
         }, 5000)

          } catch (err) {
            console.log(err);
          }
        };
    
        makeRequest();
      }, []);

  return (
    <div>
        Hartelijk bedankt voor uw bestelling, u krijgt per email een bevestiging en wordt binnen enkele seconden door verwezen
    </div>
  )
}

export default Success