// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){  
    // Our basic **Todo** model has `title`, `order`, and `done` attributes.
    var Todo = Backbone.Model.extend({ 
        //idAttribute: 'id',
        // Default attributes for the todo item.
        defaults: function () {
            return {
                title: "empty todo...",
                order: Todos.nextOrder(),
                done: false
            };
        }, 
        // Ensure that each todo created has `title`.
        initialize: function () {
            if (!this.get("title")) {
                this.set({ "title": this.defaults().title });
            }
        }, 
        // Toggle the `done` state of this todo item.
        toggle: function () {
            this.save({ done: !this.get("done") });
        },

        // Remove this Todo from *localStorage* and delete its view.
        clear: function () {
            this.destroy();
        }

    });
});