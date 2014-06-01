Characters = new Meteor.Collection("characters");

if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.setDefault("currentOrder", 0);
    Session.setDefault("showNextButton", false);
  });

  Template.characters.character = function(){
    return Characters.find({order: Session.get("currentOrder")},{sort: {order:1}});
  }

  Template.nextbutton.showNextButton = function(){
    return Session.get("showNextButton");
  }

  Template.nextbutton.events({
    "click button": function(){
      var currentOrder = Session.get("currentOrder");
      Session.set("currentOrder", currentOrder + 1);
      Session.set("showNextButton", false);
    }
  })

  Template.characters.events({
    "keyup input": function(evt){
      if (evt.keyCode == 13){
        var val = $(evt.target).val();
        var def = this.definition;

        var isAnswerCorrect = function(val, def) {
          var contains = _.contains(def, val);
          var equals = def == val;
          var matches = false;
          _.each(def, function(d) {
            var re = new RegExp(d);
            if (!matches)
              matches = re.test(val)
          })

          return contains || equals || matches;
        }

        if (isAnswerCorrect(val, def)) {
          Session.set("showNextButton", true);
        }
      }

    }
  })

  // _.each(Characters.findOne().definition, function(d) {
    // var re = new RegExp(d);
    // re.test(val)
  // })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

