class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :type
      t.text :message
      t.boolean :is_seen, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
