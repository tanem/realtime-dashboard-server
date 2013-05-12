module.exports = new EventMediator();

function EventMediator() {
  this.subscriptions = {};
}

EventMediator.prototype.subscribe = function(event, cb, context){
  this.subscriptions[event] = this.subscriptions[event] || [];
  this.subscriptions[event].push({
    cb: cb,
    context: context || this
  });
};

EventMediator.prototype.publish = function(event){
  var args = Array.prototype.slice.call(arguments, 1);
  if (this.subscriptions[event]) {
    this.subscriptions[event].forEach(function(subscription){
      subscription.cb.apply(subscription.context, args);
    }, this);
  }
};

EventMediator.prototype.getSubscriptions = function(event){
  return this.subscriptions[event] || this.subscriptions;
};

EventMediator.prototype.clearSubscriptions = function(event){
  if (event) delete this.subscriptions[event];
  else this.subscriptions = {};
};