'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tags
 */

const Item = use('App/Models/Item');

class TagController {

  async store({ request }) {

    const { idItem, tag } = request.post();

    const item = await Item.findOrFail(idItem);

    let { tags } = item.tags;

    if (tags.includes(tag)) {
      return item;
    }

    item.tags = { tags: tags.concat([tag]) }

    await item.save();

    return item;
  }

}

module.exports = TagController
