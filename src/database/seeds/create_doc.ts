import knex from 'knex'

export async function seed (knex:knex) {
    await knex('doc').insert([
        {title: 'teste', url: 'url do rep'}
    ])
}