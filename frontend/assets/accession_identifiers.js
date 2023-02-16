class AccessionIdentifiers {
    constructor(new_record, behavior) {
        this.ids = $('div.identifier-fields');
        this.ids.addClass('form-inline');
        this.id_0 = $('#accession_id_0_');
        this.id_1 = $('#accession_id_1_');
        this.id_2 = $('#accession_id_2_');
        this.id_3 = $('#accession_id_3_');

        this.behavior = behavior; 
        this.new_record = new_record;
    }


    disable($field) {
        $field.attr('readonly', 'readonly');
        $field.attr('tabindex', '-1');
        $field.on("focus", function(e) {
            $(this).blur();
            e.stopPropagation();
        });

        $field.on("change", function(e) {
            e.stopPropagation();
        });
    }


    init() {
        const self = this;

        if (self.new_record) {
            self.ids.removeClass('required');
            self.disable(self.id_0);
            if (self.behavior == 'four-part') {
                self.disable(self.id_1);

                if (!self.id_1.val().length) {
                self.id_1.removeAttr('disabled');
                self.id_1.val('XXXX');
                }
            }
            else {
                self.ids.removeClass('required');
                self.disable(self.id_0);
                self.disable(self.id_2);

                if (!self.id_2.val().length) {
                    self.id_2.val('XXXX');
                }
            }

            const date = $('#accession_accession_date_').val();
            if (date.length) {
                self.update_fiscal_year(date);
            }

            // Whenever the accession date changes, update id_0 with the fiscal year
            const $fld = $('input#accession_accession_date_');

            $fld.change( function(event) {
                self.update_fiscal_year($fld.val());
            });

            const $btn = $fld.next('button');

            $btn.datepicker().on("changeDate", function() {
                self.update_fiscal_year($fld.val());
            });
        }

        if (self.behavior != 'four-part') {
            $('#accession_id_3_').hide();
        }
        self.load_department_codes();
    }


    load_department_codes() {
        const self = this
        const acc_part = self.behavior == 'four-part' ? '2' : '1';
        $.ajax({
            url: APP_PATH + "plugins/aspace_identifiers/department_codes",
            data: {},
            dataType: 'json',
            type: "GET",
            success: function(department_list) {
                const codes = department_list.codes;
                const current_code = $('#accession_id_' + acc_part + '_').val();

                // Deprecated department codes
                if (current_code.length && $.inArray(current_code, codes) < 0) {
                    codes.push(false);
                    codes.push(current_code);
                }

                if (codes.length > 1) {
                    let html = "<select id=\"accession_id_" + acc_part + "_\" name=\"accession[id_" + acc_part + "]\">";
                    $.each(codes, function(i, code) {
                        if (code == current_code) {
                            html += "<option value=\"" + code + "\" selected=\"selected\">" + code + "</option>";
                        } else if (code == false) {
                            html += "<option disabled>&#9472;</option>";
                        } else {
                            html += "<option value=\"" + code + "\">" + code + "</option>";
                        }

                    });

                    html += "</select>"
                    $('#accession_id_' + acc_part + '_').replaceWith(html);
                    if (self.behavior == 'four-part') {
                        $('#accession_id_3_').removeAttr('disabled');
                    }
                } else if (codes.length == 1) {
                    $('#accession_id_' + acc_part + '_').val(codes[0]);
                    $('#accession_id_' + acc_part + '_').removeAttr('disabled');
                    self.disable($('#accession_id_' + acc_part + '_'));
                    if (self.behavior == 'four-part') {
                        $('#accession_id_3_').removeAttr('disabled');
                    }
                } else {
                    $('#accession_id_' + acc_part + '_').attr('disabled', 'disabled');
                }
            },
        });
    }


    update_fiscal_year(date_string) {
        if (!date_string) {
            this.id_0.val('');
            return;
        }

        const year = parseInt(date_string.substr(0, 4));
        const month = parseInt(date_string.substr(5, 2));

        const fyear = (month > 6 && year + 1) || year;

        this.id_0.val(fyear);
    }
}
