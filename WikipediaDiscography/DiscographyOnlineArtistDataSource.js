
function cross_object_synchronize() {

    // Show/hide or enable/disable fields/radiobuttons that are dependent on other
    // radiobutton selections:
    set_radiobutton_dependent();

    // Set defaults that are dependent on radiobutton selections:
    set_artist_datasource_dependent();

}

function set_radiobutton_dependent() {

    // Set default radiobutton selections:
    set_artist_datasource_default();

    // Show/hide fields that are dependent on other radiobuttons:
    if (document.getElementById("discography_online_offline").checked) {
        document.getElementById("artist_datasource_demo_test_offline").type = "text";
    } else {
        document.getElementById("artist_datasource_demo_test_offline").type = "hidden";
    }

    // Enable/disable radiobuttons that are dependent on other radiobuttons:
    document.getElementById("artist_datasource_jims_artist_database").disabled =
        document.getElementById("discography_online_offline").checked;
    document.getElementById("artist_datasource_artist").disabled =
        document.getElementById("discography_online_offline").checked;

}
