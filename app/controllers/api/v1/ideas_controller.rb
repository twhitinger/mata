class Api::V1::IdeasController < ApiBaseController

  def index
    render json: Idea.all
  end

end
