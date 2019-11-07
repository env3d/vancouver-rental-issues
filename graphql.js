
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

function setupGraphQL(app, db) {
  var schema = buildSchema(
    [
      `type Query {`,
      `  areas: [Area]`,
      `  issues(limit: Int, area: String): [Issue]`,
      `}`,
      `type Area {`,
      `  area: String`,
      `}`,
      `type Issue {`,
      `  id: Int`,
      `  operator: String`,
      `  businessURL: String`,
      `  street_number: String`,
      `  street: String`,
      `  total_outstanding: Int`,
      `  total_units: Int`,
      `  geom: String`,
      `  area: String`,      
      `}`
    ].join('\n')
  )
  
  var root = {
    areas: () => {
      console.log('executing areas');

      return db.all(`SELECT DISTINCT(area) FROM issues`)
        .then( data => {
          console.log(data);
          return data;
        });          
    },

    issues: ( {limit, area} ) => {

      let where_clause = area ? ` WHERE area = '${area}' ` : '';
      let limit_clause = limit ? ` LIMIT ${limit} ` : '';
      
      return db.all(`SELECT * FROM issues ${where_clause} ORDER BY total_outstanding DESC ${limit_clause}`)
        .then( data => data );      
    }
  }

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  
}

module.exports = setupGraphQL;
