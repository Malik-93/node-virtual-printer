#!/usr/bin/env node
'use strict'

var config = require('rc')('Rollo X1060', {
  name: 'Rollo X1060', dir: process.cwd(), port: 6000
})
var nonPrivate = require('non-private-ip')
var url = require('url')
var ip = nonPrivate() || nonPrivate.private()
var fs = require('fs')

var Printer = require('./')

var p = new Printer(config)

p.on('job', function (job) {
  var filename = 'printjob-' + job.id + '-' + Date.now() + '.ps'
  job.pipe(fs.createWriteStream(filename)).on('finish', function () {
    console.log('printed:', filename)
  })
})

p.server.on('listening', function () {
  console.log('Rollo X1060 listening on:', url.format({protocol: 'http', hostname: ip, port: config.port}))
})
