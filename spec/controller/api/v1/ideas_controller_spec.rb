require "rails_helper"

RSpec.describe Api::V1::ItemsController, type: :request do
  fixtures :ideas
  describe "GET index" do
    it "can get all items" do

      expect(response.status).to eq 200

      ideas = JSON.parse(response.body)
      # title, a body, and a quality.

      expect(ideas.first["title"]).to eq "Second Idea"
      expect(ideas.first["body"]).to eq "Second Body"
      expect(ideas.first["quality"]).to eq "Second Quality"
    end
  end
end
