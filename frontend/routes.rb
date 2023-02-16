ArchivesSpace::Application.routes.draw do
  [AppConfig[:frontend_proxy_prefix], AppConfig[:frontend_prefix]].uniq.each do |prefix|
    scope prefix do
      match 'plugins/aspace_identifiers' => 'aspace_identifiers#index', :via => [:get]
      match 'plugins/aspace_identifiers/department_codes' => 'aspace_identifiers#department_list', :via => [:get]
      match 'plugins/aspace_identifiers/department_codes' => 'aspace_identifiers#department_list_update', :via => [:post]
    end
  end
end
