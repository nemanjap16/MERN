import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GoalForm from "../components/GoalForm";
import Goal from "../components/Goal";

import { getGoals, reset } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="section heaading">
        <h1>Welcome {user?.name}</h1>
        <p>Golas Dashboard</p>
      </div>
      <GoalForm />
      <section className="section">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <Goal className="goal" key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>No goals yet</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
