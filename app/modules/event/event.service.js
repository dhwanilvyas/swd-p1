angular
  .module('EventApp')
  .service('EventService', service);

service.$inject = ['$localStorage'];

function service ($localStorage) {

  return {
    getList: getList,
    create: create
  };

  function create (event) {
    var e = [];
    event.id = 1;
    if ($localStorage.events) {
      e = JSON.parse($localStorage.events);
      var events = e[e.length - 1];
      event.id = events.id + 1;
    }
    e.push(event);
    $localStorage.events = JSON.stringify(e);
    return true;
  }

  function getList () {
    if ($localStorage.events) {
      var event = JSON.parse($localStorage.events);
      event.forEach(function (e) {
        var start = e.startTime;
        start = new Date(start);
        start = start.getDate() + '/' + (start.getMonth()+1) + '/' + start.getFullYear() + ', ' + start.getHours() + ':' + start.getMinutes();

        var end = e.endTime;
        end = new Date(end);
        end = end.getDate() + '/' + (end.getMonth()+1) + '/' + end.getFullYear() + ', ' + end.getHours() + ':' + end.getMinutes();
        e.startTime = start;
        e.endTime = end;
      });
      return event;
    }
  }

}
