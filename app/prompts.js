module.exports = [
  {
    name: 'demo',
    type: "confirm",
    message: 'Do you want the app to contain some demo code?',
    default: true      
  },
  {
    name: 'coffee',
    type: "confirm",
    message: 'Do you want the generated code to be written in CoffeeScript?',
    default: false     
  },
  {
    name: 'jade',
    type: "confirm",
    message: 'Do you want to use Jade for your html templates?',
    default: false     
  }
];