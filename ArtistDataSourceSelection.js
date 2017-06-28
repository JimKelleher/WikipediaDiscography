// These are the standard datasources.  They are filled in Default.aspx's main():
var jimradio_datasource_object;
var youtube_datasource_object;

function get_artist_datasource_selection() {

    //------------------------------------------------------------------------------------
    var selection;

    // Determine from the GUI what Artist datasource was selected by the user:
    if (document.getElementById("artist_datasource_jimradio").checked) {
        selection = document.getElementById("artist_datasource_jimradio").value;
    } else if (document.getElementById("artist_datasource_youtube").checked) {
        selection = document.getElementById("artist_datasource_youtube").value;
    } else if (document.getElementById("artist_datasource_rocklist").checked) {
        selection = document.getElementById("artist_datasource_rocklist").value;
    } else if (document.getElementById("artist_datasource_artist").checked) {
        selection = document.getElementById("user_entered_artists").value;
    }

    //------------------------------------------------------------------------------------
    // Based on the Artist datasource selection, assign the Artist database object.  Do
    // this from either the standard datasources, which are already initialized, or the
    // user input:
    var datasource_object;

    switch (selection) {

        case "jimradio":

            datasource_object = jimradio_datasource_object;
            break;

        case "youtube":

            datasource_object = youtube_datasource_object;
            break;

        case "rocklist":

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

function initialize_standard_datasources(jimradio_desc, youtube_desc) {

    // Instantiate the standard datasource objects:

    // NOTE: The name of the datasource will be passed into and saved inside the object
    // via its constructor:
    jimradio_datasource_object = new jimradio_artist_database_1(jimradio_desc);
    youtube_datasource_object  = new jimradio_artist_database_2(youtube_desc );

    // Set the on-screen "freshness date" from inside the instantiated standard datasources:
    document.getElementById("artist_datasource_jimradio_offline").value =
        "(recorded on " + jimradio_datasource_object.offline_date_recorded + ")";
    document.getElementById("artist_datasource_youtube_offline").value =
        "(recorded on " + youtube_datasource_object.offline_date_recorded + ")";

}

function set_artist_datasource_default() {

    // Select the first one in the list:
    // Production:
    document.getElementById("artist_datasource_jimradio").checked = true;
    // Test:
    //document.getElementById("artist_datasource_artist").checked = true;

}

function set_artist_datasource_dependent() {

    document.getElementById("user_entered_artists").value = "";

    if (document.getElementById("artist_datasource_artist").checked) {
        document.getElementById("user_entered_artists").disabled = false;
    } else {
        document.getElementById("user_entered_artists").disabled = true;
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
