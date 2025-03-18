import React from "react";
import CardApplies from "./CardApplies";
import State from "../../utils/State";

const FreelancerApplies = ({ freelancer }) => {
  console.log(freelancer);
  const applies = freelancer?.applies?.filter(
    (apply) =>
      apply.status == State.Apply.PENDING || apply.status == State.Apply.WORKING
  )

  return (
    <>
      {freelancer?.applies?.length > 0 ? (
        applies.map((apply) => <CardApplies key={apply.id} apply={apply} />)
      ) : (
        <div>Hiện tại không có công việc nào!</div>
      )}
    </>
  );
};

export default FreelancerApplies;
