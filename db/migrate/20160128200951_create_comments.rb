class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :description
      t.string :author_name
      t.integer :author_id
      t.references :commentable, polymorphic: true, index: true
      t.timestamps null: false
    end
    add_index(:comments, :author_id)
  end
end
