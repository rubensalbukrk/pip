describe("Filtração de usuários", () => {
  const users = [
    {
      id: 1,
      nome: "Maria da Silva",
      parents: [
        {
          id: 1,
          isAutist: false,
          isPcd: true,
          // ...others
        },
        {
          id: 2,
          isAutist: true,
          isPcd: true,
          // ...others
        },
      ],
    },
    {
      id: 1,
      nome: "BERNADETE",
      parents: [
        {
          id: 1,
          isAutist: true,
          isPcd: true,
        },
      ],
    },
  ];

  it("Filtrar autistas", () => {
    let autistas = users
      ?.map((items) => {
        return items.parents.length > 0 && items.parents;
      })
      .flat()
      .filter((autistas) => autistas.isAutist == true);
    expect(autistas.length).toBe(2);
  }),
    it("Filtrar Pcds", () => {
      let pcds = users
        ?.map((items) => {
          return items.parents.length > 0 && items.parents;
        })
        .flat()
        .filter((item) => item.isPcd === true);
      expect(pcds.length).toBe(3);
    });
});
