class TasksController < ApplicationController
  def index
    render json: Task.all, status: :ok
  end

  def create
    Task.create(task_params)

    head(200)
  end

  def update
    Task.find(params[:id]).update(task_params)

    head(200)
  end

  def destroy
    Task.find(params[:id]).destroy!

    head(200)
  end

  private

  def task_params
    params.permit(:title, :is_done)
  end
end