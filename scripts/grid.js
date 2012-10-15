/******

#JS_Grid
####Rapidly create fully featured forms, tables, form-table controls and charts.

There are several times when we represent data in a table. And we have to perform loops and create table rows. However that is just representing data in a basic format. There are several instances when we want to filter table data, or sort them, etc. 

Since this is a repetitive task I thought of writing some code. I wrote this very quickly, so it may not be very well written, but gets the work done nicely very often. I am still working on this, but read on to see what all can be done at this point of time

GRID - Can be used to rapidly deploy forms, tables, form-table controls, and now charts.

#### Works very well with Twitter Bootstrap CSS
By default, the tables and forms generated will look plain. So you can use your own CSS styles with them. If you want to save time and plough through quickly, then you can just include Twitter Bootstrap CSS and see the tables transform.

#### Example Call

Here is an example of a call

	renderGrid ({"id": "myGrid",		// target where grid will be rendered
		"label": label,						// heading or label in table or form resp
		"data": data,						// Data as array of objects or object
		"element_type": element_type,		// Object with data types for rendering (see above)
		"qbeEnabled": qbeEnabled,			// Array with true/false for Query By Example
		"multiSelect": false,				// Flag indicating if multiple rows or single can be selected
		"container": "table"				// container = table/form - Control to be rendered
	});


####Id
All you need to do from your side is create an empty Div with an Id, which is passed along as the ID parameter above.

####Data
Array while rendering table/chart should be provided as a JSON. An example is provided here
(Not providing Data field will result in empty data automatically)

*data format 1*

	var data = [
		{"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"},
		{"name":"Amod", "age":"29", "dept":"EC", "lastname": "Pandey"},
		{"name":"Balu", "age":"32", "dept":"ME", "lastname": "S"}
	];

Each element of the JSON is a row, and elements of each of them is a column.

Data - Object while rendering form

*data format 2*

var data = {"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"};

####Label
label is a REQUIRED field. Used for heading of columns in table and label in form, indexes in a chart
var label = {"name":"Name", "age":"Age", "dept":"Department"};

####Element Type
element_type is a REQUIRED field for Tables and Forms. Used for type of rendering, and source is needed for 'select'

	var element_type = {
		"name": {"type":"readonly"},
		"age":  {"type":"text", "required": "true", "summable": "true"},
		"dept": {"type":"select", "source":{"EC":"Electronics", "CS":"Comp Sci", "ME":"Mech"}}
	};


Element types supported: text, readonly, select, hidden, radio, checkbox, link, date, button, submit,
reset, hidObj (Hidden Object Holder).

If required is passed as true, validation will be automatically be done if you are using Grid's code. (Not sure if I have implemented yet)
A red asterisk will appear against the label to indicate that this is a required field.

The summable attribute will result in automatic summing and display of result in the table footer.
Summable will update sum on change of values in text box.

Source is required for 'select', 'button', 'submit', 'reset' and 'radio'. For select and radio, they
are key-value pairs, and get rendered as option value and display text respectively. For button, submit and reset, source
is display text.
  
####Query By Example - Columnwise Filtering (For table only)
qbeEnabled is an array, indicates where Query By Example (columnwise filtering) is enabled or not.
Array can have either false or true. If it is just false (not array, just false) then the row won't be rendered
var qbeEnabled = [false, false, false];

####Adding and removing rows
If you are providing a table for people to add records to your table or remove some, you can easily use Grid for it. The Table component provides built-in abilities to add and delete rows, and also allows you to add buttons like save, search, etc. The default behaviour can be overridden by using your custom functions instead. If you want to use Grid's code, however, you can just skip those parameters. (See example below)

Grid doesn't actually delete or add data from a database - It does these things on the screen for you. You can use it to reduce a great deal of work.

When changes happen, a hidden field called 'asterisk' gets updated.
* If no changes happen to an existing row, then it will be empty.
* If a blank row was inserted, it will have a value of B (Blank)
* If a blank row was inserted and deleted without changes, it will have BD (Blank, Deleted) as a value in it.
* If a blank row was inserted, and something was modified (as in, text was entered) it will have a value of I (Inserted)
* If a blank row was inserted, and something was modified and then the row was deleted, it will have a value of ID (Inserted, Deleted)
* If an existing row was modified, it will have U (Updated)
* If an existing row was deleted, it will have D (Deleted)

Using this, we can easily find out what happened to that row. A function (soon to be updated) will allow you to get the data in a JSON format directly based on Asterisk.

####Multi Select
There are some instances when we want to select a single row only, and some when we want to select multiple rows. In such cases, the multiSelect param will be most useful. It is a true or false value

####Container
JS_Grid allows you to render 3 controls at this point of time - Table, Form and Chart. Thus, the manner in which the data will be represented is dependent on this. If you have JSON data in the form of an array (See data format 1 above) then thw following holds true
* If Container is Table, data is presented as a table
* If Container is Form, data is represented in a multi data form, where at one time, one record is shown with navigation buttons to inspect each record
* If Container is Chart, data is represented as Pie, Line or Bar charts, depending on Chart Type parameter (charttype should be bar, line or pie)

####Action Button Position
actionButtonPosition parameter allows you to specify where you want the add or remove row buttons to be present. If you want these buttons to be present at the top of the table, then don't pass this parameter. If you specify this parameter as line, then the buttons will appear at the end of each row. Each row will have a minus sign (To remove the row) and Plus will appear for the last row (To add a row.

####Call back functions
As mentioned above, the add and delete buttons make changes to the table. However when you want to want to perform some action on press of these buttons - Like making changes at the database level by making an Ajax call, or simply want to override the existing style, then do the following.

onDelete, onAdd, onSave, onSearch are the four keys that allow you to do something on that action. All you need to do is pass the name of the function to be executed when the corresponding button is pressed. Parantheses should not be included, just the name.

However, when you do this, the default action - such as striking out a row on delete, will not happen if you override it. If you want to call a custom function as well as allow default operations to continue, then include another parameter - onDeleteIsCallback, onAddIsCallback... and pass the value as true. This will do both operation.

####Hiding unnecessary buttons
If you want to hide the Add, Delete, Save, Export or Search - Just pass the addVisible, deleteVisible, saveVisible, exportVisible and searchVisible values as false.

####Export your table as CSV
You can export a table as CSV. I used a function I found online to do this directly from Javascript. If you are using Firefox, it works like a charm - If you are using Chrome, it will download the file - but without the extension csv. You just will have to rename the file.

####Sort your table
This works with the help of the Table Sorter plugin. If you pass this as true, then you can sort columns

Other parameters (optional) are explained against them in the example call below


	renderGrid ({"id": "myGrid",			// target where grid will be rendered
		"label": label,							// heading or label in table or form resp
		"data": data,							// Data as array of objects or object
		"element_type": element_type,			// Object with data types for rendering (see above)
		"qbeEnabled": qbeEnabled,				// Array with true/false for Query By Example
		"multiSelect": false,					// Flag indicating if multiple rows or single can be selected
		"container": "table",					// container = table/form/chart - Control to be rendered
		"actionButtonPosition":"line",			// If this line is included, Add/Delete buttons appear at end of each table row
		"onDelete": custom_function_delete,		// Function to be called on pressing of delete button
		"onDeleteIsCallback": true,				// Should perform default action as well as custom function
		"onSave": custom_function_save,			// Function to be called on pressing of save button
		"onAdd": custom_function_add,			// Function to be called on pressing of add button
		"onSearch": custom_function_add,		// Function to be called on pressing of search button
		"addVisible": "false",					// Indicates whether Add button should be visible
		"deleteVisible": "false",				// Indicates whether Delete button should be visible
		"saveVisible": "false",					// Indicates whether Save button should be visible
		"searchVisible": "false",				// Indicates whether Search button should be visible
		"exportVisible": "false",				// Indicates whether Export button should be visible
		"sort": true,							// Indicates whether Sorting feature is enabled
		"draggableRows": true,					// Indicates whether Rows can be moved up and down by dragging
		"draggableCols": true,					// Indicates whether Columns can be repositioned by dragging
		"action": action_value,					// Action of Form - POST, GET, PUT etc.
		"method": method_name,					// Method called on submitting form
        "chart_type": "line",                   // Chart type - can be among line, pie and bar
        "chart_props": {"chart_size": [300, 220], // Chart properties: Size [width, height] Position [x, y]
                        "chart_pos": [20, 10]}
	});


#### External Dependencies
* Requires jQuery to work
* Requires Table Sorter plugin in case you want to use sort. If you are not sorting, no issues
* Requires jQuery UI for dragging functions - Not needed if not using
* For Charts, Raphael JS is required


********************************************************************************/

	var editReadOnly = '';
	var map_of_blank_rows = {};
	var blueprint_grid = {};
	var no_data = false;

	init_grid_table = function(obj) {
        var grid_toolbar = '';
        var hidden_columns = '';

        var array_of_keys = '';

        var no_of_cols = 0;
        var div_id = obj["id"];
        var data = obj["data"];
        var header = obj["label"];
        var type = obj["element_type"];
        var qbeEnabled = obj["qbeEnabled"];
        var multiSelect = obj["multiSelect"];
        var actionButtonPosition = obj["actionButtonPosition"];
        var sort = obj["sort"];
        var draggableCols = obj["draggableCols"];

        var table_id = '';
        var colName = Object.keys(header);

        var thead = '';
        var tbody = '';
        var qbe = '';
        var chkOrRad = '';

        table_id = div_id + '_grid_table';
        array_of_keys = Object.keys(header);

        // Check if multi-select has been enabled.
        // If yes, render checkbox. Else, render radio button
        if (nullOrEmpty(multiSelect) || _is_false(multiSelect)) {
            chkOrRad = '"radio" name = "chkRow"';
        } else {
            chkOrRad = '"checkbox"';
        }

        // If QBE parameter is not passed, then don't enable QBE
        if (nullOrEmpty(qbeEnabled)) {
            qbeEnabled = false;
        }

        no_of_cols = Object.keys(header).length;

        /* == Preparing toolbar == */
        if (_is_true(obj["saveVisible"])) {
        grid_toolbar += '<button class="btn btn-primary grid_save_rows" type="button">Save</button>&nbsp;';
        }

        if (_is_true(obj["addVisible"])) {
            if(actionButtonPosition != 'line') {
                grid_toolbar += '<button class="btn btn-success grid_add_row" type="button">Add Row</button>&nbsp;';
            }
        }

        if (_is_true(obj["deleteVisible"])) {
            if(actionButtonPosition != 'line') {
                grid_toolbar += '<button class="btn btn-danger grid_delete_rows" type="button">Delete Row</button>';
            }
        }

        // Toolbar - export table as csv
        if (_is_true(obj["exportVisible"])) {
            grid_toolbar += ' <button class="btn btn-info grid_export_rows" type="button"><img src="./images/export.jpg"> Export</button>';
        }

        /* == Header and Sum of columns if exists == */
        var summable_column_exists = false;
        var sum_of_column_array = [];

        for (var i = 0; i < no_of_cols; i++) {
            if (type[array_of_keys[i]].type != 'hidden') {
                var required_field = '';
                if(_is_true(type[array_of_keys[i]].required)) {
                    required_field = '<span class = "required_asterisk" style = "color: red;"> *</span>';
                }
                thead += '<th class="' + array_of_keys[i] + '"><a href="#"><span class="hide_column_grid" data-class_name = "' + array_of_keys[i] + '" data-div_id="' + div_id + '"><img src="./images/minus.jpg" border="0"></a> </span>' + header[colName[i]] + required_field + '</th>';
                
                sum_of_column_array.push(0);
                if(_is_true(type[array_of_keys[i]].summable) && summable_column_exists === false) {
                    summable_column_exists = true;
                }
            }

        }

        /* Insert 'Select All' checkbox in header, if multi select is enabled */
        var selectAll = '';
        if (_is_true(multiSelect)) {
            selectAll = '<input type="checkbox" id = "' + table_id + '_select_all">';
            $('#' + table_id + '_select_all').live('click', function() {
                if ($(this).is(':checked')) {
                    $('#' + table_id).find('.chkRow_grid').attr('checked', $(this).attr('checked'));
                } else {
                    $('#' + table_id).find('.chkRow_grid').removeAttr('checked');
                }
            });
        }

            var empty_cell_for_header = actionButtonPosition == "line" ? "<th></th>" : "";
            thead = '<thead><tr><th>' + selectAll + '</th><th class="sl_no">Sl.</th>' + thead + empty_cell_for_header;
            thead += '</tr></thead>';

            /* == Body == */
            tbody = '<tbody>';

            for (i = 0; i < data.length; i++) {

                var trow = '';
                var hidden_fields_in_this_row = '';
                
                var empty_row = '';
                var hidden_fields_in_blank_row = '';
                
                for (var j = 0; j < no_of_cols; j++) {
                    var cellValue = '';
                    var emptyCellValue = '';
                    var current_value = data[i][colName[j]];
                    var current_type = type[colName[j]];
                    var cur_col_summable = current_type.summable;
                    
                    if (cur_col_summable) {
                        var temp_cur_value = current_value;
                        if (nullOrEmpty(current_value)) {
                            temp_cur_value = 0;
                        }
                        
                        sum_of_column_array[j] = parseFloat(sum_of_column_array[j]) + parseFloat(temp_cur_value);
                    } else {
                        sum_of_column_array[j] = '';
                    }

                    // Set up QBE
                    if (i === 0 && current_type.type != 'hidden') {
                        if (qbeEnabled !== false) {
                            var readonly = '';
                            if (qbeEnabled[j] === false || qbeEnabled[j] == "false") {
                                readonly = ' readonly="readonly"';
                            }
                            // Using td instead of th in order to
                            // prevent overlap with table sorter plugin
                            qbe += '<td><input type="text" class="qbe ' + colName[j] + '" id="' + colName[j] + '"' + readonly + '></td>';
                        } else {
                            qbe = '';
                        }
                    }

                    var classes_to_be_applied = '';
                    if (cur_col_summable) {
                        classes_to_be_applied += 'summable';
                    }

                    // Retrieve Custom classes if any
                    var custom_classes = current_type['classes'];
                    if (!nullOrEmpty(custom_classes)) {
                        classes_to_be_applied += ' ' + custom_classes.join(' ');
                    }

                    var current_row_data = data[i];

                    cellValue = render_control(current_type, colName[j], current_value, current_type.source, classes_to_be_applied, current_row_data);
                    emptyCellValue = render_control(current_type, colName[j], "", current_type.source, classes_to_be_applied, current_row_data);

                    if (current_type.type == 'hidden') {
                        hidden_fields_in_this_row += cellValue;
                        hidden_fields_in_blank_row += emptyCellValue;
                    } else {
                        // Get alignment if any
                        var curAlign = current_type['align'];
                        curAlign = !nullOrEmpty(curAlign) ? ' align="' + curAlign + '"' : '';

                        trow += '<td class="' + colName[j] + '_cell"' + curAlign + '>' + cellValue + '</td>';
                        empty_row += '<td class="' + colName[j] + '_cell" data-div_id = "' + div_id + '"' + curAlign + '>' + emptyCellValue + '</td>';
                    }

                }

                if(actionButtonPosition == 'line') {
                    empty_row += '<td class="action_btn_grid" data-div_id = "' + div_id + '"><button class="btn btn-success grid_delete_rows" type="button">+</button></td>';
                    trow += '<td class="action_btn_grid"><button class="btn btn-danger grid_delete_rows" type="button">-</button></td>';
                }
                
                var blank_row_hidden = hidden_fields_in_blank_row + '<input type="hidden" class="asterisk" value="B">';

                if (no_data) {
                    hidden_fields_in_this_row += '<input type="hidden" class="asterisk" value="B">';
                } else {
                    hidden_fields_in_this_row += '<input type="hidden" class="asterisk">';
                }
                
                trow = '<tr class="eachRow"><td><input type=' + chkOrRad + ' class="chkRow_grid">' + hidden_fields_in_this_row + '</td><td class="sl_grid">' + (i + 1) + '</td>' + trow + '</tr>';
                tbody += trow;
                
                if (i === 0) {
                    map_of_blank_rows[div_id] = '<tr class="eachRow" data-div_id = "' + div_id + '"><td data-div_id = "' + div_id + '"><input type=' + chkOrRad + ' class="chkRow_grid">' + blank_row_hidden + '</td><td class="sl_grid" data-div_id = "' + div_id + '">' + (i + 1) + '</td>' + empty_row + '</tr>';
                }
            
            }

            /* == If summable column exists, build footer == */
            var tfoot = '';
            if (summable_column_exists) {
                $(sum_of_column_array).each(function (key, value) {
                    tfoot += '<td class = "' + array_of_keys[key] + ' ' + array_of_keys[key] + '_sum_cell" style = "text-align: right;"><span class = "' + array_of_keys[key] + '_sum" style = "font-weight: bold;">' + sum_of_column_array[key] + '</span></td>';
                });
                tfoot = '<tfoot><td></td><td></td>' + tfoot + '</tfoot>';
            }

            /* == Fill the table and header == */
            tbody = '<table class="grid_table table table-striped table-bordered draggable" id = "' + table_id + '" data-div_id="' + div_id + '">' +
                        thead + tbody + '</tbody>' + tfoot + '</table>';
            tbody = '<div class="table_pane_grid">' + tbody + '</div>';
            $("#" + div_id).html(tbody);

            // Make the last button
            if(actionButtonPosition == 'line') {
                    $('#' + table_id).find('.action_btn_grid:last').html('<button class="btn btn-success grid_add_row" type="button">+</button>');
            }

            // If QBE is enabled - Then complete the QBE row
            // If QBE is disabled, do nothing - just empty the variable (or keep it empty)
            if (_is_false(qbeEnabled)) {
                qbe = '';
            } else {
                qbe = "<tr><th></th><th> </th>" + qbe;
                if (actionButtonPosition == 'line') {
                    qbe += '<th></th>';
                }
                qbe += "</tr>";
            }

            $("#" + table_id).find('tr:first').before(qbe);

            grid_toolbar = "<div style='margin:10px' class = 'grid_toolbar' data-div_id='" + div_id + "'>" + grid_toolbar + "</span></div>";
            hidden_columns = "<div style='margin:10px' class = 'hidden_columns' data-div_id='" + div_id + "'>" + hidden_columns + "</span>&nbsp;</div>";
            
            grid_toolbar += hidden_columns;
            
            $("#" + div_id + " .table_pane_grid").before(grid_toolbar);

            $("#" + div_id + " .table_pane_grid").css('overflow', 'auto');

            /* == On click of the delete button, what should happen? == */
            if (nullOrEmpty(obj["onDelete"])) {
                blueprint_grid[div_id]["onDelete"] = '';
            } else {
                blueprint_grid[div_id]["onDelete"] = obj["onDelete"];
            }

            /* == Check if delete function is a callback == */
            if (nullOrEmpty(obj["onDeleteIsCallback"])) {
                blueprint_grid[div_id]["onDeleteIsCallback"] = '';
            } else {
                blueprint_grid[div_id]["onDeleteIsCallback"] = obj["onDeleteIsCallback"];
            }

            /* == On click of the Add button, what should happen? == */
            if (nullOrEmpty(obj["onAdd"])) {
                blueprint_grid[div_id]["onAdd"] = '';
            } else {
                blueprint_grid[div_id]["onAdd"] = obj["onAdd"];
            }

            /* == Check if Add function is a callback == */
            if (nullOrEmpty(obj["onAddIsCallback"])) {
                blueprint_grid[div_id]["onAddIsCallback"] = '';
            } else {
                blueprint_grid[div_id]["onAddIsCallback"] = obj["onAddIsCallback"];
            }

            /* == On click of the Save button, what should happen? == */
            if (nullOrEmpty(obj["onSave"])) {
                blueprint_grid[div_id]["onSave"] = '';
            } else {
                blueprint_grid[div_id]["onSave"] = obj["onSave"];
            }

            /* == Check if Save function is a callback == */
            if (nullOrEmpty(obj["onSaveIsCallback"])) {
                blueprint_grid[div_id]["onSaveIsCallback"] = '';
            } else {
                blueprint_grid[div_id]["onSaveIsCallback"] = obj["onSaveIsCallback"];
            }

            /* == On click of the Search button, what should happen? == */
            if (nullOrEmpty(obj["onSearch"])) {
                blueprint_grid[div_id]["onSearch"] = '';
            } else {
                blueprint_grid[div_id]["onSearch"] = obj["onSearch"];
            }

            /* == Check if Search function is a callback == */
            if (nullOrEmpty(obj["onSearchIsCallback"])) {
                blueprint_grid[div_id]["onSearchIsCallback"] = '';
            } else {
                blueprint_grid[div_id]["onSearchIsCallback"] = obj["onSearchIsCallback"];
            }

            /* == Make text boxes look better if bootstrap == */
            //$("#" + table_id).find('input').css("height","30px");

            /* == If a control in a row has been modified, set asterisk to * in that row == */
            bindControlsToAsterisk(table_id);

            /* == Hang Date pickers and line numbers == */
            set_sl_no(table_id);

            /* == Sort table if enabled == */
            if (sort == 'true' || sort === true) {
                $("#" + table_id).tablesorter();
            }

            /* == Allow rows to be dragged around if enabled == */
            if (draggableCols == 'true' || draggableCols === true) {
                $("#" + table_id).find('tbody').sortable();
            }

            /* == For summable columns to be right aligned == */
            if (summable_column_exists == 'true' || summable_column_exists === true) {
                $("#" + table_id).find('.summable').css("text-align", "right");
            }
            
        /* == Tell all controls who their daddy is == */
            $("#" + div_id).find('table').data('div_id', div_id);
            $("#" + div_id).find('tr').data('div_id', div_id);
            $("#" + div_id).find('th').data('div_id', div_id);
            $("#" + div_id).find('td').data('div_id', div_id);
            $("#" + div_id).find('.grid_toolbar').data('div_id', div_id);
            $("#" + div_id).find('.hidden_columns').data('div_id', div_id);

        /* == Adjust height of table_pane_grid so that it doesn't go beyond the grid == */
        var main_div_height = parseFloat($("#" + div_id).height());
        var grid_toolbar_height = parseFloat($("#" + div_id + ' .grid_toolbar').height());
        var hidden_columns_height = parseFloat($("#" + div_id + ' .hidden_columns').height());
        
        $("#" + div_id + " .table_pane_grid").css('height', (main_div_height - (grid_toolbar_height + hidden_columns_height) - 40) + 'px');

	};


						/*** End of Init Grid ***/
//********************************************************************************
// Table related functions
//********************************************************************************

	/* == What should happen when the delete button is pressed == */
	$('.grid_delete_rows').live('click', function() {
		var curTable = $(this).parent().data('div_id') + '_grid_table';
		var div_id = $(this).parent().data('div_id');
        var deleted_rows = '';
		
		var onDeleteIsCallback = blueprint_grid[div_id]["onDeleteIsCallback"];

		if (blueprint_grid[div_id]["onDelete"] === '' || (blueprint_grid[div_id]["onDelete"] !== '' && (onDeleteIsCallback || onDeleteIsCallback == 'true'))) {

			// Check if custom function needs to be called before tools code
			// That is, check if custom function is callback
			if ((onDeleteIsCallback || onDeleteIsCallback == 'true')) {
				exec_custom_delete_function_grid(div_id, curTable, this);
			}

			// Default code
			if ($(this).parent().hasClass('action_btn_grid') === true) {
				deleted_rows = $(this).closest('tr');
				$(deleted_rows).find('.chkRow_grid').remove();

				set_asterisk_when_row_deleted_grid(deleted_rows);
				strike_through_deleted_lines_grid(deleted_rows);

			} else {
				var new_row = '';
                deleted_rows = '';
				if ($("#" + curTable).find('.chkRow_grid:checked').length == $("#" + curTable).find('.chkRow_grid').length) {
					new_row = map_of_blank_rows[div_id];

					deleted_rows = $("#" + curTable).find('.chkRow_grid:checked').closest('tr');
					$(deleted_rows).find('.chkRow_grid').remove();
					set_asterisk_when_row_deleted_grid(deleted_rows);
					strike_through_deleted_lines_grid(deleted_rows);

					$("#" + curTable).append(new_row);
				} else {
					deleted_rows = $("#" + curTable).find('.chkRow_grid:checked').closest('tr');
					$(deleted_rows).find('.chkRow_grid').remove();
					set_asterisk_when_row_deleted_grid(deleted_rows);
					strike_through_deleted_lines_grid(deleted_rows);

				}

			}
				
		} else {
			exec_custom_delete_function_grid(div_id, curTable, this);
		}
		
		set_sl_no(curTable);
	});
	
	/****************** Begin delete related functions **********************************/
	function set_asterisk_when_row_deleted_grid(deleted_rows) {
		$(deleted_rows).each(function(key, value) {
			if ($(this).find('.asterisk').val() == 'I') {
				$(this).find('.asterisk').val('ID');
			} else if ($(this).find('.asterisk').val() == 'B') {
				$(this).find('.asterisk').val('BD');
            } else if ($(this).find('.asterisk').val() == 'U') {
                $(this).find('.asterisk').val('UD');
			} else {
				$(this).find('.asterisk').val('D');
			}
		});
	}

	function strike_through_deleted_lines_grid(deleted_rows) {
		$(deleted_rows).find('input').attr('disabled', 'disabled');
		$(deleted_rows).find('select').attr('disabled', 'disabled');
		$(deleted_rows).find('button').attr('disabled', 'disabled');
	
		$(deleted_rows).css("text-decoration", "line-through");
		$(deleted_rows).find('input').css("text-decoration", "line-through");
		$(deleted_rows).find('select').css("text-decoration", "line-through");
		$(deleted_rows).find('td').css("text-decoration", "line-through");
	}
	
	function exec_custom_delete_function_grid(div_id, curTable, target) {
		var fn;
		if ($(target).parent().hasClass('action_btn_grid') === true) {
			fn = blueprint_grid[div_id]["onDelete"].bind($(target).closest('tr'));
		} else {
			fn = blueprint_grid[div_id]["onDelete"].bind($("#" + curTable).find('.chkRow_grid:checked').closest('tr'));
		}
		fn();
	}
	
	/****************** End of delete related functions **********************************/

	/* == What should happen when the Add button is pressed == */
	$('.grid_add_row').live('click', function(event) {
		var current_btn = $(this);
		var div_id = $(this).parent().data('div_id');
		var curTable = div_id + '_grid_table';

		if (blueprint_grid[div_id]["onAdd"] === '') {
			onAdd_default_behaviour_grid(div_id, curTable, current_btn);
		} else {
			if ($(this).parent().hasClass('action_btn_grid') === true) {
				blueprint_grid[div_id]["onAdd"] = blueprint_grid[div_id]["onAdd"].bind($(this).closest('tr'));
			} else {
				blueprint_grid[div_id]["onAdd"] = blueprint_grid[div_id]["onAdd"].bind($("#" + curTable).find('.chkRow_grid:checked').closest('tr'));
			}
			blueprint_grid[div_id]["onAdd"]();
			
			var exec_tools_code = blueprint_grid[div_id]["onAddIsCallback"];
			if (exec_tools_code || exec_tools_code == 'true') {
				onAdd_default_behaviour_grid(div_id, curTable, current_btn);
			}
		}
		
		set_sl_no(curTable);
		event.stopPropagation();
	});
	
	function onAdd_default_behaviour_grid(div_id, curTable, current_btn) {
		var new_row = map_of_blank_rows[div_id].replace(/\\"/g, '"');

		$('#' + curTable).append(new_row);
		
		if ($(current_btn).parent().hasClass('action_btn_grid') === true) {
			$(current_btn).text("-");
			$(current_btn).removeClass('grid_add_row').removeClass('btn-success').addClass('grid_delete_rows').addClass('btn-danger');
			$(current_btn).closest('table').find('.action_btn_grid:last').html('<button class="btn btn-success grid_add_row" type="button">+</button>');
		}
	}
	
	
	/* == What should happen when the Save button is pressed for grid== */
	$('.grid_save_rows').live('click', function() {
		var div_id = $(this).parent().data('div_id');
		if (blueprint_grid[div_id]["onSave"] === '') {
			// Default code
		} else {
			blueprint_grid[div_id]["onSave"]();
		}
		
	});
	
	/* == What should happen when the Search button is pressed == */
	$('.grid_form_search').live('click', function() {
		var div_id = $(this).parent().data('div_id');
		if (blueprint_grid[div_id]["onSearch"] === '') {
			// Default code
		} else {
			blueprint_grid[div_id]["onSearch"]();
		}
		
	});

	/* == What should happen when the Save button is pressed for form== */
	$('.grid_form_save').live('click', function() {
		var div_id = $(this).parent().data('div_id');
		if (blueprint_grid[div_id]["onSave"] === '') {
			// Default code
		} else {
			blueprint_grid[div_id]["onSave"]();
		}
		
	});

	/* == Set line numbers and Hang Date Pickers == */
	set_sl_no = function(table_id) {
		var d = new Date();
		
		$('#' + table_id + ' .eachRow').each(function(key, value) {
			var sl = key + 1;
			$(this).find('.sl_grid').text(sl);
			
			// Generate random number for ID of date pickers
			// Each row can have multiple date fields
			var curRow = $(this);
			$(curRow).find('.date_grid').each(function(key, value) {
				var rand_id = 'grid_date_sl_' + sl + '_key_' + key;
				$(this).attr('id', rand_id);
				$('#' + rand_id).datepicker();
			});

		});

	};
	
	/* == Export table contents as CSV == */
	$('.grid_export_rows').live('click', function() {
		var table_json = tableToJson($(this).closest('.grid_toolbar').data('div_id'), true);
		DownloadJSON2CSV (table_json);
	});
	
	/* == Hide columns == */
	$('.hide_column_grid').live('click', function(event){
		var getClass = $(this).data("class_name");
		
		var label = $(this).closest('th').text();
		var div_id = $(this).data('div_id');
		$('#' + div_id).find('.hidden_columns').append(' <button type="button" class="show_column_grid btn" data-class_name="' + getClass + '"><img src="./images/plus.jpg">' + label + '</button>');
		$('#' + div_id).find("." + getClass).closest('td').hide();
		$('#' + div_id).find("." + getClass).closest('th').hide();
		
		event.preventDefault();
	});
	
	$('.show_column_grid').live('click', function(){
		var getClass = $(this).data("class_name");
		
		$("." + getClass).closest('td').show();
		$("." + getClass).closest('th').show();
		$(this).remove();
	});

	/* == Summable Columns == */
	$('.summable').live('change', function() {
		var curClass = $(this).attr('name');
		var sum = 0;
		$('.eachRow').each(function(key, value){
			var curValue = $(this).find('.' + curClass).val();
			if (nullOrEmpty(curValue)) {
				curValue = 0;
			}

			sum = parseFloat(sum, 10) + parseFloat(curValue, 10);
		});

		$('.' + curClass + '_sum').text(sum);
	});

	/* == If a control in a row has been modified, set asterisk == */
	bindControlsToAsterisk = function(table_id) {
		$("#" + table_id).find('input:text').live('change', function() {
			if ($(this).closest('tr').find('.asterisk').val() == 'B') {
				$(this).closest('tr').find('.asterisk').val('I');
			} else if ($(this).closest('tr').find('.asterisk').val() != 'I') {
				$(this).closest('tr').find('.asterisk').val('U');
			}
		});
		
		$("#" + table_id).find('select').live('click', function() {
			if ($(this).closest('tr').find('.asterisk').val() == 'B') {
				$(this).closest('tr').find('.asterisk').val('I');
			} else if ($(this).closest('tr').find('.asterisk').val() != 'I') {
				$(this).closest('tr').find('.asterisk').val('U');
			}
		});
		
		$("#" + table_id).find('checkbox').live('click', function() {
			if ($(this).closest('tr').find('.asterisk').val() == 'B') {
				$(this).closest('tr').find('.asterisk').val('I');
			} else if ($(this).closest('tr').find('.asterisk').val() != 'I') {
				$(this).closest('tr').find('.asterisk').val('U');
			}
		});
	};
	
	/* == Highlight rows when checked ==*/
	$('.chkRow_grid').live('click', function() {
		highlight_selected_rows($(this));
	});
	
	function highlight_selected_rows(control) {
		if($(control).is('input:checkbox')) {
			if ($(control).is(':checked')) {
				$(control).closest('tr').css("background-color","silver");
			} else {
				$(control).closest('tr').css("background-color","white");
			}
		}
	}

// QBE
	$('.qbe').live('keyup', function() {
        var curDivId = $(this).closest('table').data('div_id');

		var curTbl = $('#' + curDivId + '_grid_table');
		$(curTbl).find('tr').show();

        total_qbe_length = $(curTbl).find('.qbe').length;
		$(curTbl).find('.qbe').each(function(curQbeCount, curValue) {
			evaluateQBEs($(this), curTbl, curDivId, total_qbe_length, curQbeCount);
		});
	});
		
	evaluateQBEs = function(qbeField, curTbl, curDivId, total_qbe_length, curQbeCount) {
		var curQbe = $(qbeField).val().toLowerCase();
		var qbe_id = $(qbeField).attr("id");

        var all_cols = blueprint_grid[curDivId]['element_type'];
        var all_cols_keys = Object.keys(all_cols);

        var summable_col_sums = {};
        $(all_cols_keys).each(function(key, value) {
            if (all_cols[value]['summable']) {
                summable_col_sums[value] = 0;
                $(curTbl).find('.' + value + '_sum_cell').html('<strong>0</strong>');
            }
        });
		
		$(curTbl).find('tr.eachRow:visible').each(function(key, curRow) {
            if (curQbe.indexOf('<') != -1 || curQbe.indexOf('>') != -1) {
                var comp_sign = '';
                comp_sign = curQbe.indexOf('<') != -1 ? '<' : '>';
                comp_sign = curQbe.indexOf('<=') != -1 ? '<=' : comp_sign;
                comp_sign = curQbe.indexOf('>=') != -1 ? '>=' : comp_sign;

                var comp_value = curQbe.replace(comp_sign, '');
                comp_value = comp_value.trim();
                if (nullOrEmpty(comp_value)) {
                    return false;
                }

                if(!eval($(this).find("." + qbe_id).text() + comp_sign + comp_value)) {
                    $(this).hide();
                }

            } else if ($(this).find("." + qbe_id).text().toLowerCase().search(curQbe) == -1 && $(this).find("." + qbe_id).val().toLowerCase().search(curQbe) == -1) {
				$(this).hide();
			} else {
                if ((curQbeCount + 1) == total_qbe_length) {
                    $(all_cols_keys).each(function(key, v) {
                        if (all_cols[v]['summable']) {
                            var cur_col_value = isNaN(parseFloat($(curRow).find('.' + v).text(), 10)) ? '' : parseFloat($(curRow).find('.' + v).text(), 10);
                            if (nullOrEmpty(cur_col_value)) {
                                cur_col_value = isNaN(parseFloat($(curRow).find('.' + v).val(), 10)) ? 0 : parseFloat($(curRow).find('.' + v).text(), 10);
                            }

                            summable_col_sums[v] += cur_col_value;
                            $(curTbl).find('.' + v + '_sum_cell').html('<strong>' + summable_col_sums[v] + '</strong>');
                        }
                    });
                }
            }
		});


	};

//********************************************************************************
// Render Form
//********************************************************************************
	init_grid_form = function(obj) {
		var target = obj["id"];
	
		var label = obj["label"];
		var element_type = obj["element_type"];
		var data = obj["data"];
		var searchVisible = obj["searchVisible"];
		var saveVisible = obj["saveVisible"];
		var div_id = target;
		var multi_data = false;
		var multi_data_length = 0;
		
		var rendered_form = '<table class = "table table-bordered table-striped">';
		
		if (data.length !== undefined) {
			blueprint_grid[target]['data'] = data;
			multi_data = true;
			multi_data_length = data.length;
			data = data[0];
		}
		
		var keys = Object.keys(label);
		
		for (var i = 0; i < keys.length; i+=2) {
			rendered_form += '<tr>';
			
			var required_field = '';
			if(element_type[keys[i]].required === true || element_type[keys[i]].required == "true" ) {
				required_field = '<span class = "required_asterisk" style = "color: red;"> *</span>';
			}

			var classes_to_be_applied = '';

			rendered_form += '<td>' + label[keys[i]] + ' ' + required_field + '</td>';
			rendered_form += '<td>' + render_control(element_type[keys[i]], keys[i], data[keys[i]], element_type[keys[i]].source, classes_to_be_applied, data) + '</td>';

			var j = i+1;
			if(j == keys.length) {
				rendered_form += '<td></td>';
				rendered_form += '<td></td>';
				rendered_form += '</tr>';
				break;
			}
			
			required_field = '';
			if(element_type[keys[j]].required === true || element_type[keys[j]].required == "true" ) {
				required_field = '<span class = "required_asterisk" style = "color: red;"> *</span>';
			}

			rendered_form += '<td>' + label[keys[j]] + ' ' + required_field + '</td>';
			rendered_form += '<td>' + render_control(element_type[keys[j]], keys[j], data[keys[j]], element_type[keys[j]].source, classes_to_be_applied, data) + '</td>';
			rendered_form += '</tr>';
		}
		
		rendered_form += '</table>';
		
		// Begin toolbar of form
		var toolbar_form = '<div class="toolbar_form_grid" data-div_id="' + div_id + '">';
		
		if (searchVisible == 'true' || searchVisible === true) {
			toolbar_form += ' <button class="btn btn-primary grid_form_search" type="button">Search</button>';
		}
		
		if (saveVisible == 'true' || saveVisible === true) {
			toolbar_form += ' <button class="btn btn-success grid_form_save" type="button">Save</button>';
		}
		
		if (multi_data) {
			toolbar_form += ' <button class="btn grid_form_prev" type="button" data-data_ptr = "0" data-multi_data_length = ' + multi_data_length + '>&laquo;</button>';
			toolbar_form += '<span class="multi_data_count_indicator"> 1 / ' + multi_data_length + ' </span>';
			toolbar_form += ' <button class="btn grid_form_next" type="button" data-data_ptr = "0" data-multi_data_length = ' + multi_data_length + '>&raquo;</button>';
			
			$('.grid_form_prev').live('click', function(){

				if($(this).data('data_ptr') != '0') {
					var cur_ptr = $(this).data('data_ptr');
					cur_ptr = cur_ptr - 1;
					$(this).data('data_ptr', cur_ptr);
					$(this).parent().find('.grid_form_next').data('data_ptr', cur_ptr);
					$(this).parent().find('.multi_data_count_indicator').text(' ' + (parseInt(cur_ptr, 10) + 1) + ' / ' + multi_data_length + ' ');
					var cur_data_set = blueprint_grid[target]['data'][cur_ptr];
					var cur_data_keys = Object.keys(cur_data_set);
					var cur_element_type = blueprint_grid[target]['element_type'];
					
					$(cur_data_keys).each(function(key, value) {
						
						var cur_data  = cur_data_set[cur_data_keys[key]];
						switch (cur_element_type[cur_data_keys[key]].type) {
							case 'text':
							case 'link':
							case 'date':
							case 'select':
							case 'radio':
							case 'hidden':
							case 'checkbox': $('#' + target).find('.' + cur_data_keys[key]).val(cur_data);
											break;
							
							case 'readonly':
							case 'button':
							case 'reset':
							case 'submit': $('#' + target).find('.' + cur_data_keys[key]).text(cur_data);
											break;

						}
					});
					
				}
			});
			
			$('.grid_form_next').live('click', function(){
				if($(this).data('data_ptr') + 1 != $(this).data('multi_data_length')) {
					var cur_ptr = $(this).data('data_ptr');
					cur_ptr = cur_ptr + 1;
					$(this).data('data_ptr', cur_ptr);
					$(this).parent().find('.grid_form_prev').data('data_ptr', cur_ptr);
					$(this).parent().find('.multi_data_count_indicator').text(' ' + (parseInt(cur_ptr, 10) + 1) + ' / ' + multi_data_length + ' ');
					var cur_data_set = blueprint_grid[target]['data'][cur_ptr];
					var cur_data_keys = Object.keys(cur_data_set);
					var cur_element_type = blueprint_grid[target]['element_type'];
					
					$(cur_data_keys).each(function(key, value) {
						
						var cur_data  = cur_data_set[cur_data_keys[key]];

						switch (cur_element_type[cur_data_keys[key]].type) {
							case 'text':
							case 'link':
							case 'date':
							case 'select':
							case 'radio':
							case 'hidden':
							case 'checkbox': $('#' + target).find('.' + cur_data_keys[key]).val(cur_data);
											break;
							
							case 'readonly':
							case 'button':
							case 'reset':
							case 'submit': $('#' + target).find('.' + cur_data_keys[key]).text(cur_data);
											break;

						}
					});
					
				}
			});
		}
		
		toolbar_form += '</div>';
		// End toolbar of form

		rendered_form += toolbar_form;
		rendered_form = '<div class="form_grid"><form id="' + target + '_grid_form">' + rendered_form + '</form></div>';

		$("#" + target).html(rendered_form);
		
		/* == On click of the Save button, what should happen? == */
		if (nullOrEmpty(obj["onSave"])) {
			blueprint_grid[div_id]["onSave"] = '';
		} else {
			blueprint_grid[div_id]["onSave"] = obj["onSave"];
		}

		/* == On click of the Search button, what should happen? == */
		if (nullOrEmpty(obj["onSearch"])) {
			blueprint_grid[div_id]["onSearch"] = '';
		} else {
			blueprint_grid[div_id]["onSearch"] = obj["onSearch"];
		}

	};

//********************************************************************************
// Render Chart -
//********************************************************************************

init_grid_chart = function(obj) {
	chart_type = obj["chart_type"];

	if (nullOrEmpty(chart_type)) {
		alert("Chart Type parameter not passed (chart_type => bar/pie/line)");
		return false;
	}

	var target = obj["id"];
	var label = obj["label"];
	var element_type = obj["element_type"];
	var data = obj["data"];
    var props = obj["chart_props"];

	var key_names = Object.keys(label);
    var values = [], labels = [];

    // Pie Chart
	if (chart_type == "pie") {
		$(data).each(function (key, value) {
			labels.push(value[key_names[0]]);
			values.push(parseInt(value[key_names[1]], 10));
		});

		var r = Raphael(target),
		pie = r.piechart(320, 240, 100, values, { legend: labels, legendpos: "west", href: []});

		r.text(320, 100, "").attr({ font: "20px sans-serif" });
		pie.hover(function () {
			this.sector.stop();
			this.sector.scale(1.1, 1.1, this.cx, this.cy);

			if (this.label) {
				this.label[0].stop();
				this.label[0].attr({ r: 7.5 });
				this.label[1].attr({ "font-weight": 800 });
			}
		}, function () {
			this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

			if (this.label) {
				this.label[0].animate({ r: 5 }, 500, "bounce");
				this.label[1].attr({ "font-weight": 400 });
			}
		});
	}

    // Bar Chart
	if (chart_type == "bar") {
		var key_no = key_names.length - 1;
		if (key_no < 0) {
			alert ("No values found");
			return false;
		}

	values = [], labels = [];

	for (i=0; i<key_no; i++) {
		values[i] = [];
	}

	$(data).each(function (key, value) {
	labels.push(value[key_names[0]]);

	for (i=0; i<key_no; i++) {
	values[i].push(parseInt(value[key_names[i + 1]], 10));
	}

	});

    	var r = Raphael(target),
        fin = function () {
            this.flag = r.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        },
        fout = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        },
        fin2 = function () {
            var y = [], res = [];
            for (var i = this.bars.length; i--;) {
                y.push(this.bars[i].y);
                res.push(this.bars[i].value || "0");
            }
            this.flag = r.popup(this.bars[0].x, Math.min.apply(Math, y), res.join(", ")).insertBefore(this);
        },
        fout2 = function () {
            this.flag.animate({opacity: 0}, 300, function () {this.remove();});
        },
        txtattr = { font: "12px sans-serif" };
    
    r.text(480, 10, "").attr(txtattr);

    r.hbarchart(330, 10, 300, 220, values, {stacked: true}).hover(fin, fout);

    }

    // Line Chart
    if (chart_type == "line") {
        var x_axis_points = [];
        var x_axis_key = key_names[0];

        // See how many y value columns are there
        // Create those many columns inside values - by create columns, I mean arrays
        var y_col_count = key_names.length - 1;
        for (var i = 0; i < y_col_count; i++) {
            values.push([]);
        }

        $(data).each(function (key, value) {
            x_axis_points.push(value[x_axis_key]);

            for (var j = 0; j < y_col_count; j++) {
                values[j].push(value[key_names[j + 1]]);
            }
        });

        var div_actual_graph = "<div class='div_actual_graph' id='" + target + "_actual_graph'></div>";
        var div_graph_btns = "<div class='div_graph_btns' id='" + target + "_graph_btns'></div>";
        $('#' + target).html(div_actual_graph + div_graph_btns);

        var r = Raphael(target + "_actual_graph");

        //r.linechart(0, 10, 300, 220, x_axis_points, values, { shade: true });
        var chart_pos = [20, 10];
        var chart_size = [300, 220];
        var chart_colours = [];
        if (!nullOrEmpty(props)) {
            if (!nullOrEmpty(props["chart_pos"])) {
                chart_pos = props["chart_pos"];
            }

            if (!nullOrEmpty(props["chart_size"])) {
                chart_size = props["chart_size"];
            }
        }

        // If no chart colours have been provided, generate a set
        if (nullOrEmpty(props["chart_colours"])) {
            var primary_colours = [0xFF0000, 0x00FF00, 0x0000FF];

            for (var k = 1; k < key_names.length; k++) {
                var cur_hex = (primary_colours[k % 3]).toString(16);
                var zero_len = 6 - cur_hex.length;
                for (l = 0; l < zero_len; l++) {
                    cur_hex = "0" + cur_hex;
                }

                chart_colours.push("#" + cur_hex);
                primary_colours[k % 3] += 0x000033;
            }
            
        } else {
            chart_colours = props["chart_colours"];
        }

        // Generate buttons to show/hide charts
        for (var m = 1; m < key_names.length; m++) {
            $('#' + target + "_graph_btns").append(' <button class="btn coloured_button" style="background: ' + chart_colours[m - 1] + '; color: #FFF" data-values_number="' + (m - 1) + '">' + label[key_names[m]] + '</button>');
        }

        // When one of the coloured graph buttons is clicked
        $('#' + target + "_graph_btns").find('.coloured_button').live('click', function() {
            // Remove border around Show All button
            $('#' + target + "_graph_btns").find('.show_all_button').css('border', 'none');
            
            // Toggle active colour button class
            if ($(this).hasClass('active_colour_button')) {
                $(this).removeClass('active_colour_button');
                $(this).css('border', 'none');
            } else {
                $(this).addClass('active_colour_button');
                $(this).css('border', 'solid 2px black');
            }

            // Clear full graph
            r.clear();

            var y_values = [];
            var y_colours = [];
            $('#' + target + "_graph_btns .active_colour_button").each(function() {
                y_values.push(values[$(this).data("values_number")]);
                y_colours.push(chart_colours[$(this).data("values_number")]);
            });

            // Redraw graph
            r.linechart(chart_pos[0], chart_pos[1], chart_size[0], chart_size[1], [x_axis_points], y_values, { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true, colors: y_colours }).hoverColumn(function () {
                this.tags = r.set();

                for (var i = 0, ii = this.y.length; i < ii; i++) {
                    this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
                }
                }, function () {
                    this.tags && this.tags.remove();
                });

            
        });

        // When the show all button is clicked
        $('#' + target + "_graph_btns").append(' <button class="btn show_all_button">Show all</button>');
        $('#' + target + "_graph_btns").find('.show_all_button').live('click', function() {
            // Clear full graph
            r.clear();

            // Redraw graph
            var lines = r.linechart(chart_pos[0], chart_pos[1], chart_size[0], chart_size[1], [x_axis_points], values, { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true, colors: chart_colours }).hoverColumn(function () {
                this.tags = r.set();

                for (var i = 0, ii = this.y.length; i < ii; i++) {
                    this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
                }
            }, function () {
                this.tags && this.tags.remove();
            });

            $('.coloured_button').css('border', 'none');
            $('.active_colour_button').removeClass('active_colour_button');
            $(this).css('border', 'solid 2px black');
        });

        var lines = r.linechart(chart_pos[0], chart_pos[1], chart_size[0], chart_size[1], [x_axis_points], values, { nostroke: false, axis: "0 0 1 1", symbol: "circle", smooth: true, colors: chart_colours }).hoverColumn(function () {
            this.tags = r.set();

            for (var i = 0, ii = this.y.length; i < ii; i++) {
                this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: "#fff" }, { fill: this.symbols[i].attr("fill") }]));
            }
        }, function () {
            this.tags && this.tags.remove();
        });

    }

};


//********************************************************************************
// Render - General Code = MAIN FUNCTION
//********************************************************************************
function renderGrid(obj) {
	no_data = false;
	
	if (nullOrEmpty(obj)) {
		alert("No parameter is passed");
		return false;
	}
	
	var target = obj["id"];
	
	var label = obj["label"];
	var element_type = obj["element_type"];
	var data = obj["data"];
	
	var container = obj["container"];
	
	var qbeEnabled = nullOrEmpty(obj["qbeEnabled"]) ? false : obj["qbeEnabled"];
	var multiSelect = obj["multiSelect"];
	
	if (nullOrEmpty(target)) {
		alert("JS_Grid: Target ID has not been passed. Param 'id' missing");
		return false;
	}
	
	if (nullOrEmpty(label)) {
		alert("JS_Grid: Label has not been passed. Param 'label' missing");
		return false;
	}

    if (nullOrEmpty(element_type)) {
        var label_keys = Object.keys(label);
        element_type = {};

        $(label_keys).each(function(key, value){
            element_type[value] = {"type":"readonly"};
        });

        obj["element_type"] = element_type;
    }
	
	/* Store blueprint */
	var keys_of_header = Object.keys(label);
	var empty_row = {};

	for (var i = 0; i < keys_of_header.length; i++) {
		empty_row[keys_of_header[i]] = "";
	}

	blueprint_grid[target] = {};
	blueprint_grid[target]["element_type"] = element_type;
	map_of_blank_rows[target] = empty_row;

	if (nullOrEmpty(data)) {
		no_data = true;
		
		if (container == 'form') {
			obj.data = empty_row;
		} else if (container == 'table') {
			obj.data = new Array(empty_row);
		} else if (container === 'chart') {
			obj.data = new Array(empty_row);
		}
	}

    // Now move to rendering function
	switch (container) {
		case 'table': init_grid_table (obj);
						break;
		case 'form': init_grid_form (obj);
						break;

		case 'chart': init_grid_chart(obj);
						break;
	}
	
}

//********************************************************************************
// Render control
//********************************************************************************
render_control = function(type, class_name, current_value, source_of_select, classes_to_be_applied, current_row_data) {
	var control;
	// class_name = Default Class based on element type
	// classes_to_be_applied = Additional classes
	
	if (nullOrEmpty(current_value)) {
        // If no value has been provided, we check to see if column relations are provided
        // Column relations are to provided within source_of_select (source) as shown
        /*
            source_of_select : {
                relation: "(key_1 / key_2) * 100",
                round: "2",             // Default 2
                sum_relation: "direct" // Other option: "relation"
            }
        */
        // The relation key should have formula for evaluation. This will be directly 'eval-ed'
        //
        // sum_relation is relevant in case of computing sum - (direct) If the sum should be the sum of
        // derived values, or (relation) if the sum is derived from sum of related columns
        // [e.g. for 'direct summing' = Sum of the derived column]
        // [e.g. for 'relation summing' = Sum of key_1 / sum of key_2]

        // However if we don't have the relation field, we use empty string for data
        if (nullOrEmpty(source_of_select)) {
            current_value = '';
        } else if (nullOrEmpty(source_of_select['relation'])) {
            current_value = '';
        } else {
            // Identify keys, convert them to form suitable for data recovery
            var keys_from_actual_data = Object.keys(current_row_data);
            var formula = source_of_select['relation'];
            var round_off = nullOrEmpty(source_of_select['round']) ? 2 : parseInt(source_of_select['round'], 10);

            $(keys_from_actual_data).each(function(key, value) {
                var re = new RegExp("\\b" + value + "\\b", "g");

                formula = formula.replace(re, 'current_row_data["' + value + '"]');
            });

            current_value = Math.round(Math.pow(10, round_off) * eval(formula)) / Math.pow(10, round_off);
        }

	}
	
	var ro = '';

	switch (type.type) {
		case 'readonly': control = '<span class = "' + class_name + ' ' + classes_to_be_applied + '" name = "' + class_name + '" >'+current_value +'</span>';
			break;

		case 'number':
		case 'text':
			ro = '';
			if (type.readonly == 'true') {
				ro = ' readonly = "readonly"';
			}
					
			control = '<input type="text" class = "' + class_name + ' ' + classes_to_be_applied + '" name = "' + class_name + '" value="' + current_value + '"' + ro + '>';
			break;

		case 'select': ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}
			control = '<select class = "' + class_name + ' ' + classes_to_be_applied + '" name = "' + class_name + '"' + ro + '>';

			if (nullOrEmpty(source_of_select)) {
				alert("The source of the dropdown box has not been specified. Param 'source' is missing");
				return false;
			}
			
			var keys_of_select = Object.keys(source_of_select);
			for (var z = 0; z < keys_of_select.length; z++) {
				if (current_value == keys_of_select[z]) {
					control += '<option value = "' + keys_of_select[z] + '" selected = "selected">' + source_of_select[keys_of_select[z]] + '</option>';
				} else {
					control += '<option value = "' + keys_of_select[z] + '">' + source_of_select[keys_of_select[z]] + '</option>';
				}
				
			}
			
			control += '</select>';
			break;
						
		case 'checkbox':  ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}

			var is_checked = '';
			if (current_value == source_of_select) {
			is_checked = ' checked = "checked"';
			}

			control = '<input type="checkbox" class = "' + class_name + ' ' + classes_to_be_applied + '" value="' + current_value + '" name = "' + class_name + '"' + ro + is_checked + '>';
			break;

		case 'radio':  ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}

					control = '<div class = "radio_' + class_name + '" name = "' + class_name + '">';// + data[i][colName[j]] + '</select>';
						//var source_of_select = current_type.source;
						if (nullOrEmpty(source_of_select)) {
							alert("The source of the radio controls has not been specified. Param 'source' is missing");
							return false;
						}
						
						var value_of_radio = Object.keys(source_of_select);
						for (var z = 0; z < value_of_radio.length; z++) {
							if (current_value == value_of_radio[z]) {
								control += '<span class="radio_span_' + class_name + ' ' + classes_to_be_applied + '"><input type = "radio" name = "' + class_name + '" class = "' + class_name + '" value = "' + value_of_radio[z] + '" checked = "checked" ' + ro + '><span class="radio_label radio_labe_"' + class_name + '> ' + source_of_select[value_of_radio[z]] + '</span></span> &nbsp;&nbsp;&nbsp;';
							} else {
								control += '<span class="radio_span_' + class_name + ' ' + classes_to_be_applied + '"><input type = "radio" name = "' + class_name + '" class = "' + class_name + '" value = "' + value_of_radio[z] + '"' + ro + '><span class="radio_label radio_label_"' + class_name + '> ' + source_of_select[value_of_radio[z]] + '</span></span> &nbsp;&nbsp;&nbsp;';
							}
							
						}
						
						control += '</div>';
						break;

		case 'fnd_lookup': control = '<div name = "' + class_name + ' ' + classes_to_be_applied + '" class = "fnd_lookup ' + class_name + '" data-code = "' + current_value + '" data-fnd_lookup_code = "' + source_of_select + '" style="border: solid silver 1px; width: 100px; height: 25px; background-color: white;">' + current_value + '</div>';
			break;
		
		case 'link':
			if (nullOrEmpty(current_value)) {
				current_value = source_of_select[1];
				source_of_select = source_of_select[0];
			} else {

			}
			control = '<a href="' + source_of_select + '" name = "' + class_name + '" class = "' + class_name + ' ' + classes_to_be_applied + '">' + current_value + '</a>';
			break;

		case 'date':  ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}

			control = '<input type="text" name = "' + class_name + '" class = "date_grid ' + class_name + ' ' + classes_to_be_applied + '" value="' + current_value + '"' + ro + '>';
			break;

		case 'hidden': control = '<input type="hidden" name = "' + class_name + '" class = "hidden_grid ' + class_name + ' ' + classes_to_be_applied + '" value="' + current_value + '">';
			break;

		case 'hidObj': control = '<input type="hidden" name = "' + class_name + '" class = "hidden_object_grid ' + class_name + ' ' + classes_to_be_applied + '" data-value="' + current_value + '">';
			break;


		case 'button':  ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}

		control = '<button type="button" name = "' + class_name + '" class = "btn ' + class_name + ' ' + classes_to_be_applied + '"' + ro + '>' + source_of_select + '</button>';
		break;

		case 'reset': ro = '';
			if (type.readonly == 'true') {
			ro = ' disabled = "disabled"';
			}

		source_of_select = nullOrEmpty(source_of_select) ? 'Reset' : source_of_select;
		control = '<button type="reset" name = "' + class_name + '" class = "btn ' + class_name + ' ' + classes_to_be_applied + '"' + ro + '>' + source_of_select + '</button>';
		break;

		case 'submit':  ro = '';
		if (type.readonly == 'true') {
		ro = ' disabled = "disabled"';
		}

		source_of_select = nullOrEmpty(source_of_select) ? 'Submit' : source_of_select;
		control = '<button type="submit" name = "' + class_name + '" class = "btn ' + class_name + ' ' + classes_to_be_applied + '"' + ro + '>' + source_of_select + '</button>';
		break;

		case 'textarea':  ro = '';
			if (type.readonly == 'true') {
				ro = ' disabled = "disabled"';
			}

			control = '<textarea name = "' + class_name + '" class = "' + class_name + ' ' + classes_to_be_applied + '"' + ro + '>' + current_value + '</textarea>';
		break;

	}

	return control;
};


// From: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || window,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
/* Null or Empty */
nullOrEmpty = function(param) {
   if (param === "" || param === null || param === undefined) {
	return true;
   } else {
	return false;
   }
};

// Check if true or "true"
function _is_true(param) {
    if (param === true || param =="true") {
        return true;
    }
}

// Check if false or "false"
function _is_false(param) {
    if (param === false || param =="false") {
        return true;
    }
}


/******************************************************
Table to JSON - Code written by Shashank Shandilya
******************************************************/

function tableToJson(table,complete_row){
   if (nullOrEmpty(complete_row)){
      complete_row = false;
   }
   metaData = blueprint_grid[table].element_type;
   var jsonTableArray = [];
   var jsonTable = {};
   var isToBeSend = true;
   var class_name = '';
   table = '#'+table+'_grid_table';
   $.each($(table).find('tr.eachRow'),function(index1,htmlContent){
   
      if ( (!nullOrEmpty($(this).find('td:first').find('.asterisk').attr('value')) || complete_row ) && ( $(this).find('td:first').find('.asterisk').attr('value') != 'UD' && $(this).find('td:first').find('.asterisk').attr('value') != 'ID' && $(this).find('td:first').find('.asterisk').attr('value') != 'BD' && $(this).find('td:first').find('.asterisk').attr('value') != 'B') ){
         //alert ($(this).find('td:first').find('.asterisk').attr('value'));
         var row = $(this);
         $.each(metaData,function(index,value){
            class_name = index;
            switch (value.type){
               case 'text':
                  if ( (nullOrEmpty($(row).find('.'+class_name).val()) && typeof value.source != "undefined") ){
                        jsonTable[class_name] = value.source;
                  }else{
                     if ($(row).find('td:first').find('.asterisk').attr('value') != 'D') {
                        if (validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name).val())){
                           isToBeSend = false;
                        }
                     }
                     jsonTable[class_name]=($(row).find('.'+class_name).val());
                  }
                  break;
               case 'textarea':
                  if ( (nullOrEmpty($(row).find('.'+class_name).val()) && typeof value.source != "undefined") ){
                        jsonTable[class_name] = value.source;
                  }else{
                     if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                        if (validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name).val())){
                           isToBeSend = false;
                        }
                     }
                     jsonTable[class_name]= ($(row).find('.'+class_name).val());
                  }
                  break;
               case 'date':
                  if ( (nullOrEmpty($(row).find('.'+class_name).val()) && typeof value.source != "undefined") ){
                        jsonTable[class_name] = value.source;
                  }else{
                     if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                        if (validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name).val())){
                          isToBeSend = false;
                        }
                     }
                     jsonTable[class_name]= _getDbDateFormat(($(row).find('.'+class_name).val()));
                  }
                  break;
               case 'email':
                  /*if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                  }
                  if ( (nullOrEmpty($(this).find(".cell_grid").text()) && typeof value.source != "undefined") ){
                        jsonTable[class_name] = value.source;
                  }else{
                     jsonTable[class_name]=($(this).find(".cell_grid").text());
                  }*/
                  break;
               case 'number':
                  if (nullOrEmpty($(this).find(".cell_grid").text()) && typeof value.source != "undefined"){
                     jsonTable[class_name] = value.source;
                  }else{
                     if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                        if(validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name).val())){
                           isToBeSend = false;
                        }
                     }
                     jsonTable[class_name]=$(row).find('.'+class_name).val();
                  }
                  break;
               case 'readonly':
                  if ( (nullOrEmpty($(row).find('.'+class_name).text())) && typeof(value.source) != "undefined"){
                        jsonTable[class_name] = value.source;
                  }else{
                     if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                        if (validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name).text())){
                           isToBeSend = false;
                        }
                     }
                     jsonTable[class_name]=$(row).find('.'+class_name).text();
                  }
                  break;
               case 'select':
                  if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                     if (validateFielde($(row).find('.'+class_name).closest('td'),value,$(row).find('.'+class_name+' option:selected').val())){
                        isToBeSend = false;
                     }
                  }
                  jsonTable[class_name] = $(row).find('.'+class_name+' option:selected').val();
                  break;
        case 'fnd_lookup':
                if ($(row).find('td:first').find('.asterisk').attr('value') != 'D'){
                     if ( validateFielde ( $(row).find('.'+class_name).closest('td'),value, $(row).find('.'+class_name).data('code') ) ){
                        isToBeSend = false;
                     }
                  }
                  jsonTable[class_name] = $(row).find('.'+class_name).data('code');
                  break;
               case 'link':
                  break;
               case 'hidden':
                  if (class_name == 'status'){
                     if ($(table).find('td:first').find('.asterisk').attr('value') === 'U' || $(table).find('td:first').find('.asterisk').attr('value') === 'I'){
                        jsonTable['status'] = 'active';
                     }else{
                        jsonTable['status'] = 'inactive';
                     }
                  }else{
                     if ( (nullOrEmpty($(row).find('.'+class_name).val())) && (value.required === "true")){
                        jsonTable[class_name] = value.source;
                     }else{
                        jsonTable[class_name] = $(row).find('.'+class_name).val();
                     }
                  }
                  break;
               default:
                  break;
            }
         });
         jsonTableArray.push(jsonTable);
         jsonTable = {};
      }
   });
   if (isToBeSend === false){
      return false;
   }else{
      return (jsonTableArray);
   }
   
}

function validateFielde(field, metaData,fieldVal){  // fieldVal is required ,
   $(field).find('.error-span').remove();  // remove error message if any
    // fetches the value of the field
   if (metaData.required === "true"){
      if (fieldVal === "") {
         $(field).prepend('<span class="label important error-span">*Enter Proper Value</span>');
         return true;
      }else if (!checkRule(metaData, fieldVal)) {
         $(field).prepend('<span class="label important error-span">*Enter Proper Value</span>');
         return true;
      }
   }else{
      if (!checkRule(metaData, fieldVal)) {
         $(field).prepend('<span class="label important error-span">*Enter Proper Value</span>');
         return true;
      }
   }
   return false;
}

function checkRule(rule, value) {
    switch (rule.type) {
    case 'date':
      return true;
    case 'textarea':
      return true;
    case 'number':
        if (!isNumber(value)) {
            return false;
        }
        break;
    case 'email':
        if (!looksLikeEmail(value)) {
            return false;
        }
        break;
    case 'creditcard':
        if (!isCreditCard(value)) {
            return false;
        }
        break;
    case 'text':
         return true;
    case 'title':
        if (value < 1) {
            return false;
        }
        break;
    case 'comboid':
        if (value < 1) {
            return false;
        }
        break;
    }
    return true;
}

/*********  End of Code - table to json - By Shashank Shandilya ************************/
