class FrameworksController < ApplicationController
  before_action :set_tasks

  def angular; end

  def flux; end

  def ember; end

  private

  def set_tasks
    @tasks = Task.all
  end
end