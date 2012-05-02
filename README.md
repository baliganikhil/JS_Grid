#JS_Grid

There are several times when we represent data in a table. And we have to perform loops and create table rows. However that is just representing data in a basic format. There are several instances when we want to filter table data, or sort them, etc. 

Since this is a repetitive task I thought of writing some code. I wrote this very quickly, so it may not be very well written, but gets the work done nicely very often. I am still working on this, but read on to see what all can be done at this point of time

GRID - Can be used to rapidly deploy forms, tables, form-table controls, and now charts.

#### Works very well with Twitter Bootstrap CSS
By default, the tables and forms generated will look plain. So you can use your own CSS styles with them. If you want to save time and plough through quickly, then you can just include Twitter Bootstrap CSS and see the tables transform.

#### Example Call

Here is an example of a call - In the simplest form.

Create an empty div with id = myGrid.

    var label = {"name":"Name", "age":"Age", "dept":"Department"};

    var data = [
                {"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"}, 
                {"name":"Amod", "age":"29", "dept":"EC", "lastname": "Pandey"},
                {"name":"Niyaz", "age":"27", "dept":"CS", "lastname": "PK"}
                ];

     renderGrid ({"id": "myGrid",        	// target where grid will be rendered
           "label": label,             		// heading or label in table or form resp
           "data": data,               		// Data as array of objects or object - If not provided, empty table is created
           "container": "table"        		// container = table/form - Control to be rendered
     });


####Id
All you need to do from your side is create an empty Div with an Id, which is passed along as the ID parameter above.

####Data
Array while rendering table/chart should be provided as a JSON. An example is provided here
(Not providing Data field will result in empty data automatically)

*Data format 1*

    var data = [
    			{"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"}, 
    			{"name":"Amod", "age":"29", "dept":"EC", "lastname": "Pandey"},
    			{"name":"Niyaz", "age":"27", "dept":"CS", "lastname": "PK"}
			    ];

Each element of the JSON is a row, and elements of each of them is a column.

Data - Object while rendering form

*Data format 2*

var data = {"name":"Nikhil", "age":"24", "dept":"EC", "lastname": "Baliga"};

####Label
label is a REQUIRED field. Used for heading of columns in table and label in form, indexes in a chart
var label = {"name":"Name", "age":"Age", "dept":"Department"};

####Element Type
element_type is an *Optional* field for Tables and Forms. Used for type of rendering, and source is needed for 'select'.
If element_type is not provided, it defaults to readonly

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
* If Container is Chart, data is represented as Pie or Bar charts, depending on Chart Type parameter (charttype should be bar or pie)

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


#### External Dependencies
* Requires jQuery to work
* Requires Table Sorter plugin (jquery.tablesorter.min.js) in case you want to use sort
* Requires jQuery UI for date field and dragging functions
* For Charts, Raphael JS is required
