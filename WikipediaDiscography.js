
// This file contains Wikipedia Discography lookup services

// Dependency: json2.js is needed to use JSON.parse()

// NOTE: The following high level functions are shown in hierarchical, usage order:

// My homemade Wikipedia Discography object Part A, the class definition/constructor:
function wikipedia_discography(online, offline_discographies) {

    // Save the arguments:
    this.online = online;
    this.offline_discographies = offline_discographies;

    //--------------------------------------------------------------------------------------------------------------
    // Two-phase design:  1) load variables, 2) unload variables
    // NOTE: The following two-phase design caused me to employ two expedients: "global" (object) variables which
    // will be set on one level of the processing hierarchy and referenced on another. This to avoid passing them
    // hither and yon as arguments and return values. The entire point of these processing divisions is to fill
    // these variables.

    // Part 1 of 2: Artist Processing - Find the correct Wikipedia page for the artist, all of whom have been
    // pre-screened as having one, and get raw discography data in the form of a JSON response string from that
    // page. This is the "current artist" field which was created because a large part of this objects processing
    // is concerned with the data of a single artist at a time:
    this.artist = "";

    this.style = -1; // init
    this.use_external_discog = false
    this.wikipedia_page_url = "";

    // Part 2 of 2: Discography Processing - Isolate, refine and break out the raw discography data, finally
    // producing either an HTML report or a JSON string.
    this.discography_return_JSON_string = "";

    // These are the output processing "control break" fields:
    this.previous_artist = "";
    this.previous_section = "";

    // These are the error handling fields. Init them:
    this.error_code = 0;
    this.error_message = "";

    // This is used for collapsing nested subsections:
    this.albums_or_singles = "";

    //--------------------------------------------------------------------------------------------------------------
    // Constants:
    this.DISCOGRAPHY_INDICATOR1 = "==Discography==";
    this.SUBSECTION_START_INDICATOR = "\\n'''";
    this.DISCOGRAPHY_SPLIT_INDICATOR1 = "\\n*";
    this.DISCOGRAPHY_SPLIT_INDICATOR2 = "n*";

    // This is a "compromise" search string which also handles
    // "'''" (3 single quotes):
    this.SUBSECTION_END_INDICATOR = "'";

    this.SECTION_STYLE_A_START_IND_WITH_EQUAL = "\\n\\n==="; // indicator
    this.SECTION_STYLE_A_END_IND_WITH_EQUAL = "===\\n*"; // indicator

    this.SECTION_STYLE_B_START_IND_WITH_SEMI = "\\n\\n;"; // indicator
    this.SECTION_STYLE_B_END_IND = "\\n*"; // indicator

    this.SECTION_TITLE_START_INDICATOR = "\\n==="; // \\n = \n (escaped)

    this.WIKITABLE_INDICATOR = '{| class=\\"wikitable\\"';

    this.STRING_LEADER = "the ";
    this.STRING_TRAILER = " band";

    // Wikipedia cleanup robot flagged:
    // Eg: Jeff Beck's external discography (https://en.wikipedia.org/wiki/Jeff_Beck_discography)
    //      {{cleanup|date=May 2015|reason=formatting does not conform to Wikipedia standard}}
    // It did not have a discography literal and it did not have a first section.
    this.WIKIPEDIA_CLEANUP_FLAGGED = "formatting does not conform to Wikipedia standard";

    //--------------------------------------------------------------------------------------------------------------
    // Declare/init the album counter:
    this.album_count = 0;

    // Declare/init. These will count how many Wikipedia discography sections are
    // found that conform to the various styles:
    this.style_0_count = 0;
    this.style_1_count = 0;
    this.style_2_count = 0;
    this.style_3_count = 0;
    this.style_4_count = 0;
    this.style_5_count = 0;
    this.style_7_count = 0;
    this.style_8_count = 0;
    this.style_61_count = 0;
    this.style_62_count = 0;
    this.style_63_count = 0;
    this.style_64_count = 0;
    this.style_65_count = 0;
    this.style_67_count = 0;
    this.style_68_count = 0;

    //--------------------------------------------------------------------------------------------
    // NOTE: Permanent debugging is built-in because the "debugging" of artist
    // discographies requires tools to speed it up.

    // Artist Discography Debug Tools:

    // artist
    //     discography
    //         section
    //             album

    // CROSS-REFERENCE G - data/debug levels - Debug levels are aligned with data levels.
    // 1 of 5: Optional processing to trace the details of the creation of the discographies:
    this.debug_trace_artist = false;
    this.debug_trace_discography = false;
    this.debug_trace_section = false;
    this.debug_trace_album = false;

    // 2 of 5: Optional processing to simulate bad album data since the data is for most artists
    // pretty clean. NOTE: "this.debug_trace_section", above, needs to be set to "true", otherwise
    // you will be generating errors, but will not be showing them to the developer:
    this.simulate_album_errors = false;

    // 3 of 5: Optional processing to simulate an unexpected error:
    this.simulate_unexpected_error = false;

    // 4 of 5: Optional processing to load and show an array containing only unique, distinct
    // sections. It won't run in production so I don't have to worry about its efficiency:
    this.debug_get_distinct_sections = false;

    this.debug_distinct_sections_all;
    this.debug_distinct_sections_selected;

    // 5 of 5: Optional processing to compare an artist's name with an album or video's title
    // and determine/show if the title is eponymously named:
    this.show_eponymous_titles = false;

}

// My homemade Wikipedia Discography object Part B, utility functions:

// EXTERNAL INTERFACE 1:
wikipedia_discography.prototype.get_discographies_JSON_string = function (artist_array, format) {

    // NOTE: This is the "atomic" processing level for catching "spare" (unplanned-for) errors
    // (I hope!) After a modest effort, I could not simulate such errors. I would have to dig
    // down progressively several processing levels and that would have been very time consuming.

    try {
        // NOTE: The "get_discographies_JSON_string()/get_discographies_JSON_string_attempt()"
        // construct is just a convenient way to isolate my error handling:

        return this.get_discographies_JSON_string_attempt(artist_array, format);

    } catch (e) {

        // Channel error info appropriately to "standard error" and "standard debug":
        standard_streams_services.write("error", "get_discographies_JSON_string() error");
        this.write_debug(e.message);

    }

}

// EXTERNAL INTERFACE 2:
wikipedia_discography.prototype.get_discography_arrays_from_JSON_string = function (artist_string, JSON_response_string, studio_selected, concert_selected) {

    var studio_album_array = new Array();
    var concert_album_array = new Array();

    var is_concert_section;
    var is_concert_album;

    // Convert the "flat" JSON string to a "live" JSON object so we can examine the contents of the response:
    //var JSON_response_object = JSON.parse(JSON_response_string);
    var JSON_response_object;

    try {
        JSON_response_object = JSON.parse(JSON_response_string);
    } catch (e) {

        // Inform the developer of the error:
        standard_streams_services.write("error", "get_discography_arrays_from_JSON_string() JSON parse() error " + e.message);
    }

    // NOTE: This process is designed to operate on a hierarchy of data as follows:
    //
    //  artist
    //      section
    //          album detail
    //
    // For our purposes, we want to combine all Sections into one array, thus
    // eliminating the Section level.

    // Peruse the already initialized "live" JSON discography object, assembling
    // the combined-Sections album array as we go:
    var albums;
    var distinct_albums;

    // Level 1 of 3, the Artist loop using the "i" index:
    for (var i = 0; i < JSON_response_object.artists.length; i++) {

        // Here we position ourselves in the JSON object on the requested Artist:
        if (JSON_response_object.artists[i].artist == artist_string) {

            // Init the combined-Section Album array:
            albums = new Array();

            // Level 2 of 3, the Section loop using the "j" index:
            for (var j = 0; j < JSON_response_object.artists[i].sections.length; j++) {

                is_concert_section = false;
                if (this.is_concert(JSON_response_object.artists[i].sections[j].section) == true) {
                    is_concert_section = true;
                }

                // Level 3 of 3, the Album loop using the "k" index:
                for (var k = 0; k < JSON_response_object.artists[i].sections[j].albums.length; k++) {

                    is_concert_album = false;
                    if (is_concert_section == false) {

                        if (
                            this.is_concert(JSON_response_object.artists[i].sections[j].albums[k].album) == true &&
                            this.test_against_invalid_concert_album_name(JSON_response_object.artists[i].sections[j].albums[k].album) == true // should_accept = true

                            ) {
                            is_concert_album = true;
                        }
                    }

                    if (is_concert_section == true || is_concert_album == true) {

                        concert_album_array.push(JSON_response_object.artists[i].sections[j].albums[k].album);

                    } else {
                        studio_album_array.push(JSON_response_object.artists[i].sections[j].albums[k].album);
                    }

                    // Load the combined-Section Album array:
                    albums.push(JSON_response_object.artists[i].sections[j].albums[k].album);
                }
            }

            // At this point, all levels of the "flattened" hierarchy for the requested Artist have been
            // perused. The combined-Section Album array for the Artist has been loaded.

            // CROSS-REFERENCE C - nested subsections/singles - A full "logical" discography can contain duplicate Album
            // titles. This is mostly/entirely a function of the incorrect processing of Singles titles which finds Album titles instead.
            // Singles processing is only in the "beta" stages and probably won't be included in the final release. See 10,000 Maniacs,
            // In My Tribe, and Buffalo Springfield, Buffalo Springfield album as examples.

            // In the meantime, clean up the array:

            // Sort and deduplicate. At the same time, package up the two resultant arrays:

            studio_album_array.sort();
            distinct_albums = deduplicate_sorted_array(studio_album_array);
            studio_album_array = distinct_albums;

            concert_album_array.sort();
            distinct_albums = deduplicate_sorted_array(concert_album_array);
            concert_album_array = distinct_albums;

            albums.sort();
            distinct_albums = deduplicate_sorted_array(albums);
        }
    }

    // Package up the two resultant arrays:
    var discography_detail_object = new Object();

    discography_detail_object.studio_array = studio_album_array;
    discography_detail_object.concert_array = concert_album_array;

    // Return them:
    return discography_detail_object;

}

// EXTERNAL INTERFACE 3:
wikipedia_discography.prototype.get_HTML_report_from_JSON_string = function (JSON_string) {

    //var JSON_object = JSON.parse(JSON_string); // init
    var JSON_object;

    try {
        JSON_object = JSON.parse(JSON_string); // init
    } catch (e) {

        // Inform the developer of the error:
        standard_streams_services.write("error", "get_HTML_report_from_JSON_string() JSON parse() error " + e.message);
    }

    var report_HTML_string = ""; // init

    this.album_count = 0;

    // Level 1 of 3, the Artist loop using the "i" index:
    for (var i = 0; i < JSON_object.artists.length; i++) {

        report_HTML_string += "<br><span id='report_level_1'>" + JSON_object.artists[i].artist + "</span><br>";

        if (JSON_object.artists[i].wikipedia_page == "") {
            report_HTML_string += "Hardcoded discography";
        } else {
            report_HTML_string += '<a href="' + JSON_object.artists[i].wikipedia_page + '" target="_blank">' +
                JSON_object.artists[i].wikipedia_page + '</a>';
        }

        report_HTML_string += "<br>";

        // Level 2 of 3, the Section loop using the "j" index:
        for (var j = 0; j < JSON_object.artists[i].sections.length; j++) {

            report_HTML_string += "<br><span id='report_level_2'>" + JSON_object.artists[i].sections[j].section + " (style " +
                JSON_object.artists[i].sections[j].style.toString() + ")</span><br>";

            // Level 3 of 3, the Album loop using the "k" index:
            for (var k = 0; k < JSON_object.artists[i].sections[j].albums.length; k++) {

                report_HTML_string += "<span id='report_level_3'>" +
                    JSON_object.artists[i].sections[j].albums[k].year + " " +
                    JSON_object.artists[i].sections[j].albums[k].album + "</span><br>";
                
                this.album_count++; // increment
            }
        }
    }

    // NOTE: Style counting is a function of Wikipedia Discography reading, which only happens
    // for online processing:
    if (this.online == true) {

        // Assemble the Counts HTML string:
        var counts_HTML_string = "Albums: " + this.album_count.toString() + "<br><br>"; // init

        // Append all:
        counts_HTML_string += "Style 0: " + this.style_0_count.toString() + "<br>";
        counts_HTML_string += "Style 1: " + this.style_1_count.toString() + "<br>";
        counts_HTML_string += "Style 2: " + this.style_2_count.toString() + "<br>";
        counts_HTML_string += "Style 3: " + this.style_3_count.toString() + "<br>";
        counts_HTML_string += "Style 4: " + this.style_4_count.toString() + "<br>";
        counts_HTML_string += "Style 5: " + this.style_5_count.toString() + "<br>";
        counts_HTML_string += "Style 7: " + this.style_7_count.toString() + "<br>";
        counts_HTML_string += "Style 8: " + this.style_8_count.toString() + "<br>";

        counts_HTML_string += "Style 61: " + this.style_61_count.toString() + "<br>";
        counts_HTML_string += "Style 62: " + this.style_62_count.toString() + "<br>";
        counts_HTML_string += "Style 63: " + this.style_63_count.toString() + "<br>";
        counts_HTML_string += "Style 64: " + this.style_64_count.toString() + "<br>";
        counts_HTML_string += "Style 65: " + this.style_65_count.toString() + "<br>";
        counts_HTML_string += "Style 67: " + this.style_67_count.toString() + "<br>";
        counts_HTML_string += "Style 68: " + this.style_68_count.toString() + "<br><br>";

        report_HTML_string = counts_HTML_string + report_HTML_string;
    }

    // Return the report in its final state:
    return report_HTML_string;
}

// NOTE: The following lower level functions are shown in alphabetical order:

wikipedia_discography.prototype.convert_sections_style_B_to_A = function (discog_wikipedia_string) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // NOTE: Wikipedia discography section titles are, alas, coded in two different formats which I will call "style A" (eg: Flunk):
    // [[Lost Causes]] (2013)\n\n===EP===\n*

    // ...and "style B" (eg: Elton John):
    // ''[[The Diving Board]]'' (2013)\n\n;Collaborative albums\n*

    // We will convert style B sections to style A:

    // Declare/init:
    var section_start_index = 0;
    var section_end_index = 0;

    do {

        section_start_index = discography_JSON_string_edited.indexOf(this.SECTION_STYLE_B_START_IND_WITH_SEMI, section_start_index);

        if (section_start_index > -1) {

            section_end_index = discography_JSON_string_edited.indexOf(this.SECTION_STYLE_B_END_IND, section_start_index);

            if (section_end_index > -1) {

                // If we have found a style A section:

                // Replace sections using style B indicators with sections using style A indicators:
                discography_JSON_string_edited =
                    discography_JSON_string_edited.replace(

                //  Style B:
                        discography_JSON_string_edited.substring(section_start_index, section_end_index + this.SECTION_STYLE_B_END_IND.length),

                //  Style A:
                        this.SECTION_STYLE_A_START_IND_WITH_EQUAL +
                            discography_JSON_string_edited.substring(section_start_index + this.SECTION_STYLE_B_START_IND_WITH_SEMI.length, section_end_index) +
                            this.SECTION_STYLE_A_END_IND_WITH_EQUAL
                    );

            }
        }

        // Repeat until all the style B sections have been replaced:
    } while (section_start_index > -1 &&
             section_end_index > -1);

    // The following is a product of my previous section changes and does not exist in this exact form until here.
    // It appears to be an empty section of some sort.  Since I'm getting all of the data, and since I have no idea
    // what this is intended to be, it must be eliminated:
    // Eg: Kate Havnevik, Eric Burdon, Morrissey, The Kinks, The Rolling Stones.
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "\\n======\\n");

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.convert_subsections_to_style_B_sections = function (discog_wikipedia_string) {

    if (this.debug_trace_discograpy == true) { get_function_description("convert_subsections_to_style_B_sections"); }

    // Eg, artists with subsections: Alanis Morissette, Bob Marley, Carole King, Mark Knopfler.

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // Let's see if there are any subsections in this discography:
    var subsection_array = this.get_discog_subsection_array(discography_JSON_string_edited);

    // If there are...
    if (subsection_array.length > 0) {

        //...convert subsections to sections...
        for (var i = 0; i < subsection_array.length; i++) {

            //...by way of the indicators that delimit them:
            discography_JSON_string_edited =
                discography_JSON_string_edited.split(
                    this.SUBSECTION_START_INDICATOR +
                    subsection_array[i] +
                    this.SUBSECTION_END_INDICATOR
            ).join(
                this.SECTION_STYLE_B_START_IND_WITH_SEMI +
                subsection_array[i] +
                this.SECTION_STYLE_B_END_IND // string replacement via split/join
            );
        }
    }

    if (this.debug_trace_discograpy == true) { this.write_debug("convert_subsections_to_style_B_sections AFTER: " + discography_JSON_string_edited); }

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.crush = function (look_in) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var look_in_edited = look_in;

    // Prep:
    look_in_edited = look_in.toLowerCase();

    // Remove unhelpful special characters:
    look_in_edited = remove_all_procedural(look_in_edited, "'"); // apostrophe eg: Manfred Mann's Earth Band
    look_in_edited = remove_all_procedural(look_in_edited, "."); // period eg: Dr. Hook & the Medicine Show

    // Replace long dashes (Bachman–Turner Overdrive) with short dashes (The B-52's)
    // and then remove the short dashes:
    look_in_edited = replace_all(look_in_edited, "–", "-");
    look_in_edited = remove_all_procedural(look_in_edited, "-");

    // Regularize foreign characters:
    look_in_edited = replace_all(look_in_edited, "á", "a"); // eg: José González
    look_in_edited = replace_all(look_in_edited, "é", "e"); // eg: José González

    // Regularize (set to " and ") and then replace (with single spaces) the AND separators:
    look_in_edited = regularize_AND_separators(look_in_edited);
    look_in_edited = replace_all(look_in_edited, " and ", " ");

    // Remove unhelpful words, phrases and constructions:
    look_in_edited = remove_all_procedural(look_in_edited, "the ");     // eg: Derek and the Dominos // unintended: " fourth "
    look_in_edited = remove_all_procedural(look_in_edited, " (band)");  // eg: The Four Seasons (band) BUG WORK-AROUND

    // Return a "crushed" version of the input string:
    return look_in_edited;

}

wikipedia_discography.prototype.crush_artist = function (artist) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var artist_edited = artist;

    // Prep:
    artist_edited = artist.toLowerCase();

    // NOTE: Every rule has an exception!
    if (artist_edited != "the the" && artist_edited != "the band") {

        // Remove special characters, AND separators, words, phrases and constructions that could be
        // the source of differentation between entries that are fully user data-enterable (and subject
        // to errors and poor naming). The remaining portion is a "crushed" version of the input string.

        // NOTE 1: A crushed artist name will be used as an "intelligent key" for matching.

        // NOTE 2: A crushed name should not be confused with a "core" name . They are different and
        // serve distinctly different purposes:

        artist_edited = this.crush(artist);

    }

    return artist_edited;

}

wikipedia_discography.prototype.debug_trace_album_arrays = function (section, year_array, title_array) {

    // CROSS-REFERENCE A - trace/simulate - Affects the order of the calling of these functions:

    this.debug_trace_album_arrays_range_size(section, year_array, title_array);
    this.debug_trace_album_arrays_special_chars(section, year_array, title_array);
    this.debug_trace_album_arrays_duplicates(section, year_array, title_array);

}

wikipedia_discography.prototype.debug_trace_album_arrays_duplicates = function (section, year_array, title_array) {

    // NOTE: Artists rarely, though sometimes, release multiple eponymous albums, eg:

    // Peter Gabriel Studio albums 1977, 1978, 1980, 1982
    // Weezer Main Discography 1994, 2001, 2008

    // Real message eg:
    // Weezer Main Discography, Warning: duplicate titles

    if (this.debug_trace_section == true) {

        // Here, we do not have to simulate bad data, nor is the data "bad". These artists actually
        // released multiple albums under the same title:
        if (this.simulate_album_errors == true) {

            alert("Test duplicate albums with Peter Gabriel and Weezer");

            // CROSS-REFERENCE A - trace/simulate - We only need to see this message once. Since
            // the range/size and special character simulations (both of which check this value) have already
            // occurred, it's OK to do this:

            this.simulate_album_errors = false;

        }
    }

    // Determine if there are any duplicate titles in the array:
    var title_array_work = title_array;
    title_array_work.sort();
    title_array_work = deduplicate_sorted_array(title_array_work);

    // If any warnings are found, show them to the developer:
    if (title_array.length > title_array_work.length) {
        this.write_debug(this.artist + " " + section + ", Warning: duplicate titles");
    }

}

wikipedia_discography.prototype.debug_trace_album_arrays_range_size = function (section, year_array, title_array) {

    // Dummy message egs:
    // Bee Gees Original albums -99 ===> The Bee Gees Sing and Play 14 Barry Gibb Songs <===, Error: year is less than zero, Error: year out of range
    // Bee Gees Original albums 1875 ===> Spicks and Specks <===, Error: year out of range
    // Bee Gees Original albums 2500 ===> Bee Gees' 1st <===, Error: year out of range

    var error_message = ""; // init

    // Since the data is for most artists pretty clean, we have to simulate bad data:
    if (this.debug_trace_section == true) {
        if (this.simulate_album_errors == true) {

            // This will cause these entries to be flagged as out of range:
            try {
                year_array[0] = -99;
                year_array[1] = 1875;
                year_array[2] = 2500;
            } catch (e) { }

        }
    }

    // Calculate what constitutes a too-high year:
    var date_now = new Date();
    var year_now = date_now.getFullYear();

    // NOTE: Artists sometimes announce albums before they are released, and they get added into Wikipedia,
    // so you can have future albums (within reason):
    var future_year = year_now + 5;

    for (var i = 0; i < year_array.length; i++) {

        error_message = ""; // init

        // Test for a limited number of errors:
        if (year_array[i] < 0) { error_message += ", Error: year is less than zero"; }
        if (year_array[i] < 1900 || year_array[i] > future_year) { error_message += ", Error: year out of range"; }

        // Test for a limited number of warnings:
        if (title_array[i].length < 4 || title_array[i].length > 75) { error_message += ", Warning: title size out of range"; }

        // If any errors or warnings are found, show them to the developer:
        if (error_message != "") {
            this.write_debug(this.artist + " " + section + " " + year_array[i].toString() + " " + "===> " + title_array[i] + " <===" + error_message);
        }

    }

}

wikipedia_discography.prototype.debug_trace_album_arrays_special_chars = function (section, year_array, title_array) {

    // Space character, lower case "a-z", upper case "A-Z" and all digits:
    var WIKIPEDIA_ALBUM_VALID_REGULAR = "\\sA-Za-z0-9";

    // Wikipedia album title regular expression characters:

    // Description          Artist                  Album                             Special Character
    // -----------          ------                  -----                             -----------------
    // dash                 Bob Dylan               Street-Legal				        - (put first)
    // ampersand            Bad Company             Stories Told & Untold	            &			
    // apostrophe           Bob Marley              Burnin'				                '
    // colon                Aretha Franklin         Aretha: With The Ray Bryant Combo	:
    // comma                Al Stewart              Past, Present and Future			,
    // exclamation mark     Bent                    Intercept!				            !
    // period               Bruce Springsteen       Born in the U.S.A.			        .
    // question mark        Dionne Warwick          Who Can I Turn To?			        ?
    // slash                Elliott Smith           Either/Or				            \/

    // Wikipedia album title regular expression character patterns:

    // Dash/hyphen (must be first in the list), exclamation, question, ampersand, apostrophe/single quote,
    // colon, comma, period and slash:
    var WIKIPEDIA_ALBUM_VALID_SPECIAL = "-!?&':,.\/";

    // Since the data is for most artists pretty clean, we have to simulate bad data:
    if (this.debug_trace_section == true) {
        if (this.simulate_album_errors == true) {

            // This will cause these characters to be flagged as invalid:
            WIKIPEDIA_ALBUM_VALID_SPECIAL = WIKIPEDIA_ALBUM_VALID_SPECIAL.replace("!", "");
            WIKIPEDIA_ALBUM_VALID_SPECIAL = WIKIPEDIA_ALBUM_VALID_SPECIAL.replace("?", "");

        }
    }

    var WIKIPEDIA_ALBUM_VALID = "[" + WIKIPEDIA_ALBUM_VALID_REGULAR + WIKIPEDIA_ALBUM_VALID_SPECIAL + "]";

    // Dummy message eg:
    // Bent Studio albums 2006 ===> Intercept! <===, Warning: Invalid Wikipedia album character(s)

    var error_message;

    for (var i = 0; i < title_array.length; i++) {

        // NOTE: This will find a match only if the album title does not violate the proper naming
        // convention (which was deduced, not prescribed, by me).

        // If the album title does not violate the proper naming convention:

        // This will create a string stripped of any invalid characters:
        var title_char_array = title_array[i].match(new RegExp(WIKIPEDIA_ALBUM_VALID, "g"));
        var title_string = title_char_array.join("");

        // The stripped string is then compared to the original: 
        if (title_string != title_array[i]) {

            // Eg: Bent / Intercept! / Intercept
            error_message = ", Warning: Invalid Wikipedia album character(s)";
            this.write_debug(this.artist + " " + section + " " + year_array[i].toString() + " " + "===> " + title_array[i] + " <===" + error_message);
        }
    }

}

wikipedia_discography.prototype.debug_trace_show_unicode_chars = function (look_in) {

    this.write_debug("remaining unicode characters");

    // Parse to an array consisting of the remaining unicode characters, if there are any:
    var hex_array = look_in.split("\\u");

    // Strip down to just the unicode characters:
    for (var i = 0; i < hex_array.length; i++) { hex_array[i] = hex_array[i].substr(0, 4); }

    // Reduce to unique entries only:
    hex_array.sort();
    hex_array = deduplicate_sorted_array(hex_array);

    // Show them to the developer...
    for (var i = 0; i < hex_array.length; i++) {

        if (hex_array[i].indexOf("\\n") == -1) {

            //...in both Hex and Unicode formats:
            this.write_debug("hex = " + hex_array[i] + "<br>" + "unicode = " + unescape("%u" + hex_array[i]));
        }
    }

}

wikipedia_discography.prototype.distinct_sections = function (sections, section) {

    // If the Wikipedia discography section does not exist in the distinct section array...
    if (this.find_section(sections, section) == false) {

        //... append it to the distinct section array. 
        // NOTE: The array index is zero-based but length is not:
        sections[sections.length] = section;
    }

}

// Return TRUE if the Wikipedia discography section already exists in the distinct section array:
wikipedia_discography.prototype.find_section = function (sections, section) {

    var section_found = false; // init

    for (var i = 0; i < sections.length; i++) {
        if (sections[i] == section) {
            section_found = true;
            break;
        }
    }

    return section_found;
}

wikipedia_discography.prototype.fix_broken_details = function (discog_wikipedia_array) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_array_edited = discog_wikipedia_array;

    //--------------------------------------------------------------------------------------------
    // NOTE: This picked up over 100 records!

    // This fixes Hall & Oates, Live albums, Situation A:
    // Normal detial:
    // | 1978\n|''[[Livetime]]\n|
    // Broken detial:
    // | 1983\n|''Sweet Soul Music]]\n|

    // This fixes Hall & Oates, Live albums, Situation B, Extraneous brackets are
    // at the end of the line and need to be ignored:
    // | 2003\n|''Live in Concert]]\n||\\n||\\n||\\n|\n|A&E ''[[Live by Request]]''...
    //--------------------------------------------------------------------------------------------

    var title_start_indicator_index;
    var title_start_indicator_index2;
    var title_end_indicator_index;

    // For each array element:
    for (var i = 0; i < discography_array_edited.length; i++) {

        // Get info:
        title_start_indicator_index = discography_array_edited[i].indexOf("[[");
        title_end_indicator_index = discography_array_edited[i].indexOf("]]");
        title_start_indicator_index2 = discography_array_edited[i].indexOf("''");

        // If this unique set of circumstances applies to this detail...

        // No start indicator, eg: Bob Dylan, Linda Ronstadt, Yes:
        if (title_end_indicator_index > -1) {

            if (title_start_indicator_index == -1 ||                        // Situation A
                title_start_indicator_index > title_end_indicator_index) {  // Situation B

                if (title_start_indicator_index2 > -1) {

                    // Overwrite the output array entry so as to repair it:
                    discography_array_edited[i] = discography_array_edited[i].split("|''").join("|''[["); // string replacement via split/join
                }
            }
        }

        // No end indicator, eg: Bill Withers, INXS, Three Dog Night:
        if (discography_array_edited[i].indexOf("[[") > -1) {
            if (discography_array_edited[i].indexOf("]]") == -1) {
                
                // Overwrite the output array entry so as to repair it:
                discography_array_edited[i] = discography_array_edited[i].replace("\\n|Released", "]]\\n|Released");
            }
        }

    }

    // Return the modified copy of the argument:
    return discography_array_edited;
}

wikipedia_discography.prototype.fix_detail_indicators = function (discog_wikipedia_string) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // String replacement via split/join:

    // Fix common bad formats:
    discography_JSON_string_edited = discography_JSON_string_edited.split("| ''").join("| [[");
    discography_JSON_string_edited = discography_JSON_string_edited.split("''\\").join("]]\\");
    discography_JSON_string_edited = discography_JSON_string_edited.split("[[[[").join("[[");
    discography_JSON_string_edited = discography_JSON_string_edited.split("]]]]").join("]]");
    discography_JSON_string_edited = discography_JSON_string_edited.split("[[ [[").join("[[");
    discography_JSON_string_edited = discography_JSON_string_edited.split("]] ]]").join("]]");
    discography_JSON_string_edited = discography_JSON_string_edited.split(" \\n|").join("\\n|");
    discography_JSON_string_edited = discography_JSON_string_edited.split(" |").join("|");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n|- \\n").join("\\n|\\n*");
    discography_JSON_string_edited = discography_JSON_string_edited.split("*Label:").join("* Label:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("*Released:").join("* Released:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n*Release:").join("Released:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n*Release date:").join("\\n* Released:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("* Label: , ").join("* Label: ");
    discography_JSON_string_edited = discography_JSON_string_edited.split("[['''[[").join("'''[[");
    discography_JSON_string_edited = discography_JSON_string_edited.split("]]''']]").join("]]'''");
    discography_JSON_string_edited = discography_JSON_string_edited.split("[[''' [[").join("[[");
    discography_JSON_string_edited = discography_JSON_string_edited.split("n#").join(this.DISCOGRAPHY_SPLIT_INDICATOR2);
    discography_JSON_string_edited = discography_JSON_string_edited.split("Release date:").join("Released:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("Formats:").join("Format:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n* Label:").join("\\n\\n* Label:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n* Released:").join("Released:");

    // Regularize the detail line row ends:
    var DISCOGRAPHY_SPLIT_INDICATOR3 = "-\\n"; // \\n = \n (escaped)
    var WIKITABLE_ROW_END_INDICATOR = "-\\n|";

    // Regularize styles 2 and 3 (line) to be like 1 (line):
    discography_JSON_string_edited = discography_JSON_string_edited.split(this.DISCOGRAPHY_SPLIT_INDICATOR2).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);
    discography_JSON_string_edited = discography_JSON_string_edited.split(DISCOGRAPHY_SPLIT_INDICATOR3).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);

    // Regularize style 4 (wikitable) to be like 1 (line):
    discography_JSON_string_edited = discography_JSON_string_edited.split(WIKITABLE_ROW_END_INDICATOR).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.fix_detail_years = function (discog_wikipedia_string) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    var start_index = 0; // init

    while (start_index > -1) {

        start_index = discography_JSON_string_edited.search(new RegExp("[(][1-2][901][0-9][0-9][,][\\s]", "g"));  //  \\s = space

        if (start_index > -1) {

            var end_index = discography_JSON_string_edited.indexOf(")", start_index);

            if (end_index > -1) {

                var date_to_fix = get_substring(discography_JSON_string_edited, start_index, end_index); // eg: (1995, Seed)
                var fixed_date = get_substring(date_to_fix, 0, 4) + ")";                                 // eg: (1995)

                // String replacement via split/join:
                discography_JSON_string_edited = discography_JSON_string_edited.split(date_to_fix).join(fixed_date);
            }
        }
    }

    discography_JSON_string_edited = discography_JSON_string_edited.split("|19").join("| 19");
    discography_JSON_string_edited = discography_JSON_string_edited.split("|20").join("| 20");
    discography_JSON_string_edited = discography_JSON_string_edited.split("| |").join("||");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "19\\n");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "19th");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "1975 (UK)");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "1976 (UK)");
    discography_JSON_string_edited = discography_JSON_string_edited.split("(1968 UA CD)").join("(1968)");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "Recorded: 2009 at [[Wembley]] and Union Chapel");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, ": 1998 - 2006");

    var MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (var i = 0; i < MONTH.length; i++) { discography_JSON_string_edited = discography_JSON_string_edited.split("(" + MONTH[i] + " ").join("("); }

    var CHART = ["UK", "US", "Nor", "Aus"];
    var RANK_UPPER_LIMIT = 250;

    for (var i = 0; i < CHART.length; i++) {

        // NOTE: Reverse order prevents the accidental result of partial matching, eg: the "US #1" search hitting on "US #159":
        for (var j = RANK_UPPER_LIMIT; j > 0; j--) {
            discography_JSON_string_edited =
                discography_JSON_string_edited.split(", " + CHART[i] + " #" + j.toString()).join("");
        }
    }

    var DAY_UPPER_LIMIT = 31;

    for (var i = 0; i < MONTH.length; i++) {

        // NOTE: Reverse order prevents the accidental result of partial matching, eg: the "1 April" search hitting on "31 April":
        for (var j = DAY_UPPER_LIMIT; j > 0; j--) { discography_JSON_string_edited = discography_JSON_string_edited.split(j.toString() + " " + MONTH[i] + " ").join(""); }
    }

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.fix_or_remove_detail_anomalies_via_hardcodes = function (discog_wikipedia_string) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // NOTE: In the early days of development, I took the time to fix individual Artists/Sections/Albums so
    // as not to lose the connected data.  I might as well continue to get the benefit of those fixes, though
    // they may become obsolete over time:

    discography_JSON_string_edited = discography_JSON_string_edited.split(" Immortal)").join(")");
    discography_JSON_string_edited = discography_JSON_string_edited.split("'Adult Contemporary'").join("Adult Contemporary");
    discography_JSON_string_edited = discography_JSON_string_edited.split("'Pop'").join("Pop");
    discography_JSON_string_edited = discography_JSON_string_edited.split("[[VH1]] [[Behind the Music]]").join("VH1 Behind the Music");

    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, " Sharp Practice Inc. ; Warner Music Vision");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, " US No.19");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, ", BOA Records, a re-release of ''Sequel''");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "Dossier, ");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "Double Album, ");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "Nettwerk, ");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "Third Mind, ");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "title= British Hit Singles & Albums");

    // CROSS-REFERENCE B - record company in album title - These are albums that have, in the beginning of their
    // titles, the name of a record company.  Left as they are, they would be removed by "remove_non_album_companies_or_orgs()".
    // We will trick that process by changing the titles slightly:

    // Johnny Cash: "Columbia Records 1958-1986"
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "Columbia Records 1958-1986", "Columbia 1958-1986");

    // "iTunes Originals – Red Hot Chili Peppers"
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "iTunes Originals", "Apple iTunes Originals");

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.fix_sections = function (discog_wikipedia_string) {

    // Built-in debugging:
    if (this.debug_trace_discograpy == true) { get_function_description("fix_sections"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    discography_JSON_string_edited = discography_JSON_string_edited.split("Singles and EPs").join("EPs");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n\\n==Cover versions==\\n\\n").join("\\n\\n==Cover versions==\\n*\\n");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, " ==", "==");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "== ", "==");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "====", "===");

    // Step 1, do a temporary rename so we don't screw up the standard naming:
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "===", "XrenameX");
    // Step 2, convert the problematic entries:
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "==", "===");
    // Step 3, undo the temporary rename:
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "XrenameX", "===");

    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, ",Studio albums===", "===Studio albums===");
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n; Studio albums\\n").join("\\n===Studio albums===\\n");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "===with Bob Dylan", "===with Bob Dylan===");
    discography_JSON_string_edited = discography_JSON_string_edited.split("Studio albums\\n").join("Studio albums\\n*");
    if (discography_JSON_string_edited.indexOf("===") > 5) { discography_JSON_string_edited = "\\n===Main Discography===\\n" + discography_JSON_string_edited; }
    discography_JSON_string_edited = discography_JSON_string_edited.split("===\\n===").join(" ")     // known
    discography_JSON_string_edited = discography_JSON_string_edited.split("===\\n\\n===").join(" "); // speculative
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "===Worldwide sales", "===", this.debug_trace_discograpy);

    // Built-in debugging:
    if (this.debug_trace_discograpy == true) { this.write_debug("fix_sections AFTER<br>" + discography_JSON_string_edited); }

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.get_artist_name_core = function (artist_name) {

    // NOTE: A "core" name should not be confused with a "crushed" name. They
    // are different and serve distinctly different purposes.

    artist_name = artist_name.toLowerCase();

    // STEP 1: Get the artists core name:

    var artist_name_core;

    // NOTE: Every rule has an exception!
    if (artist_name == "the the" || artist_name == "the band") {

        artist_name_core = artist_name; // init

    } else {

        // "Peel away" leaders and trailers leaving the "core" of the artists name.

        // Full Name                        Core Name
        // ---------                        ---------
        // The Beatles                      Beatles
        // Steve Miller Band                Steve Miller
        // The Allman Brothers Band         Allman Brothers
        // The Mamas & the Papas            Mamas & the Papas *

        // * NOTE: We can't eliminate internal THEs and BANDs because we will eventually be doing
        // character-based matching on these artist names and that would cause them to fail (or
        // cause me to have to start altering my YouTube queries to the same extent). With all the
        // song title hard-coding taking place, this would be a disaster. I already get thousands
        // of albums (more than I could ever listen to!) without resorting to such tactics.

        // Interestingly, I did some sample querying and found that YouTube agrees with me!
        // Searching for "Mamas & Papas" actually hurt my results.

        // Parse to an array consisting of the individual words in the artists name:
        var artist_edited_word_array = artist_name.split(" ");

        // Remove leading or trailing spaces from all the individual words in the
        // artists name:
        for (var i = 0; i < artist_edited_word_array.length; i++) {
            artist_edited_word_array[i] = artist_edited_word_array[i].trim();
        }

        // Look for the presence of leaders and trailers:
        var leader_found = false;
        var trailer_found = false;

        var start_index = 0;
        var end_index = artist_edited_word_array.length - 1;

        // NOTE: In string format (lower case), the space character acts as a word separator.
        // However, the parse to an array via split(), above, messes with the spaces so we
        // will concern ourselves only with words:
        var array_leader = this.STRING_LEADER.trim();
        var array_trailer = this.STRING_TRAILER.trim();

        // If any are found, eliminate them by resetting our bounds, effectively "peeling" them away:
        try {
            if (artist_edited_word_array[start_index] == array_leader) {
                leader_found = true;
            }
            if (artist_edited_word_array[end_index] == array_trailer) {
                trailer_found = true;
            }
        } catch (e) { }

        if (leader_found == true) { start_index++; }
        if (trailer_found == true) { end_index--; }

        // With or without new bounds, let us assemble the core of the artists name:

        artist_name_core = ""; // init

        for (var i = start_index; i <= end_index; i++) {
            artist_name_core += artist_edited_word_array[i];
            if (i != end_index) { artist_name_core += " "; }
        }

    }

    // STEP 2: Regularize the artists core name:

    // Regularize the AND separators, setting them all to " and ":
    artist_name_core = regularize_AND_separators(artist_name_core);

    // Return the regularized artist core name:
    return artist_name_core;

}

wikipedia_discography.prototype.get_artist_name_full = function (artist_name_core, album_or_video_title) {

    // NOTE: Possible return values:

    // Return Value                                         Meaning
    // ------------                                         -------

    // 1) Empty string.                                     The function did not find a core match.

    // 2) The output, "artist_name_full", is unchanged      The function found a core match but the full name it 
    // from the input "artist_name_core".                   found was the core itself.

    // 3) The output, "artist_name_full", is different      The function has done its job of finding the "context"
    // from the input "artist_name_core".                   in which the core exists so that it can be returned for
    //                                                      further processing.

    // Prep:
    artist_name_core = artist_name_core.toLowerCase();
    album_or_video_title = album_or_video_title.toLowerCase();

    var artist_name_full = ""; // init

    // NOTE: Every rule has an exception!
    if (artist_name_core == "the the" || artist_name_core == "the band") {

        artist_name_full = artist_name_core; // init

    } else {

        // Find the location in the title of the artist's core name:
        var artist_name_core_start_index = album_or_video_title.indexOf(artist_name_core);

        // If there is one:
        if (artist_name_core_start_index > -1) {

            // "Re-peel" the core, ie, put the leader and trailer back on. First we will do it
            // indiscriminately, ie, not knowing if we got a legitimate leader or trailer:

            // Find the bounds:
            var start_index = artist_name_core_start_index - this.STRING_LEADER.length;
            if (start_index < 0) { start_index = 0; }

            var end_index = artist_name_core_start_index + (artist_name_core.length - 1) + this.STRING_TRAILER.length;
            if (end_index > album_or_video_title.length - 1) { end_index = album_or_video_title.length - 1; }

            // Excise the candidate string:
            var artist_name_work = album_or_video_title.substring(start_index, end_index + 1);

            // We now have the core plus the surrounding leader-sized and trailer-sized chunks (if there are
            // any). In other words, if the full size arrangement (ie, "configuration 4", below) is present
            // (eg: The + Allman Brothers + Band), we will have it. Now let's find out what we do have:
            var leader_look = artist_name_work.substr(0, this.STRING_LEADER.length);
            var trailer_look = artist_name_work.substr(artist_name_work.length - this.STRING_TRAILER.length);

            // Prep:
            leader_look = leader_look.toLowerCase();
            trailer_look = trailer_look.toLowerCase();

            // Determine the "configuration" of the artist's name in the title:

            //-----------------------------------------------------------------------------------
            // Model                     Config.         Example Album
            // -----                     -------         -------------
            // The Allman Brothers Band     4            The Marshall Tucker Band
            // The Allman Brothers          3            Meet the Beatles!
            //     Allman Brothers Band     2            20 Years of Manfred Mann's Earth Band
            //     Allman Brothers          1 (core)     The Five Faces of Manfred Mann    
            //-----------------------------------------------------------------------------------

            var leader_found = false;
            var trailer_found = false;

            if (leader_look.toLowerCase() == this.STRING_LEADER.toLowerCase()) { leader_found = true; }
            if (trailer_look.toLowerCase() == this.STRING_TRAILER.toLowerCase()) { trailer_found = true; }

            var configuration;

            if (leader_found == true && trailer_found == true) {
                configuration = 4;
            } else if (leader_found == true && trailer_found == false) {
                configuration = 3;
            } else if (leader_found == false && trailer_found == true) {
                configuration = 2;
            } else {
                configuration = 1;
            }

            // Reset our bounds, taking account of the leaders and trailers, effectively "re-peeling"
            // the core:

            // Set our bounds, first for the inner core...
            start_index = artist_name_work.indexOf(artist_name_core);
            end_index = artist_name_work.indexOf(artist_name_core) + artist_name_core.length - 1;

            //...then adjust them backwards or forwards based on the leaders and trailers:
            if (leader_found == true) { start_index = start_index - this.STRING_LEADER.length; }
            if (trailer_found == true) { end_index = end_index + this.STRING_TRAILER.length; }

            // Extract the full artists name as found in the album or video title:
            artist_name_full = artist_name_work.substring(start_index, end_index + 1);

            // Prep:
            artist_name_full = artist_name_full.toLowerCase();

        }

    }

    return artist_name_full;

}

//FIXME
// Contains artist-based hardcoding:
wikipedia_discography.prototype.get_discog_JSON_string_hardcoded_live_albums = function (artist) {

    // Constants:
    var LIVE_SECTION = "Live albums";

    var artist_discography_JSON_string = ""; // init

    switch (artist) {

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                         
        //        case "":    

        //            artist_discography_JSON_string +=    

        //                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +    
        //                '          {"year":, "album":""}' +    
        //                '         ,{"year":, "album":""}' +    
        //                '      ]}';    

        //            this.style = 0;
        //            this.increment_style_counter(this.style, 1); // increment by 1    

        //            break;    
         
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                        
        case "Aerosmith":

            artist_discography_JSON_string +=

                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1978, "album":"Live! Bootleg"}' +
                '         ,{"year":1986, "album":"Classics Live!"}' +
                '         ,{"year":1987, "album":"Classics Live! Vol. 2"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                       
        case "Alanis Morissette":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1999, "album":"MTV Unplugged"}' +
                '         ,{"year":2013, "album":"Live at Montreux 2012"}' +

                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Alice Cooper":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1977, "album":"The Alice Cooper Show"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Barbra Streisand":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1968, "album":"A Happening in Central Park"}' +
                '         ,{"year":1972, "album":"Live Concert at the Forum"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                            
        case "Bee Gees":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1977, "album":"Here at Last"}' +
                '         ,{"year":1998, "album":"One Night Only"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Blind Faith":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1969, "album":"London Hyde Park"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Bob Dylan":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1974, "album":"Before the Flood"}' +
                '         ,{"year":1976, "album":"Hard Rain"}' +
                '         ,{"year":1979, "album":"Bob Dylan at Budokan"}' +
                '         ,{"year":1984, "album":"Real Live"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Bob Marley":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":2003, "album":"Live at the Roxy"}' +
                '         ,{"year":2011, "album":"Live Forever"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Bruce Springsteen":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1984, "album":"Live 1975–85"}' +
                '         ,{"year":1993, "album":"In Concert/MTV Plugged"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Carole King":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1996, "album":"The Carnegie Hall Concert: June 18, 1971"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Cat Stevens":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1974, "album":"Saturnight"}' +
                '         ,{"year":2004, "album":"Majikat"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Cheap Trick":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1979, "album":"Cheap Trick at Budokan"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                       
        case "Coldplay":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":2003, "album":"Coldplay Live 2003"}' +
                '         ,{"year":2009, "album":"LeftRightLeftRightLeft"}' +
                '         ,{"year":2012, "album":"Coldplay Live 2012"}' +
                '         ,{"year":2014, "album":"Ghost Stories Live 2014"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          
        case "Crosby, Stills, Nash & Young":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1971, "album":"4 Way Street"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                       
        case "David Bowie":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1974, "album":"David Live"}' +
                '         ,{"year":1978, "album":"Stage"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                       
        case "Diana Ross":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1974, "album":"Live at Caesars Palace"}' +
                '         ,{"year":1977, "album":"An Evening with Diana Ross"}' +
                '         ,{"year":1989, "album":"Greatest Hits Live"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Dido":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":2005, "album":"Live at Brixton Academy"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Dire Straits":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1984, "album":"Alchemy"}' +
                '         ,{"year":1993, "album":"On the Night"}' +
                '         ,{"year":1995, "album":"Live at the BBC"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Donovan":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1968, "album":"Donovan In Concert"}' +
                '         ,{"year":1973, "album":"Live in Japan: Spring Tour"}' +
                '         ,{"year":1973, "album":"Live in Tokyo \'73"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Eagles":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1980, "album":"Eagles Live"}' +
                '         ,{"year":1994, "album":"Hell Freezes"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Electric Light Orchestra":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1974, "album":"The Night the Light Went On in Long Beach"}' +
                '         ,{"year":1998, "album":"Live at Wembley \'78"}' +
                '         ,{"year":1998, "album":"Live at Winterland \'76"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Elton John":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1971, "album":"17-11-70"}' +
                '         ,{"year":1976, "album":"Here and There"}' +
                '         ,{"year":2000, "album":"One Night Only – The Greatest Hits"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Emerson, Lake & Palmer":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1971, "album":"Pictures at an Exhibition"}' +
                '         ,{"year":1974, "album":"Welcome Back, My Friends, to the Show That Never Ends"}' +
                '         ,{"year":1979, "album":"Emerson, Lake and Palmer in Concert"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Eric Clapton":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1973, "album":"Eric Clapton\'s Rainbow Concert"}' +
                '         ,{"year":1980, "album":"Just One Night"}' +
                '         ,{"year":1983, "album":"Time Pieces"}' +
                '         ,{"year":1991, "album":"24 Nights"}' +
                '         ,{"year":1992, "album":"Unplugged"}' +
                '         ,{"year":2009, "album":"Live from Madison Square Garden"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Genesis":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1973, "album":"Genesis Live"}' +
                '         ,{"year":1977, "album":"Seconds Out"}' +
                '         ,{"year":1982, "album":"Three Sides Live"}' +
                '         ,{"year":1992, "album":"The Way We Walk, Vol I: The Shorts"}' +
                '         ,{"year":1993, "album":"The Way We Walk, Vol II: The Longs"}' +
                '         ,{"year":2007, "album":"Live over Europe 2007"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "George Harrison":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1971, "album":"The Concert for Bangladesh"}' +
                '         ,{"year":1992, "album":"Live in Japan"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                       
        case "Jethro Tull":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1978, "album":"Live - Bursting Out"}' +
                '         ,{"year":1990, "album":"Live at Hammersmith \'84"}' +
                '         ,{"year":1992, "album":"A Little Light Music"}' +
                '         ,{"year":1993, "album":"25th Anniversary Box Set"}' +
                '         ,{"year":1995, "album":"In Concert"}' +
                '         ,{"year":2002, "album":"Living with the Past"}' +
                '         ,{"year":2004, "album":"Nothing Is Easy"}' +
                '         ,{"year":2005, "album":"Aqualung Live"}' +
                '         ,{"year":2009, "album":"Live at Madison Square Garden 1978"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "John Lennon":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1969, "album":"Live Peace in Toronto"}' +
                '         ,{"year":1986, "album":"Live in New York City"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Journey":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1981, "album":"Captured"}' +
                '         ,{"year":1998, "album":"Greatest Hits Live"}' +
                '         ,{"year":2005, "album":"Live in Houston 1981: The Escape Tour"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Kate Bush":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1994, "album":"Live at Hammersmith Odeon"}' +
                '      ]}';


            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Led Zeppelin":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1976, "album":"The Song Remains the Same"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                        
        case "Lynyrd Skynyrd":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1976, "album":"One More From the Road"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                        
        case "Neil Young":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1979, "album":"Live Rust"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                         
        case "No Doubt":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1997, "album":"Live in the Tragic Kingdom"}' +
                '         ,{"year":2003, "album":"Rock Steady Live"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Paul McCartney":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1976, "album":"Wings Over America"}' +
                '      ]}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                         
        case "Pete Townshend":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1986, "album":"Deep End Live!"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Pink Floyd":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":2000, "album":"Is There Anybody Out There? The Wall Live 1980–81"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Roxy Music":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1976, "album":"Viva!"}' +
                '         ,{"year":1983, "album":"The High Road"}' +
                '         ,{"year":1990, "album":"Heart Still Beating"}' +
                '         ,{"year":1998, "album":"Concert Classics"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Simon & Garfunkel":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1982, "album":"The Concert in Central Park"}' +
                '         ,{"year":2002, "album":"Live from New York City, 1967"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Steve Miller Band":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1983, "album":"Steve Miller Band Live!"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Talking Heads":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1982, "album":"The Name of This Band Is Talking Heads"}' +
                '         ,{"year":1984, "album":"Stop Making Sense"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "The Beach Boys":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1964, "album":"Beach Boys Concert"}' +
                '         ,{"year":1970, "album":"Live in London"}' +
                '         ,{"year":1973, "album":"The Beach Boys in Concert"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "The Carpenters":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1975, "album":"Live in Japan"}' +
                '         ,{"year":1977, "album":"Live at the Palladium"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "The Doors":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1970, "album":"Absolutely Live"}' +
                '         ,{"year":1983, "album":"Alive, She Cried"}' +
                '         ,{"year":1987, "album":"Live at the Hollywood Bowl"}' +
                '         ,{"year":1991, "album":"In Concert"}' +
                '         ,{"year":1996, "album":"Message to Love"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "The Monkees":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1987, "album":"Live 1967"}' +
                '         ,{"year":1987, "album":"20th Anniversary Tour 1986"}' +
                '         ,{"year":1994, "album":"1994 Live!"}' +
                '         ,{"year":2001, "album":"2001: Live in Las Vegas"}' +
                '         ,{"year":2001, "album":"Summer 1967: The Complete U.S. Concert Recordings"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "The Moody Blues":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1977, "album":"Caught Live + 5"}' +
                '         ,{"year":1993, "album":"A Night at Red Rocks with the Colorado Symphony Orchestra"}' +
                '         ,{"year":2000, "album":"Hall of Fame"}' +
                '         ,{"year":2005, "album":"Lovely to See You: Live"}' +
                '         ,{"year":2007, "album":"Live at the BBC: 1967–1970"}' +
                '         ,{"year":2008, "album":"Live at the Isle of Wight Festival 1970"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Todd Rundgren":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1978, "album":"Back to the Bars"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "U2":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1983, "album":"Under a Blood Red Sky"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Van Halen":

            artist_discography_JSON_string +=
                '      {"section":"' + LIVE_SECTION + '", "style":0, "albums":[' +
                '          {"year":1993, "album":"Live: Right Here, Right Now"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                          

        default:
    }

    return artist_discography_JSON_string;

}

// Contains artist-based hardcoding:
wikipedia_discography.prototype.get_discog_JSON_string_hardcoded_studio_albums = function (artist) {

    var artist_discography_JSON_string = ""; // init

    switch (artist) {

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Bee Gees":

            artist_discography_JSON_string +=
                '      {"section":"' + "Soundtrack albums" + '", "style":0, "albums":[' +
                '          {"year":1977, "album":"Saturday Night Fever"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                  
        case "Yes":

            artist_discography_JSON_string +=
                '      {"section":"' + "Second 1971 album" + '", "style":0, "albums":[' +
                '          {"year":1971, "album":"Fragile"}' +
                '      ]}';

            this.style = 0;  
            this.increment_style_counter(this.style, 1); // increment by 1  

            break;


        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                  
        
        default:
    }

    return artist_discography_JSON_string;

}

// Contains artist-based hardcoding:
wikipedia_discography.prototype.get_discog_JSON_string_hardcoded_main = function (artist) {

    // Constants:

    // NOTE: All artists use the following default section title.  This artist
    // also has a second section:
    //   - Neon Heights  Compilations

    var DEFAULT_SECTION = "Albums";

    var artist_discography_JSON_string = ""; // init

    switch (artist) {

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                  
        // NOTE: For demonstration purposes, this "overrides" a valid,         
        // existing Wikipedia discography:      

        //        case "The Cars":    

        //            artist_discography_JSON_string +=    
        //                '{"artist":"' + artist + '", "wikipedia_page":"",' +    
        //                '   "sections":[' +    
        //                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +    
        //                '          {"year":1978, "album":"The Cars"}' +     
        //                '         ,{"year":1979, "album":"Candy-O"}' +     
        //                '         ,{"year":2011, "album":"Move Like This"}' +     
        //                '      ]}' +    
        //                '   ]' +    
        //                '}';    

        //            this.style = 0;    
        //            this.increment_style_counter(this.style, 1); // increment by 1    

        //            break;    

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                              
        case "Ambrosia":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1975, "album":"Ambrosia"}' +
                '         ,{"year":1976, "album":"Somewhere I\'ve Never Travelled"}' +
                '         ,{"year":1978, "album":"Life Beyond L.A."}' +
                '         ,{"year":1980, "album":"One Eighty"}' +
                '         ,{"year":1982, "album":"Road Island"}' +
                '         ,{"year":1997, "album":"Anthology"}' +
                '         ,{"year":2002, "album":"Ambrosia Live"}' +
                '         ,{"year":2002, "album":"The Essential"}' +
                '         ,{"year":2003, "album":"How Much I Feel and Other Hits"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                 
        case "Dave Mason":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1970, "album":"Alone Together"}' +
                '         ,{"year":1971, "album":"Welcome To The Canteen"}' +
                '         ,{"year":1971, "album":"Dave Mason & Cass Elliot"}' +
                '         ,{"year":1972, "album":"Headkeeper"}' +
                '         ,{"year":1972, "album":"Scrapbook"}' +
                '         ,{"year":1973, "album":"Dave Mason Is Alive"}' +
                '         ,{"year":1973, "album":"It\'s Like You Never Left"}' +
                '         ,{"year":1974, "album":"Dave Mason"}' +
                '         ,{"year":1975, "album":"Split Coconut"}' +
                '         ,{"year":1976, "album":"Certified Live"}' +
                '         ,{"year":1977, "album":"Let It Flow"}' +
                '         ,{"year":1978, "album":"Mariposa De Oro"}' +
                '         ,{"year":1978, "album":"In Concert"}' +
                '         ,{"year":1980, "album":"Old Crest On A New Wave"}' +
                '         ,{"year":1987, "album":"Two Heart"}' +
                '         ,{"year":1987, "album":"Some Assembly Required"}' +
                '         ,{"year":1999, "album":"Live - The 40.000 Headmen Tour"}' +
                '         ,{"year":2002, "album":"Live At Perkins Palace"}' +
                '         ,{"year":2004, "album":"XM Radio"}' +
                '         ,{"year":2014, "album":"Future\'s Past"}' +
                '         ,{"year":2016, "album":"Alone Together"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                 
        case "Frankie Valli":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1967, "album":"The 4 Seasons Present Frankie Valli Solo"}' +
                '         ,{"year":1968, "album":"Timeless"}' +
                '         ,{"year":1975, "album":"Closeup"}' +
                '         ,{"year":1975, "album":"Inside You"}' +
                '         ,{"year":1975, "album":"Our Day Will Come"}' +
                '         ,{"year":1976, "album":"Valli"}' +
                '         ,{"year":1977, "album":"Lady Put the Light Out"}' +
                '         ,{"year":1978, "album":"Frankie Valli... Is the Word"}' +
                '         ,{"year":1980, "album":"Heaven Above Me"}' +
                '         ,{"year":2007, "album":"Romancing the \'60s"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                
        case "Neon Heights":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":2000, "album":"Neon Heights And Zed J - A View From The Heights"}' +
                '         ,{"year":2005, "album":"A Hot Trip To Heaven"}' +
                '         ,{"year":2007, "album":"You Make Love To Robots & You Wonder What People Are For"}' +
                '      ]}' +
                '     ,{"section":"Compilations", "style":0, "albums":[' +
                '          {"year":2004, "album":"Neon Heights & Friends"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 2); // increment by 2

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Sleepthief":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":2006, "album":"The Dawnseeker"}' +
                '         ,{"year":2009, "album":"Labyrinthine Heart"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                           
        case "Zoe Johnston":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":2006, "album":"Happenstances"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                             
        case "The Cowsills":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1967, "album":"The Cowsills"}' +
                '         ,{"year":1968, "album":"The Cowsills plus The Lincoln Park Zoo"}' +
                '         ,{"year":1968, "album":"We Can Fly"}' +
                '         ,{"year":1968, "album":"Captain Sad and his Ship of Fools"}' +
                '         ,{"year":1968, "album":"The Best of The Cowsills"}' +
                '         ,{"year":1968, "album":"The Cowsills"}' +
                '         ,{"year":1969, "album":"The Cowsills in Concert"}' +
                '         ,{"year":1969, "album":"The Cowsills Collectors Record"}' +
                '         ,{"year":1970, "album":"II x II"}' +
                '         ,{"year":1971, "album":"On My Side"}' +
                '         ,{"year":1971, "album":"All-Time Hits"}' +
                '         ,{"year":1998, "album":"Global"}' +
                '         ,{"year":2001, "album":"The Best Of The Cowsills"}' +
                '         ,{"year":2006, "album":"Painting The Day: The Angelic Psychedelia of The Cowsills"}' +
                '         ,{"year":2008, "album":"Cocaine Drain"}' +
                '      ]}' +
                '   ]' +
                '}';


            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -          
        case "Mozez":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":2005, "album":"So Still"}' +
                '         ,{"year":2011, "album":"Time Out"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                               
        case "Patrick Simmons":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1983, "album":"Arcade"}' +
                '         ,{"year":1995, "album":"Take Me to the Highway"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                               
        case "Robin Lane":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + "With The Chartbusters" + '", "style":0, "albums":[' +
                '          {"year":1980, "album":"Robin Lane & The Chartbusters"}' +
                '         ,{"year":1980, "album":"5 Live"}' +
                '         ,{"year":1981, "album":"Imitation Life"}' +
                '         ,{"year":2003, "album":"Piece of Mind"}' +
                '      ]}' +
                '     ,{"section":"Robin Lane", "style":0, "albums":[' +
                '          {"year":1984, "album":"Heart Connection"}' +
                '         ,{"year":1989, "album":"In Concert"}' +
                '         ,{"year":1995, "album":"Catbird Seat"}' +
                '         ,{"year":2011, "album":"Out of the Ashes"}' +
                '         ,{"year":2011, "album":"The Sweet Candy Collection"}' +
                '         ,{"year":2013, "album":"A Woman\'s Voice"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                               
        case "Henry Mancini":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1958, "album":"Touch Of Evil"}' +
                '         ,{"year":1958, "album":"Summer Love"}' +
                '         ,{"year":1959, "album":"The Music From Peter Gunn"}' +
                '         ,{"year":1959, "album":"The Versatile Henry Mancini"}' +
                '         ,{"year":1959, "album":"More Music From Peter Gunn"}' +
                '         ,{"year":1960, "album":"Mr. Lucky"}' +
                '         ,{"year":1960, "album":"High Time"}' +
                '         ,{"year":1960, "album":"The Blues And The Beat"}' +
                '         ,{"year":1960, "album":"The Mancini Touch"}' +
                '         ,{"year":1961, "album":"Breakfast At Tiffany\'s"}' +
                '         ,{"year":1961, "album":"Sousa In Stereo"}' +
                '         ,{"year":1961, "album":"Combo!"}' +
                '         ,{"year":1961, "album":"Mr. Lucky Goes Latin"}' +
                '         ,{"year":1961, "album":"March Step"}' +
                '         ,{"year":1962, "album":"Experiment In Terror"}' +
                '         ,{"year":1962, "album":"Hatari!"}' +
                '         ,{"year":1963, "album":"Our Man In Hollywood"}' +
                '         ,{"year":1963, "album":"Mancini Marches"}' +
                '         ,{"year":1963, "album":"Uniquely Mancini"}' +
                '         ,{"year":1963, "album":"The Pink Panther"}' +
                '         ,{"year":1963, "album":"Charade"}' +
                '         ,{"year":1964, "album":"The Great Academy Award Songs"}' +
                '         ,{"year":1964, "album":"The Concert Sound Of Henry Mancini"}' +
                '         ,{"year":1964, "album":"Academy Award Songs, Vol. 2"}' +
                '         ,{"year":1964, "album":"Henry Mancini Favorites"}' +
                '         ,{"year":1965, "album":"Dear Heart"}' +
                '         ,{"year":1965, "album":"The Great Race"}' +
                '         ,{"year":1965, "album":"The Latin Sound Of Henry Mancini"}' +
                '         ,{"year":1965, "album":"12 Great Oscar Winners"}' +
                '         ,{"year":1966, "album":"Arabesque"}' +
                '         ,{"year":1966, "album":"The Sounds & Voices Of Henry Mancini"}' +
                '         ,{"year":1964, "album":"The Second Time Around And Others"}' +
                '         ,{"year":1967, "album":"Two For The Road"}' +
                '         ,{"year":1967, "album":"Gunn ...Number One!"}' +
                '         ,{"year":1967, "album":"Encore! More Of The Concert Sound Of Henry Mancini"}' +
                '         ,{"year":1968, "album":"The Party"}' +
                '         ,{"year":1968, "album":"The Big Latin Band Of Henry Mancini"}' +
                '         ,{"year":1968, "album":"The Mancini Sound"}' +
                '         ,{"year":1969, "album":"Me, Natalie"}' +
                '         ,{"year":1969, "album":"Conducting The First Recording Of Philadelphia Orchestra Pops"}' +
                '         ,{"year":1969, "album":"A Warm Shade Of Ivory"}' +
                '         ,{"year":1969, "album":"His Sound Is His Signature"}' +
                '         ,{"year":1969, "album":"Gaily, Gaily"}' +
                '         ,{"year":1970, "album":"Sunflower"}' +
                '         ,{"year":1970, "album":"The Molly Maguires"}' +
                '         ,{"year":1970, "album":"Darling Lili"}' +
                '         ,{"year":1970, "album":"The Theme From Love Story"}' +
                '         ,{"year":1970, "album":"The Hawaiians"}' +
                '         ,{"year":1970, "album":"Sample Mancini"}' +
                '         ,{"year":1971, "album":"Never Give An Inch"}' +
                '         ,{"year":1972, "album":"Brass On Ivory"}' +
                '         ,{"year":1972, "album":"Henry Mancini"}' +
                '         ,{"year":1973, "album":"Oklahoma Crude"}' +
                '         ,{"year":1973, "album":"Visions Of Eight"}' +
                '         ,{"year":1973, "album":"The Thief Who Came To Dinner"}' +
                '         ,{"year":1973, "album":"Film Music By Mancini"}' +
                '         ,{"year":1973, "album":"Brass, Ivory And Strings"}' +
                '         ,{"year":1973, "album":"Mancini Salutes Sousa"}' +
                '         ,{"year":1974, "album":"Hangin\' Out"}' +
                '         ,{"year":1974, "album":"The Pink Panther"}' +
                '         ,{"year":1974, "album":"Temas De Películas Y Series De Televisión"}' +
                '         ,{"year":1975, "album":"The Great Waldo Pepper"}' +
                '         ,{"year":1975, "album":"Blake Edwards The Return Of The Pink Panther"}' +
                '         ,{"year":1975, "album":"Symphonic Soul"}' +
                '         ,{"year":1976, "album":"The Pink Panther Strikes Again"}' +
                '         ,{"year":1976, "album":"The Cop Show Themes"}' +
                '         ,{"year":1976, "album":"A Concert Of Film Music"}' +
                '         ,{"year":1976, "album":"Mancini Moods At Christmastime"}' +
                '         ,{"year":1977, "album":"Mancini\'s Angels"}' +
                '         ,{"year":1977, "album":"Just You And Me Together Love"}' +
                '         ,{"year":1978, "album":"Revenge Of The Pink Panther"}' +
                '         ,{"year":1978, "album":"Who Is Killing The Great Chefs Of Europe?"}' +
                '         ,{"year":1978, "album":"The Theme Scene"}' +
                '         ,{"year":1979, "album":"10"}' +
                '         ,{"year":1981, "album":"The Hits Of The 70s"}' +
                '         ,{"year":1982, "album":"The Trail Of The Pink Panther And Other Pink Panther Films"}' +
                '         ,{"year":1982, "album":"A Lover\'s Concerto"}' +
                '         ,{"year":1981, "album":"Those Classic Evergreens"}' +
                '         ,{"year":1984, "album":"James Galway & Henry Mancini - In The Pink"}' +
                '         ,{"year":1984, "album":"Mamma"}' +
                '         ,{"year":1985, "album":"Santa Claus"}' +
                '         ,{"year":1985, "album":"Lifeforce"}' +
                '         ,{"year":1985, "album":"That\'s Dancing!"}' +
                '         ,{"year":1986, "album":"The Hollywood Musicals"}' +
                '         ,{"year":1987, "album":"The Glass Menagerie"}' +
                '         ,{"year":1989, "album":"Great Favorites Of The 60 & 70"}' +
                '         ,{"year":1989, "album":"Mancini Rocks The Pops"}' +
                '         ,{"year":1991, "album":"The Music of Henry Mancini"}' +
                '         ,{"year":1991, "album":"Switch"}' +
                '         ,{"year":1992, "album":"Tom And Jerry"}' +
                '         ,{"year":1992, "album":"The Adventures Of The Great Mouse Detective"}' +
                '         ,{"year":1993, "album":"Son Of The Pink Panther"}' +
                '         ,{"year":1993, "album":"Gunn"}' +
                '         ,{"year":1994, "album":"Victor/Victoria"}' +
                '         ,{"year":1995, "album":"Midas Run And The House/The Night Visitor"}' +
                '         ,{"year":1998, "album":"Hatari!"}' +
                '         ,{"year":2002, "album":"Silver Streak"}' +
                '         ,{"year":2003, "album":"One Martini With Mancini"}' +
                '         ,{"year":2003, "album":"Mr. Hobbs Takes A Vacation"}' +
                '         ,{"year":2003, "album":"Peter Gunn"}' +
                '         ,{"year":2007, "album":"Wait Until Dark"}' +
                '         ,{"year":2007, "album":"Without A Clue"}' +
                '         ,{"year":2009, "album":"Nightwing"}' +
                '         ,{"year":2010, "album":"99 44/100% Dead!"}' +
                '         ,{"year":2011, "album":"The Moneychangers"}' +
                '         ,{"year":2011, "album":"Trail Of The Pink Panther"}' +
                '         ,{"year":2012, "album":"Condorman"}' +
                '         ,{"year":2012, "album":"Mommie Dearest"}' +
                '         ,{"year":2013, "album":"Fear"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -       
        case "The Fools":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + DEFAULT_SECTION + '", "style":0, "albums":[' +
                '          {"year":1980, "album":"Sold Out"}' +
                '         ,{"year":1980, "album":"April Fools Day Live Bootleg"}' +
                '         ,{"year":1981, "album":"Heavy Mental"}' +
                '         ,{"year":1985, "album":"World Dance Party"}' +
                '         ,{"year":1985, "album":"4 Song Film"}' +
                '         ,{"year":1988, "album":"Wake Up It\'s Alive"}' +
                '         ,{"year":1990, "album":"Rated XXX"}' +
                '         ,{"year":1990, "album":"World Dance Party Too"}' +
                '         ,{"year":1991, "album":"Show \'Em You\'re Nuts"}' +
                '         ,{"year":1992, "album":"Christmas Toons"}' +
                '         ,{"year":1993, "album":"Wake Up It\'s Alive Again"}' +
                '         ,{"year":1999, "album":"Y2K"}' +
                '         ,{"year":2000, "album":"Coors Light Six Pack"}' +
                '         ,{"year":2003, "album":"World Dance Party 2003"}' +
                '         ,{"year":2003, "album":"The F in Beach"}' +
                '         ,{"year":2007, "album":"10"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 1); // increment by 1

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                                 
        case "The Spencer Davis Group":

            artist_discography_JSON_string +=
                '{"artist":"' + artist + '", "wikipedia_page":"",' +
                '   "sections":[' +
                '      {"section":"' + "UK albums" + '", "style":0, "albums":[' +
                '          {"year":1965, "album":"Their First LP"}' +
                '         ,{"year":1966, "album":"The Second Album"}' +
                '         ,{"year":1966, "album":"Autumn \'66"}' +
                '         ,{"year":1967, "album":"The Best of the Spencer Davis Group featuring Steve Winwood"}' +
                '         ,{"year":1969, "album":"Funky"}' +
                '         ,{"year":1973, "album":"Gluggo"}' +
                '         ,{"year":1974, "album":"Living In A Back Street"}' +

                '      ]}' +
                '     ,{"section":"US albums", "style":0, "albums":[' +
                '          {"year":1967, "album":"Gimme Some Lovin\'"}' +
                '         ,{"year":1967, "album":"I\'m a Man"}' +
                '         ,{"year":1968, "album":"With Their New Face On"}' +
                '         ,{"year":1968, "album":"Greatest Hits"}' +
                '      ]}' +
                '     ,{"section":"Special recordings", "style":0, "albums":[' +
                '          {"year":1993, "album":"The Somebody Help Me Project"}' +
                '      ]}' +
                '     ,{"section":"Anthologies", "style":0, "albums":[' +
                '          {"year":1996, "album":"Eight Gigs a Week: The Steve Winwood Years"}' +
                '         ,{"year":2004, "album":"Spencer Davis Keep on Running: 40th Anniversary"}' +
                '      ]}' +
                '   ]' +
                '}';

            this.style = 0;
            this.increment_style_counter(this.style, 2); // increment by 2

            break;

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -                            

        default:
    }

    return artist_discography_JSON_string;

}

wikipedia_discography.prototype.get_discog_subsection_array = function (discog_wikipedia_string) {

    if (this.debug_trace_XXX == true) { get_function_description(""); }

    // Since we will be modifying (winnowing) the argument, both in its content and
    // in its format (string to array), let's create an array to hold the result:
    var subsection_array = new Array();

    var driver_index = 0; // init

    var subsection_start_index, subsection_end_index;

    do {
        // Get info:
        subsection_start_index = discog_wikipedia_string.indexOf(this.SUBSECTION_START_INDICATOR, driver_index);

        if (subsection_start_index > -1) {

            // "Drag forward" the driver index:
            driver_index = subsection_start_index + this.SUBSECTION_START_INDICATOR.length;

            // Get info:
            subsection_end_index = discog_wikipedia_string.indexOf(this.SUBSECTION_END_INDICATOR, driver_index);

            if (subsection_end_index > -1) {

                // "Drag forward" the driver index:
                driver_index = subsection_end_index + this.SUBSECTION_END_INDICATOR.length;

                // Load the output subsection array...
                subsection_array.push(

                // ...with each subsection found:
                discog_wikipedia_string.substring(
                    subsection_start_index + this.SUBSECTION_START_INDICATOR.length,
                    subsection_end_index
                )
             );

            }
        }

        // Repeat until all subsections have been accounted for:
    } while (subsection_start_index > -1);

    // Return the output subsection array which is a modified copy of the argument:
    return subsection_array;

}

wikipedia_discography.prototype.get_discog_wikipedia_string = function (artist, discog_wikipedia_string) {

    if (this.debug_trace_discography == true) { get_function_description("get_discog_wikipedia_string"); }

    // Constants:
    var DISCOGRAPHY_INDICATOR2 = "== Discography ==";
    var DISCOGRAPHY_INDICATOR3 = "==Selected discography ==";
    var DISCOGRAPHY_INDICATOR4 = "==Solo discography==";
    var DISCOGRAPHY_INDICATOR5 = "==Discography and chart history==";
    var DISCOGRAPHY_INDICATOR6 = "==Partial discography==";
    var DISCOGRAPHY_INDICATOR7 = "==Selected discography==";
    var DISCOGRAPHY_INDICATOR8 = "==U.S. discography==";

    // NOTE: These are special cases (see NOTEs, below):
    var DISCOGRAPHY_INDICATOR20 = "==Studio albums==";
    var DISCOGRAPHY_INDICATOR21 = "==Albums==";

    var discog_wikipedia_string_return = ""; // init
    var discog_literal_to_search_for = ""; // init

    // Account for irregularities in the Discography Indicators:

    // This is the default:
    if (discog_wikipedia_string.indexOf(this.DISCOGRAPHY_INDICATOR1) > -1) {
        discog_literal_to_search_for = this.DISCOGRAPHY_INDICATOR1;
    }
    // Coldplay and Led Zeppelin:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR2) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR2;
    }
    // Cat Stevens:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR3) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR3;
    }
    // Diana Ross:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR4) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR4;
    }
    // Tommy Roe:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR6) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR6;
    }

    // Dave Edmunds:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR7) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR7;
    }

    // The Four Seasons:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR8) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR8;
    }

    // Johnny Cash:

    // NOTE: This artist has no discography section indicator but has a valid discography otherwise.
    // Since its format is "==Studio albums=="/"===1950s===", then "==Studio albums==" is available
    // to be considered as a valid discography section indicator:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR20) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR20;
    }

    // José González:

    // NOTE: This artist has no discography section indicator but has a valid discography otherwise.
    // Since its format is "==Albums=="/"===Studio albums===", then "==Albums==" is available to be
    // considered as a valid discography section indicator:
    else if (discog_wikipedia_string.indexOf(DISCOGRAPHY_INDICATOR21) > -1) {
        discog_literal_to_search_for = DISCOGRAPHY_INDICATOR21;
    }

    // The Stylistics:
    else if (discog_wikipedia_string.indexOf(artist + " discography") > -1) {
        discog_literal_to_search_for = artist + " discography";
    }

    // NOTE: "Johnny Cash" and "Elvis Presley" don't have discog literals but it doesn't matter because
    // they have external discogs:

    // NOTE: Condition Description: If a wikitable is found and its starting index is less than the starting index of the first
    // section, we have an "orphan" table not attached to a section.  As such, it will get truncated away.

    // NOTE 2: The above implied "rule", unfortunately, concerns sections, a piece of information which is not yet available at
    // this stage of processing.  

    // NOTE 3: The Wikipedia editor acknowledges this fact by flagging it as in-error. Since it has been flagged, it will probably
    // be fixed at some point.  The "fix" below, to a proper discography, would probably be fatal so I would be introducting a
    // problem.  Thus, I will check both conditions.  Also, I can not anticipate that some editor-flagged bad entry in the future
    // will be bad in the same way.  I have striven greatly not to hardcode by artist but here I am left no options:

    if (this.artist == "Jeff Beck" &&
        discog_wikipedia_string.indexOf(this.WIKIPEDIA_CLEANUP_FLAGGED) > -1) {

        // NOTE: Since the other, unbroken, section uses this section indicator, I will do likewise:
        var SECTION_INDICATOR = "==";

        // Fix the wikitable by giving it a dummy section:
        discog_wikipedia_string = insert_at(discog_wikipedia_string,
                                                SECTION_INDICATOR + "Unknown Section" + SECTION_INDICATOR,
                                                discog_wikipedia_string.indexOf(this.WIKITABLE_INDICATOR)
                                      )

        if (this.debug_trace_discography == true) {
            this.write_debug(this.artist + ": fixed orphan table");
        }

    }

    // For artists that don't have a discography:
    if (discog_literal_to_search_for == "") {

        // Inform the developer of the error:
        standard_streams_services.write("error", "no discography literal for " + artist);

        // For artists that have a discography:
    }
    // else if (discog_literal_to_search_for != "") {

    // NOTE: I originally wanted to make the process of determining whether to use a local or external discography dynamic based on
    // the number of albums that are found. Unfortunately, I only know this at the very end of the process when, instead, I need to
    // know it at the beginning. I don't want to invest the time to re-architect this process. I will let all of this stand as is.
    // It is what it is.

    // NOTE 2: A large percentage of the artists have external discographies. I did a trial run where I looked them up and my album
    // totals practically doubled. It is particularly "rich" data in the areas of Compilations and Singles. Since these are not the
    // focus of the application, and since the debugging of all these discographies is a large amount of work, I will let all of this
    // stand as is.

    // If I have pre-determined that we should use the external discography in this case:
    if (this.test_against_external_discographies(artist) == true) {

        var the_index = discog_wikipedia_string.indexOf("\\n\\n==");
        //this.write_debug(narrow_focus_on_long_string(discog_wikipedia_string, the_index, 100));

        // For an external discography, remove everything before the discography:
        discog_wikipedia_string_return = discog_wikipedia_string.substr(discog_wikipedia_string.indexOf("\\n\\n=="));

    }
    else {
        // For a local discography, remove everything before the discography. Bear in mind, some junk (reference and source type
        // stuff) often remains after the discography:
        page_halves_array = discog_wikipedia_string.split(discog_literal_to_search_for);
        discog_wikipedia_string_return = page_halves_array[1];
    }
    // }

    if (this.debug_trace_discography == true) { this.write_debug("AFTER: " + discog_wikipedia_string_return); }

    return discog_wikipedia_string_return;

}

wikipedia_discography.prototype.get_discographies_JSON_string_attempt = function (artist_array, format) {

    // Built-in debugging:
    if (this.debug_trace_artist == true ||
        this.debug_trace_discography == true ||
        this.debug_trace_section == true ||
        this.debug_trace_album == true) {

            alert("Debug tracing in progress...");
            this.write_debug("BEGIN DEBUG TRACING");
            get_function_description("get_discographies_JSON_string");
    }

    var discographies_JSON_string;

    // Offline processing:
    if (this.online == false) {

        discographies_JSON_string = this.offline_discographies;

        // Online processing:
    } else if (this.online == true) {

        // Perform Artist discography lookup/output processing starting at "level 1":
        this.level_1_artists(artist_array);

        // NOTE: The above processing filled "this.discography_return_JSON_string".
        discographies_JSON_string = this.discography_return_JSON_string;
    }

    // If a proper discography was not found...
    if (this.error_code < 0) {

        //...inform the user of the error:
        standard_streams_services.write("error", this.error_message);

    }

    // If the JSON is in error, clear it out and return an empty string:
    if (syntax_check_JSON(discographies_JSON_string) != "") {
        discographies_JSON_string = "";
    }

    // Built-in debugging:
    if (this.simulate_unexpected_error == true) {

        // Simulate an unexpected error:
        throw_error("get_discographies_JSON_string_attempt() DUMMY UNEXPECTED ERROR");
    }

    if (this.debug_trace_artist == true ||
        this.debug_trace_discography == true ||
        this.debug_trace_section == true ||
        this.debug_trace_album == true) {

            this.write_debug("AFTER: " + discographies_JSON_string); 
    }

    return discographies_JSON_string;

}

//----------------------------------------------------------------------------------------------------------------------
// This is the Wikipedia Discography JSON result definition:

// NOTE: Search for the search strings, below, to find where in the code these components are appended to
// the final result (eg: "wikipedia_page", etc) in the "get_JSON_" functions.

//                                                                      Search String
//                                                                      -------------
//{		                                                                // result opening brace
//   "artists":[	                                                    // artists array opening bracket
//      { 		                                                        // artists array first element opening brace
//         "artist":"Aerosmith",
//         "wikipedia_page":"http://en.wikipedia.org/wiki/Aerosmith",
//         "sections":[ 	                                            // sections array opening bracket
//            {		                                                    // sections array first element opening brace
//               "section":"Studio albums",
//               "style":1,
//               "albums":[	                                            // albums array opening bracket
//                  {	                                                // albums array opening brace
//                     "year":2004,
//                     "album":"Honkin' on Bobo"
//                  },                                                  // album separator
//                  {  
//                     "year":2012,
//                     "album":"Music from Another Dimension!"
//                  }
//               ]
//            }
//         ]
//      },                                                              // artist separator
//      {  
//         "artist":"Bent (band)",
//         "wikipedia_page":"http://en.wikipedia.org/wiki/Bent_(band)",
//         "sections":[  
//            {  
//               "section":"Studio albums",
//               "style":1,
//               "albums":[  
//                  {  
//                     "year":2009,
//                     "album":"Best Of Bent"
//                  },
//                  {  
//                     "year":2013,
//                     "album":"From the Vaults"
//                  }
//               ]
//            },                                                        // section separator
//            {  
//               "section":"Other projects",
//               "style":1,
//               "albums":[  
//                  {  
//                     "year":2005,
//                     "album":"Later"
//                  },
//                  {  
//                     "year":2008,
//                     "album":"The Art Of Chill 5"
//                  }	                                                // albums array closing brace
//               ]		                                                // albums array closing bracket
//            }		                                                    // sections array final element closing brace
//         ]		                                                    // sections array closing bracket
//      }		                                                        // artists array final element closing brace
//   ]		                                                            // artists array closing bracket
//}		                                                                // result closing brace
//----------------------------------------------------------------------------------------------------------------------

wikipedia_discography.prototype.get_JSON_album_detail = function (year, album) {
    return '{"year":' + year.toString() + ',"album":"' + album + '"}';                              // albums array opening brace and
                                                                                                    // albums array closing brace
}

wikipedia_discography.prototype.get_JSON_artist_header = function (artist, wikipedia_page) {
    return '{"artist":"' + artist + '","wikipedia_page":"' + wikipedia_page + '","sections":[';     // artists array opening brace and

}

wikipedia_discography.prototype.get_JSON_section_header = function (section, style) {
    return '{"section":"' + section + '","style":' + style.toString() + ',"albums":[';              // sections array first element opening brace and

}



wikipedia_discography.prototype.increment_style_counter = function (style, increment_by) {

    // Increment the appropriate section style counter by the appropriate amount:
    switch (style) {
        case 0:
            this.style_0_count += increment_by;
            break;
        case 1:
            this.style_1_count += increment_by;
            break;
        case 2:
            this.style_2_count += increment_by;
            break;
        case 3:
            this.style_3_count += increment_by;
            break;
        case 4:
            this.style_4_count += increment_by;
            break;
        case 5:
            this.style_5_count += increment_by;
            break;
        case 6:
            this.style_6_count += increment_by;
            break;
        case 7:
            this.style_7_count += increment_by;
            break;
        case 8:
            this.style_8_count += increment_by;
            break;
        case 61:
            this.style_61_count += increment_by;
            break;
        case 62:
            this.style_62_count += increment_by;
            break;
        case 63:
            this.style_63_count += increment_by;
            break;
        case 64:
            this.style_64_count += increment_by;
            break;
        case 65:
            this.style_65_count += increment_by;
            break;
        case 66:
            this.style_66_count += increment_by;
            break;
        case 67:
            this.style_67_count += increment_by;
            break;
        case 68:
            this.style_68_count += increment_by;
            break;
        default:
    }

}

wikipedia_discography.prototype.is_concert = function (wikipedia_album_title) {

    var return_value = false; // init

    var concert_indicator = ["concert", "live"];

    for (var i = 0; i < concert_indicator.length; i++) {

        if (wikipedia_album_title.toLowerCase().indexOf(concert_indicator[i]) > -1) {
            return_value = true;
            break;
        }
    }

    return return_value;
}

// Determine if the title is eponymously named for the artist.
wikipedia_discography.prototype.is_title_eponymous = function (artist, title) {

    // STICKING POINT: All hung up on...can the "passed title" have more than one artist in
    // it that should be crushed?????

    // NOTE: One "peels away" leaders ("The ") and trailers (" Band) leaving the "core" of an artist's
    // name while making note of the exceptions ("The The" and "The Band"). This result then has its
    // AND separators regularized, setting them all to " and ".

    var artist_core = this.get_artist_name_core(artist);

    // Given a core artist name and the title of an album, get back the full artist name as it appears
    // in the album title. We are effectively "re-peeling" the core, ie, putting the leaders and
    // trailers back on, exactly as they appear in the title:
    var artist_name_full = this.get_artist_name_full(artist_core, title);

    var title_core = this.get_artist_name_core(title);

    // Compare the two cores. If they are the same, the album is eponymous. NOTE: This is more
    // than a nice-to-know fact. Searching YouTube videos for artist albums is much more effective
    // when it uses this process to always recognize eponymous albums:
    if (title_core == artist_core) {
        return true;
    } else {
        return false;
    }

}

//FIXMEDONE


// CROSS-REFERENCE G - data/debug levels - Debug levels are aligned with data levels.

// NOTE: It takes seven levels of processing to read/represent five levels of data, five in (artist, discography,
// section, subsection, album) and three out (artist, section, album), with the multiple entry points mentioned
// below, etc.  Complicated enough for you?

// DATA HIERARCHY

// INPUT                        OUTPUT
//-------------------------------------------------------------------------------------------------------------------
//  artist                      artist
//      discog
//          section                 section
//              subsection
//                  album               album
//-------------------------------------------------------------------------------------------------------------------

// PROCESS HIERARCHY

// NOTE: We progressively "drill down" through the data, gaining more understanding about
// it as we go.  Invalid entries are either made to conform to proper standards or are
// filtered out.  Here are the functions for each drill-down level:

// Function                                                 Arguments
// --------                                                 ---------

// a) Take input from the GUI, namely, Artist Datasource and Format (JSON or HTML), and do
//    the work requested thereby.  

// get_discographies_JSON_string()                          artist_array, format

// b) Find the correct Wikipedia page for the artist, all of whom have been pre-screened as having one.
// c) Get raw discography data in the form of a JSON response string from that Wikipedia page.

//     level_1_artists() 			                        artist_array
//         level_5_discography() *		                    discog_wikipedia_string
//         level_3_artist() ** 			                    artist, artist_variation
//         level_2_artist_variations()		                artist
//             level_3_artist() **

// d) Isolate the "discography" section of this JSON response string.
// e) Refine this discography data, written in "wiki-speak", greatly and repeatedly to make it understandable and usable.
//    NOTE: The refinements address two problems: 1) the lack of accessability, apparently by design, of the data format in
//    general, and 2) the ever-present instances of human data entry errors (the creation of which are a potential source of
//    "production error" that could be generated by this system).
// f) Finally, break the discography into its constituent parts, in a one-to-many hierarchy:
//      - Sections (eg: "Original UK LPs"),
//      - Albums (eg: 1963, "Please Please Me")
// g) Output the result of all this effort as either an HTML report or a JSON string, making this process suitable to run
//    as a "behind-the-scenes" engine, or a user-interface-driven web process (both of which I have already done).

//                 level_4_response()			            wikipedia_response_JSON_string
//                     level_5_discography() *		        
//                         level_6_discography_array()		discog_section_wikipedia_array
//                             level_7_albums()			    section, year_array, title_array

//  * Multiple entry points to Level 5 and hierarchically subordinate Levels 6-7.
// ** Multiple entry points to Level 3 and hierarchically subordinate Levels 4-7.

// NOTE: It is only a "JSON string" if I intend to instantiate it as a JSON object to access its components.
// Unfortunately, this just gives us a big block of data that we have no keys to decode, therefore...

// NOTE 2: It is a "Wikipedia string" if I intend to access its sub-components by general string parsing techniques
// employed in a "winnowing" process.

// NOTE 3: It is a "Wikipedia array" if I have figured out enough about it to know its parse token so as to parse
// it to an array for further evaluation/winnowing.

//------------------------------------------------------------------------------------------------------------------------
// NOTE: String replacement is a large part of what this program is built to do.  I, unfortunately, use three separate
// techniques, devised ad hoc, to do so. It's all a mush and a jumble but not worth the effort to standardize as long
// as the situation is fully documented, which it now is:

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// I built this first to have a handy way to do string replacement but found that it couldn't handle strings which contain
// coded regular expressions, of which I have several.  This is  because of its use of RegExp().  Due to the potential
// problem, I stopped using this function and started using split/join (below).  I could also, but chose not to, have
// re-architected replace_all() to use split/join internally. I just left well enough alone:

// main_string  = replace_all(main_string, from, to);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// I built this next to have a handy way to remove all occurrances of a string without having to replace it with the empty
// string.  It's also "procedural", ie, doesn't use RegExp():

// main_string  = remove_all_procedural(main_string, from);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// I started doing string replacement this way because neither of the other two ways would suffice.  I needed string
// replacement, not removal, but I also needed it to handle coded regular expressions.  Technically speaking, it's not
// "procedural" in that it does its work in-line by chaining/cascading functions together, but it accomplishes the same
// goal for which my "remove_all_procedural()" was written: avoiding RegExp().  In later development, this became my
// preferred/default string replacement technique (so clean, so elegant!):

// main_string  = main_string.split(from).join(to);

//------------------------------------------------------------------------------------------------------------------------
wikipedia_discography.prototype.level_1_artists = function (artist_array) {

    // NOTE: Be careful on these upper levels as to the sorting out of the proper artist naming as it relates to the
    // finding of discographies in Wikipedia.  It is more complicated than it looks.  Also, the overall flow of the
    // complete process (which begins here on Level 1) is pure hierarchical drill-down.  I don't pass stuff around. I
    // just drill down, gathering up what I need as I go, hit bottom, and unload what I have.  The End.  I employ
    // whatever methods I need to achieve my final (JSON) output.  Eg: Mock "printing" employing old-fashioned
    // "control-breaking" (which is residual of having built this process first as a report, only later converting
    // to a JSON-generator).  It all works perfectly.

    if (this.debug_trace_artist == true) { get_function_description("level_1_artists"); }

    this.discography_return_JSON_string = ""; // init

    // Append the result opening brace and the artists array opening bracket:
    this.discography_return_JSON_string += '{"artists":['; // this contains 

    // Built-in development aid:
    this.debug_distinct_sections_all = new Array();
    this.debug_distinct_sections_selected = new Array();

    // Init:
    var wikipedia_entry = "";
    var discography_response = "";

    var artist_variation;
    var discography_JSON_string;
    var correct_wikipedia_entry_found;

    // NOTE: This process was first written to handle only one artist at a time.  If the
    // lookup failed, an error message was put up and the process was halted.  A further
    // fly in the ointment is my use of "drill down" and "this.discography_return_JSON_string"
    // as described below.

    // I now want the process to run such that one failure, among many, is not fatal to the
    // batch.  To accomplish this I will used a "checkpoint" and a "rollback" along with
    // an interim JSON syntax check.  What a clever fellow I am!
    var discography_rollback_JSON_string;
    var discography_test_JSON_string;

    var discography_found_count = 0; // init

    //=======================================================================================================================
    // For each artist in the JimRadio Artist database...
    for (var i = 0; i < artist_array.length; i++) {

        // Take a checkpoint of the final result in case we must rollback our most recent change:
        discography_rollback_JSON_string = this.discography_return_JSON_string;

        if (discography_found_count != 0) { this.discography_return_JSON_string += ","; }

        // Discography location 1 of 3 - Hardcoded:

        // As the first task, look for a "hardcoded" discography for this artist:
        discography_JSON_string = this.get_discog_JSON_string_hardcoded_main(artist_array[i]);

        // If one exists: 
        if (discography_JSON_string != "") {

            correct_wikipedia_entry_found = true;

            // Since our data is in JSON format already (not Wikipedia), bypass the whole "drill down"
            // and output processes and just append the string directly:
            this.discography_return_JSON_string += discography_JSON_string;

        } else {

            // Since our data is in Wikipedia format we must do the "drill down" and output processes so
            // as to indirectly append to "this.discography_return_JSON_string":

            // If no hardcoded discography exists for this artist, look for a Wikipedia entry
            // using the artist's name:
            correct_wikipedia_entry_found = this.level_3_artist(
                artist_array[i],    // artist
                artist_array[i]     // artist_variation DUMMY
            );

            // If one is found, then our search is over...
            if (correct_wikipedia_entry_found == true) {

                artist_variation = artist_array[i];

            } else {

                //...otherwise we must keep looking using Wikipedia's de-duplication naming
                // standard, egs: Madonna (entertainer), Bent (band), etc:
                artist_variation = this.level_2_artist_variations(artist_array[i]);

                // If this situation occurs... 
                if (artist_variation == artist_array[i]) {

                    //...effectively nothing has happened. Our search has come to an end and we must report that this
                    // artist (or typo, etc.) does not have a valid Wikipedia entry with a valid discography section:

                    // NOTE: I originally wanted to produce separate messages for the following two conditions but I
                    // found, after two wasted days, that the two concepts are too thorougly intertwined to untangle
                    // them. In other words, as originally designed, I made no distinction between the two errors.
                    // Either one was "fatal" and the results of all lookups was being confirmed manually, so it really
                    // didn't matter.

                    // This effort was initiated by the Zoe Johnston Wikipedia page which exists but does not have a
                    // discography section (other than in prose). This has the unfortunate effect of going through the
                    // artist name variation process to find such a discography (a misguided effort). I will let all of
                    // this stand as is.  It is what it is:

                    // Inform the user of the error, but allow the process to continue.  Multiple
                    // errors will produce multiple error messages:

                    standard_streams_services.write("error",
                        "No Wikipedia entry was found or " +
                            "an entry was found with no discography section for " +
                            artist_array[i] + "."
                    );

                }   // END OF: if (artist_variation == artist_array[i]) {
            }       // END OF: } else {

            //============================================================================================
            // "artist_variation" now contains the correct value, though nothing is done with it since
            // the work of the program has already been done in sub-functions.
            //============================================================================================

            // Look for a hardcoded studio album discography for this artist:
            var discography_JSON_string2 = this.get_discog_JSON_string_hardcoded_studio_albums(artist_array[i]);

            // If one exists, append it: 
            if (discography_JSON_string2 != "") { this.discography_return_JSON_string += ", " + discography_JSON_string2; }

            // Look for a hardcoded live album discography for this artist:
            discography_JSON_string2 = this.get_discog_JSON_string_hardcoded_live_albums(artist_array[i]);

            // If one exists, append it: 
            if (discography_JSON_string2 != "") { this.discography_return_JSON_string += ", " + discography_JSON_string2; }

            // Append the section array closing bracket and the artist array final element closing brace:
            this.discography_return_JSON_string += "]"; // 
            this.discography_return_JSON_string += "}"; // 

        }           // END OF: } else {


        //------------------------------------------------------------------------------------
        // Artist discography verification process:

        // The above processing is complete for one artist.  Now we must determine if we have
        // introduced bad JSON into the result:
        discography_test_JSON_string = this.discography_return_JSON_string;

        // Append the artist array closing bracket and the result closing brace:
        discography_test_JSON_string += "]}";

        // Bad JSON will break this iteration of the loop:
        try {
            JSON.parse(discography_test_JSON_string);

            // Increment the counter (but only if the JSON is good):
            discography_found_count++;

        } catch (e) {

            // If the JSON is bad, rollback the change (very clever!):
            this.discography_return_JSON_string = discography_rollback_JSON_string;
        }
        //------------------------------------------------------------------------------------

    }               // END OF: for (var i = 0; i < artist_array.length; i++) {
    //=======================================================================================================================

    //-----------------------------------------------------------------------
    // Post-loop, totals processing:

    // Built-in development aid:
    if (this.debug_get_distinct_sections == true) {

        alert("Distinct Section tracing in progress...");
        this.write_debug("BEGIN DISTINCT SECTION TRACING");

        this.debug_distinct_sections_all = this.debug_distinct_sections_all.sort();
        this.write_debug("All Sections");
        this.write_debug(this.debug_distinct_sections_all);

        this.debug_distinct_sections_selected = this.debug_distinct_sections_selected.sort();
        this.write_debug("Selected Sections");
        this.write_debug(this.debug_distinct_sections_selected);

    }

    // Append the artist array closing bracket and the result closing brace:
    this.discography_return_JSON_string += "]}";

    //==============================================================================================================
    // NOTE: End of the line. No return.  Processing will end when all of the sub-levels have completed their work.
    //==============================================================================================================

}

wikipedia_discography.prototype.level_2_artist_variations = function (artist) {

    if (this.debug_trace_artist == true) { get_function_description("level_2_artist_variations"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var artist_variation = artist;

    // Look for a Wikipedia entry using the artist's name with
    // all known suffixes. Loop until a match is found:
    var artist_suffix = new Array();

    artist_suffix[0] = " (band)";           // eg: Eagles
    artist_suffix[1] = " (singer)";         // eg: Dido
    artist_suffix[2] = " (entertainer)";    // eg: Madonna
    artist_suffix[3] = " (group)";          // eg: Tavares
    artist_suffix[4] = " (musician)";       // eg: Joe Jackson
    artist_suffix[5] = " (British band)";   // eg: The Beat
    artist_suffix[6] = " (rock band)";      // eg: The Firm

    var correct_wikipedia_entry_found;

    // For each artist/suffix combination...
    for (var i = 0; i < artist_suffix.length; i++) {

        //... look for a valid Wikipedia entry:
        correct_wikipedia_entry_found =
            this.level_3_artist(
                artist,                     // artist
                artist + artist_suffix[i]   // artist_variation
            );

        // If one is found:
        if (correct_wikipedia_entry_found == true) {

            // Accept it and exit the loop:
            artist_variation = artist + artist_suffix[i];
            break;
        }
    }

    // Return the modified copy of the argument:
    return artist_variation;

}

// open(method, url, async)	Specifies the type of request

// method:  the type of request: GET or POST
// url:     the server (or file) location
// async:   true (asynchronous) or false (synchronous)

var xhttp;

function my_test(response_text) {

    alert("yy");

    alert(response_text);

}

// Contains artist-based hardcoding:
wikipedia_discography.prototype.level_3_artist = function (artist, artist_variation) {

    // NOTE: This level sets the value of "this.artist", which is the first important step
    // towards our goal of assembling the required data.

    // Built-in debugging:
    if (this.debug_trace_artist == true) { get_function_description("level_3_artist"); }

    // Save this to avoid having to pass it hither and yon:
    this.artist = artist;

    //this.write_debug(this.artist);

    var artist_formatted;
    var http_get_result;
    var page_halves_array;

    //---------------------------------------------------------------------------------------------- 
    // Since we will be modifying the argument, let's make a copy and work with that:
    artist_formatted = artist_variation;

    // Reformat the artist's name to gradually change it so that it complies with the
    // Wikipedia entry naming standard:

    // We need spaces to become ASCII Hex 20s but not in all cases:

    // Part 1: Avoid a mishap:
    artist_formatted = artist_formatted.split(" (").join("SpaceParen"); // string replacement via split/join
    // Part 2: Make the change:
    artist_formatted = artist_formatted.split(" ").join("%20"); // string replacement via split/join
    // Part 3: Undo the special case:
    artist_formatted = artist_formatted.split("SpaceParen").join("_("); // string replacement via split/join

    // We need Ampersands to become ASCII Hex 26s:
    // Eg: http://en.wikipedia.org/wiki/Simon_%26_Garfunkel_discography
    artist_formatted = replace_all(artist_formatted, "&", "%26");

    // We need Plus Signs to become ASCII Hex 2Bs:
    // Eg: http://en.wikipedia.org/wiki/Mike_%2B_The_Mechanics
    artist_formatted = artist_formatted.split("\+").join("%2B"); // string replacement via split/join

    //---------------------------------------------------------------------------------------------- 
    // Now we begin to assemble the Wikipedia URI to go get the artist's discography: 
    // Eg: http:en.wikipedia.org/wiki/Marvin_Gaye_discography

    // CONSTANTS:

    // NOTE 1 of 2: Normally I would extract such constants as these to web.config.  But, because this file
    // (WikipediaDiscography.js) is shared between two applications (also YouTube Album Finder), it would
    // only complicate matters to do so.

    var WIKIPEDIA_PREFIX = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=";
    var WIKIPEDIA_SUFFIX = "&prop=revisions&rvprop=content";

    var wikipedia_discog_url_portion;

    wikipedia_discog_url_portion = artist_formatted; // init

    // More transformation:
    wikipedia_discog_url_portion = wikipedia_discog_url_portion.split(" ").join("_"); // string replacement via split/join

    // Discography location 2 of 3 - External:

    // NOTE: This value is set in level_3_artist() and tested in level_6_get_discog_array_core_inclusion_test()
    // which is called by level_6_discography_array(). Thus, there are many function calls in between
    // the setting and the testing. I would have to pass this foolish boolean as an argument hither
    // and yon just to avoid the shame of global variables. Pishaw:
    this.use_external_discog = false; // init

    // If I have pre-determined that we should use the external discography in this case:
    if (this.test_against_external_discographies(artist_variation) == true) {

        this.use_external_discog = true;

        if (artist == "Cher" ||
            artist == "Elvis Presley" ||
            artist == "Johnny Cash") {
            wikipedia_discog_url_portion += "_albums_discography";
        } else {
            wikipedia_discog_url_portion += "_discography";
        }

    }

    // Discography location 3 of 3 - Local:

    // NOTE: The only difference between local and external discographies is the content
    // of the link. From here on, Discography location 2 of 3, external, and Discography
    // location 3 of 3, local, flow together:

    //---------------------------------------------------------------------------------------------------------------------
    // Assemble and save off:

    // CONSTANTS:

    // NOTE 2 of 2: Normally I would extract such constants as these to web.config.  But, because this file
    // (WikipediaDiscography.js) is shared between two applications (also YouTube Album Finder), it would
    // only complicate matters to do so.

    var wikipedia_page = "http://en.wikipedia.org/wiki/" + wikipedia_discog_url_portion;
    this.wikipedia_page_url = wikipedia_page;

    // Assemble:
    var uri = WIKIPEDIA_PREFIX + wikipedia_discog_url_portion + WIKIPEDIA_SUFFIX;

    var correct_wikipedia_entry_found = false; // init

    //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
    // CORS-compliant XML HTTP GET request/response 1 of 2:

    // Create, open and send a synchronous XML HTTP GET request and get the returned response.  Employ a
    // home-grown, host-resident proxy server to satisfy the CORS same-origin policy:
  //var response = get_xml_http_request(uri);
    var response = get_xml_http_request_via_proxy_server(uri);
    //oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

    // If no errors occurred:
    if (response != "") {

        // CORS-compliant XML HTTP GET request/response 2 of 2:

        // Decode the characters that get messed up in transit and remove the "packaging" (either String or
        // XML) that encloses the data:
        response = remove_response_packaging(response);

       // Begin the "winnowing" process:
        correct_wikipedia_entry_found = this.level_4_response(response);
    }
    //------------------------------------------------------------------------------------

    // NOTE: I experimented with trying to use the above error to completely shut down processing so as to avoid
    // generating the subsequent crashes that accompany this one. This was problematic for two reasons: 1) the
    // original design never envisioned this, so it would take much rework to do it, and 2) different browsers produced
    // different errors, so no one piece of code could handle them all. As currently designed, returning either true
    // or false from this function just prompts the outer loop to try again, a task at which it is bound to fail.

    // Examine the response as JSON data and determine if we got the correct Wikipedia entry.
    // The three possible answers are: 1) no entry found, 2) correct entry found, 3) wrong
    // entry found. If a valid Wikipedia entry with a valid discography section was found,
    // we will output the artist's discography:
    //    var correct_wikipedia_entry_found =
    //         this.level_4_response(response);

    return correct_wikipedia_entry_found;

}

wikipedia_discography.prototype.level_4_response = function (wikipedia_response_JSON_string) {

    //FIXMEDONE
    if (this.debug_trace_discography == true) { get_function_description("level_4_response"); }

    //----------------------------------------------------------------------------------------------
    // Wikipedia lookup service response examples:

    // 1 of 3: No entry found example.  This shows an application-generated invalid
    // artist variation:
    // {
    //    "query":{
    //       "normalized":[
    //          {
    //             "from":"Eagles_(group)",
    //             "to":"Eagles (group)"
    //          }
    //       ],
    //       "pages":{
    //          "-1":{
    //             "ns":0,
    //             "title":"Eagles (group)",
    //             "missing":""
    //          }
    //       }
    //    }
    // }
    //----------------------------------------------------------------------------------------------
    // 2 of 3: Wrong entry found example.  This shows that the default response for this
    // title is the eagle bird:
    // {
    //    "query":{
    //       "pages":{
    //          "27144357":{
    //             "pageid":27144357,
    //             "ns":0,
    //             "title":"Eagles",
    //             "revisions":[
    //                {
    //                   "contentformat":"text/x-wiki",
    //                   "contentmodel":"wikitext",
    //                   "*":"#REDIRECT [[Eagle]] {{R from plural}}"
    //                }
    //             ]
    //          }
    //       }
    //    }
    // }
    //----------------------------------------------------------------------------------------------
    // 3 of 3: Right entry found example.  This shows the correct application-generated
    // artist variation:
    // {
    //    "query":{
    //       "normalized":[
    //          {
    //             "from":"Eagles_(band)",
    //             "to":"Eagles (band)"
    //          }
    //       ],
    //       "pages":{
    //          "90785":{
    //             "pageid":90785,
    //             "ns":0,
    //             "title":"Eagles (band)",
    //             "revisions":[
    //                {
    //                   "contentformat":"text/x-wiki",
    //                   "contentmodel":"wikitext",
    //                   "*":"{{Redirect|The Eagles||Eagle (disambiguation)}}\n{{Use mdy dates|date=April 2013}}\n
    //                   {{Infobox musical artist\n| name = Eagles...
    //                   o
    //                   o
    //                   o
    //                }
    //             ]
    //          }
    //       }
    //    }
    // }
    //----------------------------------------------------------------------------------------------


    // Convert to JSON so we can start examining the contents of the response:
    //var discography_JSON_object = JSON.parse(wikipedia_response_JSON_string);

    var discography_JSON_object;

    discography_JSON_object = JSON.parse(wikipedia_response_JSON_string);

    var pageID;

    // STEP 1: Did we get the correct Wikipedia entry:
    var correct_wikipedia_entry_found = false; // init

    // NOTE: For some unknown reason, we get 3 "pages" from Wikipedia but they are all
    // the same. Thus we will break out of the For loop after the first iteration.

    // For each page of the response:
    for (pageID in discography_JSON_object.query.pages) {

        if (pageID == -1) {
            // 1 of 3: no entry found
        } else {

            // NOTE: indexOf() is case sensitive:
            if (wikipedia_response_JSON_string.toLowerCase().indexOf("discography") > -1) {
                // 2 of 3: correct entry found
                correct_wikipedia_entry_found = true;
            } else {
                // 3 of 3: wrong entry found
            }
        }

        // Break out of the For loop after the first iteration:
        break;
    }

    if (this.debug_trace_discography == true) {
        this.write_debug("correct_wikipedia_entry_found = " + correct_wikipedia_entry_found.toString());
    }

    // If a valid Wikipedia entry with a valid discography section was found:
    if (correct_wikipedia_entry_found == true) {

        // Output the artist's discography:
        this.level_5_discography(wikipedia_response_JSON_string);
    }

    return correct_wikipedia_entry_found;

}

wikipedia_discography.prototype.level_5_discography = function (discog_wikipedia_string) {

    // NOTE: A huge amount of work is done on this level.  It is the heart of the process.

    // NOTE 1 of 2: Here we are under one "debug flag"...
    if (this.debug_trace_discography == true) { get_function_description("level_5_discography"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discog_wikipedia_string_edited = discog_wikipedia_string;

    // STEP 1: Perform many steps of "applied hygiene" to "doctor" the musings of a bunch of Wikipedia
    // editors into something approaching the quality of "data".  Here we scrub it clean:

    // Get the discography as a whole:
    discog_wikipedia_string_edited = this.get_discog_wikipedia_string(this.artist, discog_wikipedia_string_edited);

    // Make an effort to keep unicode characters we can use while removing ones that we can't. Remove
    // anything that gets in the way of (I wouldn't have bothered, otherwise) our data:
    discog_wikipedia_string_edited = this.remove_replace_unicode(discog_wikipedia_string_edited);

    discog_wikipedia_string_edited = this.remove_extraneous(discog_wikipedia_string_edited);

    // Flatten the section hierarchy to only one level:
    discog_wikipedia_string_edited = this.convert_subsections_to_style_B_sections(discog_wikipedia_string_edited);

    // Salvage a lot of summary-level data (sections) by fixing it:
    discog_wikipedia_string_edited = this.fix_sections(discog_wikipedia_string_edited);

    // Simplify sections by reducing down to the "meta-style", Style A:
    discog_wikipedia_string_edited = this.convert_sections_style_B_to_A(discog_wikipedia_string_edited);

    // Salvage detail-level data (albums) by fixing it:
    discog_wikipedia_string_edited = this.fix_or_remove_detail_anomalies_via_hardcodes(discog_wikipedia_string_edited);

    // Remove Wikipedia links, which we have reserved for album titles only, that generate false positives:
    discog_wikipedia_string_edited = this.remove_non_album_companies_or_orgs(discog_wikipedia_string_edited);
    discog_wikipedia_string_edited = this.remove_non_album_chart(discog_wikipedia_string_edited);
    discog_wikipedia_string_edited = this.remove_non_album_international(discog_wikipedia_string_edited);
    discog_wikipedia_string_edited = this.remove_non_album_media(discog_wikipedia_string_edited);
    discog_wikipedia_string_edited = this.remove_non_album_misc(discog_wikipedia_string_edited);

    // Continue salvaging a lot of detail-level data (albums) by fixing it:
    discog_wikipedia_string_edited = this.fix_detail_indicators(discog_wikipedia_string_edited);
    discog_wikipedia_string_edited = this.fix_detail_years(discog_wikipedia_string_edited);

    // SECTION STRING TO ARRAY TRANSITION:

    // STEP 2: This is the "debug turning point" where we switch from processing one big JSON string to processing
    // an array of them.  At lower levels, this array (discography "sections") will be further subdivided into other
    // arrays (discography "detail", ie, individual album information). Here we create the array, via "split()", and
    // pass it in one step:
    this.level_6_discography_array(discog_wikipedia_string_edited.split(this.SECTION_TITLE_START_INDICATOR));

    // NOTE 2 of 2: ...here we are under a different debug flag (thus, a turning point):
    if (this.debug_trace_section == true) {
        this.write_debug("SECTION STRING TO ARRAY TRANSITION");
        this.write_debug("INPUT STRING: " + discog_wikipedia_string_edited);
    }

    //==============================================================================================================
    // NOTE: End of the line. No return.  Processing will end when all of the sub-levels have completed their work.
    //==============================================================================================================

}

wikipedia_discography.prototype.level_6_discography_array = function (discog_section_wikipedia_array) {

    // This level executes "level_6_get_discog_array_core_inclusion_test()" which passes judgment on and gathers up the
    // detail components of a discography's albums (release year, album title).
    
    // The combination of this function and "level_6_get_discog_array_core_inclusion_test()" is a critically important,
    // finely tuned instrument, the maintenance of which should be performed with great care.
    
    if (this.debug_trace_section == true) {
        get_function_description("level_6_discography_array");
        this.write_debug("OUTPUT ARRAY:");
        print_array(discog_section_wikipedia_array);
    }

    var is_wikitable;
    var discog_wikipedia_array;

    // Init:
    var section = "";
    this.albums_or_singles = "";

    for (var i = 0; i < discog_section_wikipedia_array.length; i++) {

        try {

            if (discog_section_wikipedia_array[i].indexOf("wikitable") > -1) {
                is_wikitable = true;
            } else {
                is_wikitable = false;
            }

            if (discog_section_wikipedia_array[i].indexOf("wikitable") > -1) {
                discog_section_wikipedia_array[i] = discog_section_wikipedia_array[i].substr(0, discog_section_wikipedia_array[i].lastIndexOf("}"));
            }

            // NOTE: This is a "master/detail" structure. Get the master, the discography section:
            section = discog_section_wikipedia_array[i].substring(0, discog_section_wikipedia_array[i].indexOf("==="));

            if (this.debug_trace_section == true) { this.write_debug("<br>level_6_sections.section BEFORE: " + section); }

            section = this.regularize_section_title(section);

            if (this.debug_trace_section == true) { this.write_debug("level_6_sections.section AFTER: " + section); }

            if (discog_section_wikipedia_array != null) {

                if (discog_section_wikipedia_array.length > 0) {

                    //-----------------------------------------------------------------------------------------------------------------------
                    // Known problem. The following discographies are entirely unconvential in that the sections/subsections are visual
                    // to the Wikipedia online user only. They don't follow any of the style conventions that this program handles. Instead,
                    // the section names are just plain in-line text. Conceivably, I could handle them but I don't want to expend the effort:

                    // Gerry Rafferty Bob Marley 
                    // Discography Discography
                    // 	 Albums Studio albums
                    // 		 Compilations Live albums
                    // 			 As guest or supporting musician 

                    //-----------------------------------------------------------------------------------------------------------------------
                    // NOTE: The following two edits handle the junk in the discographies of Gene Pitney,
                    // Collective Soul, Pink Floyd, Elliott Smith and Stevie Wonder:

                    // If we have a valid section name...
                    if (section != "") {

                        //... and a section line that doesn't have junk in it...
                        if (discog_section_wikipedia_array[i].length > 2) {

                            //...then we have data we can use:

                            // Get all the details associated with that master.

                            // Recall that in function regularize_detail_row_ends() we made the row end indicators be the same for all rows
                            // (and, thus, all styles). Once this was accomplished, everything flowed smoothly. It's best to think of these
                            // rows as print lines since they largely follow the appearance that the data take on the page at the Wikipedia
                            // site. 

                            // ALBUM STRING TO ARRAY TRANSITION:

                            discog_wikipedia_array = discog_section_wikipedia_array[i].split(this.DISCOGRAPHY_SPLIT_INDICATOR1);
                            if (this.debug_trace_section == true) { print_array(discog_wikipedia_array); }

                            if (this.debug_trace_section == true ||
                                this.debug_trace_album   == true   ) {
                                    this.write_debug("ALBUM STRING TO ARRAY TRANSITION");
                                    this.write_debug("INPUT STRING: " + discog_section_wikipedia_array[i]);
                                    this.write_debug("OUTPUT ARRAY:");
                                    print_array(discog_wikipedia_array);
                           }

                            discog_wikipedia_array = this.fix_broken_details(discog_wikipedia_array);
                            if (this.debug_trace_section == true) { print_array(discog_wikipedia_array); }

                            // Style 5 processing 2 of 3. Modify the discography array so that any style 5
                            // details will conform to style 4:

                            //---------------------------------------------------------------------------------------------------
                            // Here is an example of a style 1 discography row array:

                            // Main Discography===\n\n{{Main|The Allman Brothers Band discography}}\nThe Allman Brothers Band
                            // placed more emphasis on their live performances rather than...
                            // o
                            // o
                            // o
                            // retrospectively).{{cite book\n| first= Martin C.\n| last= Strong\n| \n| title= The Great Rock
                            // Discography\n| edition= 5th\n|publisher= Mojo Books\n| location= Edinburgh\n| pages= 1416\n| }}
                            // ''[[The Allman Brothers Band (album)|The Allman Brothers Band]]'' (1969)
                            // ''[[Idlewild South]]'' (1970)
                            // o
                            // o
                            // o
                            // ''[[Hittin' the Note]]'' (2003)
                            // ''[[One Way Out (album)|One Way Out]]'' (2004)\n

                            //---------------------------------------------------------------------------------------------------
                            // NOTE: With the above array, we have all we need.
                            //---------------------------------------------------------------------------------------------------

                            if (this.debug_trace_section == true) {
                                this.write_debug("level_6_sections.discog_wikipedia_array");
                                this.write_debug(discog_wikipedia_array);
                            }

                            //---------------------------------------------------------------------------------------------------
                            // NOTE: This is the end of the line for our processing. Most, but not all, detail rows
                            // will contain album data. The following winnowing will focus only on those that do.
                            // Get the discography detail information which consists of album titles and release years:

                            var discography_detail_object = this.level_6_get_discog_array_core_inclusion_test(this.artist, is_wikitable, section, discog_wikipedia_array);

                            // CROSS-REFERENCE C - nested subsections/singles - One of the "non-album sections" is "singles" and it
                            // is here that they are winnowed out:

                            if (this.test_against_non_album_sections(section) == true) {

                                // If we have any detail results:
                                if (discography_detail_object.year_array.length > 0) {

                                    // Output (master) the section and the section's style.
                                    // Output (detail) all album information, namely title and year.
                                    this.level_7_albums(

                                        section,

                                    // Unpackage the two resultant arrays:
                                        discography_detail_object.year_array,
                                        discography_detail_object.title_array

                                     );

                                    // This gets only the sections that were selected for inclusion:
                                    this.distinct_sections(this.debug_distinct_sections_selected, section);

                                }
                            }

                            // This gets all sections found, inclusions and exclusions:
                            this.distinct_sections(this.debug_distinct_sections_all, section);

                        } // END OF: if (discog_section_wikipedia_array[i].length > 2) {
                    }     // END OF: if (section != "") {
                }         // END OF: if (discog_section_wikipedia_array.length > 0) {
            }             // END OF: if (discog_section_wikipedia_array != null) {

        } catch (e) { this.write_debug(e.message); }

    }                     // END OF: for (var i = 0; i < discog_section_wikipedia_array.length; i++) {

    //==============================================================================================================
    // NOTE: End of the line. No return.  Processing will end when all of the sub-levels have completed their work.
    //==============================================================================================================

}

//FIXME
// NOTE: This processing is not concerned with the order of the columns shown
// below.  As such, the same code handles style 1 (title + year) and style 2
// (year + title) discography sections.  However with style 4, a wikitable, I
// do stop my searching after the first two columns.

// Discography style 1 eg:
// The Allman Brothers Band, Main Discography
// ------------------------------------------
// The Allman Brothers Band (1969)
// Idlewild South (1970)
// At Fillmore East (1971)
// Eat a Peach (1972)

// Discography style 2 eg:
// 10cc, Main Discography
// ----------------------
// 1973: 10cc
// 1974: Sheet Music
// 1975: The Original Soundtrack

// Discography style 3 eg:
// Crosby, Stills, Nash & Young; Studio albums
// -------------------------------------------
// 1969 Crosby, Stills & Nash (CSN)
// 1970 Déjà Vu (CSNY)
// 1977 CSN (CSN)

// Discography style 4 eg: (this is a visual approximation only)
// The Turtles, Studio albums
// -----------------------------
// | Year	| Album	           | 
// | 1965	| It Ain't Me Babe | 
// | 1966	| You Baby         | 
// | 1967	| Happy Together   |
// -----------------------------

// Discography style 5 eg: (this is a visual approximation only)

// Notice the disparity in specifying dates (dd, mmm, yyyy vs.
// mmm, dd, yyyy):

// The Asteroids Galaxy Tour, Studio albums
// ---------------------------------------
// | Fruit	                             |
// | Released: 21 September 2009         |
// | Label: Small Giants                 |  *
// | Format: CD, Digital download, Vinyl |  *
// ---------------------------------------
// | Out of Frequency	                 |
// | Released: January 31, 2012          |
// | Label: BMG Rights                   |  *
// | Format: CD, Digital download, Vinyl |  *
// ---------------------------------------
// * = These rows will be filtered out, below:

// Discography style 7 eg:
// Carly Simon, Studio albums
// ------------------------------------------
// Carly Simon, 1971
// Anticipation, 1971
// No Secrets, 1972

// Tom Jones, Live albums is a hybrid between style 4 (wikitable), and
// style 5 ("Released:") 
// ----------------------------------------
// | 1969	| Tom Jones Live in Las Vegas |
// |        | Released: November 1969     |
// |        | Label: Decca / Parrot       |
// ----------------------------------------

// Discography style 8 eg:
// Aimee Mann, Live albums
// -----------------------
// 2004- Live at St. Ann's Warehouse

// Discography styles 61, 62, 63, 64 and 65 are the same as their single digit
// equivalents except that the discographies are located on separate pages from
// the main pages of the artist's biographies.

// Contains artist-based hardcoding:

wikipedia_discography.prototype.level_6_get_discog_array_core_inclusion_test = function (artist, is_wikitable, section, discog_wikipedia_array) {

    // NOTE: This is the "core inclusion test" because, if the data gets through
    // the "sieve" of nesting, below, its detail components (release year, album
    // title) gain inclusion in the "final result arrays":

    var album_release_year;
    var album_title;

    var year_char_look_ahead;
    //var year_char_look_behind;
    var year_char_look_behind2;

    // These arrays will hold our final results:
    var discography_year_array = new Array();
    var discography_title_array = new Array();

    var year_start_index;

    // Most, but not all, detail rows will contain album data. The following
    // winnowing will focus only on those that do:
    for (var i = 0; i < discog_wikipedia_array.length; i++) {

        // Regularize from a very loose "standard" (oy):
        discog_wikipedia_array[i] = discog_wikipedia_array[i].split("Release date:").join("Released:"); // string replacement via split/join

        // This indicates, to the best I can determine, that we have a wikitable
        // column heading row. As such, we can ignore it.
        // This fixes Jem, Album:
        if (discog_wikipedia_array[i].indexOf("\\n!") == -1) {

            // Get the returned object and unpackage this value.

            // NOTE: A valid century is being used as a proxy for a valid year. There is no
            // guaranteed equivalence, except that it suffices as an equivalence for the data
            // I found, under the circumstances that I am using it for. It suffices for now
            // but may have to be readdressed based on data I use in the future:

            // Get year info:
            year_start_index = get_first_year_index(discog_wikipedia_array[i]);

            // NOTE: We now have consolidated the centuries so that we can step through them
            // on an equal basis. We retain the original value in "discog_wikipedia_array[i]":

            // Get title info:
            title_start_indicator_index = discog_wikipedia_array[i].indexOf("[[");
            title_end_indicator_index = discog_wikipedia_array[i].indexOf("]]");

            // If the potential year is located between the title indicators, it is part
            // of the title and should not be subject to our search:
            if (year_start_index > title_start_indicator_index) {
                if (year_start_index < title_end_indicator_index) {

                    // Reposition so as to search after the title and search again.
                    // NOTE: This picked up 8 entries. Examples:

                    // Chicago, Studio albums: ''[[Chicago 19]]'' (1988)
                    // Ringo Starr, Main Discography: ''[[Ringo 2012]]'' (2012)
                    // The Beach Boys, Main Discography: ''[[20/20]]'' (1969)

                    // Get year info:
                    year_start_index = get_next_year_index(discog_wikipedia_array[i], title_end_indicator_index);

                }
            }

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
            // Continue examining the detail line:
            if (year_start_index > -1) {

                if (title_start_indicator_index > -1) {

                    if (title_end_indicator_index > -1) {

                        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        // NOTE: The format of the year is the tip-off as to what style has
                        // been employed by the Wikipedia entry author. 

                        // For the year, refer back to the original values ("19", "20") of the centuries:
                        album_release_year = discog_wikipedia_array[i].substr(year_start_index, 4);

                        // This will clear up some false positives masquerading as years.
                        // Is expressed as a double negative. If NOT is NOT a number, ie,
                        // if IS a number:
                        if (!isNaN(album_release_year)) {

                            year_char_look_ahead = discog_wikipedia_array[i].substr(year_start_index + 4, 1);

                            //year_char_look_behind =
                            // discog_wikipedia_array[i].substr(year_start_index - 1, 1);

                            year_char_look_behind2 = discog_wikipedia_array[i].substr(year_start_index - 2, 1);

                            // Continue examining further:

                            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            // Part 1 of 2: Set the styles for local discographies:

                            this.style = -1; // reset

                            if (is_wikitable == true) {

                                if (discog_wikipedia_array[i].indexOf("Released:") > -1) {
                                    this.style = 5;
                                } else {
                                    this.style = 4;
                                }

                            } else {

                                if (year_char_look_behind2 == ",") {
                                    this.style = 7;
                                } else {
                                    if (year_char_look_ahead == ")") {
                                        this.style = 1;
                                    } else if (year_char_look_ahead == ":") {
                                        this.style = 2;
                                    } else if (year_char_look_ahead == " ") {
                                        this.style = 3;
                                    } else if (year_char_look_ahead == "-") {
                                        this.style = 8;
                                    }
                                }
                            }

                            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            if (this.style > -1) {

                                // The Turtles:
                                // |1966\n|''[[You Baby]]''\n||\\n|-\n

                                // Get the title:
                                album_title = discog_wikipedia_array[i].substring(title_start_indicator_index + 2, title_end_indicator_index);

                                //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                // Part 2 of 2: Set the styles for external discographies:
                                if (this.use_external_discog == true) {
                                    this.style += 60;
                                }

                                //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                // The runtime criteria are Studio, Concerts, Greatest Hits and Singles:

                                // Load our final result arrays:

                                // NOTE: is title, not year, causing font misfire:
                                discography_year_array.push(album_release_year);
                                discography_title_array.push(album_title);

                            }   // END OF: if (this.style > -1) {
                        }       // END OF: if (!isNaN(album_release_year)) {
                    }           // END OF: if (title_end_indicator_index > -1) {
                }               // END OF: if (title_start_indicator_index > -1) {
            }                   // END OF: if (year_start_index > -1) { 
        }                       // END OF: if (discog_wikipedia_array[i].indexOf("\\n!") == -1) {
    }                           // END OF: for (var i = 0; i < discog_wikipedia_array.length; i++) {

    // Regularize the album titles:
    for (var i = 0; i < discography_title_array.length; i++) {
        discography_title_array[i] = this.regularize_album_title(artist, discography_title_array[i]);
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------
    // CROSS-REFERENCE F - proactive bad data cleanup - Duplicate albums.  re: "I could have kicked off
    // another round of fixes" - I actually know what causes some of the duplicates.  It is a downstream consequence of
    // an artist who releases multiple albums in one year.  This was not anticipated (given the way Wikipedia chose to
    // represent this situation).  This is a known "design constraint".

    // My experience has shown that duplicate albums are often a sign of some other data corruption, further upstream.

    // If two albums in a row are identical, including their release years, let's suppress the duplicate. NOTE: David Bowie
    // released two eponymous albums in a row but, fortunately, they were in different years (1967, 1969).

    if (discography_title_array.length > 0) {

        var discography_title_array_output = new Array();
        var discography_year_array_output = new Array();

        // Load up deduplicated versions of the detail arrays:
        for (var i = 0; i < discography_title_array.length; i++) {

            if (i == 0) {

                discography_title_array_output.push(discography_title_array[i]);
                discography_year_array_output.push(discography_year_array[i]);

            } else {

                if (discography_title_array[i] == discography_title_array[i - 1] &&
                    discography_year_array[i] == discography_year_array[i - 1]) {

                    if (this.debug_trace_artist == true) {
                        this.write_debug("DUPLICATE ALBUM: " + artist + ", " + section + ", " + discography_title_array[i]);
                    }

                } else {
                    discography_title_array_output.push(discography_title_array[i]);
                    discography_year_array_output.push(discography_year_array[i]);
                }
            }
        }

        // Overlay the original arrays with the deduplicated ones:
        discography_title_array = discography_title_array_output;
        discography_year_array = discography_year_array_output;

    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------

    if (this.debug_trace_album == true) {
        print_array(discography_year_array);
        print_array(discography_title_array);
    }

    // Package up the two resultant arrays:
    var discography_detail_object = new Object();

    discography_detail_object.year_array = discography_year_array;
    discography_detail_object.title_array = discography_title_array;

    // Return them:
    return discography_detail_object;

}

wikipedia_discography.prototype.level_7_albums = function (section, year_array, title_array) {

    // At the conclusion of this level, we will have drilled down to the very bottom.

    if (this.debug_trace_section == true) {

        get_function_description("level_7_albums"); 
        
        // NOTE: This is a function that will look at the content of the album arrays
        // and determine if they have any suspect data:
        this.debug_trace_album_arrays(section, year_array, title_array);
     
    }

    this.increment_style_counter(this.style, 1); // increment by 1

    var wikipedia_page_url;

    for (var i = 0; i < year_array.length; i++) {

        //----------------------------------------------------------------------------------------
        // Level 1 of 3, Artist, suppressed by control breaking:

        // Do output control break processing:
        if (this.artist != this.previous_artist) {

            // Init from the global to create a link to the page to make it easier to
            // debug the content of the discographies:

            // Output the artist's name and the URI of the Wikipedia page from which the discography
            // was found:

            this.discography_return_JSON_string += this.get_JSON_artist_header(this.artist, this.wikipedia_page_url);

            // Prep for the next time through the loop:
            this.previous_artist = this.artist;
            this.previous_section = ""; // reset
        }

        //----------------------------------------------------------------------------------------
        // Level 2 of 3, Section, suppressed by control breaking:

        // Output control break processing:
        if (section != this.previous_section) {

            // Output the section and its style:
            this.discography_return_JSON_string += this.get_JSON_section_header(section, this.style);

            // JSON FORMATTING SECTION ARRAY PROCESSING NOTE 2 OF 2:
            // The uncertainty about the usage of all array elements, described in NOTE 1 OF 2, also makes it
            // difficult to determine when it is appropriate to append a comma separator. For extreme convenience,
            // I'll do it now by way of a global change. 

            // NOTE 2: I could have done all my comma separators (including artist and album) this way, but I did not:
            this.discography_return_JSON_string = // string replacement via split/join
                this.discography_return_JSON_string.split("}{").join("},{"); // section separator

            // Prep for the next time through the loop:
            this.previous_section = section;
        }

        //----------------------------------------------------------------------------------------
        // Level 3 of 3, Detail, always printed:

        // Built-in development aid:
        if (this.show_eponymous_titles == true) {

            // Given an artist and a title, determine if the title is eponymously named for the artist:
            if (this.is_title_eponymous(this.artist, title_array[i]) == true) {

                // Indicate on the report.

                // NOTE: Appending to the title is a kludge but I only do it for debugging. Ideally I would
                // create a new field in JSON (boolean is_eponymous) and return it with the rest of the JSON
                // string. And then break it out into its own field on the report (that is a lot of work!):
                title_array[i] += " EPONYMOUS";
            }

        }

        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Output the Release Year and Album Title:

        this.discography_return_JSON_string += this.get_JSON_album_detail(year_array[i], title_array[i]);

        // NOTE: This is the final processing inside the loop iteration of the detail array (year_array):

        // For all elements except the last one:
        if (i < year_array.length - 1) {
            this.discography_return_JSON_string += ","; // album separator 

            // For the last element:
        } else {

            this.discography_return_JSON_string += "]"; // albums array closing bracket

            // JSON FORMATTING SECTION ARRAY PROCESSING NOTE 1 OF 2:
            // It is important to understand why I use the last element of the detail array
            // as a proxy for the last valid element of the section array. All sections in the
            // section array are not necessarily printed. Their contents might be invalid or they
            // might have been filtered out by the runtime criteria. By the time we have loaded
            // the detail array, all the garbage is gone and all array elements of this array
            // are used:
            this.discography_return_JSON_string += "}"; // sections array final element closing brace
        }
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    } // END OF: for (var i = 0; i < year_array.length; i++) {

    //==============================================================================================================
    // NOTE: End of the line. No return.  Processing will end when all of the sub-levels have completed their work.
    //==============================================================================================================

}

wikipedia_discography.prototype.regularize_album_title = function (artist, album_title) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var album_title_edited = album_title;

    // Albums starting with Parenthesis.  NOTE: This is the final result after both parenthesis
    // removal processes have run.  We will truncate parenthetical expressions if they are found
    // in any position other than the first character, because such things usually serve as "sub-
    // titles" and trying to retain them will end up hurting our match hit-percent rather than helping
    // it. To further clarify: it's easier to match a short (or shortened) title than a long one
    // (given YouTube's user-administered nature).  "Intelligent matching" will, of course, ignore
    // the parentheses themselves, during the actual match process.

    // (Breach)				                Wallflowers
    // (I Can't Get No) Satisfaction		Rolling Stones
    // (I Got No Kick Against) Modern Jazz 	George Benson
    // (Pronounced 'Lĕh-'nérd 'Skin-'nérd)  Lynyrd Skynyrd
    // (Re)Union			                Yes
    // (You're My) Dream Come True	        Temptations
    // (re)Production			            Todd Rundgren

    // Wikipedia titles often contain parenthetical expressions. These can be
    // extremely problematic because 1) they contribute nothing that I need
    // as they supply the "hover text" of the Wikipedia GUI experience and
    // 2) they generate "false positives" due to their similarity to style 1
    // Years. Here is a small sample of examples: 

    // [[Steve Winwood (album)]]
    // [[About Time (Steve Winwood album)]]
    // [[The Muse (1999 film)]]
    // [[Pride and Joy (Marvin Gaye song)]]

    // If the parenthesis does not begin at the very beginning of the title:
    if (album_title.charAt(0) != "(") {

        // Truncate starting at any parenthesis:
        album_title_edited = truncate_bound_exclusive(album_title_edited, "(");

    }

    // Truncate starting at any vertical bar:
    album_title_edited = truncate_bound_exclusive(album_title_edited, "|");

    // Truncate starting at any pound sign, but first, we must handle these...

    // String replacement via split/join:

    // ...The Waterboys, Live albums and compilations:
    if (artist == "The Waterboys") {
        album_title_edited = album_title_edited.split("Fisherman's Blues#Fisherman's Box").join("Fisherman's Box");
    }

    // ...Eric Clapton, Solo studio albums:
    if (artist == "Eric Clapton") {

        // These two are smooshed together as follows:
        // ''[[Me and Mr. Johnson#Sessions for Robert J|Sessions for Robert J]]'' (2004)\n*
        // Should be like this:
        // Me and Mr. Johnson (2004)
        // Sessions for Robert J (2004) 
        album_title_edited = album_title_edited.split("Me and Mr. Johnson#Sessions for Robert J").join("Sessions for Robert J");
    }

    // Now, truncate starting at any pound sign: 
    // Bee Gees, Limited edition:
    // ''[[Ellan Vannin (poem)#The Bee Gees Version|Ellan Vannin]]''}} was recorded
    // in 1997 as a 1,000 quantity limited edition single...
    album_title_edited = truncate_bound_exclusive(album_title_edited, "#");

    // Eg: David Bowie:
    // \"Heroes\"
    album_title_edited = remove_all_procedural(album_title_edited, '\\"');

    // NOTE: Somewhere in the above process, a trailing space became attached to
    // the album title. It will cause the following equality test to fail. To
    // make matters worse, the trim() function is not working in Internet Explorer:
    if (album_title_edited.substr(album_title_edited.length - 1, 1) == " ") {

        // Trim off the trailing space (homemade trim): 
        album_title_edited = album_title_edited.substr(0, album_title_edited.length - 1);
    }

    // Pablo Cruise, Compilation albums: '''Classics Volume 26'''
    // Tom Jones, Studio albums: '''This Is Tom Jones'''
    album_title_edited = remove_all_procedural(album_title_edited, "'''"); // 3 single quotes

    // Tom Jones, Studio albums: Move Closer'' / ''At This Moment
    album_title_edited = remove_all_procedural(album_title_edited, "''"); // 2 single quotes

    // The Stylistics: The_Best_of_The_Stylistics, The Turtles: Out_of_Control
    album_title_edited = replace_all(album_title_edited, "_", " ");

    // CROSS-REFERENCE D - common title cleanup - This gets us ready for matching:

    // Despite all my best efforts, some junk remains.  Let's get rid of it:
    album_title_edited = this.section_or_album_title_common_cleanup(album_title_edited);

    // Return the modified copy of the argument:
    return album_title_edited;

}

wikipedia_discography.prototype.regularize_detail_row_ends = function (discog_wikipedia_string) {

    var DISCOGRAPHY_SPLIT_INDICATOR3 = "-\\n"; // \\n = \n (escaped)
    var WIKITABLE_ROW_END_INDICATOR = "-\\n|";

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // String replacement via split/join:

    // Regularize styles 2 and 3 (line) to be like 1 (line):
    discography_JSON_string_edited =
        discography_JSON_string_edited.split(this.DISCOGRAPHY_SPLIT_INDICATOR2).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);
    discography_JSON_string_edited =
        discography_JSON_string_edited.split(DISCOGRAPHY_SPLIT_INDICATOR3).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);

    // Regularize style 4 (wikitable) to be like 1 (line):
    discography_JSON_string_edited =
         discography_JSON_string_edited.split(WIKITABLE_ROW_END_INDICATOR).join(this.DISCOGRAPHY_SPLIT_INDICATOR1);

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;
}

wikipedia_discography.prototype.regularize_discog_string_style_5 = function (discog_wikipedia_string) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // String replacement via split/join:

    // Regularize from a very loose "standard" (oy):
    discography_JSON_string_edited = discography_JSON_string_edited.split("Release date:").join("Released:");
    discography_JSON_string_edited = discography_JSON_string_edited.split("Formats:").join("Format:");

    // The Asteroids Galaxy Tour, Studio albums 
    // FROM: | ''[[Fruit (album)|Fruit]]''\n|\n* Released: 21 September 2009\n* Label: Small Giants\n* Format: [[Compact Disc|CD]]
    // TO: | ''[[Fruit (album)|Fruit]]''\n|Released: 21 September 2009\n\n* Label: Small Giants\n* Format: [[Compact Disc|CD]]

    // This will effectively cause the preceeding row, which contains the release
    // date (including year), to get a NEW LINE appended:
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n* Label:").join("\\n\\n* Label:");

    // If we now remove the Wikipedia line break between the title and the release
    // date (including year), putting them on the same line, this will now conform
    // to standard style 4 (all very clever, I must say):
    discography_JSON_string_edited = discography_JSON_string_edited.split("\\n* Released:").join("Released:");

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.regularize_section_title = function (section_title) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var section_title_edited = section_title;

    // Obsolete eg: I now use the external discography for Yes: 
    // This fixes Yes, Section Anderson Bruford Wakeman Howe: 
    // Anderson Bruford Wakeman Howe\n''{{details|...}}''

    // Truncate starting at any NEW LINE:
    section_title_edited = truncate_bound_exclusive(section_title_edited, "\\n");

    // CROSS-REFERENCE C - nested subsections/singles - "Nested" subsections need to be "collapsed"
    // into the parent section so that any edits that apply to any level (eg: "singles") are not missed or misapplied:
    if (section_title_edited.toLowerCase().indexOf("albums") > -1) {
        this.albums_or_singles = "Albums";
    } else if (section_title_edited.toLowerCase().indexOf("singles") > -1) {
        this.albums_or_singles = "Singles";
    }

    if (is_valid_century(section_title_edited.substr(0, 2)) == true) {
        if (this.albums_or_singles != "") {

            // Collapse the nested subsection into the parent section:
            section_title_edited = this.albums_or_singles + " " + section_title_edited;
        }
    }

    // CROSS-REFERENCE D - common title cleanup - This gets us ready for matching:

    // Despite all my best efforts, some junk remains.  Let's get rid of it:
    section_title_edited = this.section_or_album_title_common_cleanup(section_title_edited);

    // Return the modified copy of the argument:
    return section_title_edited;

}

wikipedia_discography.prototype.remove_extraneous = function (discog_wikipedia_string) {

    if (this.debug_trace_discography == true) { get_function_description("remove_extraneous"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "<br />", " ");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "<br>", " ");

    // CROSS-REFERENCE H - HTML comments - How to debug HTML comments.

    // NOTE: "remove_HTML_comments()" is a global function residing in file "WorkingWebBrowserServices.js".  Since our  current
    // processing is part of an object function "remove_extraneous()" residing in file "WikipediaDiscography.js", to accomplish
    // debugging, I must explicitly map between the two:
    discography_JSON_string_edited = remove_HTML_comments(discography_JSON_string_edited, this.debug_trace_discography);

    discography_JSON_string_edited = remove_amazon_standard_ids(discography_JSON_string_edited);

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // CROSS-REFERENCE E - required order - Somewhere in this code lies an order-based dependency between/among these
    // lines of code.  I could have kicked off another round of debugging and "fixes" to handle them, but enough is enough of that:

    for (var i = 1; i <= 20; i++) { discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'rowspan=\\"' + i.toString() + '\\"'); }

    // This entry mixes a style A section ("==Tours==") with a style B subsection ("\n\n;Main");
    // "convert_subsections_to_style_B_sections()" didn't anticipate that this would happen.  It was an easy change to mock-up
    // "convert_subsections_to_style_A_sections()", which is what I should have done in the first place, but it introduced a
    // whole new series of hangs that I can't devote the time to fix.  The change, though desired, was too radical, too late in
    // the game.  Instead, I'll just patch the situation:    
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "\\n{{columns|colwidth=30em|col1=\\n\\n;Main\\n*");

    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, " plainrowheaders");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "{{dynamic list}}"); // NOTE: Collective Soul, 1 of 2: Collective Soul: \n\n==Cover versions==\n{{dynamic list}}\n\n
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "#1", "Number 1");
    discography_JSON_string_edited = replace_all(discography_JSON_string_edited, "&amp;", "&");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "&nbsp;"); // HTML non-breaking space
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "<small>");
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "</small>");

    // NOTE: I tried to broaden this to remove all "width" instances but it introduced problems:
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'style=\\"width:250px;\\"');

    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, 'style=\\"background:', ';\\"', this.debug_trace_discography);
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, '! scope=\\"row\\"');
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, "\\n!");
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "{{efn", "}}", this.debug_trace_discography); // explanatory footnotes
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "{{col-", "}}", this.debug_trace_discography);
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'valign=\\"center\\"');
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'align=\\"center\\"');
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'align=center');

    // NOTE: I tried to broaden these to remove all "text-align" instances but it introduced problems:
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'style=\\"text-align:center;\\"');
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'style=\\"text-align:left;\\"');
    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'style=\\"text-align:right;\\"');

    discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, 'align=\\"left\\"');

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Due to nesting, these must be done in this order: inner first, middle second, outer third:
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "url={{", "}}", this.debug_trace_discography);
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "{{cite", "}}", this.debug_trace_discography);
    discography_JSON_string_edited = excise_bounds_inclusive(discography_JSON_string_edited, "{{Refbegin}}", "{{Refend}}", this.debug_trace_discography);
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    discography_JSON_string_edited = discography_JSON_string_edited.split(", ").join(" ");

    if (this.debug_trace_discography == true) { this.write_debug("AFTER: " + discography_JSON_string_edited); }

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.remove_non_album_chart = function (wikipedia_discography) {

    var chart = [

          "Adult Contemporary"
        , "ARIA Chart"
        , "Billboard"
        , "Blabbermouth"
        , "Bubbling Under"
        , "Cashbox"
        , "Hot Adult"
        , "Hot Country"
        , "Hot Dance"
        , "Hot R&B"
        , "Image Entertain"
        , "InfoDisc"
        , "List of"
        , "Media Control"
        , "MegaChart"
        , "Music record"
        , "Music Week"
        , "Official Chart"
        , "The Official"
        , "Top "
        , "Ultratop"
        , "VG-lista"

     ];

    // Return a modified copy of the discography argument:
    return this.remove_non_album_values(wikipedia_discography, chart);

}
wikipedia_discography.prototype.remove_non_album_companies_or_orgs = function (wikipedia_discography) {

    // CROSS-REFERENCE B - record company in album title - These are albums that have, in the
    // beginning of their titles, the name of a record company.  Steps have to be taken to avoid removing such
    // legitimate albums:

    // Johnny Cash: "Columbia Records 1958-1986", "iTunes Originals – Red Hot Chili Peppers"

    var company_or_org = [

          "Avco"
        , "A&M"
        , "ABC Record"
        , "AllMusic"
        , "Allmusic"
        , "Artistdirect"
        , "Association of"
        , "Atco"
        , "Atlantic Record"
        , "BVMI"
        , "Beggars Banquet Record"
        , "Bellmark"
        , "Birkenhead"
        , "Blabbermouth"
        , "British Phono"
        , "CAPIF"
        , "CRIA"
        , "Capitol"
        , "Casablanca Record"
        , "Castle Comm"
        , "Chrysalis"
        , "Columbia Record"
        , "Curb Record"
        , "Decca"
        , "Demon Music"
        , "Dunhill"
        , "EMI"
        , "Epic"
        , "Essential Record"
        , "Factory Record"
        , "Fast Product"
        , "Federation of"
        , "Fontana"
        , "Geffen"
        , "GfK"
        , "H&L"
        , "IFPI"
        , "Image Entertain"
        , "Imperial Record"
        , "InfoDisc"
        , "International Fed"
        , "Interscope"
        , "Island Record"
        , "Jam!"
        , "Kapp"
        , "Kent Music"
        , "Legacy Record"
        , "Liberty Record"
        , "Lost Highway Record"
        , "MCA"
        , "Mercury Record"
        , "Minty Fresh"
        , "Motown Record"
        , "NVPI"
        , "Nettwerk"
        , "Nielsen Business"
        , "Nielsen SoundScan"
        , "Omnibus Press"
        , "Oricon"
        , "PROMUSICAE"
        , "Parlophone"
        , "Parrot"
        , "Philadelphia Int"
        , "Philips Record"
        , "PolyGram"
        , "Polydor"
        , "Private Stock Record"
        , "Prometheus Global"
        , "RCA"
        , "RIAA"
        , "RIAJ"
        , "RIANZ"
        , "RPM"
        , "Recording Ind"
        , "Reprise"
        , "Republic Record"
        , "Rhino"
        , "Rovi"
        , "Rykodisc"
        , "SNEP"
        , "Saja"
        , "Sanctuary Record"
        , "Science Friction"
        , "Scratchie Record"
        , "Seed Record"
        , "Shout Factory"
        , "Shout!"
        , "Sony"
        , "S-Curve"
        , "Target Corp"
        , "United Artist"
        , "Universal Music"
        , "Vee-Jay"
        , "Virgin Record"
        , "Vivendi"
        , "Walmart"
        , "Warner"
        , "Yahoo"
        , "iTune"

    ];

    // Return a modified copy of the discography argument:
    return this.remove_non_album_values(wikipedia_discography, company_or_org);

}

wikipedia_discography.prototype.remove_non_album_international = function (wikipedia_discography) {

    var international = [

          "Associao"
        , "Argentine Chamber"
        , "Australian Record"
        , "Belgian Entertain"
        , "Belgium"
        , "British Phono"
        , "Bundesverband"
        , "Canadian Album"
        , "Canadian Online"
        , "Canadian Record"
        , "Deutsche Grammophon"
        , "European Top"
        , "International Fed"
        , "Irish Album"
        , "Irish Record"
        , "Irish Single"
        , "Japan"
        , "Library and Archive"
        , "London Record"
        , "Manchester"
        , "Music Canada"
        , "Musiikkituottajat"
        , "Musikindustrie"
        , "Netherlands"
        , "Official New Zealand"
        , "Polish Society"
        , "Productore"
        , "Spain"
        , "St Ives, New South Wales"
        , "Sverigetopplistan"
        , "Sweden"
        , "Swedish Album"
        , "Swedish Record"
        , "Swiss Hit"
        , "Swiss Music"
        , "Syndicat National"
        , "UK Album"
        , "UK DVD"
        , "UK Indie"
        , "UK Single"
        , "UKChart"

    ];

    // Return a modified copy of the discography argument:
    return this.remove_non_album_values(wikipedia_discography, international);

}

wikipedia_discography.prototype.remove_non_album_media = function (wikipedia_discography) {

    var media = [

       "12-inch single"
     , "7-inch single"
     , "8-track tape"
     , "Audio cassette"
     , "CD"
     , "Compact Cassette"
     , "Compact Disc"
     , "DVD"
     , "Gramophone record"
   //, "Home Record"      // Jim Croce: Home Recordings: Americana
     , "LP album"
     , "LP record"
     , "LaserDisc"
     , "Media Control"
     , "Music download"
     , "Music record"
     , "Recording"
     , "Stereophonic sound"
     , "VHS"

    ];

    // Return a modified copy of the discography argument:
    return this.remove_non_album_values(wikipedia_discography, media);

}

wikipedia_discography.prototype.remove_non_album_misc = function (wikipedia_discography) {

    var misc = [

          "#endnote"
        , "Collection"
        , "Ian Curtis"          // referenced by Joy Division
        , "New Order"           // referenced by Joy Division
        , "Tony Sheridan"       // referenced by The Beatles
        , "compilation album"
        , "discography"
        , "extended play"
        , "greatest hit"
        , "live album"
        , "post-punk"
        , "Richie Unterberger"   // referenced by The Spencer Davis Group
        , "studio album"

    ];


    // Return a modified copy of the discography argument:
    return this.remove_non_album_values(wikipedia_discography, misc);

}

wikipedia_discography.prototype.remove_non_album_values = function (wikipedia_discography, reference_array) {

    if (this.debug_trace_discography == true) { get_function_description("remove_non_album_values"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var wikipedia_discography_edited = wikipedia_discography;

    var start_index, end_index;

    for (var i = 0; i < reference_array.length; i++) {

        do {
            start_index = wikipedia_discography_edited.indexOf("[[" + reference_array[i]);

            if (start_index > -1) {

                end_index = wikipedia_discography_edited.indexOf("]]", start_index) + 1; // + 1 for width

                // If the reference array's value is found in double bracketed form...
                if (end_index > -1) {

                    // Built-in debugging:
                    if (this.debug_trace_discography == true) {
                        this.write_debug("----------------------------------------");
                        this.write_debug("BEFORE: " + represent_bounded_string_succinctly(wikipedia_discography_edited, start_index, end_index));
                        this.write_debug("EXCISING: " + get_substring(wikipedia_discography_edited, start_index, end_index));
                    }

                    //...excise it:
                    wikipedia_discography_edited = excise(wikipedia_discography_edited, start_index, end_index);

                    // Built-in debugging:
                    if (this.debug_trace_discography == true) {
                        this.write_debug("AFTER: " + represent_bounded_string_succinctly(wikipedia_discography_edited, start_index, end_index));
                        this.write_debug("----------------------------------------");
                    }

                }
            }

        } while (start_index > -1);

    }

    if (this.debug_trace_discography == true) { this.write_debug("AFTER: " + wikipedia_discography_edited); }

    // Return a modified copy of the discography argument:
    return wikipedia_discography_edited;

}

wikipedia_discography.prototype.remove_replace_unicode = function (discog_wikipedia_string) {

    if (this.debug_trace_discography == true) { get_function_description("remove_replace_unicode"); }

    // Since we will be modifying the argument, let's make a copy and work with that:
    var discography_JSON_string_edited = discog_wikipedia_string;

    // Parse to an array consisting of the remaining unicode characters, if there are any:
    var unicode_hex_array = discography_JSON_string_edited.split("\\u");

    // Strip down to just the unicode characters:
    for (var i = 0; i < unicode_hex_array.length; i++) { unicode_hex_array[i] = unicode_hex_array[i].substr(0, 4); }

    // Reduce to unique entries only:
    unicode_hex_array.sort();
    unicode_hex_array = deduplicate_sorted_array(unicode_hex_array);

    var unicode_ASCII_services;

    // Instantiate Unicode/ASCII services:
    unicode_ASCII_services = new unicode_ASCII();

    // Show them to the developer...
    for (var i = 0; i < unicode_hex_array.length; i++) {

        if (unicode_hex_array[i].indexOf("\\n") == -1) {

            var unicode_hex = unescape("%u" + unicode_hex_array[i]);
            var unicode_hex_string = "\\u" + unicode_hex_array[i];
            var ASCII = unicode_ASCII_services.get_ASCII(unicode_hex_array[i]);

            if (ASCII == "") {

                if (this.debug_trace_discography == true) {
                    this.write_debug(this.artist + " NO MATCH FOR UNICODE: " + unicode_hex);
                }

                // If an ASCII equivalent is not found, remove the Unicode value:

                // NOTE: This helps our match hit percent by catching matches where an unneeded Unicode character (which
                // can only be for presentation purposes) got in the way of a potential match.
                discography_JSON_string_edited = remove_all_procedural(discography_JSON_string_edited, unicode_hex_string);

            } else {

                // If an ASCII equivalent is found, replace the Unicode value with its ASCII equivalent:

                // NOTE: This helps our match hit percent by catching matches where a Unicode character was used in lieu of
                // standard ASCII (which can only be for presentation purposes). If we removed it, we might not be able to
                // make a match on the artist or album or video. Some examples are, In Wikipedia: Bachman–Turner Overdrive
                // (EM DASH) and The B-52's (EN DASH). In Wikipedia, YouTube (and everywhere else): Sinéad O'Connor,
                // José González, Déjà Vu, Honky Château, etc.
                discography_JSON_string_edited = discography_JSON_string_edited.split(unicode_hex_string).join(ASCII); // string replacement via split/join
            }
        }
    }

    // Built-in debugging: Show the remaining unicode characters, if there are any, in both Hex and Unicode formats:
    if (this.debug_trace_discography == true) { this.debug_trace_show_unicode_chars(discography_JSON_string_edited); }

    // Return the modified copy of the argument:
    return discography_JSON_string_edited;

}

wikipedia_discography.prototype.section_or_album_title_common_cleanup = function (title) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var title_edited = title;

    // CROSS-REFERENCE F - proactive bad data cleanup - In lieu of fixing every single piece of bad data
    // at its source (there being an endless supply), we'll just play "shit goalie" and remove the obviously bad stuff.
    // By all rights, after all the "scrubbing" this data has been through, things like these should be gone by now.
    // But they are not.  I could have kicked off another round of "fixes" to handle these outliers but enough is enough
    // of that.  A project has to end some time.  These represent only a tiny handful of the 300 artists and 7000 albums,
    // the titles of whose discographies are otherwise completely clean at this point.

    // Despite all my best efforts, some junk remains.  Let's get rid of it:

    title_edited = title_edited.trim();
    title_edited = remove_all_procedural(title_edited, "[[");
    title_edited = remove_all_procedural(title_edited, "]]");

    // Return the modified copy of the argument:
    return title_edited;

}

wikipedia_discography.prototype.test_against_external_discographies = function (artist) {

    var external_discography_artist = [

        //-----------------------------------------------------------------------------------------------
        // Database: jimradio_artist_database_1:

          "Aretha Franklin"
        , "Cara Dillon"
        , "Charlie Daniels"
        , "Charlie Rich"
        , "Chet Atkins"
        , "Dionne Warwick"
        , "Elvis Presley"
        , "Eric Burdon"
        , "George Benson"
        , "Glen Campbell"
        , "Hall & Oates"
        , "Harold Melvin & the Blue Notes"
        , "Howard Jones"
        , "Huey Lewis and the News"
        , "Joe Walsh"
        , "Johnny Cash"
        , "Johnny Rivers"
        , "Judy Collins"
        , "Kris Kristofferson"
        , "Lulu"
        , "Lyle Lovett"
        , "Manfred Mann"
        , "Manfred Mann's Earth Band"
        , "Marvin Gaye"
        , "Michael McDonald"
        , "Ray Price"
        , "Rod Stewart"
        , "Roy Orbison"
        , "Steve Howe"
        , "The Beatles"
        , "The Everly Brothers"
        , "The Guess Who"
        , "The Motels"
        , "The Partridge Family"
        , "The Spencer Davis Group"
        , "The Stylistics"
        , "The Supremes"
        , "The Waterboys"
        , "Tom Jones"
        , "Yes"

        //-----------------------------------------------------------------------------------------------
        // Database: jimradio_artist_database_2:

        , "ABBA"
        , "Aimee Mann"
        , "Air Supply"
        , "Anita Baker"
        , "Annie Lennox"
        , "Art Garfunkel"
        , "Bad Company"
        , "Belinda Carlisle"
        , "Bon Jovi"
        , "Carly Simon"
        , "Cher"
        , "Cream"
        , "David Byrne"
        , "David Gilmour"
        , "Deep Purple"
        , "Duran Duran"
        , "Eurythmics"
        , "Gary Numan"
        , "Grateful Dead"
        , "Guns N' Roses"
        , "INXS"
        , "Jeff Beck"
        , "Jefferson Airplane"
        , "Jefferson Starship"
        , "Jim Croce"
        , "Jimmy Buffett"
        , "Jimmy Page"
        , "John Denver"
        , "John Mayer"
        , "Joy Division"
        , "Kansas"
        , "Massive Attack"
        , "Meat Loaf"
        , "Men at Work"
        , "Morrissey"
        , "Paul Simon"
        , "Peter Gabriel"
        , "Phil Collins"
        , "Randy Newman"
        , "Red Hot Chili Peppers"
        , "Regina Spektor"
        , "Roger Hodgson"
        , "Roger Waters"
        , "Seal"
        , "Sonny & Cher"
        , "Sting"
        , "Sweet"
        , "The Band"
        , "The Cult"
        , "The Kinks"
        , "The Rolling Stones"
        , "The Smiths"
        , "The Temptations"
        , "The Who"
        , "Three Dog Night"
        , "Toto"
        , "Travis"
        , "Warren Zevon"
        , "Wilco"
        //-----------------------------------------------------------------------------------------------

    ];

    var use_external_discography_artist = false; // init

    for (var i = 0; i < external_discography_artist.length; i++) {

        // If I have pre-determined that we should use the external discography in this case:
        if (artist == external_discography_artist[i]) {
            use_external_discography_artist = true;
            break;
        }

    }

    return use_external_discography_artist;

}

wikipedia_discography.prototype.test_against_invalid_concert_album_name = function (album) {

    // Problem 1, this function can fix: Partial matching on the string "live"
    // Problem 2, this function can't fix: Ambiguous part of speech (verb vs. adjective) of word
    // "live" as in A) "live in concert" (adjective) and B) Live It Up (verb). We will necessarily
    // pick up the verbs (B) when what we really want is the adjectives (A).

    // NOTE: Here we are testing for rejection/exclusion (a blacklist) mostly:

    // Lower case is better for comparison:
    album = album.toLowerCase();

    var should_accept_album = true; // init

    // This is the rule. These generate false positives:
    if (
        (album.indexOf("alive"    ) > -1 ||             // exclude eg: Keepin' the Summer Alive, No One Here Gets Out Alive, Eaten Alive, Staying Alive 
         album.indexOf("deliver"  ) > -1 ||             // exclude eg: Signed, Sealed & Delivered, Mamas and the Papas Deliver
         album.indexOf("liverpool") > -1 ||             // exclude eg: Liverpool 8, Liverpool Oratorio, Liverpool Sound Collage
         album.indexOf("lives"    ) > -1) &&            // exclude eg: Nine Lives, Lives in the Balance

            // This is the lone exception to the rule:
            album.indexOf("frampton comes alive") == -1 ) { // include
    
            should_accept_album = false;
    }
    return should_accept_album;

}

wikipedia_discography.prototype.test_against_non_album_sections = function (section) {

    // These section titles have been pre-screened as not having any valid artist
    // discography information within them.

    // NOTE: Plurals have been removed to make these more inclusive (though the actual
    // sections are usually plural). Case has also been removed:

    var non_album_section = [

        "about clapton",
        "accolades",
        "acting career",
        "actor",
        "actress",
        "additional reading",
        "appearance",
        "appearance",
        "appears on",
        "as himself",
        "as featured artist",
        "as lead artist",
        "as sideman",
        "autobiograph",         // -y, -ies
        "autumn '66",           // The Spencer Davis Group uses section indicators for albums
        "award",
        "band",
        "bibliograph",          // -y, -ies
        "billboard top",
        "biopic",
        "book",
        "broadway",
        "b-side",
        "business venture",
        "certification",
        
        // NOTE: "section_or_album_title_common_cleanup()" was unable to cleanup this entry which
        // appears to be corrupt, nor could I even trap the error, so I am ommitting it altogether:
        "chad allan & the expressions",
        
        "chart position",
        "charting compilation",
        "citation",
        "civic honour",
        "co-leading album",
        "comic",
        "commemorative stamp",
        "composition",
        "concert",
        "consecutive multi-platinum album",
        "contribution",
        "cover",
        "dave's pick",
        "dick's pick",
        "digital download series",
        "documentar",           // -y, -ies
        "duet",
        "educational course",
        "enterprise",
        "family",
        "featured",
        "film", // -ography
        "for promotion",
        "further reading",
        "grammy",
        "guest single",
        "hall of fame",
        "headlining",
        "honor",                // American spelling
        "honour",               // British spelling
        "induction",
        "instructional",
        "jersey boys",
        "legacy",
        "link",
        "litera",               // -ry works, -ture
        "lubbock",
        "magazine",
        "mass media",
        "media performance",
        "member",
        "miscellaneous",
        "mix", // remix
        "music prize",
        "music promo video",
        "music videos",
        "musician",
        "note",
        "online exclusive",
        "opening act",
        "other appearance",
        "other charting tracks",
        "other contribution",
        "other list",
        "people",
        "personal",
        "personnel",
        "produc", // -er, -tion -
        "promo video",
        "radio show",
        "ranking",
        "recognition",
        "reference",
        "religious belief",
        "rigs",                 // NOTE: plural is needed because "rig" is false positive to "original"
        "road trip",
        "rock and roll hall of fame",
        "see also",
        "session work",
        "session",
        "single",               // CROSS-REFERENCE C - nested subsections/singles - Here "singles" are winnowed out.  An ignominius end to getting singles.
        "song catalogue",
        "song",
        "source",
        "special guest",
        "spoken word",
        "stage",
        "television",
        "theater",
        "the second album",     // The Spencer Davis Group uses section indicators for albums
        "third-party compilations",
        "timeline",
        "tour",
        "tribute",
        "trivia",
        "tv series",
        "tv work",
        "various artist compilation",
        "vhs",
        "videography",
        "walk of fame",
        "work for other artists",
        "worldwide sales",      // did not work, don't know why
        "year ending",

        // Crap-prevention filtering, weed-out false positives:
        "a state of trance",    // Above & Beyond (band)
        "anjuna"                // Anjunabeats, Anjunadeep Above & Beyond (band)

    ];

    // NOTE: Here we are testing for rejection/exclusion (blacklists):

    var should_accept_album = true; // init

    for (var i = 0; i < non_album_section.length; i++) {

        // Lower case is better for comparison:
        if (section.toLowerCase().indexOf(non_album_section[i].toLowerCase()) > -1) { // section
            should_accept_album = false;

            break;
        }
    }

    return should_accept_album;

}

wikipedia_discography.prototype.write_debug = function (string_to_write) {

    // Since we will be modifying the argument, let's make a copy and work with that:
    var string_to_write_edited = string_to_write;

    if (this.artist != "") {
        string_to_write_edited = "ARTIST=" + this.artist + ": " + string_to_write_edited;
    }

    standard_streams_services.write("debug", string_to_write_edited);

}

