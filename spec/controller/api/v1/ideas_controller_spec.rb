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

  describe "Get show" do
    it "can get single specified idea" do
      idea = ideas(:one)
      id = idea.id

      get "/api/v1/ideas/#{id}"

      expect(response.status).to eq 200

      idea = JSON.parse(response.body)

      expect(idea["title"]).to eq "First Title"
      expect(idea["body"]).to eq "First Body"
      expect(idea["quality"]).to eq "First Quality"
    end
  end

  describe "Post create" do
    it "can create a new idea" do
      title = "muck"
      body = "luck"

      params = {
        title: title,
        body: body
      }

      post "/api/v1/ideas", params

      expect(response.status).to eq 200
      idea = JSON.parse(response.body)

      expect(idea["title"]).to eq title
      expect(idea["body"]).to eq body
      expect(idea["quality"]).to eq "swill"
    end
  end

  describe "Get update" do
    it "can update a idea" do
      idea = ideas(:one)
      id = idea.id
      title = "mata"
      body = "data"
      params = {
        title: title,
        body: body
      }

      get "/api/v1/ideas/#{id}/edit", params

      expect(response.status).to eq 200
      idea = JSON.parse(response.body)

      expect(idea["title"]).to eq title
      expect(idea["body"]).to eq body
    end
  end

  describe "Delete destroy" do
    it "can delete a idea" do
      idea = ideas(:one)
      id = idea.id
      expect(Idea.count).to eq 2
      delete "/api/v1/ideas/#{id}"

      expect(response.status).to eq 200
      expect(Idea.count).to eq 1
    end
  end
end
