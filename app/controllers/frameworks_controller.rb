class FrameworksController < ApplicationController
  def angular
    @tasks = Task.all
  end
end