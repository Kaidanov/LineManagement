# LineManagement
Angular through MVC to wcf service on the server - with cors and mdf 

The MVC is only used as a wrapper of a sort - holding the angular libraries and getting us the luxury of the bootstrap initialization etc.

 For project to work please 
 1. app_data folder in wcf if missing
 2. download mdf file from github repository - 8 mb file in wcf folder into the folder from 1.
 3. press on the added file and in the server window press right click and show the data to see that it is actually functional.

When downloaded , on the solution - right click -properties -define multiple projects and run them together

This way we are simulating cors - across domain - because in the IIS Express mode each project gets it's own port , therefore there domains are actually different and cors has to be handled.

What I have done for solution of cors - added the ALLOW-ORIGIN adding headers through the Global.asax that i manually added to the WCF project. (WHen added to the web.config it didn't work , when placed in Global.asax - did the trick).

'''C#
protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE");

                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
        }
        '''


Angular 1 - build using separation of consern. Using promises to get data async from the server. Using get and post.
Built as SPA. 
Built a filter to convert the datetime to time only - injected to the controller. good sample.


