class ChangeColumnSubscriptionIdInTransactions < ActiveRecord::Migration[6.1]
  def change
    change_column_null :transactions, :subscription_id, true
  end
end
