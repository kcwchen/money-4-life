class ChangeAmountColumnInBudgets < ActiveRecord::Migration[6.1]
  def change
    change_column :budgets, :amount, :bigint
  end
end
