var fs = require('fs')
var spawn = require('child_process').spawn


var services = ['web-app','profile-service']

services.forEach(function(service){
  //var log  = fs.createWriteStream('./log/'+service+'.log')
  var proc = spawn('node', ['./server/services/'+service+'.js','--seneca.log.all'])

  //proc.stdout.pipe(log)
  //proc.stderr.pipe(log)

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
})