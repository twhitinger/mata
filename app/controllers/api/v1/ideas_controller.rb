class Api::V1::IdeasController < ApiBaseController

  def index
    render json: Idea.all
  end

  def show
    render json: Idea.find(params["id"])
  end

  def create
    render json: Idea.create(idea_params)
  end

  def update
    render json: Idea.update(params["id"], idea_params)
  end

  def destroy
    render json: Idea.destroy(params[:id])
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end

end
