<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bb.aspx.cs" Inherits="Backbone.Backbone.bb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/underscore-min.js"></script>
    <script src="../js/backbone-min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="tmp">
         Content
    </div>
        <script>

            var Sidebar = Backbone.Model.extend({
                promptColor: function () {
                    var cssColor = prompt("Please enter a CSS color:");
                    this.set({ color: cssColor });
                },
                clear: function () {
                     
                    this.set({ color: 'white' });
                }
            });

            window.sidebar = new Sidebar;

            sidebar.on('change:color', function (model, color) {
                $('.tmp').css({ background: color });
                $('.tmp').append('1');
            });

            sidebar.set({ color: 'green' });
            sidebar.clear();
            sidebar.set({ color: 'red' });
            //sidebar.promptColor();

            var collection = new Backbone.Collection([
              { name: "Tim", age: 5 },
              { name: "Ida", age: 26 },
              { name: "Rob", age: 55 }
            ]);

            //alert(JSON.stringify(collection));


            var someOtherArray = ["name", "patrick", "d", "w"];

            _.each([0,1, 2, 3], function (num) {
                // In here, "this" refers to the same Array as "someOtherArray"

               // alert(this[num]); // num is the value from the array being iterated
                //    so this[num] gets the item at the "num" index of
                //    someOtherArray.
            }, someOtherArray);

            _.each([0, 1, 2, 3], function (num) {
                // In here, "this" refers to the same Array as "someOtherArray"

              //  alert(num); // num is the value from the array being iterated
                //    so this[num] gets the item at the "num" index of
                //    someOtherArray.
            });



            var person = {};
            person.friends = {
                name1: true,
                name2: false,
                name3: true,
                name4: true
            };

            _.each(['name4', 'name2'], function (name) {
                // this refers to the friends object op person
              //  alert(this[name]);
            }, person.friends);

            var x = _.map([1, 2, 3], function(num){ return num * 3; });
            

        </script>
    </form>
</body>
</html>
