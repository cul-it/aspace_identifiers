Aspace Identifiers
----------------------

# Note
Forked from University of Maryland (https://github.com/umd-lib/aspace_yale_accessions)
with incorporated changes from original repo: https://github.com/hudmol/aspace_yale_accessions

Includes additional changes
1. updated tag manager js library
1. updated handling of repository menu insertion
1. updated js
1. renaming to better reflect the plugin intention and use
1. runs under proxy
1. adds additional configuration to 
    - enable original Yale behavior or UMD four-part behavior
    - enable resources id behavior

# Getting Started

Unzip the release and move it to:

    /path/to/archivesspace/plugins

Unzip it:

    $ cd /path/to/archivesspace/plugins
    $ unzip aspace_identifiers.zip -d aspace_identifiers

Enable the plugin by editing the file in `config/config.rb`:

    AppConfig[:plugins] = ['some_plugin', 'aspace_identifiers']

(Make sure you uncomment this line (i.e., remove the leading '#' if present))

See also:

  https://github.com/archivesspace/archivesspace/blob/master/plugins/README.md

You will need to shutdown archivesspace and migrate the database:

     $ cd /path/to/archivesspace
     $ scripts/setup-database.sh

See also:

  https://github.com/archivesspace/archivesspace/blob/master/UPGRADING.md

# How it works

Users with "Manage Repository" permissions will see a new menu item in the
Repository settings menu (click the gear icon to the right of the selected
repository). Use the "Department Codes" setting to add and remove codes for
your Repository.

Department codes will appear in a dropdown for the second (or third, if configured to
`four-part` behavior) part of the Accession identifier. If resources are enabled, the 
department codes will appear in the second part of the Resource identifier.

If configured to `original` behavior, the first and third sections of the identifier 
will be system generated upon saving the record. The fourth section will be removed.

If configured to `four-part` behavior, the first and second sections of the identifier 
will be system generated.

If resources are enabled, the first section of the Resource identifier will be
system generated.

# Configuration

Set `AppConfig[:aspace_identifiers_behavior]` sets the behavior of the accessions
identifier script to either `original` Yale behavior (three parts) or UMD's
`four-part` behavior. Defaults to `original`.

Set `AppConfig[:aspace_identifiers_enable_resources]` to `true` to enable identifer 
scripting on resources as in the UMD version of the plugin. Defaults to `false`.

# Increasing sequence numbers

If you've imported existing records into the system, you may need to
manually set the sequence numbers for your records so that the
auto-generated IDs don't clash with existing ones.

Suppose you have a department code called 'ycal'.  You can insert a
new sequence starting from 100 for 2015 with some SQL:

     insert into sequence (sequence_name, value) values ('yale_accession_2015_ycal', 100);

Or, if that sequence already exists, update it:

     update sequence set value = 100 where sequence_name = 'yale_accession_2015_ycal';
