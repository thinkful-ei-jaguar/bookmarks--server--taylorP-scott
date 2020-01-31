const bookmarksServices = {
  getAllBookmarks(knex) {
    return knex.select('*').from('bookmark_list')
  },

  addItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows=>rows[0])
  },

  getById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteItem(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete()
  },

  updateItem(knex, id, newData) {
    return knex('shopping_list')
      .where({ id })
      .update(newData)
  }
}

module.exports = bookmarksServices