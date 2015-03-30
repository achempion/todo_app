(function() {
    var TaskStore = Fluxxor.createStore({
        initialize: function () {
            this.tasks = tasks;
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

    var actions = {};

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
                        return <div className="tasks-item" key={i}>
                            <div className="tasks-item-actions">
                                <input type="checkbox" checked={task.is_done} />
                            </div>
                            {task.title}
                        </div>
                    })}
                </div>
            );
        }
    });

    React.render(<Application flux={flux} />, document.getElementById("tasks"));
})();