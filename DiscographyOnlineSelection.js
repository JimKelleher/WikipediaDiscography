function get_discography_online_selection() {
        
    var selection;

    // Determine from the GUI whether the discography should be offline (from a saved string) or
    // online (live from Wikipedia):        
    if (document.getElementById("discography_online_online").checked) {
        selection = true;
    } else {
        selection = false;
    }

    return selection;
}

function set_discography_online_default() {

    document.getElementById("discography_online_online" ).checked = true; // development
    //  document.getElementById("discography_online_offline").checked = true; // production

}
