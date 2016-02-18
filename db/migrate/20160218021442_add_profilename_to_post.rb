class AddProfilenameToPost < ActiveRecord::Migration
    def change
      add_column :posts, :profile_name, :string
    end
end
