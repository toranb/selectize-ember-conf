import Ember from 'ember';
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var Issue = Ember.Object.extend({
    init: function() {
        this.set('status', []);
    },
    change: function(id) {
        var existingStatus = this.get('status');
        this.set('status', existingStatus.concat(id));
    }
});

moduleForComponent('issue-detail', 'integration: selection tests', {
    integration: true
});

test('updateSelection of false will not actually select anything', function(assert) {
    var issue = Issue.create({id: 1});
    var open = Ember.Object.create({id: 8, name: 'Open'});
    var closed = Ember.Object.create({id: 9, name: 'Closed'});
    var statuses = Ember.A([open, closed]);
    this.set('model', issue);
    this.set('statuses', statuses);
    this.render(hbs`{{issue-detail model=model statuses=statuses}}`);
    var selector = 'select.detail-status + .selectize-control';
    this.$(`${selector} > .selectize-input`).trigger('click');
    this.$(`${selector} > .selectize-dropdown div.option:eq(0)`).trigger('click').trigger('change');
    assert.deepEqual(issue.get('status'), [8]);
});
