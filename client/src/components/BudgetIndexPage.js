import React, { useState, useEffect } from 'react';
import NewBudgetForm from './NewBudgetForm';
import { Budget } from '../requests';

const BudgetIndexPage = (props) => {
  const { currentUser } = props;
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    Budget.index().then((data) => {
      console.log(data);
    });
    if (currentUser) {
      setBudgets(currentUser.budgets);
    }
  }, [currentUser, budgets]);

  const handleNewBudget = (params) => {
    Budget.create(params).then((data) => {
      console.log(data);
      window.location.reload();
    });
  };

  return (
    <div>
      {!currentUser ? (
        <h1>You haven't made a Budget yet</h1>
      ) : (
        <>
          <h1>
            Your Total Monthly Budget is ${currentUser.total_budget / 100}
          </h1>
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
