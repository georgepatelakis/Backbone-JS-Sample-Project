

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Stuff = Backbone.Model.extend({

      //idAttribute: 'id',
    // Default attributes for the todo item.
    defaults: function() {
      return {
        name: "enter a name..." 
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
        if (!this.get("name")) {
            this.set({ "name": this.defaults().name });
      }
    },

    
    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
    }

  });

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var StuffList = Backbone.Collection.extend({

    // Reference to this collection's model.
      model: Stuff,

      url: function () {
          return '/api/stuff';
      },
        
     

  });

  // Create our global collection of **Todos**.
  var Stuff = new StuffList;

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  var StuffView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {  
      "click a.destroy" : "clear"   
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() { 
      this.model.on('destroy', this.remove, this);
    },

    // Re-render the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON())); 
      this.input = this.$('.edit');
      return this;
    },

     

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.input.val();
      if (!value) this.clear();
      alert(this.get('name'));
      this.model.save({ name: value } );
      this.$el.removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
      el: $("#stuffapp"),

    // Our template for the line of statistics at the bottom of the app.
   // statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "keypress #new-stuff": "createOnEnter" 
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

        this.input = this.$("#new-stuff"); 

      Stuff.on('add', this.addOne, this); 
      Stuff.on('reset', this.addAll, this);
      Stuff.on('all', this.render, this);
         
      this.main = $('#main');

      Stuff.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() { 
        //var remaining = Stuff.remaining().length;

        if (Stuff.length) {
            this.main.show(); 
           // this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
          } else {
            this.main.hide();
            //this.footer.hide();
          }

      //this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (stuff) {
      var view = new StuffView({model: stuff});
      this.$("#stuff-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        Stuff.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Stuff.create({ name: this.input.val() });
      this.input.val('');
    } 

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
