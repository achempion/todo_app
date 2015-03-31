window.Tasks = Ember.Application.create({
    rootElement: $('#ember-application')
});

Tasks.Router.map(function() {
  this.resource('tasks', { path: '/' });
});

Tasks.Task = DS.Model.extend({
    title: DS.attr('string'),
    is_done: DS.attr('boolean')
});

Tasks.ApplicationAdapter = DS.FixtureAdapter.extend();

Tasks.TasksRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('task');
    }
});

Tasks.TaskController = Ember.ObjectController.extend({
    is_done: function(key, value){
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('is_done');
        } else {
            // property being used as a setter
            model.set('is_done', value);
            model.save();
            return value;
        }
    }.property('model.is_done')
});