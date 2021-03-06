exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('quizzes')
    .del()
    .then(async () => {
      const classRecord = await knex('classes')
        .select('id')
        .first()
      return knex('quizzes').insert([
        {
          class_id: classRecord.id,
          title: 'Quiz 1',
        },
      ])
    })
}
