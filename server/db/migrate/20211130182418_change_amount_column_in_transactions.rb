class ChangeAmountColumnInTransactions < ActiveRecord::Migration[6.1]
  def change
    change_column :transactions, :amount, :bigint
  end
end
