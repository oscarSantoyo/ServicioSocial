exports.buildQuery = function (body) {
  let nameQuery = ''
  let promQuery = ''
  let matQuery = ''
  let perQuery = ''

  console.log('body: ', body)
  if (body.name) {
    nameQuery = ' WHERE UPPER(REPLACE(concat(p.a_paterno,p.a_materno,p.nombres),\' \',\'\'))  ' +
      ' SIMILAR TO \'%(' + body.name.toUpperCase().replace(' ', '|') + ')%\'::TEXT '
  }
  if (body.prom) {
    promQuery = ' WHERE promedio::decimal  ' + body.prom
  }
  if (body.mat) {
    matQuery = ' JOIN r_prof_materia rpm ON rpm.id_profesor = p.id_persona AND rpm.id_materia =  ' + body.mat
  }

  let query = 'WITH temp_table AS  ( ' +
    '  SELECT  c.id_persona, p.nombres, p.a_paterno, p.a_materno, AVG(c.promedio::decimal) as promedio ' +
    '       FROM calificacion c ' +
    '       JOIN persona p ON c.id_persona = p.id_persona ' +
    matQuery +
    nameQuery +
    '       GROUP BY c.id_persona, p.nombres, p.a_paterno, p.a_materno ) ' +
    'SELECT id_persona, nombres, a_paterno, a_materno, to_char(promedio,\'9.99\') as promedio FROM temp_table ' + promQuery

  console.log('Query as result: ', query)
  return query
}