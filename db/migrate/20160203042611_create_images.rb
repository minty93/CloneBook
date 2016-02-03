class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.text :description
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index(:images, :user_id)
  end

end
