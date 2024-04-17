import { Button } from "@material-tailwind/react";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";

function BuyButton({ onClickHandler }) {
  const { user } = useContext(UserContext);
  const a = () => {
    window.open("/subscriptions/quicker/", "_blank", "noreferrer");
  };
  const b = () => {
    window.open("/subscriptions/quicker/", "_blank", "noreferrer");
  };
  const handleCancelSubscription = () => {
    onClickHandler();
    // window.open('/subscriptions/quicker/', '_blank', 'noreferrer');
  };
  // Paste the stripe-buy-button snippet in your React component
  return (
    <>
      {user.subscriptions !== undefined &&
      user.subscriptions.indexOf("quicker") === -1 ? (
        <Button
          className="bg-green-700 mt-3 align-middle sm:mt-0 md:mt-0 lg:mt-0"
          onClick={a}
        >
          Quicker Monthly
        </Button>
      ) : (
        <>
          <span className="font-semibold text-black dark:text-white text-sm">
            Quicker
          </span>
          <span className="flex text-gray-500 dark:text-gray-400 text-sm mb-2">
            You already have a Monthly Quicker subscription
          </span>
          <Button
            className="bg-green-700 mt-3 align-middle sm:mt-0 md:mt-0 lg:mt-0"
            onClick={handleCancelSubscription}
          >
            Cancel subscription
          </Button>
        </>
      )}
      {/* <Button className='bg-green-700 ml-2 mt-3 align-middle sm:mt-0 md:mt-0 lg:mt-0' onClick={b}>Quicker Yearly </Button> */}
    </>
    // <stripe-buy-button
    //     buy-button-id="buy_btn_1ONNM2KwKqN5WBN1vNRrBBnC"
    //     publishable-key="pk_test_4z52MZdkWrwvVbGFlPdRUIaL002t53Szbt"
    // >
    // </stripe-buy-button>
  );
}

export default BuyButton;
