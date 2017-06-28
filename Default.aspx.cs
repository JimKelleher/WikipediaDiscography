using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WikipediaDiscography
{
    public partial class Default : System.Web.UI.Page
    {

        //-----------------------------------------------------------------------------
        // BEGIN METHODS    

        protected void Host_Services()
        {
            //--------------------------------------------------------------------------------------------
            // DISABLING VISITOR EMAIL NOTE 1 of 2: This setting is stored in a browser cookie and covers
            // only that browser on my cell phone since the IP address varies every time I use it:

            // Look for the presence of this cookie.
            // NOTE: It is created in the SetCookie() event of form CookieVisitorIsDeveloper.aspx
            HttpCookie cookie = Request.Cookies["VisitorIsDeveloper"];

            String strVisitorIsDeveloper = "N"; // init

            // If the cookie exists:
            if (cookie != null)
            {
                // NOTE: This can only equal "Y":
                strVisitorIsDeveloper = cookie.Value.ToString();
            }

            //--------------------------------------------------------------------------------------------
            // Utilize Host Services for processing done by all applications.  Init the WorkingWeb
            // host services class:
            WorkingWebHostServices workingWebHostServices = new WorkingWebHostServices();

            // Perform standard start-up processing, passing the name of the application.  This
            // returns a boolean indicating whether or not the user is also the developer:
            //bool boolIsDeveloper = workingWebHostServices.PageLoadInit("JimRadio");

            workingWebHostServices.PageLoadInit("Wikipedia Discography Reader", strVisitorIsDeveloper);

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            // Perform host-specific, standard start-up processing:
            Host_Services();

        }

        //-----------------------------------------------------------------------------
        // END METHODS

    }
}