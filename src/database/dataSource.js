
/**
 * 
 * @param {import('./dataRepo')} dataRepo 
 * @returns 
 */
const DataSource = function(dataRepo) {
  return {
    async test () {
      return dataRepo.test();
    }
  }
}

module.exports = DataSource