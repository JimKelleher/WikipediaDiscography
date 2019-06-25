// <HEAD> GLOBAL VARIABLES:

// This will be initialized in init_angular_multi_filter_select():
var angular_multi_filter_select_services;

// This is the standard datasource.  It is filled in Default.aspx's main():
var demo_test_datasource_object;

// <HEAD> INITIALIZATION:

// Define the controller that drives our processing:
myApp.controller("MyCtrl", ["$scope", "$http", function ($scope, $http) {
    //-----------------------------------------------------------------------------
    // Load the reference-selection/master data hierarchy from the database:
    $http.get("http://www.workingweb.info/database/Artist/Get/")
        //-----------------------------------------------------------------------------
        // NOTE: To use a JSON import file, the following web.config entry is needed:
        // <mimeMap fileExtension=".json" mimeType="JSON" />
        // $http.get("artist.json")
        //------------------------------------------------------------------------------------
        // Define the scope:
        .then(function (response) { $scope.artistList = response.data.artist })

        .catch(function (response) { alert("Angular myApp.controller error: " + response); })
        //------------------------------------------------------------------------------------
}]);

// <HEAD> AVAILABLE FUNCTIONS:

function get_artist_datasource_selection() {

    //------------------------------------------------------------------------------------
    var selection;

    // Determine from the GUI what Artist datasource was selected by the user:
    if (document.getElementById("artist_datasource_demo_test").checked) {
        selection = document.getElementById("artist_datasource_demo_test").value;
    } else
    if (document.getElementById("artist_datasource_jims_artist_database").checked) {
        selection = document.getElementById("artist_datasource_jims_artist_database").value;
    } else
        if (document.getElementById("artist_datasource_artist").checked) {
        selection = document.getElementById("user_entered_artists").value;
    }

    //------------------------------------------------------------------------------------
    // Based on the Artist datasource selection, assign the Artist database object.  Do
    // this from either the standard datasources, which are already initialized, or the
    // user input:
    var datasource_object;

    switch (selection) {

        case "demo_test":

            datasource_object = demo_test_datasource_object;
            break;

        case "jims_artist_database":

            datasource_object = new Object();
            datasource_object.description = "artist";
            datasource_object.offline_discographies = "";
            datasource_object.artist_array = get_selected_artists();
            break;

        default:

            datasource_object = new Object();
            datasource_object.description = "artist";
            datasource_object.offline_discographies = "";

            // Accept a token-separated list of input elements, clean it up and parse it to an array.  This
            // can handle user typed data (separated by line breaks), or lists copied and pasted from either an
            // HTML or ASCII source (separated by their respective line breaks).

            datasource_object.artist_array =
                accept_clean_parse_to_array(
                    document.getElementById("user_entered_artists").value,
                    true // sort the resultant array
                );

    }

    //------------------------------------------------------------------------------------

    return datasource_object;

}

function get_selected_artists() {
    return get_column_values_as_array("artist_master_table", 0, true);
}

function init_angular_multi_filter_select() {

    // Instantiate Angular Multi Filter Select services:
    angular_multi_filter_select_services = new angular_multi_filter_select();

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // STEP ONE: Init the reference-selection/master data hierarchy:

    var reference_column1 = 'decade'; // consists of unique entries in the master
    var reference_column2 = 'genre';  // consists of unique entries in the master
    var master_table = 'artist';      // is filtered by reference_column1, reference_column2 and reference_column3

    var master_column = 'id';
    var master_column_alias = 'artist';

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // STEP TWO: Assemble the Select Boxes and Tables dynamically:

    // These are reference only:
    // ng-model="selecteddecade" ng-options="artist.decade as artist.decade for artist in artistList | unique:'decade'"></select>
    // ng-model="selectedgenre"  ng-options="artist.genre  as artist.genre  for artist in artistList | unique:'genre'" ></select>

    var decade_reference_selectbox = angular_multi_filter_select_services.get_reference_selectbox(reference_column1, "", master_table, true, []); // unique_filter = true, filter_array empty - not filtered by others
    var genre_reference_selectbox  = angular_multi_filter_select_services.get_reference_selectbox(reference_column2, "", master_table, true, []); // unique_filter = true, filter_array empty - not filtered by others

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // This is master only:
    // ng-repeat="artist in artistList | orderBy:'artist' | filterMultiple:{decade:selecteddecade, genre:selectedgenre, artist:selectedartists}">

    var artist_master_table_header = '<tr><th>' + capitalize(master_column_alias == "" ? master_column : master_column_alias) + '</th></tr>';

    var artist_master_table_detail = '<tr ng-repeat="' +
        angular_multi_filter_select_services.get_master_repeat(master_table, master_column, [reference_column1, reference_column2]) + // filter_array - is filtered by others
        '"><td>{{' + master_table + '.' + master_column + '}}</td></tr>';

    var artist_master_table = '<table>' + artist_master_table_header + artist_master_table_detail + '</table>';

    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // STEP THREE: Create the Select Boxes and Tables on the form by replacing the placeholders:

    replace_element("decade_reference_selectbox_placeholder", decade_reference_selectbox, "decade_reference_selectbox", "div");
    replace_element("genre_reference_selectbox_placeholder", genre_reference_selectbox, "genre_reference_selectbox", "div");
    replace_element("artist_master_table_placeholder", artist_master_table, "artist_master_table", "table");

}

function initialize_standard_datasource(demo_test_desc) {

    // Instantiate the standard datasource objects:

    // NOTE: The name of the datasource will be passed into and saved inside the object
    // via its constructor:
    demo_test_datasource_object = new demo_test_artist_database(demo_test_desc );

    // Set the on-screen "freshness date" from inside the instantiated standard datasources:
    document.getElementById("artist_datasource_demo_test_offline").value =
        "(recorded on " + demo_test_datasource_object.offline_date_recorded + ")";

}

function set_artist_datasource_default() {

    // Select the first one in the list:
    document.getElementById("artist_datasource_demo_test").checked = true;

}

function set_artist_datasource_dependent() {

    // After much effort, I could not figure out how to deselect (reset) the rows in an
    // Angular SelectBox so I don't do so.  For consistency, I won't reset this either:
    //document.getElementById("user_entered_artists").value = "";

    if (document.getElementById("artist_datasource_demo_test").checked) {
        document.getElementById("user_entered_artists_div").style.display = "none";
        document.getElementById("angular_multi_filter_select").style.display = "none";
    }
    else if (document.getElementById("artist_datasource_jims_artist_database").checked) {
        document.getElementById("user_entered_artists_div").style.display = "none";
        document.getElementById("angular_multi_filter_select").style.display = "block";
    }
    else if (document.getElementById("artist_datasource_artist").checked) {
        document.getElementById("user_entered_artists_div").style.display = "block";
        document.getElementById("angular_multi_filter_select").style.display = "none";
    }

}

function show_datasource_data(datasource_object) {

    // NOTE: We will use a general-purpose utility to do this:
    show_array_in_new_window(

        // Unpackage the resultant values:
        datasource_object.description, // window_title
        datasource_object.artist_array

    );

}


