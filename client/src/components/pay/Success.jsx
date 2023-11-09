import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../functions/newRequest.js";
import { Helmet } from "react-helmet";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const dates = params.get("dates");

  let newDates = [];

  for (let i = 0; i < dates.split(",").length; i++) {
    const dateParts = dates.split(",")[i].split(" ");
    const formattedDate = `${dateParts[3]}-${getMonthNumber(dateParts[1])}-${dateParts[2]}`;
    newDates.push(formattedDate);
  }

  function getMonthNumber(month) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    return months[month];
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/reserve", { payment_intent, newDates });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Schierhuys | Betaling gelukt!</title>
      </Helmet>
      Hartelijk bedankt voor uw bestelling, u krijgt per email een bevestiging
      en wordt binnen enkele seconden doorverwezen
    </div>
  );
};

export default Success;
