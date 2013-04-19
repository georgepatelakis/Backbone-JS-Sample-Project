/*
 * @hellocreation
 */



$(function() {
	/**
	 * Model
	 */
	Tour = Backbone.Model.extend({});

	/**
	 * Collection
	 */
	TourCollection = Backbone.Collection.extend({
		model: Tour,

		//If you define a comparator, it will be used to maintain the collection in sorted order.
		comparator: function(item) {
			return item.get('pid');
		}
	});
	var tourListTemplate = Handlebars.compile("<li class=\"viewDetailBtn\" id=\"#tourDetail/{{tours.pid}}\">" +
			         		"<div class=\"item-name\">{{tours.name}}f</div>" +
							"<div class=\"item-price\">{{tours.price}}f</div>" +
							"<a href=\"#tourDetail/{{tours.pid}}\">Learn More</a>" +
						"</li>"
    )
	//tour list view
	var TourListView = Backbone.View.extend({
		el: $('#tourListView'),
		template: tourListTemplate, 
		render: function() {
		    this.el.html(this.template(this.model))
		    //var self = this;
			//this.el.fadeOut(0, function() {
			//	$('#tourList').empty();
			//	$.tmpl(self.tourListTemplate, self.model.toArray()).appendTo(self.el.find('#tourList'));
			//	self.el.fadeIn(500);
			//});
			return this;
		},
	});

	var tourDetailTemplate = Handlebars.compile("<div class=\"item-name\">${attributes.name}</div>"+	
					"<div class=\"item-price\">{{tours.price}}</div>" +
					"<div class=\"item-price\">{{tours.description}}</div>" +
					"<br/>"+
					"<a class=\"contact\"><img src=\"../presentation-data/images/contact.png\" width=\"100\" height=\"40\" alt=\"Contact\"></a>");
	//tour list view
	var TourDetailView = Backbone.View.extend({
		 el: $('#tourDetailView'),
		//events: {
		//	"click .contact": "contactBtnClick",
		//},
	    //tourDetailTemplate: $("#tourDetailTmpl").template(),
	    template: tourDetailTemplate,
		render: function() {
			var self = this;
			//this.el.fadeOut(0, function() {
			//	self.el.empty();
			//	$.tmpl(self.tourDetailTemplate, self.model).appendTo(self.el);
			//	self.el.fadeIn(500);
		    //});
			this.$el.html(this.template(this))
			return this;
		},
		contactBtnClick: function() {
			alert('Thank you for contacting us');
		}
	});

	//controller
	var Application = Backbone.Controller.extend({
		_tourListView: null,
		//store local tourlist object
		_tourDetailView: null,
		//store local tourdetail object
		_tours: null,
		//store local tours collection
		routes: {
			"": "tourList",
			"tourDetail/:id": "tourDetail",
		},

		/*
		 * Constructor
		 */
		initialize: function(options) {
			var self = this;
			if (this._tourListView === null) {
				$.ajax({
					url: 'data/data.json',
					dataType: 'json',
					data: {},
					success: function(data) {
					    //create Tour collect and Set Data
					    
					    self._tours = eval(data);
					  
						self.tourList();
					}
				});
				return this;
			}
			return this;
		},

		tourList: function() {
			this._tourListView = new TourListView({
				model: this._tours
			});
			this._tourListView.render();
		},

		tourDetail: function (id) {
		   
			//this._tourDetailView = new TourDetailView({
			//	model: this._tours.at(id)
			//});
			//this._tourDetailView.render();
		}
	});

	//instantiate Application object
	app = new Application();
	Backbone.history.start();
});
