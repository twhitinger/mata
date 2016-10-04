class Idea < ApplicationRecord
  before_save :truncate_col

  def truncate_col
    self.body = body[0...100].gsub(/\s\w+\s*$/, "")
  end
end
