class CategoriesController < ApplicationController
  before_action :force_json_format

  # GET /categories
  def index
    @categories = Category.arrange_serializable(order: :position)

    render json: { categories: @categories.to_json }
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
