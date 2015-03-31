class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    render json: Task.all, status: :ok
  end

  def create
    render json: Task.create(task_params)
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    render json: task
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