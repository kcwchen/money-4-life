class CreateBudgets < ActiveRecord::Migration[6.1]
  def change
    create_table :budgets do |t|
      t.decimal :amount

      t.timestamps
    end
  end
end
