class AddUserNameToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :author_name, :string
  end
end
