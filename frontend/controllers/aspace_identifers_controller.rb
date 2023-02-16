class AspaceIdentifiersController < ApplicationController

  set_access_control "manage_repository" => [:department_list_update]
  set_access_control "view_repository" => [:department_list, :index]

  def index
    department_list
  end

  def department_list
    @department_list = JSONModel(:department_list).all[0]

    respond_to do |format|
      format.html { render "department_list/edit" }
      format.json { render :json => @department_list }
    end
  end


  def department_list_update
    department_list_id = JSONModel(:department_list).id_for(params['department_list_uri'])
    department_list = JSONModel(:department_list).find(department_list_id)
    department_list.codes = params['department_codes'].split(',')

    department_list.save

    render :json => department_list
  end
    
end
