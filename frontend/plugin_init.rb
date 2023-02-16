ArchivesSpace::Application.extend_aspace_routes(File.join(File.dirname(__FILE__), "routes.rb"))

Rails.application.config.after_initialize do

    if AppConfig.has_key?(:aspace_identifiers_behavior)
      unless ['four-part','original'].include? (AppConfig[:aspace_identifiers_behavior])
        AppConfig[:aspace_identifiers_behavior] = 'original'
      end
    else
        AppConfig[:aspace_identifiers_behavior] = 'original'
    end
  
    if AppConfig.has_key?(:aspace_identifiers_enable_resources)
        unless AppConfig[:aspace_identifiers_enable_resources] === true
            AppConfig[:aspace_identifiers_enable_resources] = false
        end
    else
        AppConfig[:aspace_identifiers_enable_resources] = false
    end
end
