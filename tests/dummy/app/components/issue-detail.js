import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        changed: function(status) {
            var model = this.get('model');
            model.change(status.get('id'));
        }
    }
});
