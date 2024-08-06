"use client";

import axios from "axios";
import { useState } from "react";
import { cleanUser } from "@/libs/cleanUser";
import { useEffect } from "react";
import UserCard from "@/components/UserCard";
import { UserCardProps } from "@/libs/types";
import { nanoid } from "nanoid";

export default function RandomUserPage() {
  // annotate type for users state variable
  const [users, setUsers] = useState<any>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState<number>(1);

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/cleanUser
    //Then update state with function : setUsers(...)
    const cleanedUser = users.map((id:number) => cleanUser(id));
    setUsers(cleanedUser);
  };

  useEffect(() => {
    if (isFirstLoad){
      setIsFirstLoad(false);
      return;
    }
    const AmountStr = JSON.stringify(genAmount);
    localStorage.setItem("genAmount", AmountStr);
  },[genAmount]);

  useEffect(() => {
    const AmountStr = localStorage.getItem("genAmount");
    if(AmountStr === null) {
      setGenAmount(1);
      return;
    }
    const finalAmount = JSON.parse(AmountStr);
    setGenAmount(finalAmount);
  },[]);

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="Number"
          onChange={(e) => setGenAmount(Number(e.target.value))}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map((users:UserCardProps) => (
        <UserCard 
          key={users.email} 
          name={users.name}
          imgUrl={users.imgUrl}
          address={users.address}
          email={users.email} 
        />
      ))}
    </div>
  );
}
