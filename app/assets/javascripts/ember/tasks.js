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