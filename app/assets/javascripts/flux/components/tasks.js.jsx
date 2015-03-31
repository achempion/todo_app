(function() {
    var constants = {
        TOGGLE_TASK: "TOGGLE_TASK"
    };

    var TaskStore = Fluxxor.createStore({
        initialize: function () {
            this.tasks = tasks;

            this.bindActions(
                constants.TOGGLE_TASK, this.onToggleTask
            );
        },

        onToggleTask: function(payload) {
            payload.task.is_done = !payload.task.is_done;
            this.emit("change");

            $.ajax({
                url: '/tasks/'+payload.task.id,
                type: 'PATCH',
                data: {is_done: payload.task.is_done}
            });
        },

        getState: function () {
            return {
                tasks: this.tasks
            };
        }
    });

    var stores = {
        TaskStore: new TaskStore()
    };

    var actions = {
        toggleTask: function(task) {
            this.dispatch(constants.TOGGLE_TASK, {task: task});
        }
    };

    var flux = new Fluxxor.Flux(stores, actions);

    //var Tasks = React.createClass({
    //    render: function () {
    //        return (
    //            <div>
    //                {this.props.tasks.map(function(task, i) {
    //                    return <div key={i}>{task.title}</div>
    //                })}
    //            </div>
    //        );
    //    }
    //});

    var FluxMixin = Fluxxor.FluxMixin(React),
        StoreWatchMixin = Fluxxor.StoreWatchMixin;

    var Application = React.createClass({
        mixins: [FluxMixin, StoreWatchMixin("TaskStore")],

        getStateFromFlux: function () {
            var flux = this.getFlux();
            // Our entire state is made up of the TodoStore data. In a larger
            // application, you will likely return data from multiple stores, e.g.:
            //
            //   return {
            //     todoData: flux.store("TodoStore").getState(),
            //     userData: flux.store("UserStore").getData(),
            //     fooBarData: flux.store("FooBarStore").someMoreData()
            //   };
            return flux.store("TaskStore").getState();
        },

        render: function () {
            return (
                <div className="tasks">
                    {this.state.tasks.map(function(task, i) {
                        return <div key={i}><TaskItem task={task} i={i} /></div>
                    })}
                </div>
            );
        }

    });

    var TaskItem = React.createClass({
        mixins: [FluxMixin],

        propTypes: {
            task: React.PropTypes.object.isRequired
        },

        render: function() {
            return <div className="tasks-item">
                <div className="tasks-item-actions">
                    <input type="checkbox" checked={this.props.task.is_done} onChange={this.onChange} />
                </div>
                {this.props.task.title}
            </div>
        },

        onChange: function () {
            this.getFlux().actions.toggleTask(this.props.task)
        }
    });

    React.render(<Application flux={flux} />, document.getElementById("tasks"));
})();