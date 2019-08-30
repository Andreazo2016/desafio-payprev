'use strict'

class StoreFolder {
  get rules() {
    return {
      name:'required|string'
    }
  }

  get validateAll () {
    return true
  }

  get messages(){
    return {
      'name.required':'Você de informar o nome da pasta',
      'name.string':'O nome da pasta deve ser uma string'
    }
  }
}

module.exports = StoreFolder
