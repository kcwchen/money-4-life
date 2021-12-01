import React, { useState, useEffect } from 'react';
import NewBudgetForm from './NewBudgetForm';

const BudgetIndexPage = (props) => {
  const { currentUser } = props;
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setBudgets(currentUser.budgets);
    }
  }, [currentUser]);

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
          <NewBudgetForm />
        </>
      )}
    </div>
  );
};

export default BudgetIndexPage;
