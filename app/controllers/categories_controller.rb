class CategoriesController < AdminController
  before_action :force_json_format

  # GET /categories
  def index
    parent_id = params[:parent_id] || params[:id] || nil

    if parent_id && parent_id.to_i > 0
      root = Category.where(id: parent_id.to_i).first
      if root
        @categories = root.children.order(position: :asc)
      else
        @categories = []
      end
    else
      @categories = Category.roots.order(position: :asc)
    end

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
      render_error @category.errors.full_messages.join('\n')
    end
  end

  # PATCH /categories/:id
  def update
    @category = Category.where(id: params[:id]).first

    if @category.update category_params
      render json: @category
    else
      render_error @category.errors.full_messages.join('\n')
    end
  end

  # DELETE /categories/:id
  def destroy
    @category = Category.where(id: params[:id]).first

    if @category.nil?
      render_error '结点不存在，请刷新页面或刷新目录树！' && return
    end

    if @category.has_children?
      render_error '此目录有子目录，不能删除！'
    elsif @category.destroy
      render json: { success: true }
    else
      render_error @category.errors.full_messages.join('\n')
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :ancestry, :position)
  end

end
