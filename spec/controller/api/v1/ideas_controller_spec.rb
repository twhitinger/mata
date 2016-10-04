require "rails_helper"

RSpec.describe Api::V1::IdeasController, type: :request do
  fixtures :ideas
  describe "GET index" do
    it "can get all items" do
      
      get '/api/v1/ideas'
      expect(response.status).to eq 200

      ideas = JSON.parse(response.body)
      # title, a body, and a quality.

      expect(ideas.first["title"]).to eq "First Title"
      expect(ideas.first["body"]).to eq "First Body"
      expect(ideas.first["quality"]).to eq "First Quality"
    end
  end
end
