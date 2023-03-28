require_relative 'mixins/four_id_generator.rb'

Accession.class_eval do
  include FourIdGenerator

  def create_from_json(json, opts)
    if !FourIdGenerator.inside_import?
      if AppConfig[:aspace_identifiers_behavior] == 'original'
        json[:id_2] = nil
      else
        json[:id_1] = nil
      end
    end

    super
  end

  def update_from_json(json, *other_args)
    if AppConfig[:aspace_identifiers_behavior] == 'original'
      json[:id_2] = nil

      # don't get a new sequence unless id_0 or id_1 has changed
      if self[:identifier]
        identifier = Identifiers.parse(self[:identifier])
        if [identifier[0], identifier[1]] == [json[:id_0], json[:id_1]]
          json[:id_2] = identifier[2]
        end
      end
    end

    super
  end

end

Accession.properties_to_auto_generate.push ({
  :property => :id_0,
  :generator => FourIdGenerator.accession_fy_generator,
  :only_if => proc { true }
})

Accession.properties_to_auto_generate.push ({
  :property => :id_1,
  :generator => FourIdGenerator.sequence_generator,
  :only_if => proc {|json| !FourIdGenerator.inside_import? && ( json[:id_1].nil? || json[:id_1] === 'XXXX' ) }
})

Accession.properties_to_auto_generate.push ({
  :property => :id_2,
  :generator => AppConfig[:aspace_identifiers_behavior] == 'original' ? FourIdGenerator.id_2_generator : FourIdGenerator.import_generator,
  :only_if => proc {|json| !FourIdGenerator.inside_import? && json[:id_2].nil? && !json[:id_1].nil? }
})
