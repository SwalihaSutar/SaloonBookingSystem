import React, { useState } from "react";
import OwnerRegister from "./OwnerRegister"; // your owner register component
import OwnerLogin from "./OwnerLogin"; // your owner login component
import AddSalon from "./AddSalon"; // your add salon form

const AddSalonFlow = () => {
  const [step, setStep] = useState("register"); // register → login → add

  const handleRegisterSuccess = () => {
    setStep("login");
  };

  const handleLoginSuccess = () => {
    setStep("add");
  };

  return (
    <div>
      {step === "register" && (
        <OwnerRegister onSuccess={handleRegisterSuccess} />
      )}
      {step === "login" && <OwnerLogin onSuccess={handleLoginSuccess} />}
      {step === "add" && <AddSalon />}
    </div>
  );
};

export default AddSalonFlow;
