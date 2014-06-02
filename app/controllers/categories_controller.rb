class CategoriesController < AdminController
  before_action :force_json_format

  # GET /categories
  def index
    @categories = Category.roots.order(position: :asc)

    render json: @categories
  end

  # GET /categories/:id
  def show
  end

  # POST /categories
  def create
    @category = Category.new category_params
    if @category.save
      render json: @category
    else
      render json: { error: @category.errors }, status: :bad_request
    end
  end

  # PATCH /categories/:id
  def update
  end

  # DELETE /categories/:id
  def destroy
  end

  private

  def category_params
    params.require(:category).permit(:name, :ancestry, :position)
  end

end
