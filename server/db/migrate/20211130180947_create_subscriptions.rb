class CreateSubscriptions < ActiveRecord::Migration[6.1]
  def change
    create_table :subscriptions do |t|
      t.string :name
      t.boolean :is_active, default: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
