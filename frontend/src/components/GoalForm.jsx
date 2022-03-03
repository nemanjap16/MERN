import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const [goal, setGoal] = useState("");

  const dispatch = useDispatch();

  const sendGoal = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text: goal }));
    setGoal("");
  };

  return (
    <div>
      <section className="form">
        <form onSubmit={sendGoal}>
          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="text"
              name="text"
              value={goal}
              id="goal"
              placeholder="Create a goal"
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default GoalForm;
