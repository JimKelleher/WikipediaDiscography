<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WikipediaDiscography.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <title>Wikipedia Discography Reader</title>

    <link rel="icon"       type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css"     href="Site.css" />
    <link rel="stylesheet" type="text/css"     href="banner.css" />
    <link rel="stylesheet" type="text/css"     href="StandardStreams.css" />
    <link rel="stylesheet" type="text/css"     href="ArtistDataSourceSelection.css" />
    <link rel="stylesheet" type="text/css"     href="AngularMultiFilterSelect.css" />

    <link rel="stylesheet" type="text/css" href="JimsArtistDatabaseSelection.css" />

    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.js" type="text/javascript"></script>
    <script src="AngularMultiFilterSelect.js"                                       type="text/javascript"></script>
    <script src="ArtistDataSourceSelection.js"                                      type="text/javascript"></script>

    <script src="DiscographyOnlineArtistDataSource.js" type="text/javascript"></script>
    <script src="DemoTestArtistWikipediaNaming.js"     type="text/javascript"></script>
    <script src="UnicodeASCII.js"                      type="text/javascript"></script>
    <script src="WikipediaDiscography.js"              type="text/javascript"></script>
    <script src="StandardStreams.js"                   type="text/javascript"></script>
    <script src="DiscographyOnlineSelection.js"        type="text/javascript"></script>

    <script src="WorkingWebBrowserServices.js"         type="text/javascript"></script>

    <script src="hardcoded_main.js"          type="text/javascript"></script>
    <script src="hardcoded_studio_albums.js" type="text/javascript"></script>
    <script src="hardcoded_live_albums.js"   type="text/javascript"></script>

    <script type="text/javascript">

        // <HEAD> GLOBAL VARIABLES:
        var HttpResponseText;

        // These will be filled in main():
        var standard_streams_services;

        // <HEAD> AVAILABLE FUNCTIONS:

        function main() {

            // NOTE: If we have gotten this far, it means that JavaScript is enabled.  Hide this:
            document.getElementById("javascript_message").style.display = "none";

            // NOTE: All output of all types will be handeled by this service:
            standard_streams_services = new standard_streams();

            // Init, assemble and create the GUI components of the Angular Multi Filter Select service:
            init_angular_multi_filter_select();

            // Set default radiobutton selections:
            set_discography_online_default();
            set_artist_datasource_default();
            set_output_format_default();

            // Initialize.  Enable/disable radiobuttons and set other values that are
            // dependent on other radiobuttons:
            cross_object_synchronize();

            // Instantiate the standard datasource objects:
            initialize_standard_datasource(

                // NOTE: The datasource's on-screen link's text will be the definitive
                // name of the datasource:
                document.getElementById("artist_datasource_demo_test_url" ).text
            );

            // Initialize:
            clear_form();

        }

        function ButtonAbout_onclick() {

            open_popup_window(
                "About.aspx",
                true, // modal dialog
                "no", // resizable
                "no", // scrollbars
                505,  // width
                840   // height
            );

        }

        function clear_form() {

            document.getElementById("output_json").value = "";
            document.getElementById("output_json").style.visibility = "hidden";

            // Reset:
            standard_streams_services.clear("error");
            standard_streams_services.clear("message");
            standard_streams_services.clear("output");

        }

        function get_artists_discographies() {

            // Reset for multiple, sequential runs:
            clear_form();

            // Set the "is running" message:
            standard_streams_services.write("message", "Please wait while we retrieve discography information...");

            // Do the work:

            // Disable because the process is now busy:
            document.getElementById("run").disabled = true;
            document.getElementById("ButtonAbout").disabled = true;

            // NOTE: This timer-based call serves only to allow the message, above, to be seen.
            // The following milliseconds were arrived at by trial and error.  If the wait time
            // is too short, the message never shows:
            setTimeout(function () { get_artists_discographies_process(); }, 100); // 100 = 100 milliseconds

        }

        function get_artists_discographies_process() {

            //------------------------------------------------------------------------------------
            // Selection Criteria, 1 of 3:
            var datasource_object = get_artist_datasource_selection();

            // Selection Criteria, 2 of 3:
            var discography_online = get_discography_online_selection();

            // Selection Criteria, 3 of 3:
            var output_format = get_output_format_selection();

            //------------------------------------------------------------------------------------

            // NOTE: The complicated module-invocation process across four applications, WD,
            // YA, WD Node and YA Node is described in document:
            // C:\a_dev\ASP\WikipediaDiscography\documents\WD & YA high-level calls.txt

            // Initialize Wikipedia discography startup services:
            var wikipedia_discography_startup_services = new wikipedia_discography_startup();

            // NOTE: This string may eventually contain either JSON or HTML:
            var output_string =
                wikipedia_discography_startup_services.get_artists_discographies_core(
                    discography_online,
                    datasource_object.offline_discographies,
                    datasource_object.artist_array,
                    output_format
                );

            switch (output_format) {

                case "JSON":

                    // Show the JSON string itself for further testing and/or usage:
                    document.getElementById("output_json").style.visibility = "visible";
                    document.getElementById("output_json").value = output_string;

                    break;

                case "HTML":

                    // Show a human-readable report:
                    standard_streams_services.write("output", output_string);

                    break;

                default:
            }

            //------------------------------------------------------------------------------------
            // Since the process is now complete:
            document.getElementById("run").disabled = false;
            document.getElementById("ButtonAbout").disabled = false;

            // Clear the "is running" message.

            // NOTE: This does not need to be paired with a timer-based call because, as the last
            // statement in the job stream, it will be visible to the user:
            standard_streams_services.clear("message");

            //------------------------------------------------------------------------------------

        }

    </script>

</head>

<body>

    <div id="bannerDiv">
        <img src="wikipedia.png" alt="Wikipedia Logo" />
        <span id="bannerText">Discography Reader</span>
    </div>
                  
    <!-- JavaScript-disabled processing.  Show this by default.  To test this processing, simply toggle the
         Enable JavaScript setting of your browser and refresh the view of the page. -->
    <div id="javascript_message">
        You need JavaScript enabled to view this web page properly.<br/><br/>
    </div>

    <br/>
    <br/>

    <form id="form1" runat="server">

        <table>
	        <tr>
                <%-- row 1, column 1 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!-- This shows radio buttons that enable the user to make his desired Discography Online input selection. -->
                    <!--#include file="DiscographyOnlineSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>

                <%-- row 1, column 2 --%>
		        <td>
                </td>
	        </tr>
	        <tr>
                <%-- row 1, column 1 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!-- This shows radio buttons that enable the user to make his desired Artist Data Source input selection.
                     Currently, only JimRadio is enabled. -->
                    <!--#include file="ArtistDataSourceSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>

                <%-- row 1, column 2 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!-- This shows radio buttons that enable the user to make his desired Output Format input selection. -->
                    <!--#include file="OutputFormatSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>
	        </tr>
        </table>
        <br/>

        <input id="run" type="button" onclick="get_artists_discographies()" value="Get Discographies"/>&nbsp;
        <input id="ButtonAbout" type="button" value="About" onclick="return ButtonAbout_onclick()"/>
        <br/>
        <br/>
        
        <%------------------------------------------------------------------------------------------------------------------%> 
        <!-- This shows the "standard footer" for my GUI forms. -->
        <!--#include file="StandardStreams.htm"-->
        <%------------------------------------------------------------------------------------------------------------------%>

        <textarea id="output_json" readonly="readonly" rows="1" cols="1"></textarea>

    </form>

    <script type="text/javascript">

        // <BODY> STARTUP PROCESSING:

        main();

    </script>

</body>

</html>
