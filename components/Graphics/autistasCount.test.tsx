describe('TESTAR CONTAGEM', () => {
    const xusers = [
        {
          id: 1,
          nome: "rubens",
          parents: [
            {
              id: 1,
              isAutist: true,
              isPcd: true,
            },
            {
              id: 2,
              isAutist: true,
              isPcd: true,
            }
          ]
        },
        {
          id: 1,
          nome: "rubens",
          parents: [
            {
              id: 1,
              isAutist: true,
              isPcd: true,
            }
          ]
        }
      ]
    it('autistas' , () => {

        
       let all = xusers?.map((item) => {
        if(item.parents.length > 0){
            return item.parents
        }
        return item.parents
       })

       let count = all[0].filter((item) => item.isPcd == true)
       expect(count.length).toBe(2)
    })
  })