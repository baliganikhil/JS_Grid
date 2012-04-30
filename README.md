<b>JS_Grid</b>

There are several times when we represent data in a table. And we have to perform loops and create table rows. However that is just representing data in a basic format. There are several instances when we want to filter table data, or sort them, etc. 

Since this is a repetitive task I thought of writing some code. I wrote this very quickly, so it may not be very well written, but gets the work done nicely very often. I am still working on this, but read on to see what all can be done

GRID - Can be used to rapidly deploy forms, tables and form-table controls, and now charts.

Here is an example of a call

`
     renderGrid ({"id": "myGrid",        // target where grid will be rendered
           "label": label,             // heading or label in table or form resp
           "data": data,               // Data as array of objects or object
           "element_type": type,       // Object with data types for rendering (see above)
           "qbeEnabled": qbeEnabled,   // Array with true/false for Query By Example
           "multiSelect": false,       // Flag indicating if multiple rows or single can be selected
           "container": "table"        // container = table/form - Control to be rendered
     });
`

Data - Array while rendering table/chart should be provided as a JSON. An example is provided here
(Not providing Data field will result in empty data automatically)
`
    var data = [
    			{"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"}, 
    			{"name":"Amod", "age":"29", "dept":"EC", "lastname": "Pandey"},
    			{"name":"Balu", "age":"32", "dept":"ME", "lastname": "S"}
			    ];
`
Each element of the JSON is a row, and elements of each of them is a column.

Data - Object while rendering form
var data = {"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"};

label is a REQUIRED field. Used for heading of columns in table and label in form, indexes in a chart
var label = {"name":"Name", "age":"Age", "dept":"Department"};

element_type is a REQUIRED field for Tables and Forms. Used for type of rendering, and source is needed for 'select'
`
    var element_type = {
    		"name": {"type":"readonly"},
    		"age":  {"type":"text", "required": "true", "summable": "true"},
    		"dept": {"type":"select", "source":{"EC":"Electronics", "CS":"Comp Sci", "ME":"Mech"}}
    		};
`

Element types supported: text, readonly, select, hidden, radio, checkbox, link, date, button, submit,
reset, hidObj (Hidden Object Holder).

If required is passed as true, validation will be automatically be done if you are using tools code. (Not sure if implemented yet)
A red asterisk will appear against the label to indicate that this is a required field.

The summable attribute will result in automatic summing and display of result in the table footer.
Summable will update sum on change of values in text box.

Source is required for 'select', 'button', 'submit', 'reset' and 'radio'. For select and radio, they
are key-value pairs, for option value and display text respectively. For button, submit and reset, source
is display text
  
<b>Query By Example (For table only)</b>
qbeEnabled is an array, indicates where Query By Example (columnwise filtering) is enabled or not.
Array can have either false or true. If it is just false (not array, just false) then the row won't be rendered
var qbeEnabled = [false, false, false];
   
The Table component provides built in abilities to add and delete rows, and also allows you to add buttons
like save, search, etc. The default behaviour can be overridden by using your custom functions instead. If 
you want to use tools code, however, you can just skip those parameters. (See example below)

Other parameters (optional) are explained against them in the example call below

`
     renderGrid ({"id": "myGrid", 						// target where grid will be rendered
     			  "label": label,							// heading or label in table or form resp
     			  "data": data,								// Data as array of objects or object
     			  "element_type": type,						// Object with data types for rendering (see above)
     			  "qbeEnabled": qbeEnabled,					// Array with true/false for Query By Example
     			  "multiSelect": false,						// Flag indicating if multiple rows or single can be selected
     			  "container": "table",						// container = table/form - Control to be rendered
     			  "actionButtonPosition":"line",			// If this line is included, Add/Delete buttons appear at end of each table row
     			  "onDelete": custom_function_delete,		// Function to be called on pressing of delete button
     			  "onDeleteIsCallback": true,				// Should perform default action as well as custom function
     			  "onSave": custom_function_save,			// Function to be called on pressing of save button
     			  "onAdd": custom_function_add,				// Function to be called on pressing of add button
     			  "onSearch": custom_function_add,			// Function to be called on pressing of search button
     			  "addVisible": "false",					// Indicates whether Add button should be visible
     			  "deleteVisible": "false",					// Indicates whether Delete button should be visible
     			  "saveVisible": "false",					// Indicates whether Save button should be visible
     			  "searchVisible": "false",					// Indicates whether Search button should be visible
     			  "exportVisible": "false",					// Indicates whether Export button should be visible
     			  "sort": true,								// Indicates whether Sorting feature is enabled
     			  "draggableRows": true,					// Indicates whether Rows can be moved up and down by dragging
     			  "draggableCols": true,					// Indicates whether Columns can be repositioned by dragging
     			  "action": action_value,					// Action of Form - POST, GET, PUT etc.
     			  "method": method_name						// Method called on submitting form
     
     });
`