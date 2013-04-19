<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Backbone.WebForm1" %>
<!DOCTYPE HTML>
<html>

  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
       <script src="/js/jquery.min.js"></script>
	 <script src="/js/underscore-min.js"></script>
	 <script src="/js/backbone-min.js"></script> 
	 
      <script src="handlebars.js"></script>
      <script src="application.js"></script>
 	 <link rel="stylesheet" href="/js/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
  </head>

  <body>
   
	<!-- Tour List View -->
		    <div id="tourListView"  ">
				<ul id="tourList">
				  
				</ul>
			</div>

			
	<!-- Tour Detail -->
			<div id="tourDetailView" style="display:none ">
				 <script id="tourDetailTmpl" type="text/x-jquery-tmpl">
					<div class="item-name">${attributes.name}</div>	
					<div class="item-price">${attributes.price}</div>
					<div class="item-price">${attributes.description}</div>
					<br/>
					<a class="contact"><img src="../presentation-data/images/contact.png" width="100" height="40" alt="Contact"></a>
				 </script>
			</div>
  </body>

  
</html>