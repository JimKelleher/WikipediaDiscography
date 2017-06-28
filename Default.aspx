<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WikipediaDiscography.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <title>Wikipedia Discography Reader</title>

    <link rel="icon"       type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css"     href="Site.css" />
    <link rel="stylesheet" type="text/css"     href="StandardStreams.css" />
    <link rel="stylesheet" type="text/css"     href="ArtistDataSourceSelection.css" />

    <script src="DiscographyOnlineArtistDataSource.js" type="text/javascript"></script>
    <script src="JimRadioArtistWikipediaNaming1.js"    type="text/javascript"></script>
    <script src="JimRadioArtistWikipediaNaming2.js"    type="text/javascript"></script>
    <script src="UnicodeASCII.js"                      type="text/javascript"></script>
    <script src="WikipediaDiscography.js"              type="text/javascript"></script>
    <script src="StandardStreams.js"                   type="text/javascript"></script>
    <script src="ArtistDataSourceSelection.js"         type="text/javascript"></script>
    <script src="DiscographyOnlineSelection.js"        type="text/javascript"></script>

    <script src="WorkingWebBrowserServices.js"         type="text/javascript"></script>

    <script type="text/javascript">

        var HttpResponseText;

        // These will be filled in main():
        var standard_streams_services;

        // This will be filled in get_artists_discographies_process():
        var wikipedia_discography_services;

        // <HEAD> AVAILABLE FUNCTIONS:

        function main() {

            // NOTE: If we have gotten this far, it means that JavaScript is enabled.  Hide this:
            document.getElementById("javascript_message").style.display = "none";

            // NOTE: All output of all types will be handeled by this service:
            standard_streams_services = new standard_streams();

            // Set default radiobutton selections:
            set_discography_online_default();
            set_artist_datasource_default();
            set_discography_format_default();

            // Initialize.  Enable/disable radiobuttons and set other values that are
            // dependent on other radiobuttons:
            cross_object_synchronize();

            // Instantiate the standard datasource objects:
            initialize_standard_datasources(

                // NOTE: The datasource's on-screen link's text will be the definitive
                // name of the datasource:
                document.getElementById("artist_datasource_jimradio_url").text,
                document.getElementById("artist_datasource_youtube_url" ).text

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
	            640   // height
            );

        }

        function clear_form() {

            document.getElementById("discography_json").value = "";
            document.getElementById("discography_json").style.visibility = "hidden";

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
            document.getElementById("run"        ).disabled = true;
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
            var discography_format = get_discography_format_selection();

            //------------------------------------------------------------------------------------
            // Instantiate Wikipedia Discography services:
            wikipedia_discography_services = new wikipedia_discography(
                discography_online,
                datasource_object.offline_discographies
            );

            // Use Wikipedia Discography services to get the desired discographies in the form
            // of a JSON string:
            var artists_discographies_JSON_string =
                wikipedia_discography_services.get_discographies_JSON_string(
                    
                    datasource_object.artist_array,
                    discography_format

                );

            //------------------------------------------------------------------------------------
            // If a proper discography was found:
            if (wikipedia_discography_services.error_code == 0) {

                // If there have been no problems generating the JSON string...
                if (artists_discographies_JSON_string != "") {

                    //...show the final output:

                    switch (discography_format) {

                        case "JSON":

                            // Show the JSON string itself for further testing and/or usage:
                            document.getElementById("discography_json").style.visibility = "visible";
                            document.getElementById("discography_json").value = artists_discographies_JSON_string;

                            break;

                        case "HTML":

                            // Show a human-readable report:
                            standard_streams_services.write(
                                "output",
                                wikipedia_discography_services.get_HTML_report_from_JSON_string(
                                    artists_discographies_JSON_string
                                )
                            );

                            break;

                        default:
                    }
                }
            }


            //------------------------------------------------------------------------------------
            // Since the process is now complete:
            document.getElementById("run"        ).disabled = false;
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

    <div class="BannerDiv" >

   <%-- NOTE 1 of 2: Use of a line break, a table and text top padding is much easier
        than trying to align these via CSS only: --%>

        <br/>
        <table>
            <tr>
                <td class="BannerTD"><img src="wikipedia.png" alt="Wikipedia Logo" /></td>
                <td class="BannerTD BannerText">Discography Reader</td>
            </tr>
        </table> 
                  
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
                    <!-- This shows radio buttons that enable the user to make his desired Discography Format input selection. -->
                    <!--#include file="DiscographyFormatSelection.htm"-->
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

        <textarea id="discography_json" readonly="readonly" rows="1" cols="1"></textarea>

    </form>

    <script type="text/javascript">
        // <BODY> STARTUP PROCESSING:
        main();
    </script>

</body>

</html>
