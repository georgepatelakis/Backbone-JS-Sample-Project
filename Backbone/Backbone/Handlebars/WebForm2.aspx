<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="Backbone.Demo2.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/handlebars.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="cn">
    
    </div>
    </form>
</body>

    <script>

        var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
        var template = Handlebars.compile(source);

        var data = {
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
        };



        $('.cn').append(template(data));

        Handlebars.registerHelper('link_to', function (context) {
            return "<strong><a href='" + context.url + "'>" + context.body + "</a></strong>";
        });

        var context = {
            posts: [{ url: "/hello-world", body: "Link 1!" },
                    { url: "/hello-world", body: "Link 2!" }]
        };
        var source = "<div>Helpers</div><ul>{{#posts}}<li>{{{link_to this}}}</li>{{/posts}}</ul>"

        var template = Handlebars.compile(source);
        $('.cn').append(template(context));


        Handlebars.registerHelper('link_to', function (title, context) {
            return "<a href='" + context.url + "'>" + title + "!</a>"
        });

        //Strings
        var context = { posts: [{ url: "/hello-world", body: "Hello World!" }] };
        var source = 'Strings<ul>{{#posts}}<li>{{{link_to "Post" this}}}</li>{{/posts}}</ul>'

        var template = Handlebars.compile(source);
        $('.cn').append(template(context));


        //Block Helpers
        var source = "Block Helpers<ul>{{#people}}<li>{{#link}}{{name}}{{/link}}</li>{{/people}}</ul>";
        Handlebars.registerHelper('link', function (options) {
            return '<a href="/people/' + this.id + '">' + options.fn(this) + '</a>';
        });
        var template = Handlebars.compile(source);

        var data = {
            "people": [
                { "name": "Alan", "id": 1 },
                { "name": "Yehuda", "id": 2 }
            ]
        }; 

        $('.cn').append(template(data));

        //Partials
        var source = "Partials<ul>{{#people}}<li>{{> link}}</li>{{/people}}</ul>{{! This is a comment }";

        Handlebars.registerPartial('link', '<a href="/people/{{id}}">{{name}}</a>')
        var template = Handlebars.compile(source);

        var data = {
            "people": [
                { "name": "Alan", "id": 1 },
                { "name": "Yehuda", "id": 2 }
            ]
        };

        $('.cn').append(template(data));

      

    </script>
</html>
