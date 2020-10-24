import knex from 'knex'

//rodar a migration
export async function up(knex: knex) {
    return knex.schema.createTable('doc', table =>{
        table.increments('id').primary();
        table.string('title', 100).notNullable();
        table.string('url',200).notNullable();
    });
}

//caso ocarra alguma situação atipica ele reverte
export async function down(knex: knex) {
    return knex.schema.dropTable('doc')
}