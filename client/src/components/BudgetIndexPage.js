import React, { useState, useEffect, useContext } from 'react';
import NewBudgetForm from './NewBudgetForm';
import { Budget } from '../requests';
import AuthContext from '../context/auth-context';

const BudgetIndexPage = (props) => {
  // const { currentUser } = props;
  const ctx = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    Budget.index().then((data) => {
      console.log(data);
    });
    if (ctx.user) {
      setBudgets(ctx.user.budgets);
    }
  }, [ctx.user, budgets]);

  const handleNewBudget = (params) => {
    Budget.create(params).then((data) => {
      console.log(data);
      window.location.reload();
    });
  };

  return (
    <div>
      {!ctx.user ? (
        <h1>You haven't made a Budget yet</h1>
      ) : (
        <>
          <h1>Your Total Monthly Budget is ${ctx.user.total_budget / 100}</h1>
          {budgets.map((budget) => {
            return (
              <h3 key={budget.id}>
                ${budget.amount / 100} - {budget.category}
              </h3>
            );
          })}
          <NewBudgetForm createBudget={handleNewBudget} />
        </>
      )}
    </div>
  );
};

export default BudgetIndexPage;
