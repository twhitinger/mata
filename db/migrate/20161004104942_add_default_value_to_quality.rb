class AddDefaultValueToQuality < ActiveRecord::Migration[5.0]
  def change
    change_column :ideas, :quality, :string, :default => "swill"
  end
end
