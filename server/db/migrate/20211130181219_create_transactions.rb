class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.decimal :amount
      t.text :description
      t.boolean :is_subscription, default: false
      t.references :user, null: false, foreign_key: true
      t.references :account, null: false, foreign_key: true
      t.references :subscription, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
