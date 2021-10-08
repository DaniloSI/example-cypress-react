describe("Lista de Tarefas", () => {
  it("Criar tarefas, modificá-las e salvar", () => {
    cy.visit("/");

    const tasks = [
      "Praesent fermentum metus arcu, id tempor libero placerat vel.",
      "Nam sodales risus sed tortor sollicitudin pharetra.",
      "Aliquam molestie nulla nec vehicula consequat.",
      "Cras nec magna et est condimentum gravida.",
      "Phasellus placerat tortor quis ligula consequat, id feugiat sapien rhoncus.",
      "Vestibulum nisi ligula, commodo nec orci eu, convallis ornare magna.",
      "Nunc semper convallis ligula.",
    ];

    tasks.forEach((task) =>
      cy.get("[data-cy=input-task]").type(`${task}{enter}`)
    );

    [0, 2, 3].forEach((index) => cy.get("span").contains(tasks[index]).click());

    [5, 6].forEach((index) => cy.get("span").contains(tasks[index]).click());

    cy.fixture("todosSave").then((expectSave) => {
      cy.intercept("POST", "/todos", (req) => {
        expect(req.body).to.deep.equal(expectSave);
        req.reply({
          statusCode: 201,
        });
      }).as("save");
    });

    cy.get("[data-cy=btn-save]").click();

    cy.wait("@save");
  });
});
