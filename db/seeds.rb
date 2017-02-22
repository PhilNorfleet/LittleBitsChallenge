# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
bits = Bit.create([
  {:name => "bargraph"},
  {:name => "bend-sensor"},
  {:name => "branch"},
  {:name => "bright-led"},
  {:name => "button"},
  {:name => "buzzer"},
  {:name => "coin-battery"},
  {:name => "dc-motor"},
  {:name => "dimmer"},
  {:name => "doubleand"},
  {:name => "doubleor"},
  {:name => "fan"},
  {:name => "forkinverter"},
  {:name => "led"},
  {:name => "light-sensor"},
  {:name => "light-trigger"},
  {:name => "light-wire"},
  {:name => "long-led"},
  {:name => "motion-trigger"},
  {:name => "power"},
  {:name => "pressure-sensor"},
  {:name => "pulse"},
  {:name => "rgb-led"},
  {:name => "roller-switch"},
  {:name => "servo-motor"},
  {:name => "slide-dimmer"},
  {:name => "slide-switch"},
  {:name => "sound-trigger"},
  {:name => "temperature-sensor"},
  {:name => "timeout"},
  {:name => "toggle-switch"},
  {:name => "usb-power"},
  {:name => "uv-led"},
  {:name => "vibration-motor"},
  {:name => "wire"},

  ])
